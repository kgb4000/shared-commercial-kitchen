import redis from '@/lib/redis'

// Helper function to safely interact with Redis
async function safeRedisOperation(operation, fallback = null) {
  try {
    return await operation()
  } catch (error) {
    console.error('Redis operation failed:', error)
    return fallback
  }
}

async function getPageToken(query, page) {
  return safeRedisOperation(async () => {
    const key = `token:${query}:${page}`
    const token = await redis.get(key)
    console.log(`🔍 Redis token for ${key}:`, token ? 'Found' : 'Not found')
    return token
  })
}

async function setPageToken(query, page, token) {
  return safeRedisOperation(async () => {
    const key = `token:${query}:${page}`
    await redis.setEx(key, 600, token) // 10 minute expiry
    console.log(`💾 Redis cached token for ${key}`)
    return true
  })
}

async function getTotal(query) {
  return safeRedisOperation(async () => {
    const key = `total:${query}`
    const total = await redis.get(key)
    return total ? parseInt(total) : null
  })
}

async function setTotal(query, total) {
  return safeRedisOperation(async () => {
    const key = `total:${query}`
    await redis.setEx(key, 3600, total.toString()) // 1 hour expiry
    console.log(`💾 Redis cached total ${total} for ${key}`)
    return true
  })
}

