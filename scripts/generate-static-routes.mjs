import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import sirv from 'sirv';
import puppeteer from 'puppeteer';

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

// Start a static file server on dist/ with SPA fallback to index.html
const handler = sirv(distDir, { single: true, dev: false, etag: true });
const server = http.createServer(handler);
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const baseUrl = `http://127.0.0.1:${port}`;

console.log(`[prerender] Static server listening on ${baseUrl}`);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

let rendered = 0;
let failed = 0;

try {
  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Give React Helmet / async effects a beat to settle
      await new Promise((r) => setTimeout(r, 250));
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
      console.log(`[prerender] ${route} -> ${path.relative(distDir, path.join(routeDir, 'index.html'))}`);
    } catch (err) {
      failed++;
      console.warn(`[prerender] Failed ${route}: ${err.message}`);
      // Fallback: copy the SPA shell so the route at least resolves
      const cleanRoute = route.replace(/^\/+/, '').replace(/\/$/, '');
      if (cleanRoute && !cleanRoute.includes('..')) {
        const routeDir = path.join(distDir, cleanRoute);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), fs.readFileSync(indexPath, 'utf8'));
      }
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`[prerender] Done. Rendered ${rendered}, failed ${failed}, total ${routes.size}.`);