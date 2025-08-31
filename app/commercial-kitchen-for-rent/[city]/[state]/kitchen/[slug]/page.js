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

// Server-side function to fetch kitchen data
async function fetchKitchenData(slug) {
  try {
    console.log('🍳 Fetching kitchen data for slug:', slug)

    // Use absolute URL for server-side fetch
    const baseUrl = process.env.BASE_URL
      ? `https://${process.env.BASE_URL}`
      : 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/api/kitchens/${slug}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error('❌ Kitchen data fetch failed:', response.status)
      const errorData = await response.json().catch(() => ({}))
      console.log('📋 API Error Details:', errorData)
      return null
    }

    const kitchen = await response.json()
    console.log(
      '✅ Kitchen data fetched successfully:',
      kitchen.name || kitchen.title
    )

    return kitchen
  } catch (error) {
    console.error('💥 Kitchen data fetch error:', error)
    return null
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

  return {
    title: `${kitchenName} - Commercial Kitchen for Rent in ${location}`,
    description:
      kitchen.description ||
      `Professional commercial kitchen space for rent at ${kitchenName} in ${location}. View details, photos, reviews, and contact information.`,
    keywords: `commercial kitchen for rent, ${formattedCity}, ${stateName}, food business, catering kitchen, rental kitchen, ${kitchenName}`,
    openGraph: {
      title: `${kitchenName} - Commercial Kitchen for Rent in ${location}`,
      description:
        kitchen.description ||
        `Professional commercial kitchen for rent in ${location}`,
      images: kitchen.imageUrl ? [{ url: kitchen.imageUrl }] : [],
      url: `https://sharedkitchenlocator.com/commercial-kitchen-for-rent/${city}/${state}/kitchen/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${kitchenName} - Commercial Kitchen for Rent in ${location}`,
      description:
        kitchen.description ||
        `Professional commercial kitchen for rent in ${location}`,
      images: kitchen.imageUrl ? [kitchen.imageUrl] : [],
    },
    alternates: {
      canonical: `https://sharedkitchenlocator.com/commercial-kitchen-for-rent/${city}/${state}/kitchen/${slug}`,
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
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FoodEstablishment',
            '@id': `/commercial-kitchen-for-rent/${city}/${state}/kitchen/${slug}`,
            name: kitchen.name,
            description:
              kitchen.description ||
              `Commercial kitchen for rent in ${formattedCity}, ${stateName}`,
            url: `/commercial-kitchen-for-rent/${city}/${state}/kitchen/${slug}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: kitchen.address,
              addressLocality: formattedCity,
              addressRegion: stateName,
            },
            telephone: kitchen.phone,
            sameAs: kitchen.website || kitchen.site,
            image: kitchen.imageUrl,
            priceRange: '$$',
            aggregateRating: kitchen.rating
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: kitchen.rating,
                  reviewCount: kitchen.reviewCount || 0,
                  bestRating: 5,
                  worstRating: 1,
                }
              : undefined,
            geo: googlePlacesData?.location
              ? {
                  '@type': 'GeoCoordinates',
                  latitude: googlePlacesData.location.latitude,
                  longitude: googlePlacesData.location.longitude,
                }
              : undefined,
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
