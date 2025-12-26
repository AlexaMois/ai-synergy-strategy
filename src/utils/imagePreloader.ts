import alexandraHeadshot from '@/assets/alexandra-headshot.png';

/**
 * Preload critical images to improve LCP (Largest Contentful Paint)
 * Call this function early in the app lifecycle
 */
export const preloadCriticalImages = () => {
  // Critical above-the-fold images
  const criticalImages = [
    alexandraHeadshot,
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    
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

/**
 * Lazy load images with Intersection Observer
 */
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }
};
