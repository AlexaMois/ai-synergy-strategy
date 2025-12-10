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
];

export const isRouteAllowed = (path: string): boolean => {
  // Разрешаем якорные ссылки
  if (path.startsWith('#')) return true;
  // Разрешаем внешние ссылки
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) return true;
  // Проверяем по списку
  return ALLOWED_ROUTES.includes(path);
};
