import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
const BASE = 'https://aleksamois.ru';
const DEFAULT_OG = `${BASE}/og-aleksa-2026-v1.png`;

if (!fs.existsSync(indexPath)) {
  throw new Error('dist/index.html not found. Run this script after vite build.');
}

const routes = new Set();
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const matches = sitemap.matchAll(/<loc>https:\/\/aleksamois\.ru([^<]*)<\/loc>/g);
  for (const match of matches) {
    const route = match[1] || '/';
    routes.add(route === '/' ? '/' : route.replace(/\/$/, ''));
  }
}

// Private / temporary routes — written so that direct hits get noindex meta,
// but NOT in sitemap and NOT advertised to crawlers.
const privateRoutes = ['/newyear', '/portal', '/portal/admin', '/home-preview'];
for (const r of privateRoutes) routes.add(r);

fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

// -----------------------------------------------------------------------------
// 1. Legacy redirects: write meta-refresh stubs (Google treats as soft 301).
// -----------------------------------------------------------------------------
const legacyRedirects = {
  '/services/diagnostics': '/services/digital-audit',
  '/services/architecture': '/services/digital-solution-design',
  '/services/support': '/faq/#technical-obligations',
  '/services/add-ons': '/services',
  '/privacy-policy': '/legal/privacy-policy/',
  '/case_portfolio': '/cases/',
  '/products/neurotenderolog': '/services/neurotenderolog/',
  '/services/owner-digital-session': '/start/',
  '/services/digital-development-strategy': '/expert/',
  '/services/implementation-support': '/services/automation/',
  '/services/digital-tools-support': '/faq/#technical-obligations',
  '/products/doc-search': '/cases/production-doc-search/',
  '/products/voice-bot': '/mini-agents/customer-voice-requests/',
  '/materials/instrukciya-plaud-ai': '/materials/plaud-guide/',
  '/diagnostics': '/services/digital-audit/',
  '/diagnostic': '/services/digital-audit/',
  '/legal': '/legal/privacy-policy/',
  '/golossok-pricing': '/pricing/',
  '/demo': '/services/',
  '/demo/voice-bot': '/services/digital-solution-design/',
  '/materials/resources': '/materials/',
  '/newyear': '/',
  '/terms': '/legal/terms/',
  '/cases/doc-search': '/cases/production-doc-search/',
};

function writeRedirectStubs() {
  for (const [from, to] of Object.entries(legacyRedirects)) {
    const cleanRoute = from.replace(/^\/+/, '').replace(/\/$/, '');
    if (!cleanRoute || cleanRoute.includes('..')) continue;
    const routeDir = path.join(distDir, cleanRoute);
    fs.mkdirSync(routeDir, { recursive: true });
    const target = `${BASE}${to}`;
    const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>Страница переехала</title>
<link rel="canonical" href="${target}">
<meta name="robots" content="noindex,follow">
<meta http-equiv="refresh" content="0; url=${to}">
<script>window.location.replace(${JSON.stringify(to)});</script>
</head>
<body>
<p>Страница переехала: <a href="${target}">${target}</a></p>
</body>
</html>`;
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
    routes.delete(from);
  }
}
writeRedirectStubs();
console.log(`[prerender] Legacy redirect stubs: ${Object.keys(legacyRedirects).length}`);

// -----------------------------------------------------------------------------
// 2. Build per-route metadata map.
// -----------------------------------------------------------------------------

// Parse src/data/blogPosts.ts → [{slug,title,excerpt,metaDescription}]
function parseBlogPosts() {
  const file = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, 'utf8');
  const posts = [];
  const re = /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*excerpt:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    const slug = m[1];
    const title = m[2];
    const excerpt = m[3];
    // Try to also grab seo.metaDescription nearby
    const tail = src.slice(re.lastIndex, re.lastIndex + 2000);
    const md = tail.match(/metaDescription:\s*"([^"]+)"/);
    posts.push({
      slug,
      title,
      excerpt,
      metaDescription: md ? md[1] : excerpt,
    });
  }
  return posts;
}

// Parse src/data/services.ts → [{slug,title,subtitle}]
function parseServices() {
  const file = path.join(rootDir, 'src', 'data', 'services.ts');
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, 'utf8');
  const items = [];
  const re = /slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?subtitle:\s*\n?\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    items.push({ slug: m[1], title: m[2], subtitle: m[3] });
  }
  return items;
}

// Parse src/data/pillarPages.ts → [{slug, title, description}]
function parsePillarPages() {
  const file = path.join(rootDir, 'src', 'data', 'pillarPages.ts');
  if (!fs.existsSync(file)) return [];
  const src = fs.readFileSync(file, 'utf8');
  const items = [];
  const re = /slug:\s*"([^"]+)",[\s\S]*?seo:\s*\{\s*\n\s*title:\s*"([^"]+)",\s*\n\s*description:\s*\n?\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src))) {
    items.push({ slug: m[1], title: m[2], description: m[3] });
  }
  return items;
}

const blogPosts = parseBlogPosts();
const services = parseServices();
const pillarPages = parsePillarPages();
console.log(`[prerender] Parsed ${blogPosts.length} blog posts, ${services.length} services, ${pillarPages.length} pillar pages.`);

const DEFAULT_TITLE_SUFFIX = ' | Александра Моисеева';

const staticMeta = {
  '/home-preview': { title: 'Тестовая композиция главной | НейроРешения', description: 'Экспериментальный макет композиции главной страницы.', robots: 'noindex,nofollow' },
  '/': {
    title: 'НейроРешения | Программные продукты, ИИ-агенты и автоматизация бизнеса',
    description: 'Программные продукты, ИИ-агенты и автоматизация бизнеса. Выявляем потери, сокращаем ручную работу и проверяем результат на данных компании.',
  },
  '/start': {
    title: 'С чего начать: бесплатная проверка и выездная консультация | НейроРешения',
    description: 'Бесплатная проверка бизнес-процесса с PDF или выездная консультация за 8 000 ₽ в Красноярске.',
  },
  '/services': {
    title: 'Продукты и решения для бизнеса | НейроРешения',
    description: 'Продукты, ИИ-агенты для бизнеса, комплексная автоматизация и экспертная работа.',
  },
  '/services/automation': {
    title: 'Автоматизация бизнес-процессов и ручных операций в 1С/CRM | НейроРешения',
    description: 'Убираем ручную передачу заявок и документов между почтой, мессенджерами, таблицами и 1С/CRM. Измеряем время, ошибки и стоимость операции. Проектирование, внедрение и контроль результата.',
  },
  '/cases': {
    title: 'Кейсы внедрения ИИ и автоматизации' + DEFAULT_TITLE_SUFFIX,
    description: 'Реальные проекты в производстве, логистике и торговле: задача, решение, что изменилось в процессе и в цифрах.',
  },
  '/cases/aktransservice': {
    title: 'Кейс «АкТрансСервис»: цифровизация работы с 53 000 позиций' + DEFAULT_TITLE_SUFFIX,
    description: '53 000 позиций · 5 внедрённых цифровых инструментов · 2 месяца · 1,7 млн ₽ сохранено за квартал.',
  },
  '/cases/kraypotrebsoyuz': {
    title: 'Кейс «Крайпотребсоюз»: архитектура вместо серверов за 1,5 млн ₽' + DEFAULT_TITLE_SUFFIX,
    description: 'Планировалась покупка серверного оборудования примерно за 1,5 млн ₽. Архитектура позволила отказаться от покупки: 1,3 млн ₽ разовой экономии капитальных затрат.',
  },
  '/cases/cargo-express': {
    title: 'Кейс Cargo Express: автоматизация логистики' + DEFAULT_TITLE_SUFFIX,
    description: 'Автоматизация процессов в логистической компании: как сократили ручной труд диспетчеров и убрали потери информации.',
  },
  '/cases/production-doc-search': {
    title: 'Кейс: поиск по документам на производстве' + DEFAULT_TITLE_SUFFIX,
    description: 'Внедрение RAG-поиска по технологической и нормативной документации на производственном предприятии.',
  },
  '/cases/neurotenderolog': {
    title: 'Кейс: НейроТендеролог — Александра Моисеева',
    description: 'Собственный сервис НейроРешений по подписке для отбора закупок. Три постоянных клиента; просмотр до 750 закупок в день на одно направление. Эксплуатационные показатели, не денежная экономия.',
    ogType: 'article',
  },
  '/cases/caregiver-matching': {
    title: 'Кейс: Система подбора и сопровождения сиделок — Александра Моисеева',
    description: 'Telegram-бот и контур учёта в Google Таблицах для заявок на уход, реализованные в 2025. Заказчик не раскрывается. Экономический эффект не заявляется.',
    ogType: 'article',
  },
  '/cases/business-travel': {
    title: 'Кейс: Автоматизация командировок — Александра Моисеева',
    description: 'Подобное решение внедрено в двух компаниях и используется для задач организации командировок. Заказчики не раскрываются; экономический эффект не заявляется.',
    ogType: 'article',
  },
  '/materials': {
    title: 'Материалы по цифровому развитию бизнеса' + DEFAULT_TITLE_SUFFIX,
    description: 'Блог, чек-листы и практические гайды по внедрению ИИ, автоматизации процессов и цифровых инструментов в бизнесе.',
  },
  '/materials/blog': {
    title: 'Блог о цифровом развитии и ИИ для бизнеса' + DEFAULT_TITLE_SUFFIX,
    description: 'Разборы реальных проектов, методологические статьи и практические заметки о внедрении ИИ и автоматизации в бизнесе.',
  },
  '/materials/resources': {
    title: 'Полезные ресурсы по цифровизации' + DEFAULT_TITLE_SUFFIX,
    description: 'Подборка инструментов, материалов и шаблонов для тех, кто занимается цифровым развитием бизнеса.',
  },
  '/materials/checklist-30': {
    title: 'Чек-лист из 30 пунктов: готовность бизнеса к цифровизации' + DEFAULT_TITLE_SUFFIX,
    description: 'Бесплатный чек-лист для самопроверки: какие зоны в компании готовы к цифровизации, а какие — нет.',
  },
  '/materials/plaud-guide': {
    title: 'Гайд по Plaud Note для руководителей' + DEFAULT_TITLE_SUFFIX,
    description: 'Практический гайд: как использовать Plaud Note в работе руководителя — встречи, заметки, передача задач команде.',
  },
  '/pricing': {title:'Цены и условия подключения | НейроРешения',description:'Стоимость ИИ-агентов, лицензий, Hermes, индивидуальных проектов и экспертных услуг.'},
  '/about': {
    title: 'Об эксперте — Александра Моисеева, инженер цифрового развития бизнеса',
    description: 'Опыт, подход и методология: как я веду проекты по цифровому развитию и внедрению ИИ в бизнесе.',
  },
  '/faq': {title:'FAQ по цифровому развитию бизнеса — Александра Моисеева, НейроРешения',description:'Ответы на вопросы о продуктах, ИИ-агентах, лицензиях, автоматизации, консультациях, проверке бизнес-процесса и обучении.'},
  '/legal': {
    title: 'Правовая информация' + DEFAULT_TITLE_SUFFIX,
    description: 'Юридическая информация: согласие на обработку данных, политика конфиденциальности, cookies и условия использования.',
    robots: 'noindex,follow',
  },
  '/legal/consent': {
    title: 'Согласие на обработку персональных данных' + DEFAULT_TITLE_SUFFIX,
    description: 'Согласие на обработку персональных данных в соответствии с законодательством РФ.',
    robots: 'noindex,follow',
  },
  '/legal/privacy-policy': {
    title: 'Политика конфиденциальности' + DEFAULT_TITLE_SUFFIX,
    description: 'Политика обработки и защиты персональных данных пользователей сайта.',
    robots: 'noindex,follow',
  },
  '/legal/cookies': {
    title: 'Политика использования cookies' + DEFAULT_TITLE_SUFFIX,
    description: 'Какие cookies использует сайт и как ими управлять.',
    robots: 'noindex,follow',
  },
  '/legal/terms': {
    title: 'Условия использования сайта' + DEFAULT_TITLE_SUFFIX,
    description: 'Условия использования сайта aleksamois.ru.',
    robots: 'noindex,follow',
  },
  '/newyear': {
    title: 'Новогоднее поздравление' + DEFAULT_TITLE_SUFFIX,
    description: 'Новогоднее поздравление от агентства «НейроРешения».',
    robots: 'noindex,nofollow',
  },
  '/portal': {
    title: 'Клиентский портал' + DEFAULT_TITLE_SUFFIX,
    description: 'Закрытый портал для клиентов.',
    robots: 'noindex,nofollow',
  },
  '/portal/admin': {
    title: 'Админ-панель портала' + DEFAULT_TITLE_SUFFIX,
    description: 'Закрытая админ-панель.',
    robots: 'noindex,nofollow',
  },
  '/neurostylist': {
    title: 'Личный нейростилист — персональный стиль с ИИ | Александра Моисеева',
    description: 'Личный нейростилист помогает собрать стиль, капсулы, список покупок и персональные рекомендации по образам, вещам, цветам и впечатлению.',
  },
};

const commercialCatalog = JSON.parse(fs.readFileSync(path.join(rootDir,'src/data/commercialCatalog.json'),'utf8'));
for (const [route,title,description] of [["/products","Программные продукты","НейроТендеролог и система управления корпоративными знаниями."],["/products/knowledge-management","Корпоративный портал знаний","Документы, инструкции и регламенты в единой интеллектуальной системе. Ролевой доступ, поиск, контроль состояния базы."],["/mini-agents","ИИ-агенты","15 прикладных ИИ-агентов: отдельная цена внедрения и ежемесячная лицензия."],["/ai-agents","ИИ-агенты для бизнеса","15 готовых ИИ-агентов, персональный ИИ-агент Hermes и индивидуальная разработка ИИ-агентов для предприятия."],["/ai-agents/hermes","Hermes","Установка и настройка Hermes за 36 000 ₽. Продвинутая настройка от 126 000 ₽."],["/ai-agents/custom","Индивидуальная разработка ИИ-агентов","Специализированные ИИ-агенты и мультиагентные системы с корпоративными знаниями, инструментами, интеграциями и полномочиями."],["/expert","Экспертная работа","Бесплатная проверка бизнес-процесса, выездная консультация, комплексный аудит, корпоративное обучение и ДПО."],["/services/neurotenderolog","НейроТендеролог: поиск и первичный отбор закупок","НейроТендеролог находит и первично отбирает закупки по профилю компании. Настройка критериев, карточки в MAX, обратная связь специалиста и контроль релевантности."]]) {
  staticMeta[route] = {title:title+' | НейроРешения',description};
  routes.add(route);
}
for (const item of commercialCatalog.mini) {
  const route='/mini-agents/'+item.slug;
  staticMeta[route]={title:item.name+' | НейроРешения',description:item.headline+' Внедрение от '+item.price.toLocaleString('ru-RU')+' ₽. '+item.included};
  routes.add(route);
}
// Add services dynamically
for (const s of services) {
  if (["owner-digital-session","digital-development-strategy","implementation-support","digital-tools-support"].includes(s.slug)) continue;
  staticMeta[`/services/${s.slug}`] = {
    title: s.title + DEFAULT_TITLE_SUFFIX,
    description: s.subtitle,
  };
}

// Add pillar pages dynamically (keys without trailing slash to match sitemap normalization)
for (const p of pillarPages) {
  staticMeta[`/services/${p.slug}`] = {
    title: p.title,
    description: p.description,
  };
}

// Add blog posts dynamically
for (const p of blogPosts) {
  staticMeta[`/materials/blog/${p.slug}`] = {
    title: p.title + DEFAULT_TITLE_SUFFIX,
    description: p.metaDescription || p.excerpt,
    ogType: 'article',
  };
}

// -----------------------------------------------------------------------------
// 3. Inject per-route meta into the SPA shell and write per-route index.html.
// -----------------------------------------------------------------------------

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function injectMeta(html, route, meta) {
  const canonical = `${BASE}${route === '/' ? '/' : route + '/'}`;
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const ogType = meta.ogType || 'website';
  const robots = meta.robots || 'max-image-preview:large';

  let out = html;

  function upsert(regex, tag) {
    if (regex.test(out)) {
      out = out.replace(regex, tag);
    } else {
      out = out.replace('</head>', `  ${tag}\n</head>`);
    }
  }

  // <title>
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  // <meta name="description"> (upsert — отсутствует в index.html по умолчанию)
  upsert(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${description}" data-rh="true">`
  );

  // robots
  if (/<meta\s+name="robots"[^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s+name="robots"[^>]*>/i,
      `<meta name="robots" content="${robots}">`
    );
  } else {
    out = out.replace('</head>', `  <meta name="robots" content="${robots}">\n</head>`);
  }

  // canonical
  out = out.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${canonical}" data-rh="true">`
  );

  // og:url / og:title / og:description / og:type
  upsert(/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" data-rh="true">`);
  upsert(/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}" data-rh="true">`);
  upsert(/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${description}" data-rh="true">`);
  upsert(/<meta\s+property="og:type"[^>]*>/i, `<meta property="og:type" content="${ogType}" data-rh="true">`);

  // twitter:url
  upsert(/<meta\s+name="twitter:url"[^>]*>/i, `<meta name="twitter:url" content="${canonical}">`);

  return out;
}

let written = 0;
let missingMeta = 0;
for (const route of routes) {
  const cleanRoute = route.replace(/^\/+/, '').replace(/\/$/, '');
  if (cleanRoute.includes('..')) continue;
  const routeDir = cleanRoute ? path.join(distDir, cleanRoute) : distDir;
  fs.mkdirSync(routeDir, { recursive: true });

  const meta = staticMeta[route];
  let html;
  if (meta) {
    html = injectMeta(indexHtml, route, meta);
  } else {
    missingMeta++;
    console.warn(`[prerender] no meta for ${route} — writing SPA shell only`);
    html = indexHtml;
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  written++;
}

console.log(`[prerender] Wrote ${written} routes (${missingMeta} without explicit meta).`);

process.exit(0);