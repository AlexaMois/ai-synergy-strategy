/**
 * Vite plugin that regenerates sitemap.xml on every build
 * by reading blog slugs from src/data/blogPosts.ts
 */

import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

function extractBlogEntries(root: string): Array<{ slug: string; date: string }> {
  const filePath = path.resolve(root, 'src/data/blogPosts.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const entries: Array<{ slug: string; date: string }> = [];
  const postRegex = /slug:\s*["']([^"']+)["'][\s\S]*?date:\s*["']([^"']+)["']/g;
  let match;
  while ((match = postRegex.exec(content)) !== null) {
    entries.push({ slug: match[1], date: match[2] });
  }
  return entries;
}

/**
 * Convert Russian date like "5 марта 2026" to ISO "2026-03-05"
 */
function russianDateToISO(dateStr: string): string {
  const months: Record<string, string> = {
    'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04',
    'мая': '05', 'июня': '06', 'июля': '07', 'августа': '08',
    'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12',
  };
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1].toLowerCase()] || '01';
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return new Date().toISOString().split('T')[0];
}

function buildSitemapXml(root: string): string {
  const DOMAIN = 'https://aleksamois.ru';
  const today = new Date().toISOString().split('T')[0];

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

  const blogEntries = extractBlogEntries(root);

  const allRoutes = [
    ...staticRoutes.map(r => ({ ...r, lastmod: today })),
    ...blogEntries.map(entry => ({
      path: `/materials/blog/${entry.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: russianDateToISO(entry.date),
    })),
  ];

  const urls = allRoutes
    .map(r => `  <url>\n    <loc>${DOMAIN}${r.path}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`)
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
