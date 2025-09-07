// app/api/monitoring/route.js
import { NextResponse } from 'next/server'
import { generateMonitoringReport, getApiUsageStats } from '@/lib/apiMonitoring'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days')) || 7
    const format = searchParams.get('format') || 'json'

    console.log(`📊 Generating monitoring report for ${days} days`)

    if (format === 'summary') {
      // Quick summary endpoint
      const report = await generateMonitoringReport()
      
      return NextResponse.json({
        success: true,
        summary: report.summary,
        generatedAt: report.generatedAt,
      })
    }

    // Full detailed report
    const searchStats = await getApiUsageStats('google-places-search', days)
    const detailsStats = await getApiUsageStats('google-place-details', days)

    const report = {
      success: true,
      generatedAt: new Date().toISOString(),
      period: `${days} days`,
      apis: {
        'google-places-search': searchStats,
        'google-place-details': detailsStats,
      },
      insights: {
        totalRequests: searchStats.totalRequests + detailsStats.totalRequests,
        averageCacheHitRate: (
          (parseFloat(searchStats.cacheHitRate) + parseFloat(detailsStats.cacheHitRate)) / 2
        ).toFixed(1),
        mostActiveHours: searchStats.hourly
          .map((hour, index) => ({ hour: index, requests: hour.requests }))
          .sort((a, b) => b.requests - a.requests)
          .slice(0, 5),
        recommendations: generateRecommendations(searchStats, detailsStats),
      }
    }

    console.log(`📈 Report generated: ${report.insights.totalRequests} total requests, ${report.insights.averageCacheHitRate}% cache hit rate`)

    return NextResponse.json(report)
  } catch (error) {
    console.error('💥 Error generating monitoring report:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate monitoring report',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

function generateRecommendations(searchStats, detailsStats) {
  const recommendations = []

  // Cache hit rate recommendations
  if (parseFloat(searchStats.cacheHitRate) < 30) {
    recommendations.push({
      type: 'cache',
      priority: 'high',
      message: 'Search API cache hit rate is low. Consider increasing cache TTL or improving cache keys.',
      metric: `Search cache hit rate: ${searchStats.cacheHitRate}%`
    })
  }

  if (parseFloat(detailsStats.cacheHitRate) < 50) {
    recommendations.push({
      type: 'cache',
      priority: 'medium',
      message: 'Place Details API cache hit rate could be improved. Consider longer cache duration for stable data.',
      metric: `Details cache hit rate: ${detailsStats.cacheHitRate}%`
    })
  }

  // Usage pattern recommendations
  const totalRequests = searchStats.totalRequests + detailsStats.totalRequests
  if (totalRequests > 1000) {
    recommendations.push({
      type: 'usage',
      priority: 'medium',
      message: 'High API usage detected. Monitor costs and consider implementing more aggressive caching.',
      metric: `Total requests: ${totalRequests} in ${7} days`
    })
  }

  // Field usage recommendations
  const avgSearchFields = searchStats.fieldsUsed / Math.max(searchStats.totalRequests, 1)
  const avgDetailsFields = detailsStats.fieldsUsed / Math.max(detailsStats.totalRequests, 1)

  if (avgSearchFields > 10) {
    recommendations.push({
      type: 'optimization',
      priority: 'medium',
      message: 'Consider reducing the number of fields requested in search API to lower costs.',
      metric: `Average fields per search request: ${avgSearchFields.toFixed(1)}`
    })
  }

  if (avgDetailsFields > 15) {
    recommendations.push({
      type: 'optimization',
      priority: 'medium',
      message: 'Consider reducing the number of fields requested in details API to lower costs.',
      metric: `Average fields per details request: ${avgDetailsFields.toFixed(1)}`
    })
  }

  return recommendations
}