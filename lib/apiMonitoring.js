// lib/apiMonitoring.js
import redis from '@/lib/redis'

// Helper function to safely interact with Redis
async function safeRedisOperation(operation, fallback = null) {
  try {
    return await operation()
  } catch (error) {
    console.error('Redis monitoring operation failed:', error)
    return fallback
  }
}

// Track API usage
export async function trackApiUsage(apiType, params = {}) {
  const timestamp = Date.now()
  const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const hour = new Date().toISOString().split('T')[1].split(':')[0] // HH
  
  await safeRedisOperation(async () => {
    // Daily counters
    await redis.incr(`api-usage:${apiType}:${date}`)
    await redis.expire(`api-usage:${apiType}:${date}`, 86400 * 7) // 7 days retention
    
    // Hourly counters
    await redis.incr(`api-usage:${apiType}:${date}:${hour}`)
    await redis.expire(`api-usage:${apiType}:${date}:${hour}`, 86400 * 2) // 2 days retention
    
    // Track specific parameters if provided
    if (params.fieldsCount) {
      await redis.incrBy(`api-fields:${apiType}:${date}`, params.fieldsCount)
      await redis.expire(`api-fields:${apiType}:${date}`, 86400 * 7)
    }
    
    // Cache hit/miss tracking
    if (params.cacheHit !== undefined) {
      const cacheStatus = params.cacheHit ? 'hit' : 'miss'
      await redis.incr(`api-cache:${apiType}:${cacheStatus}:${date}`)
      await redis.expire(`api-cache:${apiType}:${cacheStatus}:${date}`, 86400 * 7)
    }
    
    console.log(`📊 Tracked API usage: ${apiType} on ${date}:${hour}`)
  })
}

// Get API usage statistics
export async function getApiUsageStats(apiType, days = 7) {
  const stats = {
    daily: [],
    hourly: [],
    totalRequests: 0,
    cacheHitRate: 0,
    fieldsUsed: 0,
  }
  
  await safeRedisOperation(async () => {
    const today = new Date()
    
    // Get daily stats for the last N days
    for (let i = 0; i < days; i++) {
      const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000))
        .toISOString().split('T')[0]
      
      const dailyCount = await redis.get(`api-usage:${apiType}:${date}`)
      const fieldsCount = await redis.get(`api-fields:${apiType}:${date}`)
      const cacheHits = await redis.get(`api-cache:${apiType}:hit:${date}`)
      const cacheMisses = await redis.get(`api-cache:${apiType}:miss:${date}`)
      
      stats.daily.push({
        date,
        requests: parseInt(dailyCount) || 0,
        fields: parseInt(fieldsCount) || 0,
        cacheHits: parseInt(cacheHits) || 0,
        cacheMisses: parseInt(cacheMisses) || 0,
      })
      
      stats.totalRequests += parseInt(dailyCount) || 0
      stats.fieldsUsed += parseInt(fieldsCount) || 0
    }
    
    // Get today's hourly stats
    const today_date = today.toISOString().split('T')[0]
    for (let hour = 0; hour < 24; hour++) {
      const hourStr = hour.toString().padStart(2, '0')
      const hourlyCount = await redis.get(`api-usage:${apiType}:${today_date}:${hourStr}`)
      
      stats.hourly.push({
        hour: hourStr,
        requests: parseInt(hourlyCount) || 0,
      })
    }
    
    // Calculate cache hit rate
    const totalHits = stats.daily.reduce((sum, day) => sum + day.cacheHits, 0)
    const totalMisses = stats.daily.reduce((sum, day) => sum + day.cacheMisses, 0)
    const totalCacheRequests = totalHits + totalMisses
    
    if (totalCacheRequests > 0) {
      stats.cacheHitRate = (totalHits / totalCacheRequests * 100).toFixed(1)
    }
    
  })
  
  return stats
}

// Track rate limit violations
export async function trackRateLimitViolation(apiType, clientId = 'global') {
  const timestamp = Date.now()
  const date = new Date().toISOString().split('T')[0]
  
  await safeRedisOperation(async () => {
    await redis.incr(`rate-limit-violations:${apiType}:${date}`)
    await redis.expire(`rate-limit-violations:${apiType}:${date}`, 86400 * 7)
    
    // Track specific client violations
    await redis.incr(`rate-limit-violations:${apiType}:${clientId}:${date}`)
    await redis.expire(`rate-limit-violations:${apiType}:${clientId}:${date}`, 86400 * 7)
    
    console.log(`🚨 Rate limit violation tracked: ${apiType} for ${clientId}`)
  })
}

// Estimate API costs based on Google Places pricing
export function estimateApiCosts(stats) {
  // Google Places pricing (as of 2024)
  const PRICING = {
    'google-places-search': {
      basePrice: 0.032, // $0.032 per request
      fieldPricing: {
        basic: 0.0, // Free fields: place_id, types, etc.
        contact: 0.003, // $0.003 per field (phone, website)
        atmosphere: 0.005, // $0.005 per field (rating, reviews)
      }
    },
    'google-place-details': {
      basePrice: 0.017, // $0.017 per request  
      fieldPricing: {
        basic: 0.0,
        contact: 0.003,
        atmosphere: 0.005,
      }
    }
  }
  
  const estimates = {}
  
  Object.keys(stats).forEach(apiType => {
    if (PRICING[apiType]) {
      const apiStats = stats[apiType]
      const pricing = PRICING[apiType]
      
      // Base cost
      const baseCost = apiStats.totalRequests * pricing.basePrice
      
      // Estimate additional field costs (rough estimate)
      const avgFieldsPerRequest = apiStats.fieldsUsed / Math.max(apiStats.totalRequests, 1)
      const fieldCost = apiStats.totalRequests * avgFieldsPerRequest * 0.002 // Average field cost
      
      estimates[apiType] = {
        totalRequests: apiStats.totalRequests,
        baseCost: baseCost.toFixed(4),
        fieldCost: fieldCost.toFixed(4),
        totalCost: (baseCost + fieldCost).toFixed(4),
        savings: {
          cacheHitRate: apiStats.cacheHitRate,
          estimatedSavings: (baseCost * (apiStats.cacheHitRate / 100)).toFixed(4),
        }
      }
    }
  })
  
  return estimates
}

// Generate monitoring report
export async function generateMonitoringReport() {
  console.log('📊 Generating API monitoring report...')
  
  const searchStats = await getApiUsageStats('google-places-search', 7)
  const detailsStats = await getApiUsageStats('google-place-details', 7)
  
  const allStats = {
    'google-places-search': searchStats,
    'google-place-details': detailsStats,
  }
  
  const costEstimates = estimateApiCosts(allStats)
  
  const report = {
    generatedAt: new Date().toISOString(),
    period: '7 days',
    apis: allStats,
    costEstimates,
    summary: {
      totalRequests: searchStats.totalRequests + detailsStats.totalRequests,
      totalEstimatedCost: Object.values(costEstimates)
        .reduce((sum, api) => sum + parseFloat(api.totalCost), 0)
        .toFixed(4),
      averageCacheHitRate: (
        (parseFloat(searchStats.cacheHitRate) + parseFloat(detailsStats.cacheHitRate)) / 2
      ).toFixed(1),
    }
  }
  
  // Log key metrics
  console.log('🔍 API Monitoring Summary (7 days):')
  console.log(`  Total Requests: ${report.summary.totalRequests}`)
  console.log(`  Estimated Cost: $${report.summary.totalEstimatedCost}`)
  console.log(`  Cache Hit Rate: ${report.summary.averageCacheHitRate}%`)
  
  return report
}