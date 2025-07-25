'use client'

import { useState, useEffect } from 'react'
import {
  MapPin,
  Coffee,
  Car,
  Utensils,
  ShoppingBag,
  Star,
  ExternalLink,
} from 'lucide-react'

// Nearby Places Component using Google Places Nearby Search
function NearbyPlaces({ kitchen, placeDetails }) {
  const [nearbyPlaces, setNearbyPlaces] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const coordinates = {
    lat: kitchen.location?.lat || placeDetails?.location?.latitude || 0,
    lng: kitchen.location?.lng || placeDetails?.location?.longitude || 0,
  }

  // Categories to search for
  const categories = [
    {
      key: 'restaurants',
      label: 'Restaurants',
      icon: Utensils,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      type: 'restaurant',
    },
    {
      key: 'grocery',
      label: 'Grocery Stores',
      icon: ShoppingBag,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      type: 'grocery_or_supermarket',
    },
    {
      key: 'parking',
      label: 'Parking',
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      type: 'parking',
    },
    {
      key: 'cafes',
      label: 'Coffee Shops',
      icon: Coffee,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      type: 'cafe',
    },
  ]

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      fetchNearbyPlaces()
    }
  }, [coordinates.lat, coordinates.lng])

  const fetchNearbyPlaces = async () => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return

    setLoading(true)
    setError(null)

    try {
      const results = {}

      for (const category of categories) {
        try {
          // Using Google Places Text Search for better results
          const searchQuery = `${category.type} near ${coordinates.lat},${coordinates.lng}`
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
              searchQuery
            )}&location=${coordinates.lat},${coordinates.lng}&radius=1000&key=${
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            }`
          )

          if (response.ok) {
            const data = await response.json()
            results[category.key] = data.results?.slice(0, 3) || []
          }
        } catch (err) {
          console.error(`Error fetching ${category.label}:`, err)
        }
      }

      setNearbyPlaces(results)
    } catch (err) {
      console.error('Error fetching nearby places:', err)
      setError('Unable to load nearby places')
    } finally {
      setLoading(false)
    }
  }

  if (!coordinates.lat || !coordinates.lng) return null

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
        Nearby Places
      </h2>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Finding nearby places...</p>
        </div>
      )}

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            const places = nearbyPlaces[category.key] || []

            return (
              <div
                key={category.key}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg ${category.bgColor} mr-3`}>
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold">{category.label}</h3>
                  <span className="ml-auto text-sm text-gray-500">
                    {places.length} nearby
                  </span>
                </div>

                {places.length > 0 ? (
                  <div className="space-y-3">
                    {places.map((place, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {place.name}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {place.vicinity || place.formatted_address}
                          </p>
                          {place.rating && (
                            <div className="flex items-center mt-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                              <span className="text-xs text-gray-600">
                                {place.rating} ({place.user_ratings_total || 0})
                              </span>
                            </div>
                          )}
                        </div>
                        <a
                          href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 p-1 text-gray-400 hover:text-blue-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No {category.label.toLowerCase()} found nearby
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Quick Search Links */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Search for more nearby places:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            'banks',
            'gas stations',
            'hotels',
            'shopping centers',
            'hospitals',
          ].map((term) => (
            <a
              key={term}
              href={`https://www.google.com/maps/search/${term}+near+${kitchen.location?.lat},${kitchen.location?.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {term}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NearbyPlaces
