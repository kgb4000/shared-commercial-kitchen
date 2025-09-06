// lib/rateLimiter.js
import redis from '@/lib/redis'

// Rate limiter configuration
const RATE_LIMITS = {
  'google-places-search': {
    windowMs: 60000, // 1 minute
    maxRequests: 30, // 30 requests per minute
    keyPrefix: 'rl:search',
  },
  'google-place-details': {
    windowMs: 60000, // 1 minute  
    maxRequests: 60, // 60 requests per minute
    keyPrefix: 'rl:details',
  },
}

// Helper function to safely interact with Redis
async function safeRedisOperation(operation, fallback = null) {
  try {
    return await operation()
  } catch (error) {
    console.error('Redis rate limiter operation failed:', error)
    return fallback
  }
}

export async function checkRateLimit(apiType, clientId = 'global') {
  const config = RATE_LIMITS[apiType]
  if (!config) {
    console.warn(`Unknown API type for rate limiting: ${apiType}`)
    return { allowed: true, remaining: 999 }
  }

  const key = `${config.keyPrefix}:${clientId}`
  const window = Math.floor(Date.now() / config.windowMs)
  const windowKey = `${key}:${window}`

  return safeRedisOperation(async () => {
    // Get current count for this window
    const current = await redis.get(windowKey)
    const currentCount = current ? parseInt(current) : 0

    if (currentCount >= config.maxRequests) {
      console.log(`🚫 Rate limit exceeded for ${apiType}:${clientId} (${currentCount}/${config.maxRequests})`)
      return {
        allowed: false,
        remaining: 0,
        resetTime: (window + 1) * config.windowMs,
        limit: config.maxRequests,
      }
    }

    // Increment counter
    const newCount = currentCount + 1
    await redis.setEx(windowKey, Math.ceil(config.windowMs / 1000), newCount.toString())
    
    console.log(`✅ Rate limit check passed for ${apiType}:${clientId} (${newCount}/${config.maxRequests})`)
    
    return {
      allowed: true,
      remaining: config.maxRequests - newCount,
      resetTime: (window + 1) * config.windowMs,
      limit: config.maxRequests,
    }
  }, { allowed: true, remaining: 999 }) // Fallback if Redis fails
}

export function getRateLimitHeaders(rateLimitResult) {
  return {
    'X-RateLimit-Limit': rateLimitResult.limit?.toString() || '999',
    'X-RateLimit-Remaining': rateLimitResult.remaining?.toString() || '999',
    'X-RateLimit-Reset': rateLimitResult.resetTime?.toString() || '0',
  }
}