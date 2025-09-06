'use client'

import React, { useState, useEffect } from 'react'
import Hero from './Hero'
import Link from 'next/link'
import { slugify } from '@/lib/slugify'

import {
  MapPin,
  Clock,
  Thermometer,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  Star,
  Shield,
  ExternalLink,
  Check,
  Menu,
  X,
  Axe,
  Heart,
  Share2,
  Phone,
  Mail,
  DollarSign,
  Users,
  MapIcon,
} from 'lucide-react'
import BreadCrumbs from './BreadCrumbs'
import AdSenseAd from './AdSenseAd'
import OptimizedImage from './OptimizedImage'

const CommercialKitchenDirectory = ({
  city = { city },
  state = { state },
  kitchens = [],
  relatedCities = [],
}) => {
  const [showFilters, setShowFilters] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const [viewType, setViewType] = useState('grid')

  const baseUrl = process.env.BASE_URL
    ? `https://${process.env.BASE_URL}`
    : 'http://localhost:3000'

  // Use props data or fallback to sample data
  const displayKitchens =
    kitchens.length > 0
      ? kitchens.map((kitchen, index) => ({
          id: kitchen.placeId || index,
          name: kitchen.name || kitchen.title,
          image:
            kitchen.imageUrl ||
            kitchen.photo ||
            '/images/commercial-kitchen-for-rent.jpg',
          rating: kitchen.totalScore || kitchen.rating || 0,
          reviews: kitchen.reviewsCount || kitchen.reviews || 0,
          tags: kitchen.tags || [],
          price: kitchen.price || 'Contact for pricing',
          priceType: kitchen.price ? 'per hour' : '',
          verified: kitchen.totalScore > 4.0,
          distance: `${kitchen.neighborhood || kitchen.city} • ${
            kitchen.street
          }`,
          description:
            kitchen.description ||
            'Commercial kitchen space available for rent.',
          featured: index === 0,
          capacity:
            kitchen.categoryName === 'Shared-use commercial kitchen'
              ? 'Industrial scale'
              : 'Variable',
          availability: kitchen.hours || 'Contact for hours',
          phone: kitchen.phone,
          website: kitchen.website || kitchen.site,
          address: kitchen.street,
          neighborhood: kitchen.neighborhood,
          city: kitchen.city,
          state: kitchen.state,
        }))
      : [
          // Fallback sample data
          {
            id: 1,
            name: 'Sample Kitchen',
            image: '/api/placeholder/400/280',
            rating: 4.5,
            reviews: 25,
            tags: ['24/7 Access', 'Equipment Included'],
            price: '$25',
            priceType: 'per hour',
            verified: true,
            distance: 'Downtown',
            description: 'Sample commercial kitchen for demonstration.',
            featured: true,
            capacity: '8-12 people',
            availability: 'Available Today',
          },
        ]

  const faqs = []

  function getSlug(kitchen) {
    return (
      kitchen.name ||
      kitchen.title
        ?.toLowerCase()
        .replace(/\s+/g, '-') // replace spaces with dashes
        .replace(/[^\w-]+/g, '')
    ) // remove special characters
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadCrumbs city={city} state={state} />

      {/* <Hero city={city} state={state} kitchenCount={kitchens.length} /> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              {relatedCities && relatedCities.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Find More Kitchens for Rent in {state}
                  </h3>
                  <div className="space-y-2">
                    {relatedCities.slice(0, 6).map((relatedCity, index) => (
                      <Link
                        key={index}
                        href={relatedCity.url}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group border border-transparent"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                            <MapPin className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">
                              {relatedCity.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              Commercial Kitchens
                            </p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    ))}
                    {relatedCities.length > 6 && (
                      <button className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                        View All Cities in {state} →
                      </button>
                    )}
                  </div>
                </div>
              )}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                <p className="font-bold mb-4">Resources</p>
                <div className="flex self-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
                  <div className="text-sm">
                    <Link href="/resources/nutrition-label-maker">
                      Nutrition Label Maker
                    </Link>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="flex self-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
                  <div className="text-sm">
                    <Link href="/resources/recipe-cost-tracker">
                      Kitchen Recipe Cost Tracker
                    </Link>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="flex self-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
                  <div className="text-sm">
                    <Link href="/resources/food-expiration-date-checker">
                      Food Expiration Date Checker
                    </Link>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>
          )}

          {/* Main Listings */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 max-w-sm">
                  Commercial Kitchen for Rent in {city}
                </h1>
                <p className="text-gray-600">
                  Showing {displayKitchens.length} verified kitchens
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Map Toggle */}
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
                >
                  <MapIcon className="w-4 h-4 mr-2" />
                  {showMap ? 'Hide Map' : 'Show Map'}
                </button>
              </div>
            </div>

            {/* Map */}
            {showMap && (
              <div className="bg-gray-200 rounded-2xl h-80 mb-6 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapIcon className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map Goes Here</p>
                  <p className="text-sm">Google Maps Integration</p>
                </div>
              </div>
            )}

            {/* Kitchen Listings */}
            <div
              className={
                viewType === 'grid'
                  ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
                  : 'space-y-6'
              }
            >
              {displayKitchens.map((kitchen) => (
                <div
                  key={kitchen.id}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                    viewType === 'list' ? 'flex' : ''
                  }`}
                >
                  {kitchen.featured && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full">
                      Featured
                    </div>
                  )}

                  <div
                    className={`relative ${
                      viewType === 'list' ? 'w-80 flex-shrink-0' : ''
                    }`}
                  >
                    <OptimizedImage
                      src={kitchen.image}
                      alt={kitchen.name || kitchen.title || 'Kitchen image'}
                      width={300}
                      height={200}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewType === 'list' ? 'h-full' : 'h-56'
                      }`}
                      fallbackSrc="/images/kitchen-placeholder.svg"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {kitchen.availability}
                      </span>
                    </div>
                  </div>

                  <div className={`p-6 ${viewType === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {kitchen.name}
                        </h3>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900 ml-1">
                              {kitchen.rating}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              ({kitchen.reviews} reviews)
                            </span>
                          </div>
                          {kitchen.verified && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      {/* <div className="text-right">
                        <div className="text-md font-bold text-gray-900">
                          {kitchen.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {kitchen.priceType}
                        </div>
                      </div> */}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {kitchen.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      {kitchen.tags &&
                        kitchen.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      {kitchen.tags && kitchen.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                          +{kitchen.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      {/* <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {kitchen.capacity}
                      </div> */}
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {kitchen.address}, {kitchen.city}
                      </div>
                      {/* <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {kitchen.availability}
                      </div> */}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/commercial-kitchen-for-rent/${slugify(
                          city
                        )}/${slugify(state)}/kitchen/${slugify(
                          kitchen.title || kitchen.name
                        )}`}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-center"
                      >
                        View Details
                      </Link>
                      {kitchen.phone && (
                        <a
                          href={`tel:${kitchen.phone}`}
                          className="px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
                      {kitchen.website && (
                        <a
                          href={kitchen.website}
                          target="_blank"
                          className="px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              {/* <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                Load More Kitchens
              </button> */}
              <p className="text-sm text-gray-500 mt-2">
                Showing {displayKitchens.length} results
              </p>
            </div>
            <div className="my-8">
              <p>Ads</p>
              <AdSenseAd />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommercialKitchenDirectory
