# Оптимизация изображений

## Реализованные оптимизации

### 1. Lazy Loading
Все изображения загружаются с использованием `loading="lazy"` атрибута, кроме критичных изображений (hero section), которые используют `loading="eager"`.

### 2. Responsive Images
Компонент `OptimizedImage` использует атрибут `sizes` для загрузки изображений подходящего размера в зависимости от устройства:
- Мобильные: 100vw
- Планшеты и десктопы: 50vw для портретов, 100vw для фоновых элементов

### 3. WebP Support
Компонент автоматически проверяет WebP версии изображений через `<picture>` элемент с fallback на оригинальный формат.

## Как создать WebP версии изображений

### Вариант 1: Используя онлайн конвертер
1. Посетите [Squoosh](https://squoosh.app/) или [CloudConvert](https://cloudconvert.com/jpg-to-webp)
2. Загрузите изображения из `src/assets/`
3. Конвертируйте в WebP формат
4. Сохраните с тем же именем, но расширением `.webp`

### Вариант 2: Используя командную строку (ImageMagick)
```bash
# Установите ImageMagick (если еще не установлен)
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Конвертируйте изображения
cd src/assets
magick convert alexandra-portrait.jpg -quality 85 alexandra-portrait.webp
magick convert brush-accent-1.png -quality 85 brush-accent-1.webp
magick convert brush-accent-2.png -quality 85 brush-accent-2.webp
magick convert brush-stroke.jpg -quality 85 brush-stroke.webp
magick convert n-pattern.png -quality 85 n-pattern.webp
```

### Вариант 3: Используя Node.js (Sharp)
```bash
npm install sharp

# Создайте скрипт convert-images.js:
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = './src/assets';
const files = fs.readdirSync(assetsDir);

files.forEach(file => {
  if (/\.(jpg|jpeg|png)$/i.test(file)) {
    const input = path.join(assetsDir, file);
    const output = path.join(assetsDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    sharp(input)
      .webp({ quality: 85 })
      .toFile(output)
      .then(() => console.log(`✓ ${file} → ${path.basename(output)}`))
      .catch(err => console.error(`✗ ${file}:`, err));
  }
});

# Запустите скрипт:
node convert-images.js
```

## Рекомендации по качеству WebP

- **Фотографии** (alexandra-portrait.jpg): качество 80-85
- **Декоративные элементы** (brush-accent): качество 75-80
- **Фоновые паттерны** (n-pattern): качество 70-75

## Дополнительные оптимизации

### Размеры изображений
Создайте несколько версий изображений для разных устройств:

```bash
# Для портрета (alexandra-portrait.jpg)
magick convert alexandra-portrait.jpg -resize 640x -quality 85 alexandra-portrait-640.webp
magick convert alexandra-portrait.jpg -resize 1024x -quality 85 alexandra-portrait-1024.webp
magick convert alexandra-portrait.jpg -resize 1920x -quality 85 alexandra-portrait-1920.webp
```

Затем обновите компонент для использования srcset:
```tsx
<OptimizedImage
  src={alexandraPortrait}
  alt="Александра Моисеева"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
  srcSet="
    /assets/alexandra-portrait-640.webp 640w,
    /assets/alexandra-portrait-1024.webp 1024w,
    /assets/alexandra-portrait-1920.webp 1920w
  "
/>
```

## Измерение результатов

Проверьте производительность с помощью:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Chrome DevTools → Lighthouse

Ожидаемые улучшения:
- **Уменьшение размера изображений**: 30-50%
- **Улучшение LCP** (Largest Contentful Paint): 20-40%
- **Экономия трафика**: 200-500 KB на загрузку страницы
