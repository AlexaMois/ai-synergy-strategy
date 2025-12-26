// Маршруты, которые работают (всё остальное показывает "в разработке")
export const ALLOWED_ROUTES = [
  '/',
  '/consent',
  '/privacy-policy',
  '/terms',
  '/services',
  '/cases',
  '/resources',
  '/about',
  '/blog',
  '/checklist',
  '/pricing',
  '/golossok-demo',
  '/golossok-pricing',
  '/case-studies/kraypotrebsoyuz',
  '/case-studies/cargo-express',
  '/case-studies/doc-search',
  '/approach',
  '/materials/resources',
  '/materials/blog',
];

export const isRouteAllowed = (path: string): boolean => {
  // Разрешаем якорные ссылки
  if (path.startsWith('#')) return true;
  // Разрешаем внешние ссылки
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) return true;
  // Разрешаем динамические маршруты блога (/blog/:slug)
  if (path.startsWith('/blog/')) return true;
  // Разрешаем динамические маршруты кейсов (/case-studies/:slug)
  if (path.startsWith('/case-studies/')) return true;
  // Разрешаем динамические маршруты блога в материалах (/materials/blog/:slug)
  if (path.startsWith('/materials/blog/')) return true;
  // Проверяем по списку статических маршрутов
  return ALLOWED_ROUTES.includes(path);
};
