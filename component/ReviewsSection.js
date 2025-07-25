'use client'

import { useState, useEffect } from 'react'
import { Star, MessageCircle } from 'lucide-react'

export function ReviewsSection({ kitchen, googlePlacesReviews = [] }) {
  const [additionalReviews, setAdditionalReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAdditionalReviews() {
      // Only fetch if we have a place_id and don't already have Google reviews
      if (!kitchen.placeId || googlePlacesReviews.length > 0) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/reviews?place_id=${kitchen.placeId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setAdditionalReviews(data.reviews || [])
      } catch (err) {
        console.error('Failed to load additional reviews:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAdditionalReviews()
  }, [kitchen.placeId, googlePlacesReviews.length])

  // Combine all reviews
  const allReviews = [
    ...googlePlacesReviews.map((review) => ({ ...review, source: 'google' })),
    ...additionalReviews.map((review) => ({ ...review, source: 'api' })),
  ]

  // Sort by date if available (most recent first)
  const sortedReviews = allReviews.sort((a, b) => {
    if (a.publishTime && b.publishTime) {
      return new Date(b.publishTime) - new Date(a.publishTime)
    }
    return 0
  })

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-3">
          Customer Reviews
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-600">Loading reviews...</span>
        </div>
      </div>
    )
  }

  if (sortedReviews.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-3">
          Customer Reviews
        </h2>
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No reviews available yet.</p>
          <p className="text-sm text-gray-500 mt-2">
            Be the first to review this kitchen!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-3">
        Customer Reviews ({sortedReviews.length})
      </h2>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            Some reviews couldn't be loaded. Showing available reviews below.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {sortedReviews.slice(0, 8).map((review, index) => (
          <ReviewCard key={`${review.source}-${index}`} review={review} />
        ))}
      </div>

      {sortedReviews.length > 8 && (
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Showing 8 of {sortedReviews.length} reviews
          </p>
        </div>
      )}
    </div>
  )
}

function ReviewCard({ review }) {
  const rating = review.rating || 5
  const authorName =
    review.authorAttribution?.displayName ||
    review.author_name ||
    review.author ||
    'Anonymous'
  const reviewText = review.text?.text || review.text || review.review || ''
  const timeDescription =
    review.relativePublishTimeDescription ||
    review.relative_time_description ||
    review.time ||
    ''

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Star Rating */}
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Author Name */}
          <span className="font-medium text-gray-900">{authorName}</span>

          {/* Source Badge */}
          {review.source && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                review.source === 'google'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {review.source === 'google' ? 'Google' : 'Verified'}
            </span>
          )}
        </div>

        {/* Time */}
        {timeDescription && (
          <span className="text-sm text-gray-500">{timeDescription}</span>
        )}
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="text-gray-700 leading-relaxed">{reviewText}</p>
      )}

      {/* Author Profile Link (Google Reviews) */}
      {review.authorAttribution?.uri && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <a
            href={review.authorAttribution.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View author profile
          </a>
        </div>
      )}
    </div>
  )
}
