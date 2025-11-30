import { ImgHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  responsive?: boolean; // Auto-generate responsive srcset
}

/**
 * Optimized image component with lazy loading, WebP support, and responsive srcset
 * 
 * Features:
 * - Automatic WebP format with fallback to original format
 * - Lazy loading for non-critical images (improves initial page load)
 * - Responsive images with srcset and sizes attributes
 * - Fade-in animation when image loads
 * - Error handling with graceful fallback
 * 
 * @example
 * <OptimizedImage
 *   src={myImage}
 *   alt="Description"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   priority // Use for above-the-fold images
 * />
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  sizes,
  srcSet,
  responsive = false,
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate WebP version path (if original is jpg/png)
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebpVersion = /\.(jpg|jpeg|png)$/i.test(src);

  // Generate responsive srcSet for different screen densities if responsive is enabled
  const responsiveSrcSet = responsive && !srcSet
    ? `${src} 1x, ${src} 2x`
    : srcSet;

  // Generate WebP srcSet if regular srcSet is provided
  const webpSrcSet = responsiveSrcSet ? responsiveSrcSet.replace(/\.(jpg|jpeg|png)/gi, '.webp') : undefined;

  return (
    <picture>
      {hasWebpVersion && (
        <source 
          srcSet={webpSrcSet || webpSrc}
          type="image/webp"
          sizes={sizes}
        />
      )}
      <img
        src={src}
        srcSet={responsiveSrcSet}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          hasError && 'hidden',
          className
        )}
        sizes={sizes}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
