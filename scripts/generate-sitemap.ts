/**
 * Sitemap generator — extracts blog slugs from blogPosts.ts
 * and combines with static routes to produce sitemap.xml
 */

import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://aleksamois.ru';

// Static routes with priority and changefreq
const staticRoutes: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/start', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.8', changefreq: 'monthly' },

  // Services
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/diagnostics', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/architecture', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/support', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/add-ons', priority: '0.7', changefreq: 'monthly' },

  // Products
  { path: '/products', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/doc-search', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/voice-bot', priority: '0.7', changefreq: 'monthly' },

  // Cases
  { path: '/cases', priority: '0.8', changefreq: 'weekly' },
  { path: '/cases/kraypotrebsoyuz', priority: '0.7', changefreq: 'monthly' },
  { path: '/cases/cargo-express', priority: '0.7', changefreq: 'monthly' },
  { path: '/cases/doc-search', priority: '0.7', changefreq: 'monthly' },

  // Materials
  { path: '/materials', priority: '0.8', changefreq: 'weekly' },
  { path: '/materials/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/materials/resources', priority: '0.7', changefreq: 'monthly' },
  { path: '/materials/checklist-30', priority: '0.7', changefreq: 'monthly' },

  // Demo
  { path: '/demo', priority: '0.6', changefreq: 'monthly' },
  { path: '/demo/voice-bot', priority: '0.6', changefreq: 'monthly' },

  // Legal
  { path: '/legal', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/consent', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/cookies', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/terms', priority: '0.3', changefreq: 'yearly' },
];

function extractBlogSlugs(): string[] {
  const filePath = path.resolve(__dirname, '../src/data/blogPosts.ts');
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const slugs: string[] = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

export function generateSitemapXml(): string {
  const blogSlugs = extractBlogSlugs();

  const allRoutes = [
    ...staticRoutes,
    ...blogSlugs.map(slug => ({
      path: `/materials/blog/${slug}`,
      priority: '0.6',
      changefreq: 'monthly',
    })),
  ];

  const urls = allRoutes
    .map(
      route => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

// Run directly
if (require.main === module) {
  const xml = generateSitemapXml();
  const outPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`✅ sitemap.xml generated with ${xml.split('<url>').length - 1} URLs`);
}
