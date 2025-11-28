/**
 * Preload critical images to improve LCP (Largest Contentful Paint)
 * Call this function early in the app lifecycle
 */
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/src/assets/alexandra-portrait.webp',
    '/src/assets/alexandra-portrait.jpg',
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    
    // Set appropriate type based on extension
    if (src.endsWith('.webp')) {
      link.type = 'image/webp';
    } else if (src.endsWith('.jpg') || src.endsWith('.jpeg')) {
      link.type = 'image/jpeg';
    } else if (src.endsWith('.png')) {
      link.type = 'image/png';
    }
    
    document.head.appendChild(link);
  });
};

/**
 * Check if WebP is supported by the browser
 */
export const checkWebPSupport = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};
