'use client'

import { useEffect, useRef } from 'react'

const AdSenseAd = ({ 
  adClient = 'ca-pub-2967132781692430', 
  adSlot = '9128699685',
  adFormat = 'auto',
  style = {},
  className = 'adsbygoogle'
}) => {
  const adRef = useRef(null)
  const isAdLoaded = useRef(false)

  useEffect(() => {
    // Only load ad once and check if element already has ads
    if (isAdLoaded.current || !adRef.current) return

    try {
      // Check if this element already has ads loaded
      const hasAds = adRef.current.innerHTML.trim() !== ''
      
      if (!hasAds && typeof window !== 'undefined' && window.adsbygoogle) {
        // Mark as loading to prevent duplicate attempts
        isAdLoaded.current = true
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          try {
            window.adsbygoogle.push({})
          } catch (err) {
            console.error('AdSense push error:', err)
            isAdLoaded.current = false // Reset on error
          }
        }, 100)
      }
    } catch (err) {
      console.error('AdSense error:', err)
      isAdLoaded.current = false
    }
  }, [])

  return (
    <ins
      ref={adRef}
      className={`${className} block`}
      style={{
        display: 'block',
        ...style
      }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  )
}

export default AdSenseAd