export async function POST(request) {
  try {
    const { query, page = 1, pageSize = 20 } = await request.json()

    console.log('🚀 Google Places Search API called:', {
      query,
      page,
      pageSize,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    })

    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      console.error('❌ Invalid query provided:', query)
      return Response.json(
        {
          success: false,
          error: 'Query is required and must be a non-empty string',
        },
        { status: 400 }
      )
    }

    if (page < 1 || pageSize < 1 || pageSize > 20) {
      console.error('❌ Invalid pagination parameters:', { page, pageSize })
      return Response.json(
        {
          success: false,
          error: 'Invalid pagination parameters',
        },
        { status: 400 }
      )
    }

    // Check API key
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    if (!apiKey) {
      console.error('❌ Google Places API key not configured')
      return Response.json(
        {
          success: false,
          error: 'API key not configured',
        },
        { status: 500 }
      )
    }

    const baseQuery = query.toLowerCase().trim()

    // Prepare request body
    let requestBody = {
      textQuery: query,
      maxResultCount: Math.min(pageSize, 20), // Google Places API max is 20
    }

    // Handle pagination with Redis
    if (page > 1) {
      const pageToken = await getPageToken(baseQuery, page - 1)

      if (pageToken) {
        requestBody.pageToken = pageToken
        console.log(`✅ Using Redis page token for page ${page}`)
      } else {
        console.warn(`⚠️ No page token found for page ${page}`)
        return Response.json(
          {
            success: false,
            error: 'Page token not found. Please start from page 1.',
            code: 'TOKEN_NOT_FOUND',
          },
          { status: 400 }
        )
      }
    }

    console.log('📡 Making Google Places API request...')
    console.log('📦 Request body:', JSON.stringify(requestBody, null, 2))

    // *** HERE'S WHERE THE UPDATED FIELD MASK GOES ***
    const response = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          // UPDATED: Added places.location to get coordinates
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.priceLevel,places.businessStatus,places.currentOpeningHours,places.nationalPhoneNumber,places.websiteUri,places.types,places.location,nextPageToken',
        },
        body: JSON.stringify({ query: 'commercial kitchen Dallas' }),
      }
    )

    console.log('📡 Google Places API response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Google Places API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        query: query,
      })

      // Try to parse error for better messaging
      let errorMessage = `Google Places API error: ${response.status}`
      try {
        const errorJson = JSON.parse(errorText)
        if (errorJson.error?.message) {
          errorMessage = errorJson.error.message
        }
      } catch (e) {
        if (errorText) {
          errorMessage = errorText
        }
      }

      return Response.json(
        {
          success: false,
          error: errorMessage,
          details: {
            status: response.status,
            statusText: response.statusText,
            query: query,
          },
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    console.log('✅ Google Places API success:', {
      placesFound: data.places?.length || 0,
      hasNextPageToken: !!data.nextPageToken,
      query: query,
    })

    // Process places to ensure consistent data structure INCLUDING COORDINATES
    const processedPlaces = (data.places || []).map((place) => ({
      ...place,
      // Ensure we have a consistent place ID field
      placeId: place.id,
      // Normalize the display name
      name: place.displayName?.text || 'Unknown Place',
      // Ensure we have all the standard fields
      rating: place.rating || null,
      userRatingCount: place.userRatingCount || 0,
      formattedAddress: place.formattedAddress || '',
      businessStatus: place.businessStatus || 'UNKNOWN',
      // *** EXTRACT COORDINATES FROM THE LOCATION FIELD ***
      latitude: place.location?.latitude || null,
      longitude: place.location?.longitude || null,
      // Keep the original location object for compatibility
      location: place.location || null,
    }))

    // Cache next page token
    if (data.nextPageToken) {
      await setPageToken(baseQuery, page, data.nextPageToken)
    }

    // Handle total estimation - improved logic
    let estimatedTotal = 0
    if (page === 1) {
      const currentPageCount = processedPlaces.length
      if (data.nextPageToken) {
        // If there's a next page token, estimate conservatively
        estimatedTotal = currentPageCount * 2 // Conservative estimate
      } else {
        // No next page, this is the exact total
        estimatedTotal = currentPageCount
      }
      await setTotal(baseQuery, estimatedTotal)
    } else {
      // For subsequent pages, try to get cached total or calculate
      const cachedTotal = await getTotal(baseQuery)
      if (cachedTotal) {
        estimatedTotal = cachedTotal
        // Update estimate if we're getting more results than expected
        const minExpectedTotal = (page - 1) * pageSize + processedPlaces.length
        if (minExpectedTotal > cachedTotal) {
          estimatedTotal = data.nextPageToken
            ? minExpectedTotal + pageSize
            : minExpectedTotal
          await setTotal(baseQuery, estimatedTotal)
        }
      } else {
        // Fallback calculation
        const currentPageCount = processedPlaces.length
        estimatedTotal = data.nextPageToken
          ? page * pageSize + pageSize
          : (page - 1) * pageSize + currentPageCount
      }
    }

    const responseData = {
      success: true,
      places: processedPlaces,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        hasNextPage: !!data.nextPageToken,
        estimatedTotal: estimatedTotal,
        actualResultsThisPage: processedPlaces.length,
      },
      query: query,
      processedAt: new Date().toISOString(),
    }

    console.log('📤 Returning response with coordinates:', {
      success: true,
      placesCount: responseData.places.length,
      hasNextPage: responseData.pagination.hasNextPage,
      estimatedTotal: responseData.pagination.estimatedTotal,
      // Log if we got coordinates
      placesWithCoordinates: responseData.places.filter(
        (p) => p.latitude && p.longitude
      ).length,
    })

    return Response.json(responseData)
  } catch (error) {
    console.error('💥 API Route error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })

    return Response.json(
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
  const query = searchParams.get('query')
  const page = parseInt(searchParams.get('page')) || 1
  const pageSize = parseInt(searchParams.get('pageSize')) || 20

  if (query) {
    // If query parameters are provided, call the POST method
    return POST(
      new Request(request.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, page, pageSize }),
      })
    )
  }

  return Response.json(
    {
      message: 'Google Places Search API with Location Coordinates',
      usage: {
        post: 'Send POST request with {"query": "search term", "page": 1, "pageSize": 20}',
        get: 'Send GET request with ?query=search_term&page=1&pageSize=20',
      },
      environment: process.env.NODE_ENV,
      hasApiKey: !!process.env.GOOGLE_PLACES_API_KEY,
      hasRedis: !!redis,
      fieldsReturned:
        'Now includes latitude and longitude coordinates for each place',
    },
    { status: 200 }
  )
}
