import { ImgHTMLAttributes, useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  useWebP?: boolean;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
}

/**
 * Optimized image component with lazy loading, blur placeholder, and responsive images
 * 
 * Features:
 * - Native lazy loading for non-critical images
 * - Blur placeholder while loading
 * - Responsive images with srcset and sizes
 * - Fade-in animation when image loads
 * - Error handling with graceful fallback
 * - Explicit width/height to prevent CLS
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  priority = false,
  sizes,
  srcSet,
  useWebP = false,
  width,
  height,
  aspectRatio,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Use Intersection Observer for better lazy loading control
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px 0px', // Start loading 200px before entering viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Generate WebP version path only if explicitly enabled
  const webpSrc = useWebP ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : null;
  const hasWebpVersion = useWebP && /\.(jpg|jpeg|png)$/i.test(src);
  const webpSrcSet = useWebP && srcSet ? srcSet.replace(/\.(jpg|jpeg|png)/gi, '.webp') : undefined;

  // Placeholder styles for aspect ratio container
  const containerStyle = aspectRatio ? { aspectRatio } : undefined;

  return (
    <picture style={containerStyle}>
      {hasWebpVersion && isInView && (
        <source srcSet={webpSrcSet || webpSrc || undefined} type="image/webp" sizes={sizes} />
      )}
      <img 
        ref={imgRef}
        src={isInView ? src : undefined}
        data-src={!isInView ? src : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          hasError && "hidden",
          !isLoaded && !hasError && "bg-muted animate-pulse",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        sizes={sizes}
        srcSet={isInView ? srcSet : undefined}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;