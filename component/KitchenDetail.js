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
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import SimpleKitchenMap from './SimpleKitchenMap'
import EnhancedGooglePlacesInfo from './EnhancedGooglePlacesInfo'
import NearbyPlaces from './NearbyPlaces'
import BusinessInsights from './BusinessInsights'
import GooglePlacesTest from '@/component/GooglePlacesAPITestComponent' // adjust path

// Data normalization helper
function normalizeKitchenData(kitchen) {
  return {
    ...kitchen,
    // Standardize place ID fields
    placeId:
      kitchen.placeId ||
      kitchen.place_id ||
      kitchen.googlePlaceId ||
      kitchen.id ||
      null,
    // Standardize rating fields
    rating:
      kitchen.totalScore || kitchen.rating || kitchen.google_rating || null,
    reviewCount:
      kitchen.reviewsCount ||
      kitchen.reviewCount ||
      kitchen.user_ratings_total ||
      0,
    // Standardize name fields
    name:
      kitchen.title || kitchen.name || kitchen.displayName || 'Unknown Kitchen',
    // Standardize address fields
    address:
      kitchen.address ||
      kitchen.formattedAddress ||
      kitchen.full_address ||
      null,
    // Standardize contact fields
    phone:
      kitchen.phone ||
      kitchen.nationalPhoneNumber ||
      kitchen.phoneNumber ||
      null,
    website: kitchen.website || kitchen.websiteUri || kitchen.url || null,
    // Standardize image fields
    imageUrl: kitchen.imageUrl || kitchen.photo || kitchen.image || null,
  }
}

