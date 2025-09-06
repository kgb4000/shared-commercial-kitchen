// lib/requestDeduplication.js
import redis from '@/lib/redis'

// In-memory cache for ongoing requests to prevent duplicate API calls
const ongoingRequests = new Map()

// Helper function to safely interact with Redis
async function safeRedisOperation(operation, fallback = null) {
  try {
    return await operation()
  } catch (error) {
    console.error('Redis deduplication operation failed:', error)
    return fallback
  }
}

// Generate a unique key for the request
function generateRequestKey(apiType, params) {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key]
      return result
    }, {})
  
  return `${apiType}:${JSON.stringify(sortedParams)}`
}

// Check if an identical request is already in progress
export async function checkOngoingRequest(apiType, params) {
  const requestKey = generateRequestKey(apiType, params)
  
  // Check in-memory cache first (fastest)
  if (ongoingRequests.has(requestKey)) {
    console.log(`🔄 Request already in progress (memory): ${requestKey}`)
    return { isOngoing: true, requestKey }
  }
  
  // Check Redis for distributed deduplication
  const isOngoing = await safeRedisOperation(async () => {
    const exists = await redis.exists(`ongoing:${requestKey}`)
    return exists === 1
  }, false)
  
  if (isOngoing) {
    console.log(`🔄 Request already in progress (Redis): ${requestKey}`)
    return { isOngoing: true, requestKey }
  }
  
  return { isOngoing: false, requestKey }
}

// Mark a request as ongoing
export async function markRequestOngoing(requestKey) {
  // Mark in memory
  ongoingRequests.set(requestKey, Date.now())
  
  // Mark in Redis with 30-second expiry
  await safeRedisOperation(async () => {
    await redis.setEx(`ongoing:${requestKey}`, 30, Date.now().toString())
  })
  
  console.log(`⏳ Marked request as ongoing: ${requestKey}`)
}

// Mark a request as completed
export async function markRequestCompleted(requestKey) {
  // Remove from memory
  ongoingRequests.delete(requestKey)
  
  // Remove from Redis
  await safeRedisOperation(async () => {
    await redis.del(`ongoing:${requestKey}`)
  })
  
  console.log(`✅ Marked request as completed: ${requestKey}`)
}

// Clean up old ongoing requests (safety mechanism)
export async function cleanupOldRequests() {
  const now = Date.now()
  const maxAge = 60000 // 1 minute
  
  // Clean up in-memory cache
  for (const [key, timestamp] of ongoingRequests.entries()) {
    if (now - timestamp > maxAge) {
      ongoingRequests.delete(key)
      console.log(`🧹 Cleaned up old in-memory request: ${key}`)
    }
  }
}

// Auto cleanup every 5 minutes
setInterval(cleanupOldRequests, 5 * 60 * 1000)