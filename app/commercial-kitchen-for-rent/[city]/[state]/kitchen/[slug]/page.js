// app/commercial-kitchen-for-rent/[city]/[state]/kitchen/[slug]/page.js
import { notFound } from 'next/navigation'
import KitchenDetail from '@/component/KitchenDetail'
import { normalizeKitchenData, getBestPlaceId } from '@/utils/dataUtils'

function capitalizeCityName(cityName) {
  if (!cityName || typeof cityName !== 'string') {
    return ''
  }

  return cityName
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Server-side function to fetch Google Places data
async function fetchGooglePlaceDetails(placeId) {
  if (!placeId) {
    console.log('❌ No place ID provided for server-side fetch')
    return null
  }

  try {
    console.log('🚀 Server-side fetching Google Places data for:', placeId)

    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    if (!apiKey) {
      console.error('❌ No Google Places API key available on server')
      return null
    }

    const fields = [
      'id',
      'displayName',
      'formattedAddress',
      'location',
      'rating',
      'userRatingCount',
      'priceLevel',
      'types',
      'businessStatus',
      'currentOpeningHours',
      'regularOpeningHours',
      'nationalPhoneNumber',
      'internationalPhoneNumber',
      'websiteUri',
      'googleMapsUri',
      'editorialSummary',
      'reviews',
      'photos',
    ].join(',')

    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(
      placeId
    )}`

    console.log('📡 Server-side API call to Google Places...')

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fields,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Server-side Google Places API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        placeId: placeId,
      })
      return null
    }

    const data = await response.json()

    console.log('✅ Server-side Google Places fetch successful:', {
      displayName: data.displayName?.text,
      hasReviews: !!data.reviews,
      reviewsCount: data.reviews?.length || 0,
      hasPhotos: !!data.photos,
      photosCount: data.photos?.length || 0,
    })

    // Process photos to create usable URLs
    if (data.photos && data.photos.length > 0) {
      data.photos = data.photos
        .map((photo, index) => {
          if (!photo.name) {
            console.warn(`📸 Photo ${index + 1} missing name field`)
            return null
          }

          return {
            ...photo,
            url: `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxWidthPx=800`,
            urlLarge: `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxWidthPx=1600`,
            urlSmall: `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxWidthPx=400`,
            photoName: photo.name,
          }
        })
        .filter(Boolean)
    }

    return data
  } catch (error) {
    console.error('💥 Server-side Google Places fetch error:', error)
    return null
  }
}

// Server-side function to fetch kitchen data directly from files
async function fetchKitchenData(slug) {
  try {
    console.log('🍳 Loading kitchen data directly for slug:', slug)
    
    const fs = await import('fs')
    const path = await import('path')
    
    const dataDir = path.join(process.cwd(), 'data')
    const cityFolders = fs.readdirSync(dataDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    // Search through all cities for the kitchen
    for (const cityFolder of cityFolders) {
      try {
        const cityDataPath = path.join(dataDir, cityFolder, 'data.json')
        if (!fs.existsSync(cityDataPath)) continue
        
        const rawData = fs.readFileSync(cityDataPath, 'utf8')
        const cityData = JSON.parse(rawData)
        
        // Get kitchens array
        let kitchens = []
        if (Array.isArray(cityData)) {
          kitchens = cityData
        } else if (cityData.kitchens && Array.isArray(cityData.kitchens)) {
          kitchens = cityData.kitchens
        }
        
        // Look for kitchen with matching slug
        const kitchen = kitchens.find(k => {
          const kitchenSlug = generateSlug(k.title || k.name)
          return kitchenSlug === slug
        })
        
        if (kitchen) {
          console.log(`✅ Found kitchen "${kitchen.title}" in ${cityFolder}`)
          return {
            ...kitchen,
            foundInCity: cityFolder,
            state: cityData.state
          }
        }
      } catch (cityError) {
        console.warn(`⚠️ Error processing city ${cityFolder}:`, cityError.message)
      }
    }
    
    console.log(`❌ Kitchen not found for slug: ${slug}`)
    return null
    
  } catch (error) {
    console.error('💥 Kitchen data fetch error:', error)
    return null
  }
}

// Helper function to generate URL-friendly slug from a name
function generateSlug(name) {
  if (!name) return 'unknown-kitchen'

  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Allow dynamic routes that aren't in generateStaticParams
export const dynamicParams = true

// Generate static params to prevent invalid route generation
export async function generateStaticParams() {
  const staticParams = []
  
  try {
    const fs = await import('fs')
    const path = await import('path')
    
    const dataDir = path.join(process.cwd(), 'data')
    
    if (!fs.existsSync(dataDir)) {
      console.warn('❌ Data directory not found for generateStaticParams')
      return []
    }
    
    const cityFolders = fs.readdirSync(dataDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    
    for (const cityFolder of cityFolders) {
      try {
        const cityDataPath = path.join(dataDir, cityFolder, 'data.json')
        
        if (!fs.existsSync(cityDataPath)) continue
        
        const rawData = fs.readFileSync(cityDataPath, 'utf8')
        const cityData = JSON.parse(rawData)
        
        // Extract city and state info
        const city = (cityData.city || cityFolder).toLowerCase().replace(/\s+/g, '-')
        const state = (cityData.state || 'ca').toLowerCase()
        
        // Get kitchens array from various possible structures
        let kitchens = []
        if (Array.isArray(cityData)) {
          kitchens = cityData
        } else if (cityData.kitchens && Array.isArray(cityData.kitchens)) {
          kitchens = cityData.kitchens
        } else if (cityData.data && Array.isArray(cityData.data)) {
          kitchens = cityData.data
        } else if (cityData.results && Array.isArray(cityData.results)) {
          kitchens = cityData.results
        }
        
        // Generate params for each kitchen
        for (const kitchen of kitchens) {
          const slug = kitchen.slug || generateSlug(
            kitchen.title || kitchen.name || kitchen.displayName?.text
          )
          
          if (slug && slug !== 'unknown-kitchen') {
            staticParams.push({
              city,
              state,
              slug
            })
          }
        }
        
      } catch (error) {
        console.warn(`⚠️ Error processing ${cityFolder} in generateStaticParams:`, error.message)
      }
    }
    
    console.log(`✅ Generated ${staticParams.length} static params for kitchen pages`)
    return staticParams
    
  } catch (error) {
    console.error('❌ Error in generateStaticParams:', error)
    return []
  }
}

// Generate metadata for SEO - FIXED: await params properly
export async function generateMetadata({ params }) {
  // FIXED: Await params first, then destructure
  const { slug, city, state } = await params

  if (!slug) {
    return {
      title: 'Kitchen Not Found',
      description: 'The requested kitchen could not be found.',
    }
  }

  const kitchen = await fetchKitchenData(slug)

  if (!kitchen || kitchen.error) {
    return {
      title: 'Kitchen Not Found',
      description: 'The requested kitchen could not be found.',
    }
  }

  const kitchenName = kitchen.title || kitchen.name || 'Commercial Kitchen'

  // Use URL params for city/state, but fallback to kitchen data
  const cityName = city ? city.replace(/-/g, ' ') : kitchen.city
  const stateName = state ? state.toUpperCase() : kitchen.state
  const formattedCity = capitalizeCityName(cityName)
  const location = `${formattedCity}, ${stateName}`

  // Enhanced SEO metadata
  const enhancedDescription = kitchen.description || 
    `Rent ${kitchenName}, a fully equipped commercial kitchen in ${location}. Features commercial-grade equipment, flexible hourly rates, and meets all health department requirements. Perfect for food startups, catering businesses, and meal prep entrepreneurs.`

  const longTailKeywords = [
    `${kitchenName} commercial kitchen`,
    `kitchen rental ${formattedCity} ${stateName}`, 
    `shared use kitchen ${formattedCity}`,
    `commercial kitchen space ${location}`,
    `food business kitchen rental`,
    `commissary kitchen ${formattedCity}`,
    `ghost kitchen ${location}`,
    `food startup kitchen`,
    `catering kitchen rental`
  ].join(', ')

  return {
    title: `${kitchenName} | Commercial Kitchen Rental in ${location} - $25/hr`,
    description: enhancedDescription.length > 155 ? 
      enhancedDescription.substring(0, 152) + '...' : 
      enhancedDescription,
    keywords: longTailKeywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'business.business',
      title: `${kitchenName} - Commercial Kitchen Rental ${location}`,
      description: enhancedDescription,
      url: `https://sharedkitchenlocator.com/commercial-kitchen-for-rent/${city}/${state}/kitchen/${slug}`,
      siteName: 'Shared Kitchen Locator',
      locale: 'en_US',
      images: kitchen.imageUrl ? [{
        url: kitchen.imageUrl,
        width: 800,
        height: 600,
        alt: `${kitchenName} commercial kitchen interior in ${location}`,
        type: 'image/jpeg',
      }] : [{
        url: 'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg',
        width: 800,
        height: 600,
        alt: `Commercial kitchen for rent in ${location}`,
        type: 'image/jpeg',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sharedkitchens',
      title: `${kitchenName} - Commercial Kitchen Rental ${location}`,
      description: enhancedDescription,
      images: kitchen.imageUrl ? [kitchen.imageUrl] : [
        'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg'
      ],
    },
    alternates: {
      canonical: `https://sharedkitchenlocator.com/commercial-kitchen-for-rent/${city}/${state}/kitchen/${slug}`,
    },
    other: {
      'business:contact_data:locality': formattedCity,
      'business:contact_data:region': stateName,
      'business:contact_data:country_name': 'United States',
      'business:contact_data:phone_number': kitchen.phone || '',
      'business:contact_data:website': kitchen.website || kitchen.site || '',
    },
  }
}

// Main page component (Server Component) - FIXED: await params properly
export default async function CommercialKitchenDetailPage({ params }) {
  // FIXED: Await params first, then destructure
  const { slug, city, state } = await params

  console.log('🏠 CommercialKitchenDetailPage called with params:', {
    slug,
    city,
    state,
  })

  if (!slug) {
    console.error('❌ No slug provided in params')
    return (
      <div className="container max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error: Missing Kitchen Information
        </h1>
        <p className="text-gray-600">
          No kitchen identifier was provided in the URL.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Expected format:
          /commercial-kitchen-for-rent/city/state/kitchen/kitchen-slug
        </p>
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="text-sm">
            <strong>Received params:</strong>{' '}
            {JSON.stringify({ slug, city, state })}
          </p>
          <p className="text-sm">
            <strong>URL should be:</strong>{' '}
            /commercial-kitchen-for-rent/los-angeles/ca/kitchen/onkitchens
          </p>
        </div>
      </div>
    )
  }

  console.log('🏠 Rendering kitchen detail page for:', {
    slug,
    city,
    state,
  })

  // Fetch kitchen data
  const rawKitchen = await fetchKitchenData(slug)

  if (!rawKitchen || rawKitchen.error) {
    console.log('❌ Kitchen not found for slug:', slug)
    console.log('❌ Error details:', rawKitchen)
    notFound()
  }

  // Normalize kitchen data
  const kitchen = normalizeKitchenData(rawKitchen)
  const placeId = getBestPlaceId(kitchen)

  // Add URL params to kitchen data for context
  kitchen.urlCity = city
  kitchen.urlState = state

  // Fetch Google Places data server-side
  let googlePlacesData = null
  if (placeId) {
    googlePlacesData = await fetchGooglePlaceDetails(placeId)
  } else {
    console.log('⚠️ No valid place ID found, skipping Google Places fetch')
  }

  console.log('📊 SSR Data Summary:', {
    hasKitchen: !!kitchen,
    kitchenName: kitchen.name,
    foundInCity: kitchen.city,
    urlCity: city,
    urlState: state,
    hasGoogleData: !!googlePlacesData,
    hasReviews: !!googlePlacesData?.reviews?.length,
    reviewsCount: googlePlacesData?.reviews?.length || 0,
  })

  // Format city and state for display
  const cityName = city ? city.replace(/-/g, ' ') : kitchen.city
  const stateName = state ? state.toUpperCase() : kitchen.state
  const formattedCity = capitalizeCityName(cityName)

  return (
    <>
      {/* Enhanced Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'FoodEstablishment', 'Place'],
            '@id': `https://sharedkitchenlocator.com/commercial-kitchen-for-rent/${city}/${state}/kitchen/${slug}`,
            name: kitchen.name,
            description: kitchen.description ||
              `Professional commercial kitchen space for rent at ${kitchen.name} in ${formattedCity}, ${stateName}. Fully equipped with commercial-grade appliances, perfect for food entrepreneurs, catering businesses, and meal prep companies.`,
            url: `https://sharedkitchenlocator.com/commercial-kitchen-for-rent/${city}/${state}/kitchen/${slug}`,
            image: kitchen.imageUrl || 'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg',
            address: {
              '@type': 'PostalAddress',
              streetAddress: kitchen.address || kitchen.street,
              addressLocality: formattedCity,
              addressRegion: stateName,
              postalCode: kitchen.postalCode,
              addressCountry: 'US'
            },
            telephone: kitchen.phone,
            sameAs: kitchen.website || kitchen.site,
            priceRange: '$25-$45',
            category: ['Commercial Kitchen', 'Shared Kitchen', 'Food Service'],
            businessType: 'Commercial Kitchen Rental',
            aggregateRating: kitchen.rating || kitchen.totalScore
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: kitchen.rating || kitchen.totalScore,
                  reviewCount: kitchen.reviewCount || kitchen.reviewsCount || 0,
                  bestRating: 5,
                  worstRating: 1,
                }
              : undefined,
            geo: googlePlacesData?.location || kitchen.location
              ? {
                  '@type': 'GeoCoordinates',
                  latitude: googlePlacesData?.location?.latitude || kitchen.location?.lat,
                  longitude: googlePlacesData?.location?.longitude || kitchen.location?.lng,
                }
              : undefined,
            openingHours: kitchen.openingHours?.map(hour => 
              `${hour.day} ${hour.hours}`
            ) || ['Mo-Su 06:00-22:00'],
            amenityFeature: [
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Commercial Kitchen Equipment',
                value: true
              },
              {
                '@type': 'LocationFeatureSpecification', 
                name: 'Food Storage',
                value: true
              },
              {
                '@type': 'LocationFeatureSpecification',
                name: 'Health Department Certified',
                value: true
              }
            ],
            offers: {
              '@type': 'Offer',
              category: 'Commercial Kitchen Rental',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '25.00',
                priceCurrency: 'USD',
                unitCode: 'HUR'
              },
              availability: 'https://schema.org/InStock',
              validFrom: new Date().toISOString(),
              seller: {
                '@type': 'Organization',
                name: kitchen.name
              }
            }
          }),
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What are the rental rates at ${kitchen.name}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `${kitchen.name} offers flexible rental options including hourly, daily, and monthly rates. Rates typically range from $25-45/hour depending on the time of day and duration of rental.`
                }
              },
              {
                '@type': 'Question', 
                name: `What equipment is included in the rental?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `The kitchen includes commercial-grade equipment such as gas ranges, convection ovens, refrigeration units, prep tables, and cleaning stations. All equipment meets health department standards.`
                }
              },
              {
                '@type': 'Question',
                name: `Do I need special permits to use this commercial kitchen?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Yes, you'll need a business license, food handler's permit, and potentially other permits depending on your food business type. The health department requires all users to have current certifications.`
                }
              }
            ]
          }),
        }}
      />

      {/* Pass SSR data to client component */}
      <KitchenDetail
        kitchen={kitchen}
        initialGoogleData={googlePlacesData}
        cityFromUrl={formattedCity}
        stateFromUrl={stateName}
      />
    </>
  )
}