// Helper functions
function formatPhoneNumber(phone) {
  if (!phone) return null
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const number = cleaned.slice(1)
    return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`
  }
  return phone
}

function extractNeighborhood(address) {
  if (!address) return 'Downtown'
  const parts = address.split(',')
  if (parts.length >= 2) {
    return parts[1].trim()
  }
  return 'Downtown'
}

// Image Gallery Component
function ImageGallery({ images, kitchenName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [failedImages, setFailedImages] = useState(new Set())

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-8">
        <div className="text-center text-gray-500">
          <span className="text-4xl mb-2 block">🏢</span>
          <p>No photos available</p>
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

  // If only one image, show it in a simpler layout
  if (images.length === 1) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kitchen Photos</h2>
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
          {failedImages.has(mainPhoto.url) ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <span className="text-6xl mb-4 block">🏢</span>
                <p className="text-lg font-medium">{kitchenName}</p>
                <p className="text-sm">Kitchen Photo</p>
              </div>
            </div>
          ) : (
            <img
              src={mainPhoto.url}
              alt={`${kitchenName} - Kitchen view`}
              className="w-full h-full object-cover"
              onError={() => handleImageError(mainPhoto.url)}
            />
          )}
          {mainPhoto.attribution && !failedImages.has(mainPhoto.url) && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              Photo by {mainPhoto.attribution}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Multiple images layout
  const additionalPhotos = images.slice(1, 4)

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Kitchen Photos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main large photo */}
        <div className="lg:col-span-2 lg:row-span-2 relative">
          <div className="relative h-64 lg:h-full min-h-[300px] rounded-lg overflow-hidden shadow-lg">
            {failedImages.has(mainPhoto.url) ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <span className="text-6xl mb-4 block">🏢</span>
                  <p className="text-lg font-medium">{kitchenName}</p>
                  <p className="text-sm">Main Photo</p>
                </div>
              </div>
            ) : (
              <img
                src={mainPhoto.url}
                alt={`${kitchenName} - Main view`}
                className="w-full h-full object-cover"
                onError={() => handleImageError(mainPhoto.url)}
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
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
                Photo by {mainPhoto.attribution}
              </div>
            )}
          </div>
        </div>

        {/* Additional smaller photos */}
        {additionalPhotos.map((photo, index) => (
          <div key={index} className="lg:col-span-1">
            <button
              onClick={() => setCurrentImageIndex(index + 1)}
              className="block w-full h-32 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {failedImages.has(photo.url) ? (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">🏢</span>
                </div>
              ) : (
                <img
                  src={photo.url}
                  alt={`${kitchenName} - View ${index + 2}`}
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

  console.log('🔍 ReviewsSection Debug:', {
    hasPlaceDetails: !!placeDetails,
    reviewsArray: reviews,
    reviewsLength: reviews.length,
    sampleReview: reviews[0],
  })

  if (reviews.length === 0) {
    // Show fallback with original rating data if available
    if (kitchen.rating && kitchen.reviewCount > 0) {
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
            Customer Reviews
          </h2>
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <Star className="w-8 h-8 text-yellow-400 fill-current mx-auto mb-3" />
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-lg">{kitchen.rating}</span>{' '}
              out of 5 stars
            </p>
            <p className="text-gray-600">
              Based on {kitchen.reviewCount} reviews
            </p>
            {kitchen.website && (
              <div className="mt-4">
                <a
                  href={kitchen.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View Reviews
                </a>
              </div>
            )}
          </div>
        </div>
      )
    }

    // No reviews available at all
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
          Customer Reviews
        </h2>
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
        Customer Reviews ({reviews.length})
      </h2>
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
                  {review.authorAttribution?.displayName || 'Anonymous'}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  Google
                </span>
              </div>
              {review.relativePublishTimeDescription && (
                <span className="text-sm text-gray-500">
                  {review.relativePublishTimeDescription}
                </span>
              )}
            </div>
            {review.text?.text && (
              <p className="text-gray-700 leading-relaxed">
                {review.text.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Kitchen Amenities Component
function KitchenAmenities({ kitchen, placeDetails }) {
  const amenities = []

  if (placeDetails?.types?.includes('restaurant'))
    amenities.push('Restaurant Grade Equipment')
  if (placeDetails?.types?.includes('bakery'))
    amenities.push('Commercial Baking Facilities')
  if (placeDetails?.about?.Parking?.['Free parking garage'])
    amenities.push('Free Parking')
  if (placeDetails?.about?.Accessibility?.['Wheelchair accessible entrance'])
    amenities.push('Wheelchair Accessible')
  if (placeDetails?.about?.Payments?.['Credit cards'])
    amenities.push('Credit Card Payments')

  amenities.push(
    'Professional Grade Equipment',
    'Food Safety Certified',
    'Flexible Scheduling'
  )

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
        Kitchen Features
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Contact Form Component
function ContactForm({ kitchen, placeDetails }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Request Information</h3>
      <form className="space-y-4">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about your kitchen needs..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Send Inquiry
        </button>
      </form>
    </div>
  )
}

// FAQ Component
function KitchenFAQ() {
  const faqs = [
    {
      question: 'What equipment is included?',
      answer:
        'Most commercial kitchens come equipped with professional-grade appliances including multi-burner stoves, large-capacity ovens, stainless-steel prep tables, commercial refrigeration units, and dedicated dishwashing facilities with sanitizing dishwashers and three-compartment sinks.',
    },
    {
      question: 'How do I book time?',
      answer:
        'Contact the facility directly by phone or through their website to inquire about availability. Most kitchens offer flexible rental options including hourly, daily, or monthly rates.',
    },
    {
      question: 'Do I need insurance?',
      answer:
        'Yes, most commercial kitchens require renters to have general liability insurance. Additional coverage may include product liability insurance and adding the kitchen owner as an additional insured.',
    },
    {
      question: 'Are there storage options?',
      answer:
        'Many facilities offer both refrigerated and dry storage options for an additional fee. Storage pricing varies by type and space needed.',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="group">
            <summary className="flex justify-between items-center cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-medium text-gray-900">{faq.question}</span>
              <span className="transform group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="mt-2 p-3 text-gray-700 text-sm leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

export default function KitchenDetail({
  kitchen: rawKitchen,
  initialGoogleData = null,
}) {
  // Normalize the kitchen data first
  const kitchen = normalizeKitchenData(rawKitchen)

  const [placeDetails, setPlaceDetails] = useState(initialGoogleData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('=== KITCHEN DETAIL DEBUG ===')
    console.log('Raw kitchen data:', rawKitchen)
    console.log('Normalized kitchen data:', kitchen)
    console.log('Kitchen placeId:', kitchen.placeId)
    console.log('Initial Google data:', initialGoogleData)
    console.log('Environment:', process.env.NODE_ENV)

    // Skip if we already have data or no place ID
    if (initialGoogleData || !kitchen.placeId) {
      console.log(
        initialGoogleData ? 'Using server-side data' : 'No place ID available'
      )
      return
    }

    async function fetchGooglePlaceDetails() {
      setLoading(true)
      setError(null)

      try {
        console.log('🚀 Fetching Google Place details for:', kitchen.placeId)

        const response = await fetch('/api/google-place-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            placeId: kitchen.placeId,
          }),
        })

        console.log('📡 API Response:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('❌ API Error:', errorText)
          throw new Error(`API Error ${response.status}: ${errorText}`)
        }

        const data = await response.json()
        console.log('📦 API Success:', {
          success: data.success,
          hasPlace: !!data.place,
          hasReviews: !!data.place?.reviews?.length,
          reviewsCount: data.place?.reviews?.length || 0,
        })

        if (data.success && data.place) {
          setPlaceDetails(data.place)
          console.log('✅ Place details set successfully')
        } else {
          console.error('❌ API returned unsuccessful response:', data)
          setError(data.error || 'Failed to fetch place details')
        }
      } catch (err) {
        console.error('💥 Error fetching place details:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGooglePlaceDetails()
  }, [kitchen.placeId, initialGoogleData])

  // Get images from both sources
  const images = []

  if (kitchen.imageUrl) {
    images.push({
      url: kitchen.imageUrl,
      alt: kitchen.name,
      source: 'original',
    })
  }

  if (placeDetails?.photos) {
    placeDetails.photos.forEach((photo, index) => {
      images.push({
        url: photo.url,
        urlLarge: photo.urlLarge,
        alt: `${kitchen.name} - Photo ${index + 1}`,
        source: 'google',
        attribution: photo.authorAttributions?.[0]?.displayName,
      })
    })
  }

  // Combine ratings
  const rating = {
    score: placeDetails?.rating || kitchen.rating || 4.7,
    count: placeDetails?.userRatingCount || kitchen.reviewCount || 23,
    source: placeDetails?.rating ? 'google' : 'original',
  }

  // Get business hours
  const businessHours =
    placeDetails?.currentOpeningHours?.weekdayDescriptions ||
    placeDetails?.regularOpeningHours?.weekdayDescriptions ||
    (kitchen.openingHours
      ? kitchen.openingHours.map((day) => `${day.day}: ${day.hours}`)
      : null)

  const cityName = kitchen.city || 'this location'
  const stateName = kitchen.state || kitchen.us_state || ''

  return (
    <main>
      <div className="container max-w-7xl mx-auto px-4 my-10">
        {/* Kitchen Header */}
        <div>
          <div className="p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {kitchen.name}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Professional Commercial Kitchen in {cityName}, {stateName}
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
                    placeDetails?.businessStatus === 'OPERATIONAL') && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                      ✓ Verified Kitchen
                    </div>
                  )}

                  {placeDetails?.currentOpeningHours?.openNow !== undefined && (
                    <div
                      className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${
                        placeDetails.currentOpeningHours.openNow
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {placeDetails.currentOpeningHours.openNow
                        ? '🟢 Open Now'
                        : '🔴 Closed'}
                    </div>
                  )}

                  {kitchen.capacity && (
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                      <span className="text-blue-600 font-bold">
                        👥 {kitchen.capacity}
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

                {kitchen.website && (
                  <a
                    href={kitchen.website}
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

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Image Gallery */}
                <ImageGallery images={images} kitchenName={kitchen.name} />

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
                          <p className="text-gray-600">{kitchen.address}</p>
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
                              {kitchen.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {kitchen.website && (
                        <div className="flex items-start space-x-3">
                          <span className="text-gray-400 text-xl">🌐</span>
                          <div>
                            <p className="font-medium text-gray-900">Website</p>
                            <a
                              href={kitchen.website}
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

                {/* Kitchen Description */}
                <div>
                  <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                    About This Kitchen
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {kitchen.description ||
                    placeDetails?.editorialSummary?.text ? (
                      <p className="text-gray-700 leading-relaxed">
                        {kitchen.description ||
                          placeDetails.editorialSummary.text}
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
                          {cityName}, {stateName}.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Kitchen Features */}
                <KitchenAmenities
                  kitchen={kitchen}
                  placeDetails={placeDetails}
                />

                {/* Reviews Section */}
                <ReviewsSection placeDetails={placeDetails} kitchen={kitchen} />

                {/* Enhanced Google Places Information */}
                <EnhancedGooglePlacesInfo
                  placeDetails={placeDetails}
                  kitchen={kitchen}
                />

                {/* Business Insights */}
                <BusinessInsights
                  placeDetails={placeDetails}
                  kitchen={kitchen}
                />

                {/* Location & Map */}
                <SimpleKitchenMap
                  kitchen={kitchen}
                  placeDetails={placeDetails}
                />

                {/* Nearby Places */}
                <NearbyPlaces kitchen={kitchen} placeDetails={placeDetails} />

                {/* Opening Hours */}
                {businessHours && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                      Operating Hours
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 gap-2">
                        {businessHours.map((day, index) => {
                          const [dayName, hours] = day.split(': ')
                          return (
                            <div
                              key={index}
                              className="flex justify-between items-center py-1"
                            >
                              <span className="font-medium text-gray-900">
                                {dayName}
                              </span>
                              <span className="text-gray-600">{hours}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Business Types */}
                {(kitchen.tags || placeDetails?.types) && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
                      Kitchen Categories
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {(kitchen.tags || placeDetails.types.slice(0, 8)).map(
                        (type, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            {typeof type === 'string'
                              ? type
                                  .replace(/_/g, ' ')
                                  .replace(/\b\w/g, (l) => l.toUpperCase())
                              : type}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Debug Section */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="bg-gray-100 p-4 rounded-lg mb-8">
                    <h3 className="font-bold mb-2">
                      🔧 Debug Info (Development Only)
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Environment:</strong> {process.env.NODE_ENV}
                      </p>
                      <p>
                        <strong>Kitchen placeId:</strong>{' '}
                        {kitchen.placeId || 'Not available'}
                      </p>
                      <p>
                        <strong>Has placeDetails:</strong>{' '}
                        {placeDetails ? 'Yes' : 'No'}
                      </p>
                      <p>
                        <strong>Has reviews:</strong>{' '}
                        {placeDetails?.reviews?.length > 0
                          ? `Yes (${placeDetails.reviews.length})`
                          : 'No'}
                      </p>
                      <p>
                        <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
                      </p>
                      <p>
                        <strong>Error:</strong> {error || 'None'}
                      </p>
                      <p>
                        <strong>Initial Google Data:</strong>{' '}
                        {initialGoogleData ? 'Yes' : 'No'}
                      </p>
                      <p>
                        <strong>Kitchen rating:</strong>{' '}
                        {kitchen.rating || 'Not available'}
                      </p>
                      <p>
                        <strong>Kitchen reviewCount:</strong>{' '}
                        {kitchen.reviewCount || 'Not available'}
                      </p>
                      <details className="mt-2">
                        <summary className="cursor-pointer font-medium">
                          View Kitchen Object
                        </summary>
                        <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto max-h-40">
                          {JSON.stringify(kitchen, null, 2)}
                        </pre>
                      </details>
                      {placeDetails && (
                        <details className="mt-2">
                          <summary className="cursor-pointer font-medium">
                            View Place Details
                          </summary>
                          <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto max-h-40">
                            {JSON.stringify(placeDetails, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Contact Form */}
                <ContactForm kitchen={kitchen} placeDetails={placeDetails} />

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
                        <span className="font-medium">{kitchen.capacity}</span>
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

                    {placeDetails?.businessStatus && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span
                          className={`font-medium ${
                            placeDetails.businessStatus === 'OPERATIONAL'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {placeDetails.businessStatus === 'OPERATIONAL'
                            ? 'Open'
                            : 'Closed'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading additional details...</p>
          </div>
        )}

        {/* Error State */}
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
                  <p className="mb-2">
                    We couldn't load additional details from Google Places API.
                    This could be because:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The Place ID may be outdated or invalid</li>
                    <li>Google Places API temporarily unavailable</li>
                    <li>The location may have been removed from Google Maps</li>
                  </ul>
                  <p className="mt-3">
                    Don't worry! We're still showing all available information
                    about this kitchen below.
                  </p>
                  {process.env.NODE_ENV === 'development' && (
                    <details className="mt-3">
                      <summary className="cursor-pointer font-medium">
                        Technical Details (Dev)
                      </summary>
                      <p className="mt-1 text-xs bg-yellow-100 p-2 rounded">
                        Error: {error}
                      </p>
                    </details>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <KitchenFAQ />
        <p></p>
        <GooglePlacesTest />
      </div>
    </main>
  )
}
