// Маршруты, которые работают (всё остальное показывает "в разработке")
export const ALLOWED_ROUTES = [
  '/',
  '/services',
  '/services/diagnostics',
  '/services/architecture',
  '/services/support',
  '/services/add-ons',
  '/services/owner-digital-session',
  '/services/digital-development-strategy',
  '/services/digital-audit',
  '/services/digital-tools-program',
  '/services/implementation-support',
  '/services/digital-solution-design',
  '/services/digital-tools-support',
  '/cases',
  '/cases/kraypotrebsoyuz',
  '/cases/cargo-express',
  '/products',
  '/products/voice-bot',
  '/products/doc-search',
  '/about',
  '/pricing',
  '/faq',
  '/start',
  '/legal',
  '/legal/consent',
  '/legal/privacy-policy',
  '/legal/cookies',
  '/legal/terms',
  '/materials',
  '/materials/resources',
  '/materials/blog',
  '/materials/checklist-30',
  '/materials/plaud-guide',
  '/newyear',
  '/portal',
  '/portal/admin',
];

export const isRouteAllowed = (path: string): boolean => {
  // Разрешаем якорные ссылки
  if (path.startsWith('#')) return true;
  // Разрешаем внешние ссылки
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) return true;
  // Разрешаем динамические маршруты блога (/blog/:slug)
  if (path.startsWith('/blog/')) return true;
  // Разрешаем динамические маршруты блога в материалах (/materials/blog/:slug)
  if (path.startsWith('/materials/blog/')) return true;
  // Проверяем по списку статических маршрутов
  return ALLOWED_ROUTES.includes(path);
};
