// app/api/google-place-details/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { placeId } = await request.json()

    console.log('=== Google Place Details API Called ===')
    console.log('Environment:', process.env.NODE_ENV)
    console.log('Place ID:', placeId)
    console.log(
      'Request headers:',
      Object.fromEntries(request.headers.entries())
    )

    // Validate input
    if (!placeId) {
      console.error('❌ No place ID provided')
      return NextResponse.json(
        {
          success: false,
          error: 'Place ID is required',
        },
        { status: 400 }
      )
    }

    // Validate place ID format
    if (typeof placeId !== 'string' || placeId.length < 10) {
      console.error('❌ Invalid place ID format:', placeId)
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid place ID format',
        },
        { status: 400 }
      )
    }

    // Get API key from environment
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    console.log('🔑 API key check:', {
      exists: !!apiKey,
      length: apiKey?.length || 0,
      preview: apiKey?.substring(0, 15) + '...' || 'UNDEFINED',
      environment: process.env.NODE_ENV,
    })

    if (!apiKey) {
      console.error('❌ No API key found')
      return NextResponse.json(
        {
          success: false,
          error: 'Google Places API key not configured',
        },
        { status: 500 }
      )
    }

    if (apiKey.length < 30) {
      console.error('❌ API key too short:', apiKey.length)
      return NextResponse.json(
        {
          success: false,
          error: 'Google Places API key appears invalid',
        },
        { status: 500 }
      )
    }

    // Define the fields we want to retrieve
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
      'accessibilityOptions',
      'paymentOptions',
      'parkingOptions',
      'outdoorSeating',
      'takeout',
      'delivery',
      'dineIn',
      'reservable',
      'servesBreakfast',
      'servesLunch',
      'servesDinner',
      'servesBeer',
      'servesWine',
      'servesVegetarianFood',
    ].join(',')

    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(
      placeId
    )}`

    console.log('🌐 Making request to Google Places API:', url)
    console.log('🔍 Requested fields:', fields)

    const requestHeaders = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fields,
    }

    console.log('📡 Request headers (API key hidden):', {
      ...requestHeaders,
      'X-Goog-Api-Key': '[HIDDEN]',
    })

    const response = await fetch(url, {
      method: 'GET',
      headers: requestHeaders,
    })

    console.log('📡 Google Places API response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Google Places API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        placeId: placeId,
      })

      // Try to parse error for better messaging
      let errorMessage = `Google Places API error: ${response.status}`
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.error?.message) {
          errorMessage = errorJson.error.message
        }
      } catch (e) {
        // Use the raw error text if JSON parsing fails
        if (errorText) {
          errorMessage = errorText
        }
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          details: {
            status: response.status,
            statusText: response.statusText,
            placeId: placeId,
          },
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('✅ Successfully fetched place details:', {
      displayName: data.displayName?.text,
      hasReviews: !!data.reviews,
      reviewsCount: data.reviews?.length || 0,
      hasPhotos: !!data.photos,
      photosCount: data.photos?.length || 0,
      rating: data.rating,
      userRatingCount: data.userRatingCount,
    })

    // Process photos to create usable URLs
    if (data.photos && data.photos.length > 0) {
      console.log('📸 Processing', data.photos.length, 'photos')

      data.photos = data.photos
        .map((photo, index) => {
          if (!photo.name) {
            console.warn(`📸 Photo ${index + 1} missing name field:`, photo)
            return null
          }

          console.log(`📸 Processing photo ${index + 1}:`, photo.name)

          const processedPhoto = {
            ...photo,
            // Generate URLs with API key
            url: `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxWidthPx=800`,
            urlLarge: `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxWidthPx=1600`,
            urlSmall: `https://places.googleapis.com/v1/${photo.name}/media?key=${apiKey}&maxWidthPx=400`,
            photoName: photo.name,
          }

          // Log the generated URL (with hidden API key for security)
          console.log(
            `📸 Generated URL for photo ${index + 1}:`,
            processedPhoto.url.replace(apiKey, '[API_KEY_HIDDEN]')
          )

          return processedPhoto
        })
        .filter(Boolean) // Remove any null photos

      console.log('📸 Successfully processed', data.photos.length, 'photos')
    } else {
      console.log('📸 No photos found for this place')
    }

    // Log review information
    if (data.reviews && data.reviews.length > 0) {
      console.log('⭐ Reviews found:', {
        count: data.reviews.length,
        sampleReview: {
          rating: data.reviews[0]?.rating,
          author: data.reviews[0]?.authorAttribution?.displayName,
          hasText: !!data.reviews[0]?.text?.text,
          timeDescription: data.reviews[0]?.relativePublishTimeDescription,
        },
      })
    } else {
      console.log('⭐ No reviews found for this place')
    }

    // Return the place data
    const responseData = {
      success: true,
      place: data,
      fetchedAt: new Date().toISOString(),
      placeId: placeId,
    }

    console.log('📤 Returning successful response with place data')

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('💥 Error in place details API:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

// Add GET method for testing
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const placeId = searchParams.get('placeId')

  if (placeId) {
    // If a placeId is provided in query params, call the POST method
    return POST(
      new Request(request.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeId }),
      })
    )
  }

  return NextResponse.json(
    {
      message: 'Google Place Details API',
      usage: {
        post: 'Send POST request with {"placeId": "your_place_id"}',
        get: 'Send GET request with ?placeId=your_place_id',
      },
      environment: process.env.NODE_ENV,
      hasApiKey: !!process.env.GOOGLE_PLACES_API_KEY,
    },
    { status: 200 }
  )
}
