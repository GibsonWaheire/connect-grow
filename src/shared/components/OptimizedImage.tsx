import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  fallback = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=64&h=64&fit=crop&crop=center'
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300 rounded object-cover',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};
