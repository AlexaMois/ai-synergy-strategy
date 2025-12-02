// Маршруты, которые работают (всё остальное показывает "в разработке")
export const ALLOWED_ROUTES = [
  '/',           // Главная
  '/consent',    // Юридические документы
  '/privacy-policy',
  '/terms',
];

export const isRouteAllowed = (path: string): boolean => {
  // Разрешаем якорные ссылки
  if (path.startsWith('#')) return true;
  // Разрешаем внешние ссылки
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) return true;
  // Проверяем по списку
  return ALLOWED_ROUTES.includes(path);
};
