// app/api/debug-env/route.js
export async function GET(request) {
  const headers = Object.fromEntries(request.headers.entries())

  return Response.json({
    // Environment info
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),

    // API Key info (without exposing the actual key)
    hasGoogleApiKey: !!process.env.GOOGLE_PLACES_API_KEY,
    apiKeyLength: process.env.GOOGLE_PLACES_API_KEY?.length || 0,
    apiKeyPrefix: process.env.GOOGLE_PLACES_API_KEY?.substring(0, 10) || 'NONE',

    // Request info
    requestInfo: {
      host: headers.host,
      origin: headers.origin,
      userAgent: headers['user-agent']?.substring(0, 50) + '...',
      referer: headers.referer,
    },

    // Other relevant env vars (add as needed)
    hasRedisUrl: !!process.env.REDIS_URL,

    // Warnings
    warnings: [
      ...(process.env.NODE_ENV === 'production'
        ? ['This endpoint should be removed in production']
        : []),
      ...(!process.env.GOOGLE_PLACES_API_KEY
        ? ['GOOGLE_PLACES_API_KEY environment variable is missing']
        : []),
      ...(process.env.GOOGLE_PLACES_API_KEY &&
      process.env.GOOGLE_PLACES_API_KEY.length < 30
        ? ['GOOGLE_PLACES_API_KEY appears to be invalid (too short)']
        : []),
    ].filter(Boolean),
  })
}
