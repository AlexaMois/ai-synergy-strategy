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
function russianDateToISO(dateStr: string): string | undefined {
  const months: Record<string, string> = {
    'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04',
    'мая': '05', 'июня': '06', 'июля': '07', 'августа': '08',
    'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12',
  };
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1].toLowerCase()];
    if (!month || !/^\d{1,2}$/.test(parts[0]) || !/^\d{4}$/.test(parts[2])) return undefined;
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  return undefined;
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
    { path: '/services/automation', priority: '0.8', changefreq: 'monthly' },
    { path: '/products', priority: '0.8', changefreq: 'monthly' },
    { path: '/products/knowledge-management', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents', priority: '0.8', changefreq: 'monthly' },
    { path: '/ai-agents', priority: '0.8', changefreq: 'monthly' },
    { path: '/ai-agents/hermes', priority: '0.8', changefreq: 'monthly' },
    { path: '/ai-agents/custom', priority: '0.8', changefreq: 'monthly' },
    { path: '/expert', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/neurotenderolog', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/max-files', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/max-accounting-reconciliation', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/excel-deadlines', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/employee-permits', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/fleet-docs-maintenance', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/plaud-meetings', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/field-trip-reports', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/chat-tasks', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/employee-messages', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/website-crm-leads', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/customer-voice-requests', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/bank-cashflow', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/construction-purchase-calculator', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/management-dashboards', priority: '0.8', changefreq: 'monthly' },
    { path: '/mini-agents/market-price-analyst', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/digital-audit', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/digital-tools-program', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/digital-solution-design', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/avtomatizaciya-biznes-processov/', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/cifrovizaciya-biznesa/', priority: '0.9', changefreq: 'monthly' },
    { path: '/services/vnedrenie-ii-v-biznes/', priority: '0.9', changefreq: 'monthly' },
    { path: '/cases', priority: '0.8', changefreq: 'weekly' },
    { path: '/cases/aktransservice', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases/production-doc-search', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases/kraypotrebsoyuz', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases/cargo-express', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases/neurotenderolog', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases/caregiver-matching', priority: '0.7', changefreq: 'monthly' },
    { path: '/cases/business-travel', priority: '0.7', changefreq: 'monthly' },
    { path: '/materials', priority: '0.8', changefreq: 'weekly' },
    { path: '/materials/blog', priority: '0.7', changefreq: 'weekly' },
    { path: '/materials/checklist-30', priority: '0.7', changefreq: 'monthly' },
    { path: '/materials/plaud-guide', priority: '0.6', changefreq: 'monthly' },
    { path: '/neurostylist', priority: '0.6', changefreq: 'monthly' },
    { path: '/legal/cookies', priority: '0.4', changefreq: 'yearly' },
    { path: '/legal/privacy-policy', priority: '0.4', changefreq: 'yearly' },
    { path: '/legal/consent', priority: '0.4', changefreq: 'yearly' },
    { path: '/legal/terms', priority: '0.4', changefreq: 'yearly' },
  ];

  const blogEntries = extractBlogEntries(root);

  const allRoutes = [
    ...staticRoutes.map(r => ({ ...r, lastmod: undefined as string | undefined })),
    ...blogEntries.map(entry => ({
      path: `/materials/blog/${entry.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: russianDateToISO(entry.date),
    })),
  ];

  const urls = allRoutes
    .map(r => [
      `  <url>`,
      `    <loc>${DOMAIN}${r.path}</loc>`,
      r.lastmod ? `    <lastmod>${r.lastmod}</lastmod>` : null,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority}</priority>`,
      `  </url>`,
    ].filter(Boolean).join('\n'))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-generate-sitemap',
    closeBundle() {
      const root = process.cwd();
      // Vite runs closeBundle even after a failed transform. Preserve the original build
      // error instead of replacing it with ENOENT while writing a sitemap to missing dist.
      if (!fs.existsSync(path.resolve(root, 'dist'))) return;
      const xml = buildSitemapXml(root);
      for (const out of ['dist/sitemap.xml', 'public/sitemap.xml']) {
        fs.writeFileSync(path.resolve(root, out), xml, 'utf-8');
      }
      console.log(`✅ sitemap.xml generated (${xml.split('<url>').length - 1} URLs)`);
    },
  };
}
