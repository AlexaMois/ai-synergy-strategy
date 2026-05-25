import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

const requiredRoutes = [
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
    if (route !== '/') routes.add(route.replace(/\/$/, ''));
  }
}

const indexHtml = fs.readFileSync(indexPath, 'utf8');

for (const route of routes) {
  const cleanRoute = route.replace(/^\/+/, '').replace(/\/$/, '');
  if (!cleanRoute || cleanRoute.includes('..')) continue;

  const routeDir = path.join(distDir, cleanRoute);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
}

fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log(`Generated static index.html files for ${routes.size} routes.`);