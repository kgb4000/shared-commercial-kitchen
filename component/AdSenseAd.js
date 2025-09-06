'use client'

import { useEffect, useRef, useState } from 'react'

const AdSenseAd = ({ 
  adClient = 'ca-pub-2967132781692430', 
  adSlot = '9128699685',
  adFormat = 'auto',
  style = {},
  className = 'adsbygoogle',
  showDebug = false
}) => {
  const adRef = useRef(null)
  const isAdLoaded = useRef(false)
  const [debugInfo, setDebugInfo] = useState('')
  const [adStatus, setAdStatus] = useState('initializing')

  useEffect(() => {
    const loadAd = async () => {
      setDebugInfo('Starting ad load process...')
      
      // Only load ad once and check if element already has ads
      if (isAdLoaded.current || !adRef.current) {
        setDebugInfo('Ad already loaded or element not ready')
        return
      }

      try {
        // Check if this element already has ads loaded
        const hasAds = adRef.current.innerHTML.trim() !== ''
        setDebugInfo(`Element innerHTML check: ${hasAds ? 'has content' : 'empty'}`)
        
        if (!hasAds && typeof window !== 'undefined') {
          // Check if AdSense script is loaded
          if (!window.adsbygoogle) {
            setDebugInfo('AdSense script not loaded yet, waiting...')
            setAdStatus('waiting_for_script')
            
            // Wait for script to load with timeout
            let attempts = 0
            const checkScript = setInterval(() => {
              attempts++
              if (window.adsbygoogle) {
                clearInterval(checkScript)
                setDebugInfo('AdSense script loaded, initializing ad...')
                initializeAd()
              } else if (attempts > 50) { // 5 seconds timeout
                clearInterval(checkScript)
                setDebugInfo('AdSense script failed to load (timeout)')
                setAdStatus('script_load_failed')
              }
            }, 100)
            return
          }
          
          initializeAd()
        }
      } catch (err) {
        console.error('AdSense error:', err)
        setDebugInfo(`Error: ${err.message}`)
        setAdStatus('error')
        isAdLoaded.current = false
      }
    }

    const initializeAd = () => {
      try {
        // Mark as loading to prevent duplicate attempts
        isAdLoaded.current = true
        setAdStatus('loading')
        setDebugInfo('Pushing ad to AdSense queue...')
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          try {
            window.adsbygoogle.push({})
            setDebugInfo('Ad pushed to AdSense successfully')
            setAdStatus('loaded')
          } catch (err) {
            console.error('AdSense push error:', err)
            setDebugInfo(`Push error: ${err.message}`)
            setAdStatus('push_failed')
            isAdLoaded.current = false // Reset on error
          }
        }, 100)
      } catch (err) {
        setDebugInfo(`Initialize error: ${err.message}`)
        setAdStatus('init_failed')
        isAdLoaded.current = false
      }
    }

    loadAd()
  }, [])

  return (
    <div>
      <ins
        ref={adRef}
        className={`${className} block`}
        style={{
          display: 'block',
          minHeight: '200px',
          backgroundColor: adStatus === 'loaded' ? 'transparent' : '#f8f9fa',
          border: showDebug ? '1px dashed #ccc' : 'none',
          ...style
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      
      {/* Debug information */}
      {showDebug && (
        <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-100 rounded">
          <div><strong>Status:</strong> {adStatus}</div>
          <div><strong>Client:</strong> {adClient}</div>
          <div><strong>Slot:</strong> {adSlot}</div>
          <div><strong>Debug:</strong> {debugInfo}</div>
          <div><strong>Script loaded:</strong> {typeof window !== 'undefined' && window.adsbygoogle ? 'Yes' : 'No'}</div>
        </div>
      )}
      
      {/* Fallback content while ad loads */}
      {adStatus !== 'loaded' && !showDebug && (
        <div className="flex items-center justify-center min-h-[200px] bg-gray-50 border border-gray-200 rounded">
          <div className="text-center text-gray-500">
            <div className="text-sm">Advertisement</div>
            <div className="text-xs mt-1">
              {adStatus === 'loading' ? 'Loading...' : 
               adStatus === 'waiting_for_script' ? 'Initializing...' : 
               'Ad will appear here'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdSenseAd