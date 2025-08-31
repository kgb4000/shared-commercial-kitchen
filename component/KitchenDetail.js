'use client'

import { useEffect, useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Users,
  Star,
  Shield,
  ExternalLink,
  Clock,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Maximize2,
  Coffee,
  Car,
  Utensils,
  ShoppingBag,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import BusinessInsights from './BusinessInsights'
import SearchBar from './SearchBar'
import BackButton from './BackButton'

// Helper functions
function formatPhoneNumber(phone) {
  if (!phone) return null
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const number = cleaned.slice(1)
    return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

function capitalizeCityName(cityName) {
  if (!cityName || typeof cityName !== 'string') {
    return ''
  }

  return cityName
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function extractNeighborhood(address) {
  if (!address) return 'Downtown'
  const parts = address.split(',')
  if (parts.length >= 2) {
    return parts[1].trim()
  }
  return 'Downtown'
}

// Safe string rendering helper
function safeRender(value, fallback = '') {
  if (value === null || value === undefined) return fallback
  if (typeof value === 'string' || typeof value === 'number') return value
  if (typeof value === 'object') {
    console.warn('Attempted to render object directly:', value)
    return fallback
  }
  return String(value)
}

// Simple Kitchen Map Component (Integrated)
function SimpleKitchenMap({ kitchen, placeDetails }) {
  // Get coordinates from kitchen data or place details
  const coordinates = {
    lat:
      kitchen.location?.lat ||
      kitchen.latitude ||
      placeDetails?.location?.latitude ||
      0,
    lng:
      kitchen.location?.lng ||
      kitchen.longitude ||
      placeDetails?.location?.longitude ||
      0,
  }

  const kitchenName = kitchen.title || kitchen.name || 'Kitchen Location'
  const address = kitchen.address || placeDetails?.formattedAddress || ''
  const placeId = kitchen.placeId || kitchen.place_id || ''

  // Fallback for when coordinates are not available
  if (!coordinates.lat || !coordinates.lng) {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Kitchen Location</h3>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            Location Not Available
          </h4>
          <p className="text-gray-600 mb-4">
            We don't have precise coordinates for this kitchen location.
          </p>
          {address && (
            <div className="space-y-3">
              <p className="text-gray-700 font-medium">{address}</p>
              <div className="flex justify-center gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Search on Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      {/* Address and Quick Actions */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-4">
          {/* Address Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span className="font-medium text-gray-900">Address</span>
            </div>
            <p className="text-gray-700 ml-7 break-words">{address}</p>
            {coordinates.lat && coordinates.lng && (
              <p className="text-gray-500 text-sm ml-7 mt-1 font-mono">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </a>
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Map Header */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Kitchen Location</h3>
        </div>

        {/* Map Container */}
        <div className="relative">
          {/* Google Maps Embed */}
          {kitchen.placeId || kitchen.address ? (
            <div className="h-64 md:h-80">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'
                }&q=${encodeURIComponent(
                  kitchen.placeId
                    ? `place_id:${kitchen.placeId}`
                    : kitchen.address || `${kitchen.city}, ${kitchen.state}`
                )}&zoom=15&maptype=roadmap`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing location of ${kitchenName}`}
                className="w-full h-full"
              />
            </div>
          ) : (
            /* Fallback Map Placeholder */
            {
              /* <div className="h-64 md:h-80 bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <span className="text-4xl mb-2 block">🗺️</span>
                <p className="text-lg font-medium">Map Unavailable</p>
                <p className="text-sm">Location details not available</p>
              </div>
            </div> */
            }
          )}

          {/* Map Overlay Controls */}
          {/* <div className="absolute top-4 right-4 space-y-2">
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${
                kitchen.placeId || ''
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white shadow-md rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              🗺️ Open in Google Maps
            </a>
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const userLat = position.coords.latitude
                    const userLng = position.coords.longitude
                    const kitchenAddress = encodeURIComponent(
                      kitchen.address || `${kitchen.city}, ${kitchen.state}`
                    )
                    window.open(
                      `https://www.google.com/maps/dir/${userLat},${userLng}/${kitchenAddress}`,
                      '_blank'
                    )
                  })
                } else {
                  window.open(
                    `https://www.google.com/maps/dir//${encodeURIComponent(
                      kitchen.address || `${kitchen.city}, ${kitchen.state}`
                    )}`,
                    '_blank'
                  )
                }
              }}
              className="block bg-blue-600 shadow-md rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors w-full text-center"
            >
              🧭 Get Directions
            </button>
          </div> */}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <Navigation className="w-4 h-4 mr-2 text-blue-600" />
          Get Directions
        </a>
        <a
          href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <MapPin className="w-4 h-4 mr-2 text-green-600" />
          View on Google Maps
        </a>
        <a
          href={`https://www.google.com/maps/search/parking+near+${coordinates.lat},${coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <ExternalLink className="w-4 h-4 mr-2 text-purple-600" />
          Find Parking
        </a>
      </div>
    </div>
  )
}

// Nearby Places Component (Integrated)
function NearbyPlaces({ kitchen, placeDetails }) {
  const [nearbyPlaces, setNearbyPlaces] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const coordinates = {
    lat:
      kitchen.location?.lat ||
      kitchen.latitude ||
      placeDetails?.location?.latitude ||
      0,
    lng:
      kitchen.location?.lng ||
      kitchen.longitude ||
      placeDetails?.location?.longitude ||
      0,
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

  if (!coordinates.lat || !coordinates.lng) return null

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">
        Nearby Places
        <span className="text-sm font-normal text-gray-600 ml-2">
          (Around this kitchen location)
        </span>
      </h3>

      {/* Location context */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
        <p className="text-blue-800 text-sm">
          📍 <strong>Search area:</strong>{' '}
          {kitchen.address || `${kitchen.city}, ${kitchen.state}`}
          {coordinates.lat && coordinates.lng && (
            <span className="text-blue-600 font-mono text-xs ml-2">
              ({coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)})
            </span>
          )}
        </p>
      </div>

      {/* Note about requiring API implementation */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800 text-sm">
          <strong>Note:</strong> To show actual nearby places, this would
          require server-side Google Places API implementation. For now, use the
          search links below to explore what's around this kitchen location.
        </p>
      </div>

      {/* Category Quick Search Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {categories.map((category) => {
          const Icon = category.icon

          return (
            <div
              key={category.key}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-lg ${category.bgColor} mr-3`}>
                  <Icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <h4 className="text-lg font-semibold">{category.label}</h4>
              </div>

              <div className="space-y-3">
                <p className="text-gray-600 text-sm">
                  Find {category.label.toLowerCase()} near this kitchen location
                </p>

                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(
                    category.type
                  )}+near+${coordinates.lat},${coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-3 text-center transition-colors"
                >
                  <div className="flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 mr-2 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Search {category.label} on Google Maps
                    </span>
                  </div>
                </a>

                {/* Alternative search approaches */}
                <div className="flex gap-2">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(
                      category.type
                    )}/@${coordinates.lat},${coordinates.lng},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-xs font-medium transition-colors"
                  >
                    Map View
                  </a>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      category.type
                    )}+near+"${encodeURIComponent(
                      kitchen.address || `${kitchen.city}, ${kitchen.state}`
                    )}"`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded text-xs font-medium transition-colors"
                  >
                    Web Search
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Search Links - Fixed with proper kitchen coordinates */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Search for more nearby places around this kitchen:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { term: 'banks', label: 'Banks' },
            { term: 'gas stations', label: 'Gas Stations' },
            { term: 'hotels', label: 'Hotels' },
            { term: 'shopping centers', label: 'Shopping Centers' },
            { term: 'hospitals', label: 'Hospitals' },
            { term: 'pharmacies', label: 'Pharmacies' },
            { term: 'hardware stores', label: 'Hardware Stores' },
            { term: 'post office', label: 'Post Office' },
          ].map((item) => (
            <a
              key={item.term}
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                item.term
              )}+near+${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
              title={`Find ${item.label} near this kitchen`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* General area search */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a
            href={`https://www.google.com/maps/@${coordinates.lat},${coordinates.lng},15z`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Explore Area on Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

// Image Gallery Component
function ImageGallery({ images, kitchenName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [failedImages, setFailedImages] = useState(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Kitchen Photos</h3>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <span className="text-4xl mb-2 block">🏢</span>
            <p>Loading photos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Kitchen Photos</h3>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <span className="text-4xl mb-2 block">🏢</span>
            <p>No photos available</p>
          </div>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleImageError = (imageUrl) => {
    console.error('Image failed to load:', imageUrl)
    setFailedImages((prev) => new Set([...prev, imageUrl]))
  }

  const mainPhoto = images[currentImageIndex]
  const safeKitchenName = safeRender(kitchenName, 'Kitchen')

  if (images.length === 1) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Kitchen Photos</h3>
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
          {failedImages.has(mainPhoto.url) ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <span className="text-6xl mb-4 block">🏢</span>
                <p className="text-lg font-medium">{safeKitchenName}</p>
                <p className="text-sm">Kitchen Photo</p>
              </div>
            </div>
          ) : (
            <img
              src={mainPhoto.url}
              alt={`${safeKitchenName} - Kitchen view`}
              className="w-full h-full object-cover"
              onError={() => handleImageError(mainPhoto.url)}
            />
          )}
          {mainPhoto.attribution && !failedImages.has(mainPhoto.url) && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              Photo by {safeRender(mainPhoto.attribution)}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Kitchen Photos</h3>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2 lg:row-span-2 relative">
          <div className="relative h-64 lg:h-full min-h-[300px] rounded-lg overflow-hidden shadow-lg">
            {failedImages.has(mainPhoto.url) ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <span className="text-6xl mb-4 block">🏢</span>
                  <p className="text-lg font-medium">{safeKitchenName}</p>
                  <p className="text-sm">Main Photo</p>
                </div>
              </div>
            ) : (
              <img
                src={mainPhoto.url}
                alt={`${safeKitchenName} - Main view`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(mainPhoto.url)}
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {mainPhoto.attribution && !failedImages.has(mainPhoto.url) && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                Photo by {safeRender(mainPhoto.attribution)}
              </div>
            )}
          </div>
        </div>

        {images.slice(1, 4).map((photo, index) => (
          <div key={index} className="lg:col-span-1">
            <button
              onClick={() => setCurrentImageIndex(index + 1)}
              className="block w-full h-32 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              aria-label={`View photo ${index + 2}`}
            >
              {failedImages.has(photo.url) ? (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">🏢</span>
                </div>
              ) : (
                <img
                  src={photo.url}
                  alt={`${safeKitchenName} - View ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={() => handleImageError(photo.url)}
                />
              )}
            </button>
          </div>
        ))}

        {images.length > 4 && (
          <div className="lg:col-span-1 h-32 bg-gray-800 bg-opacity-75 rounded-lg flex items-center justify-center shadow-md">
            <div className="text-center text-white">
              <span className="text-2xl block">📷</span>
              <span className="text-sm">+{images.length - 4} more</span>
            </div>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Click any photo to view • {images.length} total photos available
          </p>
        </div>
      )}
    </div>
  )
}

// Reviews Component
function ReviewsSection({ placeDetails, kitchen }) {
  const reviews = placeDetails?.reviews || []

  if (!Array.isArray(reviews) || reviews.length === 0) {
    if (kitchen.rating && kitchen.reviewCount > 0) {
      return (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <Star className="w-8 h-8 text-yellow-400 fill-current mx-auto mb-3" />
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-lg">
                {safeRender(kitchen.rating)}
              </span>{' '}
              out of 5 stars
            </p>
            <p className="text-gray-600">
              Based on {safeRender(kitchen.reviewCount)} reviews
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No reviews available yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-6">
        Customer Reviews ({reviews.length})
      </h3>
      <div className="space-y-6">
        {reviews.slice(0, 8).map((review, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (review.rating || 0)
                          ? 'fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-gray-900">
                  {safeRender(
                    review.authorAttribution?.displayName,
                    'Anonymous'
                  )}
                </span>
              </div>
              {review.relativePublishTimeDescription && (
                <span className="text-sm text-gray-500">
                  {safeRender(review.relativePublishTimeDescription)}
                </span>
              )}
            </div>
            {review.text?.text && (
              <p className="text-gray-700 leading-relaxed">
                {safeRender(review.text.text)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Contact Form Component
function ContactForm({ kitchen, placeDetails }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Thank you for your inquiry! We will contact you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Request Information</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about your kitchen needs..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  )
}

// Kitchen Amenities Component
function KitchenAmenities({ kitchen, placeDetails }) {
  const amenities = []
  const standardAmenities = []

  if (kitchen.amenities && Array.isArray(kitchen.amenities)) {
    amenities.push(...kitchen.amenities)
  }

  if (kitchen.features && Array.isArray(kitchen.features)) {
    amenities.push(...kitchen.features)
  }

  if (kitchen.hasParking) standardAmenities.push('Free Parking Available')
  if (kitchen.hasWifi) standardAmenities.push('Free WiFi')
  if (kitchen.hasStorage) standardAmenities.push('Storage Space Available')
  if (kitchen.has24HourAccess) standardAmenities.push('24/7 Access')
  if (kitchen.hasLoadingDock) standardAmenities.push('Loading Dock Access')
  if (kitchen.hasDishwasher) standardAmenities.push('Commercial Dishwasher')
  if (kitchen.hasOven) standardAmenities.push('Commercial Oven')
  if (kitchen.hasGrill) standardAmenities.push('Grill Available')
  if (kitchen.hasFreezer) standardAmenities.push('Walk-in Freezer')
  if (kitchen.hasCooler) standardAmenities.push('Walk-in Cooler')
  if (kitchen.hasVentilation) standardAmenities.push('Professional Ventilation')
  if (kitchen.wheelchairAccessible)
    standardAmenities.push('Wheelchair Accessible')

  const defaultAmenities = [
    'Professional Grade Equipment',
    'Food Safety Certified',
    'Flexible Scheduling',
    'Health Department Approved',
  ]

  const allAmenities = [
    ...amenities,
    ...standardAmenities,
    ...(amenities.length === 0 && standardAmenities.length === 0
      ? defaultAmenities
      : []),
  ]

  const uniqueAmenities = [...new Set(allAmenities.filter(Boolean))]

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-6">
        Kitchen Features & Amenities
      </h3>

      {uniqueAmenities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {uniqueAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">
                {safeRender(amenity)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <span className="text-4xl mb-2 block">🍳</span>
          <p className="text-gray-600">Feature details not available</p>
        </div>
      )}
    </div>
  )
}

// Main KitchenDetail Component
export default function KitchenDetail({
  kitchen,
  city,
  state,
  initialGoogleData = null,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!kitchen) {
    return (
      <div className="container max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          No Kitchen Data
        </h1>
        <p className="text-gray-600">
          Kitchen data was not provided to this component.
        </p>
      </div>
    )
  }

  // Get images from both sources safely
  const images = []

  if (kitchen.imageUrl) {
    images.push({
      url: kitchen.imageUrl,
      alt: kitchen.name,
      source: 'original',
    })
  }

  if (initialGoogleData?.photos && Array.isArray(initialGoogleData.photos)) {
    initialGoogleData.photos.forEach((photo, index) => {
      if (photo && photo.url) {
        images.push({
          url: photo.url,
          urlLarge: photo.urlLarge,
          alt: `${kitchen.name} - Photo ${index + 1}`,
          source: 'google',
          attribution: photo.authorAttributions?.[0]?.displayName,
        })
      }
    })
  }

  // Combine ratings safely
  const rating = {
    score: initialGoogleData?.rating || kitchen.rating || 4.7,
    count: initialGoogleData?.userRatingCount || kitchen.reviewCount || 23,
    source: initialGoogleData?.rating ? 'google' : 'original',
  }

  // Get business hours safely
  const businessHours =
    initialGoogleData?.currentOpeningHours?.weekdayDescriptions ||
    initialGoogleData?.regularOpeningHours?.weekdayDescriptions ||
    (kitchen.openingHours && Array.isArray(kitchen.openingHours)
      ? kitchen.openingHours.map((day) => `${day.day}: ${day.hours}`)
      : null)

  const cityName = safeRender(kitchen.city, 'this location')
  const stateName = safeRender(kitchen.state, '')
  const kitchenName = safeRender(kitchen.name, 'Commercial Kitchen')
  const formattedCity = capitalizeCityName(cityName)

  return (
    <main>
      <div className="container max-w-7xl mx-auto px-6 my-10">
        {/* SSR Status Indicator */}
        {/* {initialGoogleData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <span className="text-green-600 text-2xl mr-3">🚀</span>
              <div>
                <p className="text-green-800 font-medium">
                  Server-Side Rendered
                </p>
                <p className="text-green-700 text-sm">
                  Google Places data pre-loaded for better SEO and performance!
                  {initialGoogleData.reviews?.length > 0 &&
                    ` • ${initialGoogleData.reviews.length} reviews loaded`}
                </p>
              </div>
            </div>
          </div>
        )} */}

        {/* Kitchen Header */}
        <div className="bg-white  mb-8">
          <div className="p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {kitchenName}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Commercial Kitchen for Rent in {formattedCity}
                  {stateName && `, ${stateName}`}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-bold text-lg">{rating.score}</span>
                    <span className="text-gray-500 text-sm">
                      ({rating.count} reviews)
                    </span>
                  </div>

                  {(kitchen.verified ||
                    initialGoogleData?.businessStatus === 'OPERATIONAL') && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                      ✓ Verified Kitchen
                    </div>
                  )}

                  {initialGoogleData?.currentOpeningHours?.openNow !==
                    undefined && (
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${
                        initialGoogleData.currentOpeningHours.openNow
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {initialGoogleData.currentOpeningHours.openNow
                        ? '🟢 Open Now'
                        : '🔴 Closed'}
                    </div>
                  )}

                  {kitchen.capacity && (
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                      <span className="text-blue-600 font-bold">
                        👥 {safeRender(kitchen.capacity)}
                      </span>
                      <span className="text-gray-600 text-sm ml-1">
                        Capacity
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-3 lg:ml-8">
                {kitchen.phone && (
                  <a
                    href={`tel:${kitchen.phone}`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    📞 Call {formatPhoneNumber(kitchen.phone)}
                  </a>
                )}

                {(kitchen.website || kitchen.site) && (
                  <a
                    href={kitchen.website || kitchen.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-green-700 transition-colors shadow-lg"
                  >
                    🌐 Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Image Gallery */}
                <ImageGallery images={images} kitchenName={kitchenName} />

                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                    Contact & Location
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-gray-400 text-xl">📍</span>
                        <div>
                          <p className="font-medium text-gray-900">Address</p>
                          <p className="text-gray-600">
                            {safeRender(
                              kitchen.address,
                              'Address not available'
                            )}
                          </p>
                        </div>
                      </div>

                      {kitchen.phone && (
                        <div className="flex items-start space-x-3">
                          <span className="text-gray-400 text-xl">📞</span>
                          <div>
                            <p className="font-medium text-gray-900">Phone</p>
                            <a
                              href={`tel:${kitchen.phone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {formatPhoneNumber(kitchen.phone)}
                            </a>
                          </div>
                        </div>
                      )}

                      {kitchen.email && (
                        <div className="flex items-start space-x-3">
                          <span className="text-gray-400 text-xl">✉️</span>
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <a
                              href={`mailto:${kitchen.email}`}
                              className="text-blue-600 hover:underline"
                            >
                              {safeRender(kitchen.email)}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {(kitchen.website || kitchen.site) && (
                        <div className="flex items-start space-x-3">
                          <span className="text-gray-400 text-xl">🌐</span>
                          <div>
                            <p className="font-medium text-gray-900">Website</p>
                            <a
                              href={kitchen.website || kitchen.site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start space-x-3">
                        <span className="text-gray-400 text-xl">🗺️</span>
                        <div>
                          <p className="font-medium text-gray-900">
                            Directions
                          </p>
                          <a
                            href={`https://www.google.com/maps/place/?q=place_id:${
                              kitchen.placeId || ''
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Get Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Section - Using the integrated SimpleKitchenMap */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                    Location & Map
                  </h2>
                  <SimpleKitchenMap
                    kitchen={kitchen}
                    placeDetails={initialGoogleData}
                  />
                </div>

                {/* Kitchen Description */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                    About This Kitchen
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {kitchen.description ? (
                      <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                          {safeRender(kitchen.description)}
                        </p>
                        {initialGoogleData?.editorialSummary?.text &&
                          initialGoogleData.editorialSummary.text !==
                            kitchen.description && (
                            <div className="bg-blue-50 border-l-4 border-blue-200 p-4 rounded-r-lg">
                              <p className="text-blue-800 text-sm font-medium mb-1">
                                From Google Places:
                              </p>
                              <p className="text-blue-700 leading-relaxed">
                                {safeRender(
                                  initialGoogleData.editorialSummary.text
                                )}
                              </p>
                            </div>
                          )}
                      </div>
                    ) : initialGoogleData?.editorialSummary?.text ? (
                      <p className="text-gray-700 leading-relaxed">
                        {safeRender(initialGoogleData.editorialSummary.text)}
                      </p>
                    ) : (
                      <>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          This professional commercial kitchen space in{' '}
                          {extractNeighborhood(kitchen.address)} offers
                          state-of-the-art facilities for food entrepreneurs,
                          caterers, and culinary businesses.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {rating.score &&
                            `With a ${rating.score}-star rating from ${rating.count} satisfied customers, `}
                          this location provides all the equipment and space you
                          need to launch or grow your food business in{' '}
                          {cityName}
                          {stateName && `, ${stateName}`}.
                        </p>
                      </>
                    )}

                    {/* Kitchen specifications and details */}
                    {(kitchen.squareFootage ||
                      kitchen.equipment ||
                      kitchen.certifications ||
                      kitchen.features) && (
                      <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Kitchen Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {kitchen.squareFootage && (
                            <div className="flex items-center space-x-3">
                              <span className="text-blue-600 text-lg">📏</span>
                              <div>
                                <span className="font-medium text-gray-900">
                                  Size:{' '}
                                </span>
                                <span className="text-gray-700">
                                  {safeRender(kitchen.squareFootage)} sq ft
                                </span>
                              </div>
                            </div>
                          )}

                          {kitchen.capacity && (
                            <div className="flex items-center space-x-3">
                              <span className="text-blue-600 text-lg">👥</span>
                              <div>
                                <span className="font-medium text-gray-900">
                                  Capacity:{' '}
                                </span>
                                <span className="text-gray-700">
                                  {safeRender(kitchen.capacity)} people
                                </span>
                              </div>
                            </div>
                          )}

                          {kitchen.pricePerHour && (
                            <div className="flex items-center space-x-3">
                              <span className="text-blue-600 text-lg">💰</span>
                              <div>
                                <span className="font-medium text-gray-900">
                                  Rate:{' '}
                                </span>
                                <span className="text-gray-700">
                                  ${safeRender(kitchen.pricePerHour)}/hour
                                </span>
                              </div>
                            </div>
                          )}

                          {kitchen.minimumBooking && (
                            <div className="flex items-center space-x-3">
                              <span className="text-blue-600 text-lg">⏰</span>
                              <div>
                                <span className="font-medium text-gray-900">
                                  Minimum:{' '}
                                </span>
                                <span className="text-gray-700">
                                  {safeRender(kitchen.minimumBooking)} hours
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Equipment list */}
                    {kitchen.equipment &&
                      Array.isArray(kitchen.equipment) &&
                      kitchen.equipment.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Available Equipment
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {kitchen.equipment.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <span className="text-green-500">•</span>
                                <span className="text-gray-700">
                                  {safeRender(item)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Certifications */}
                    {kitchen.certifications &&
                      Array.isArray(kitchen.certifications) &&
                      kitchen.certifications.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            Certifications & Compliance
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {kitchen.certifications.map((cert, index) => (
                              <span
                                key={index}
                                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                ✓ {safeRender(cert)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Additional notes or policies */}
                    {kitchen.policies && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Policies & Guidelines
                        </h3>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-800">
                            {safeRender(kitchen.policies)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Special features or notes */}
                    {kitchen.specialFeatures && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Special Features
                        </h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800">
                            {safeRender(kitchen.specialFeatures)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Nearby Places Section */}
                <BusinessInsights
                  kitchen={kitchen}
                  placeDetails={initialGoogleData}
                />

                {/* Operating Hours Section */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                    Operating Hours
                  </h2>

                  {businessHours && Array.isArray(businessHours) ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Hours List */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-blue-600" />
                            Weekly Schedule
                          </h3>
                          <div className="space-y-2">
                            {businessHours.map((hours, index) => {
                              const [day, time] = hours.split(':')
                              const dayName = day.trim()
                              const timeSlot = time ? time.trim() : 'Closed'
                              const isToday = new Date().getDay() === index + 1 // Assuming Monday = 1

                              return (
                                <div
                                  key={index}
                                  className={`flex justify-between py-2 px-3 rounded ${
                                    isToday
                                      ? 'bg-blue-50 border border-blue-200'
                                      : 'bg-gray-50'
                                  }`}
                                >
                                  <span
                                    className={`font-medium ${
                                      isToday
                                        ? 'text-blue-900'
                                        : 'text-gray-700'
                                    }`}
                                  >
                                    {dayName}
                                    {isToday && (
                                      <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                        Today
                                      </span>
                                    )}
                                  </span>
                                  <span
                                    className={`${
                                      isToday
                                        ? 'text-blue-800 font-medium'
                                        : 'text-gray-600'
                                    }`}
                                  >
                                    {timeSlot}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Current Status & Additional Info */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Current Status
                          </h3>

                          {/* Open/Closed Status */}
                          <div className="space-y-4">
                            {initialGoogleData?.currentOpeningHours?.openNow !==
                            undefined ? (
                              <div
                                className={`p-4 rounded-lg border-2 ${
                                  initialGoogleData.currentOpeningHours.openNow
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-red-50 border-red-200'
                                }`}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-3 h-3 rounded-full mr-3 ${
                                      initialGoogleData.currentOpeningHours
                                        .openNow
                                        ? 'bg-green-500'
                                        : 'bg-red-500'
                                    }`}
                                  ></div>
                                  <span
                                    className={`font-semibold ${
                                      initialGoogleData.currentOpeningHours
                                        .openNow
                                        ? 'text-green-800'
                                        : 'text-red-800'
                                    }`}
                                  >
                                    {initialGoogleData.currentOpeningHours
                                      .openNow
                                      ? 'Open Now'
                                      : 'Currently Closed'}
                                  </span>
                                </div>

                                {/* Next opening/closing time if available */}
                                {initialGoogleData.currentOpeningHours
                                  .periods && (
                                  <p
                                    className={`text-sm mt-2 ${
                                      initialGoogleData.currentOpeningHours
                                        .openNow
                                        ? 'text-green-700'
                                        : 'text-red-700'
                                    }`}
                                  >
                                    {initialGoogleData.currentOpeningHours
                                      .openNow
                                      ? 'Kitchen is currently available for booking'
                                      : 'Kitchen will reopen during business hours'}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                                  <span className="text-gray-700 font-medium">
                                    Status Unknown
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Contact kitchen directly for current
                                  availability
                                </p>
                              </div>
                            )}

                            {/* Booking Information */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                Booking Information
                              </h4>
                              <div className="space-y-2 text-sm">
                                {kitchen.minimumBooking && (
                                  <p className="text-blue-800">
                                    <span className="font-medium">
                                      Minimum booking:
                                    </span>{' '}
                                    {safeRender(kitchen.minimumBooking)} hours
                                  </p>
                                )}
                                {kitchen.advanceBooking && (
                                  <p className="text-blue-800">
                                    <span className="font-medium">
                                      Advance notice:
                                    </span>{' '}
                                    {safeRender(kitchen.advanceBooking)}
                                  </p>
                                )}
                                {kitchen.pricePerHour && (
                                  <p className="text-blue-800">
                                    <span className="font-medium">
                                      Hourly rate:
                                    </span>{' '}
                                    ${safeRender(kitchen.pricePerHour)}
                                  </p>
                                )}
                                <p className="text-blue-700 font-medium">
                                  📞 Call{' '}
                                  {kitchen.phone
                                    ? formatPhoneNumber(kitchen.phone)
                                    : 'for availability'}{' '}
                                  to book
                                </p>
                              </div>
                            </div>

                            {/* Special Hours Notice */}
                            {kitchen.specialHours && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h4 className="font-medium text-yellow-900 mb-2">
                                  Special Hours
                                </h4>
                                <p className="text-sm text-yellow-800">
                                  {safeRender(kitchen.specialHours)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Additional Hours Information */}
                      {(kitchen.holidayHours || kitchen.seasonalHours) && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Additional Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {kitchen.holidayHours && (
                              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                <h4 className="font-medium text-orange-900 mb-2">
                                  Holiday Hours
                                </h4>
                                <p className="text-sm text-orange-800">
                                  {safeRender(kitchen.holidayHours)}
                                </p>
                              </div>
                            )}
                            {kitchen.seasonalHours && (
                              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <h4 className="font-medium text-purple-900 mb-2">
                                  Seasonal Schedule
                                </h4>
                                <p className="text-sm text-purple-800">
                                  {safeRender(kitchen.seasonalHours)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : kitchen.operatingHours ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <Clock className="w-5 h-5 mr-2 text-blue-600" />
                        <h3 className="text-lg font-medium text-gray-900">
                          Business Hours
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {safeRender(kitchen.operatingHours)}
                      </p>

                      {kitchen.phone && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-blue-800 text-sm">
                            <strong>For specific availability:</strong> Call{' '}
                            {formatPhoneNumber(kitchen.phone)}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : kitchen.availability ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <Clock className="w-5 h-5 mr-2 text-blue-600" />
                        <h3 className="text-lg font-medium text-gray-900">
                          Availability
                        </h3>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {safeRender(kitchen.availability)}
                      </p>

                      {kitchen.phone && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-blue-800 text-sm">
                            <strong>To schedule a visit:</strong> Contact{' '}
                            {formatPhoneNumber(kitchen.phone)}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Hours Not Available
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Operating hours are not currently listed for this
                        kitchen.
                      </p>

                      {kitchen.phone ? (
                        <div className="bg-white border border-gray-300 rounded-lg p-4">
                          <p className="text-gray-700 font-medium mb-2">
                            Contact for Hours & Availability:
                          </p>
                          <a
                            href={`tel:${kitchen.phone}`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call {formatPhoneNumber(kitchen.phone)}
                          </a>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          Please contact the kitchen directly for operating
                          hours and availability.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Kitchen Features */}
                <KitchenAmenities
                  kitchen={kitchen}
                  placeDetails={initialGoogleData}
                />

                {/* Reviews Section */}
                <ReviewsSection
                  placeDetails={initialGoogleData}
                  kitchen={kitchen}
                />

                <BackButton />
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Contact Form */}
                {/* <ContactForm
                  kitchen={kitchen}
                  placeDetails={initialGoogleData}
                /> */}
                <script
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2967132781692430"
                  crossorigin="anonymous"
                ></script>
                <ins
                  className="adsbygoogle block"
                  // style="display:block"
                  data-ad-client="ca-pub-2967132781692430"
                  data-ad-slot="9128699685"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
                <script>
                  (adsbygoogle = window.adsbygoogle || []).push({});
                </script>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a
                      href={`https://www.google.com/maps/place/?q=place_id:${
                        kitchen.placeId || ''
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                    >
                      🗺️ Get Directions
                    </a>

                    <button className="block w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors">
                      ⭐ Save Kitchen
                    </button>

                    <button className="block w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors">
                      📤 Share Kitchen
                    </button>
                  </div>
                </div>

                {/* Kitchen Stats */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Kitchen Details
                  </h3>
                  <div className="space-y-3">
                    {kitchen.capacity && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity</span>
                        <span className="font-medium">
                          {safeRender(kitchen.capacity)} people
                        </span>
                      </div>
                    )}

                    {kitchen.squareFootage && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size</span>
                        <span className="font-medium">
                          {safeRender(kitchen.squareFootage)} sq ft
                        </span>
                      </div>
                    )}

                    {kitchen.pricePerHour && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rate</span>
                        <span className="font-medium">
                          ${safeRender(kitchen.pricePerHour)}/hour
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-medium">{rating.score} ⭐</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Reviews</span>
                      <span className="font-medium">{rating.count}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading additional details...</p>
          </div>
        )}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-yellow-600 text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-yellow-800">
                  Limited Google Places Data
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    We couldn't load additional details from Google Places API.
                    Don't worry! We're still showing all available information
                    about this kitchen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
