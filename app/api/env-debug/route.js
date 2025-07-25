// app/api/env-access-debug/route.js
export async function GET(request) {
  console.log('=== ENVIRONMENT VARIABLE DEBUG ===')

  // Multiple ways to access the environment variable
  const methods = {
    direct: process.env.GOOGLE_PLACES_API_KEY,
    destructured: process.env['GOOGLE_PLACES_API_KEY'],
    withFallback: process.env.GOOGLE_PLACES_API_KEY || 'NOT_FOUND',
  }

  // Log everything for debugging
  console.log('Environment variable access methods:', methods)
  console.log('All process.env keys:', Object.keys(process.env).sort())
  console.log(
    'Google-related keys:',
    Object.keys(process.env).filter((k) => k.includes('GOOGLE'))
  )

  // Check if the variable exists in different ways
  const checks = {
    inProcessEnv: 'GOOGLE_PLACES_API_KEY' in process.env,
    hasOwnProperty: process.env.hasOwnProperty('GOOGLE_PLACES_API_KEY'),
    typeofCheck: typeof process.env.GOOGLE_PLACES_API_KEY,
    lengthCheck: process.env.GOOGLE_PLACES_API_KEY?.length || 0,
  }

  console.log('Environment variable checks:', checks)

  // Test the exact same logic as your API route
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const isConfigured = !!apiKey && apiKey.length > 30

  console.log('API key configured check:', isConfigured)
  console.log('API key exists:', !!apiKey)
  console.log('API key length:', apiKey?.length || 0)

  return Response.json({
    timestamp: new Date().toISOString(),
    environmentInfo: {
      nodeEnv: process.env.NODE_ENV,
      platform: process.platform,
      awsRegion: process.env.AWS_REGION,
      amplifyAppId: process.env._AMPLIFY_APP_ID,
    },

    // Environment variable analysis
    apiKeyAnalysis: {
      exists: !!apiKey,
      type: typeof apiKey,
      length: apiKey?.length || 0,
      startsWithAIza: apiKey?.startsWith('AIza') || false,
      firstTenChars: apiKey?.substring(0, 10) || 'N/A',
      lastFourChars: apiKey?.slice(-4) || 'N/A',
      isValidLength: (apiKey?.length >= 35 && apiKey?.length <= 45) || false,
    },

    // Different access methods
    accessMethods: methods,
    checks: checks,

    // Simulate your API route logic
    simulateApiLogic: {
      hasApiKey: !!apiKey,
      passesLengthCheck: apiKey && apiKey.length > 30,
      wouldPassValidation: !!(apiKey && apiKey.length > 30),
    },

    // All environment variables (filtered for security)
    allEnvVars: Object.keys(process.env).reduce((acc, key) => {
      if (
        key.includes('KEY') ||
        key.includes('SECRET') ||
        key.includes('PASSWORD')
      ) {
        acc[key] = process.env[key]
          ? `[${process.env[key].length} chars]`
          : 'undefined'
      } else {
        acc[key] = process.env[key] || 'undefined'
      }
      return acc
    }, {}),

    // Debugging recommendations
    recommendations: [
      !apiKey ? '❌ API key not found in environment' : '✅ API key found',
      apiKey && apiKey.length < 30
        ? '⚠️ API key appears too short'
        : apiKey
        ? '✅ API key length looks good'
        : null,
      !apiKey?.startsWith('AIza')
        ? '⚠️ API key should start with "AIza"'
        : apiKey
        ? '✅ API key format looks correct'
        : null,
    ].filter(Boolean),
  })
}

export async function POST(request) {
  // Test the exact same logic as your google-place-details route
  try {
    const { testPlaceId = 'ChIJN1t_tDeuEmsRUsoyG83frY4' } = await request.json()

    console.log('=== TESTING API ROUTE LOGIC ===')

    // Exact same validation as your API route
    if (!process.env.GOOGLE_PLACES_API_KEY) {
      console.error('❌ No API key found in environment')
      return Response.json(
        {
          success: false,
          error: 'Google Places API key not configured',
          debug: {
            hasEnvVar: false,
            envVarType: typeof process.env.GOOGLE_PLACES_API_KEY,
            envVarValue: 'undefined',
          },
        },
        { status: 500 }
      )
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    console.log('✅ API key found, length:', apiKey.length)

    if (apiKey.length < 30) {
      console.error('❌ API key appears invalid (too short)')
      return Response.json(
        {
          success: false,
          error: 'Google Places API key appears invalid',
          debug: {
            hasEnvVar: true,
            keyLength: apiKey.length,
            keyPrefix: apiKey.substring(0, 10),
          },
        },
        { status: 500 }
      )
    }

    console.log('🚀 Making test API call to Google Places...')

    // Make the actual API call
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${testPlaceId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'id,displayName,formattedAddress',
        },
      }
    )

    console.log('📡 Google API response:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Google API error:', errorText)

      return Response.json(
        {
          success: false,
          error: `Google Places API error: ${response.status}`,
          debug: {
            status: response.status,
            statusText: response.statusText,
            responseBody: errorText,
            apiKeyUsed: apiKey.substring(0, 10) + '...',
          },
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('✅ Google API success:', data.displayName?.text)

    return Response.json({
      success: true,
      message: 'API call successful!',
      place: data,
      debug: {
        apiKeyLength: apiKey.length,
        apiKeyPrefix: apiKey.substring(0, 10),
        responseReceived: true,
      },
    })
  } catch (error) {
    console.error('💥 Error in test API route:', error)

    return Response.json(
      {
        success: false,
        error: 'Internal server error',
        debug: {
          errorMessage: error.message,
          errorStack: error.stack,
          hasApiKey: !!process.env.GOOGLE_PLACES_API_KEY,
        },
      },
      { status: 500 }
    )
  }
}
