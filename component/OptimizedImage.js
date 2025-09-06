'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

// Convert Google Places image URL to a more reliable format
function optimizeGooglePlacesUrl(url) {
  if (!url || typeof url !== 'string') return null
  
  // Handle different Google Places image URL formats
  if (url.includes('gps-cs-s')) {
    // Try to extract a more stable URL format
    // These URLs are often problematic due to authentication requirements
    return null // Force fallback for these URLs
  }
  
  if (url.includes('lh3.googleusercontent.com/p/') || 
      url.includes('lh4.googleusercontent.com/p/') ||
      url.includes('lh5.googleusercontent.com/p/') ||
      url.includes('lh6.googleusercontent.com/p/')) {
    // These are more stable Google Places URLs
    return url
  }
  
  return url
}

const OptimizedImage = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  fallbackSrc = null,
  showFallbackIcon = true,
  objectFit = 'cover',
  priority = false,
  ...props
}) => {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const retryCount = useRef(0)

  const optimizedSrc = optimizeGooglePlacesUrl(src)
  const shouldUseFallback = imageError || !optimizedSrc

  const handleError = () => {
    console.warn('Image failed to load:', src)
    
    // Try once more with original URL if optimization failed
    if (retryCount.current === 0 && !optimizedSrc && src) {
      retryCount.current++
      setImageError(false)
      setTimeout(() => setImageError(true), 1000) // Retry after delay
      return
    }
    
    setImageError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // Fallback content
  if (shouldUseFallback) {
    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          style={{ objectFit }}
          onError={() => setImageError(true)}
          {...props}
        />
      )
    }

    if (showFallbackIcon) {
      return (
        <div 
          className={`${className} bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center`}
          {...props}
        >
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🏢</div>
            <div className="text-sm">Kitchen Image</div>
          </div>
        </div>
      )
    }

    return null
  }

  // Use Next.js Image component for optimization
  return (
    <div className={`relative ${className.includes('w-full') ? 'w-full' : ''} ${className.includes('h-') ? className.match(/h-\w+/)?.[0] || '' : ''}`}>
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
        >
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
      
      <Image
        src={optimizedSrc || src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ objectFit }}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={optimizedSrc === null} // Fallback to unoptimized for problematic URLs
        {...props}
      />
    </div>
  )
}

export default OptimizedImage