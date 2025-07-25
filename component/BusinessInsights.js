'use client'

import { useState } from 'react'
import {
  TrendingUp,
  Users,
  Clock,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  BarChart3,
  Calendar,
  Target,
  Award,
} from 'lucide-react'

// Business Insights Component - analyzes Google Places data for business intelligence
function BusinessInsights({ placeDetails, kitchen }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!placeDetails) return null

  // Analyze review sentiment and trends
  const analyzeReviews = () => {
    if (!placeDetails.reviews) return null

    const reviews = placeDetails.reviews
    const totalReviews = reviews.length
    const avgRating = placeDetails.rating || 0

    // Calculate rating distribution
    const ratingDistribution = [1, 2, 3, 4, 5].map((rating) => {
      const count = reviews.filter((review) => review.rating === rating).length
      return { rating, count, percentage: (count / totalReviews) * 100 }
    })

    // Recent reviews trend (last 6 months if available)
    const recentReviews = reviews.filter((review) => {
      if (!review.time) return false
      const reviewDate = new Date(review.time * 1000)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      return reviewDate > sixMonthsAgo
    })

    // Common positive/negative keywords
    const reviewTexts = reviews
      .map((r) => r.text?.text || '')
      .join(' ')
      .toLowerCase()
    const positiveKeywords = [
      'great',
      'excellent',
      'amazing',
      'perfect',
      'wonderful',
      'fantastic',
      'clean',
      'professional',
      'helpful',
    ]
    const negativeKeywords = [
      'terrible',
      'awful',
      'dirty',
      'unprofessional',
      'rude',
      'expensive',
      'poor',
      'bad',
      'worst',
    ]

    const positiveMatches = positiveKeywords.filter((word) =>
      reviewTexts.includes(word)
    )
    const negativeMatches = negativeKeywords.filter((word) =>
      reviewTexts.includes(word)
    )

    return {
      totalReviews,
      avgRating,
      ratingDistribution,
      recentReviews: recentReviews.length,
      positiveKeywords: positiveMatches,
      negativeKeywords: negativeMatches,
      sentiment:
        positiveMatches.length > negativeMatches.length
          ? 'positive'
          : negativeMatches.length > positiveMatches.length
          ? 'negative'
          : 'neutral',
    }
  }

  // Business performance indicators
  const getPerformanceIndicators = () => {
    const indicators = []

    if (placeDetails.rating >= 4.5) {
      indicators.push({
        type: 'excellent',
        label: 'Excellent Rating',
        value: placeDetails.rating,
        icon: Award,
      })
    } else if (placeDetails.rating >= 4.0) {
      indicators.push({
        type: 'good',
        label: 'Good Rating',
        value: placeDetails.rating,
        icon: ThumbsUp,
      })
    }

    if (placeDetails.userRatingCount >= 100) {
      indicators.push({
        type: 'popular',
        label: 'Well Reviewed',
        value: placeDetails.userRatingCount,
        icon: Users,
      })
    }

    if (placeDetails.businessStatus === 'OPERATIONAL') {
      indicators.push({
        type: 'operational',
        label: 'Currently Operating',
        value: 'Active',
        icon: Target,
      })
    }

    if (placeDetails.photos && placeDetails.photos.length >= 10) {
      indicators.push({
        type: 'visual',
        label: 'Well Documented',
        value: placeDetails.photos.length,
        icon: BarChart3,
      })
    }

    return indicators
  }

  const reviewAnalysis = analyzeReviews()
  const performanceIndicators = getPerformanceIndicators()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'reviews', label: 'Review Analysis', icon: MessageSquare },
    { id: 'trends', label: 'Business Trends', icon: TrendingUp },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
        Business Insights
      </h2>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceIndicators.map((indicator, index) => {
              const Icon = indicator.icon
              const colors = {
                excellent: 'text-green-600 bg-green-50 border-green-200',
                good: 'text-blue-600 bg-blue-50 border-blue-200',
                popular: 'text-purple-600 bg-purple-50 border-purple-200',
                operational:
                  'text-emerald-600 bg-emerald-50 border-emerald-200',
                visual: 'text-orange-600 bg-orange-50 border-orange-200',
              }

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${colors[indicator.type]}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-6 h-6" />
                    <span className="text-2xl font-bold">
                      {indicator.value}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-2">{indicator.label}</p>
                </div>
              )
            })}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {placeDetails.rating || 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {placeDetails.userRatingCount || 0}
                </div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {placeDetails.photos?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {placeDetails.types?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Analysis Tab */}
      {activeTab === 'reviews' && reviewAnalysis && (
        <div className="space-y-6">
          {/* Rating Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {reviewAnalysis.ratingDistribution
                .reverse()
                .map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-20">
                      <span className="text-sm font-medium mr-2">{rating}</span>
                      <div className="flex">{'★'.repeat(rating)}</div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 w-16 text-right">
                      {count} ({percentage.toFixed(0)}%)
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Review Sentiment</h3>
            <div
              className={`p-4 rounded-lg ${
                reviewAnalysis.sentiment === 'positive'
                  ? 'bg-green-50 border border-green-200'
                  : reviewAnalysis.sentiment === 'negative'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-yellow-50 border border-yellow-200'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    reviewAnalysis.sentiment === 'positive'
                      ? 'bg-green-500'
                      : reviewAnalysis.sentiment === 'negative'
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                  }`}
                />
                <span className="font-medium capitalize">
                  {reviewAnalysis.sentiment} Sentiment
                </span>
              </div>

              {reviewAnalysis.positiveKeywords.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-green-800 mb-2">
                    Common Positive Terms:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {reviewAnalysis.positiveKeywords
                      .slice(0, 5)
                      .map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {reviewAnalysis.negativeKeywords.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    Areas for Improvement:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {reviewAnalysis.negativeKeywords
                      .slice(0, 3)
                      .map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Business Trends Tab */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          {/* Operating Hours Analysis */}
          {placeDetails.currentOpeningHours && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Operating Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Current Status</h4>
                  <div
                    className={`p-3 rounded-lg ${
                      placeDetails.currentOpeningHours.openNow
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}
                  >
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {placeDetails.currentOpeningHours.openNow
                        ? 'Currently Open'
                        : 'Currently Closed'}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Schedule Consistency</h4>
                  <div className="text-sm text-gray-600">
                    {placeDetails.currentOpeningHours.weekdayDescriptions ? (
                      <p>
                        Operating{' '}
                        {
                          placeDetails.currentOpeningHours.weekdayDescriptions
                            .length
                        }{' '}
                        days per week
                      </p>
                    ) : (
                      <p>Schedule information available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Categories */}
          {placeDetails.types && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Business Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {placeDetails.types.slice(0, 10).map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm"
                  >
                    {type
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Business Recommendations
            </h3>
            <div className="space-y-3">
              {placeDetails.rating >= 4.5 && (
                <div className="flex items-start">
                  <ThumbsUp className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">
                      Excellent reputation
                    </p>
                    <p className="text-sm text-green-700">
                      This kitchen has outstanding reviews and ratings
                    </p>
                  </div>
                </div>
              )}

              {!placeDetails.photos ||
                (placeDetails.photos.length < 5 && (
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-800">
                        Consider more photos
                      </p>
                      <p className="text-sm text-orange-700">
                        Additional photos could help showcase the kitchen better
                      </p>
                    </div>
                  </div>
                ))}

              {placeDetails.userRatingCount < 10 && (
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">
                      Encourage reviews
                    </p>
                    <p className="text-sm text-blue-700">
                      More reviews would help build trust with potential renters
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BusinessInsights
