/**
 * Vite plugin that regenerates sitemap.xml on every build
 * by reading blog slugs from src/data/blogPosts.ts
 */

import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

function extractBlogSlugs(root: string): string[] {
  const filePath = path.resolve(root, 'src/data/blogPosts.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const slugs: string[] = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function buildSitemapXml(root: string): string {
  const DOMAIN = 'https://aleksamois.ru';

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/start', priority: '0.9', changefreq: 'monthly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/faq', priority: '0.7', changefreq: 'monthly' },
    { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
    { path: '/services', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/diagnostics', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/architecture', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/support', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/add-ons', priority: '0.7', changefreq: 'monthly' },
    { path: '/products', priority: '0.8', changefreq: 'monthly' },
    { path: '/products/doc-search', priority: '0.7', changefreq: 'monthly' },
    { path: '/products/voice-bot', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases', priority: '0.8', changefreq: 'weekly' },
    { path: '/cases/kraypotrebsoyuz', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases/cargo-express', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases/doc-search', priority: '0.7', changefreq: 'monthly' },
    { path: '/materials', priority: '0.8', changefreq: 'weekly' },
    { path: '/materials/blog', priority: '0.7', changefreq: 'weekly' },
    { path: '/materials/resources', priority: '0.7', changefreq: 'monthly' },
    { path: '/materials/checklist-30', priority: '0.7', changefreq: 'monthly' },
    { path: '/demo', priority: '0.6', changefreq: 'monthly' },
    { path: '/demo/voice-bot', priority: '0.6', changefreq: 'monthly' },
    { path: '/legal', priority: '0.3', changefreq: 'yearly' },
    { path: '/legal/consent', priority: '0.3', changefreq: 'yearly' },
    { path: '/legal/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/legal/cookies', priority: '0.3', changefreq: 'yearly' },
    { path: '/legal/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  const blogSlugs = extractBlogSlugs(root);
  const allRoutes = [
    ...staticRoutes,
    ...blogSlugs.map(slug => ({
      path: `/materials/blog/${slug}`,
      priority: '0.6',
      changefreq: 'monthly',
    })),
  ];

  const urls = allRoutes
    .map(r => `  <url>\n    <loc>${DOMAIN}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-generate-sitemap',
    closeBundle() {
      const root = process.cwd();
      const xml = buildSitemapXml(root);
      const outPath = path.resolve(root, 'dist/sitemap.xml');
      fs.writeFileSync(outPath, xml, 'utf-8');
      console.log(`✅ sitemap.xml generated (${xml.split('<url>').length - 1} URLs)`);
    },
  };
}
