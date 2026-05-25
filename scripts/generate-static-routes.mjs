import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import sirv from 'sirv';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

const requiredRoutes = [
  '/',
  '/start',
  '/services',
  '/cases',
  '/pricing',
  '/about',
  '/faq',
  '/services/owner-digital-session',
  '/services/digital-development-strategy',
  '/services/digital-audit',
  '/services/digital-tools-program',
  '/services/implementation-support',
  '/services/digital-solution-design',
  '/services/digital-tools-support',
  '/cases/aktransservice',
  '/cases/kraypotrebsoyuz',
  '/cases/cargo-express',
  '/cases/production-doc-search',
  '/legal/consent',
  '/legal/privacy-policy',
  '/legal/cookies',
  '/legal/terms',
];

if (!fs.existsSync(indexPath)) {
  throw new Error('dist/index.html not found. Run this script after vite build.');
}

const routes = new Set(requiredRoutes);

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const matches = sitemap.matchAll(/<loc>https:\/\/aleksamois\.ru([^<]*)<\/loc>/g);
  for (const match of matches) {
    const route = match[1] || '/';
    routes.add(route === '/' ? '/' : route.replace(/\/$/, ''));
  }
}

// Always write .nojekyll for GitHub Pages
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

const indexHtml = fs.readFileSync(indexPath, 'utf8');

/**
 * Fallback: copy the SPA shell to every route so that direct links resolve
 * (and our SPA router takes over client-side). This ALWAYS runs first so the
 * build never fails — prerender below is best-effort enhancement.
 */
function writeShellForAllRoutes() {
  for (const route of routes) {
    const cleanRoute = route.replace(/^\/+/, '').replace(/\/$/, '');
    if (!cleanRoute || cleanRoute.includes('..')) continue;
    const routeDir = path.join(distDir, cleanRoute);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
  }
}
writeShellForAllRoutes();
console.log(`[prerender] Shell fallback written for ${routes.size} routes.`);

// Allow opting out of Puppeteer entirely (e.g. for quick local builds).
if (process.env.SKIP_PRERENDER === '1') {
  console.log('[prerender] SKIP_PRERENDER=1 — skipping puppeteer rendering.');
  process.exit(0);
}

let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch (err) {
  console.warn(`[prerender] puppeteer not available (${err.message}). Shell fallback already in place.`);
  process.exit(0);
}

// Start a static file server on dist/ with SPA fallback to index.html
const handler = sirv(distDir, { single: true, dev: false, etag: true });
const server = http.createServer(handler);
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const baseUrl = `http://127.0.0.1:${port}`;

console.log(`[prerender] Static server listening on ${baseUrl}`);

let browser;
try {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
} catch (err) {
  console.warn(`[prerender] puppeteer.launch failed: ${err.message}`);
  console.warn('[prerender] Continuing with shell fallback only — build will not fail.');
  server.close();
  process.exit(0);
}

let rendered = 0;
let failed = 0;
const sizes = [];

try {
  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Give React Helmet / async effects a beat to settle
      await new Promise((r) => setTimeout(r, 500));
      const html = await page.content();

      const cleanRoute = route.replace(/^\/+/, '').replace(/\/$/, '');
      const routeDir = cleanRoute ? path.join(distDir, cleanRoute) : distDir;
      if (cleanRoute && cleanRoute.includes('..')) {
        console.warn(`[prerender] Skipping suspicious route: ${route}`);
        continue;
      }
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), html);
      rendered++;
      const kb = Math.round(html.length / 1024);
      sizes.push({ route, kb });
      console.log(`[prerender] ${route.padEnd(50)} -> ${kb} KB`);
    } catch (err) {
      failed++;
      console.warn(`[prerender] Failed ${route}: ${err.message} (shell fallback kept)`);
    } finally {
      await page.close();
    }
  }
} catch (err) {
  console.warn(`[prerender] Unexpected error: ${err.message}. Continuing.`);
} finally {
  try { await browser.close(); } catch {}
  server.close();
}

console.log(`[prerender] Done. Rendered ${rendered}, failed ${failed}, total ${routes.size}.`);
const shellLike = sizes.filter((s) => s.kb < 25).length;
if (shellLike > 0) {
  console.warn(`[prerender] WARNING: ${shellLike} routes look like SPA shell (<25 KB). Helmet/React content may not have hydrated.`);
}
// Never fail the build because of prerender problems.
process.exit(0);