'use client'

import React, { useState } from 'react'
import Hero from './Hero'

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
  Search,
  Menu,
  X,
  Heart,
  Share2,
  Phone,
  Mail,
  DollarSign,
  Users,
  MapIcon,
} from 'lucide-react'
import BreadCrumbs from './BreadCrumbs'

const CommercialKitchenDirectory = ({
  city = { city },
  state = { state },
  kitchens = [],
  relatedCities = [],
}) => {
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [expandedRegulation, setExpandedRegulation] = useState(null)
  const [showFilters, setShowFilters] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [viewType, setViewType] = useState('grid')

  // Use props data or fallback to sample data
  const displayKitchens =
    kitchens.length > 0
      ? kitchens.map((kitchen, index) => ({
          id: kitchen.placeId || index,
          name: kitchen.title,
          image: kitchen.imageUrl || '/images/commercial-kitchen-for-rent.jpg',
          rating: kitchen.totalScore || 0,
          reviews: kitchen.reviewsCount || 0,
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
          website: kitchen.website,
          address: kitchen.address,
          neighborhood: kitchen.neighborhood,
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

  const events = [
    {
      title: 'Start a Food Truck Workshop',
      date: 'JUL 21',
      time: '2:00 PM',
      location: 'Downtown Denver',
      price: '$45',
    },
    {
      title: 'ServSafe Certification Course',
      date: 'JUL 25',
      time: '9:00 AM',
      location: 'Denver Community College',
      price: '$125',
    },
  ]

  const faqs = [
    {
      question: `
      Do I need a license to use a commercial kitchen in Denver?`,
      answer: `Yes. If you’re preparing food for sale to the public, you’ll need a Retail Food License from the Denver Department of Public Health & Environment (DDPHE). Mobile vendors, caterers, and food producers must comply with local and state regulations.`,
    },
    {
      question: `Can I rent a kitchen in Denver by the hour or just monthly?`,
      answer: `Many shared-use kitchens in Denver offer both hourly and monthly rental options. Hourly rentals are great for early-stage businesses or pop-ups, while monthly memberships work well for high-volume food producers or caterers.`,
    },
    {
      question: `What amenities are typically included in a shared-use kitchen?`,
      answer: `Most kitchens offer prep tables, commercial ovens, refrigerators, cold and dry storage, dishwashing stations, and sometimes specialty equipment (like mixers or smokers). Amenities vary by location — use our filters to compare options.`,
    },
    {
      question: `Is insurance required to use a commissary kitchen?`,
      answer: `Yes. Most kitchens require that you carry general liability insurance (often with $1M coverage) and list the facility as an additional insured. Some may also require product liability or worker’s comp, depending on your business type.`,
    },
    {
      question: `What types of food businesses use commercial kitchens?`,
      answer: `Shared-use kitchens in Denver are used by food trucks, caterers, bakers, ghost kitchens, meal prep businesses, food product startups, and pop-up chefs. They're also great for testing new concepts before opening a brick-and-mortar location.`,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Shared Kitchen Locator
              </h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Browse Kitchens
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Resources
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                List Your Kitchen
              </a>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Sign In
              </button>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-3">
              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Browse Kitchens
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                Resources
              </a>
              <a
                href="#"
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                List Your Kitchen
              </a>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      <BreadCrumbs city={city} state={state} />

      <Hero city={city} state={state} kitchenCount={kitchens.length} />

      {/* Weather Snapshot */}
      {/* <section className="bg-gradient-to-r from-orange-50 to-yellow-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <Thermometer className="w-6 h-6 text-orange-500 mr-3" />
            <p className="text-lg text-gray-700">
              <span className="font-semibold">76°F and sunny</span> in {city}{' '}
              today — perfect weather for outdoor prep work at kitchens with
              patio access.
            </p>
          </div>
        </div>
      </section> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    Filter Results
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                      <option>Any Price</option>
                      <option>$15-25/hour</option>
                      <option>$25-35/hour</option>
                      <option>$35+/hour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amenities
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                      <option>All Amenities</option>
                      <option>24/7 Access</option>
                      <option>Cold Storage</option>
                      <option>Parking Available</option>
                      <option>Loading Dock</option>
                      <option>Outdoor Space</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rental Terms
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                      <option>Any Terms</option>
                      <option>Hourly</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Kitchen Capacity
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                      <option>Any Size</option>
                      <option>1-4 people</option>
                      <option>5-8 people</option>
                      <option>9-12 people</option>
                      <option>12+ people</option>
                    </select>
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors mt-6">
                  Apply Filters
                </button>

                <button className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium mt-2 transition-colors">
                  Clear All Filters
                </button>
              </div>

              {/* Related Cities Tabs */}
              {relatedCities && relatedCities.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Other Cities in {state}
                  </h3>
                  <div className="space-y-2">
                    {relatedCities.slice(0, 6).map((relatedCity, index) => (
                      <a
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
                      </a>
                    ))}
                    {relatedCities.length > 6 && (
                      <button className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                        View All Cities in {state} →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Events Sidebar - Only show on mobile when filters are open */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6 lg:hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-800 rounded-lg p-2 text-center min-w-[50px]">
                          <div className="text-xs font-bold">{event.date}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {event.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {event.time} • {event.location}
                          </p>
                          <span className="text-xs font-medium text-green-600">
                            {event.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Events →
                </button>
              </div>
            </div>
          )}

          {/* Main Listings */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Commercial Kitchens in {city}
                </h2>
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

                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewType === 'grid'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewType === 'list'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    List
                  </button>
                </div>

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
                    <img
                      src={
                        kitchen.image ||
                        '/images/commercial-kitchen-for-rent.jpg'
                      }
                      alt={kitchen.name || 'Kitchen image'}
                      onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src =
                          '/images/commercial-kitchen-for-rent.jpg'
                      }}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewType === 'list' ? 'h-full' : 'h-56'
                      }`}
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
                      <div className="text-right">
                        <div className="text-md font-bold text-gray-900">
                          {kitchen.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {kitchen.priceType}
                        </div>
                      </div>
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
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {kitchen.capacity}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {kitchen.distance}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {kitchen.availability}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      {kitchen.phone && (
                        <button className="px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                      )}
                      {kitchen.website && (
                        <button className="px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                Load More Kitchens
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Showing {displayKitchens.length} results
              </p>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-20 space-y-16">
          {/* Events Section - Now in main content area */}
          <section className="hidden lg:block">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Upcoming Events for Food Entrepreneurs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-blue-100 text-blue-800 rounded-xl p-3 text-center min-w-[60px]">
                      <div className="text-sm font-bold">{event.date}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{event.time}</p>
                      <p className="text-sm text-gray-500 mb-3">
                        {event.location}
                      </p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        {event.price}
                      </span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    Register Now
                  </button>
                </div>
              ))}

              {/* Additional event placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-purple-100 text-purple-800 rounded-xl p-3 text-center min-w-[60px]">
                    <div className="text-sm font-bold">AUG 3</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">
                      Denver Local Makers Market
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">8:00 AM</p>
                    <p className="text-sm text-gray-500 mb-3">Union Station</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Free
                    </span>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                  Register Now
                </button>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                View All Events on Eventbrite →
              </button>
            </div>
          </section>

          {/* Tools & Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Tools & Resources for Food Entrepreneurs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="#"
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ServSafe Certification
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Get certified and meet health department requirements.
                </p>
                <span className="text-blue-600 font-medium text-sm">
                  Learn More →
                </span>
              </a>

              <a
                href="#"
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Business Formation
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Start your LLC and get your business registered.
                </p>
                <span className="text-blue-600 font-medium text-sm">
                  Get Started →
                </span>
              </a>

              <a
                href="#"
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Kitchen Insurance
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Protect your business with liability coverage.
                </p>
                <span className="text-blue-600 font-medium text-sm">
                  Compare Plans →
                </span>
              </a>
            </div>
          </section>

          {/* Regulations Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {city} Food Business Regulations
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="border-b">
                <button
                  onClick={() =>
                    setExpandedRegulation(expandedRegulation === 0 ? null : 0)
                  }
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-gray-900">
                    Food Handler's License
                  </h3>
                  {expandedRegulation === 0 ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedRegulation === 0 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 mb-3">
                      All food service workers must obtain a food handler's
                      license within 30 days of employment. ServSafe
                      certification is accepted statewide.
                    </p>
                    <a
                      href="#"
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Get ServSafe Certified →
                    </a>
                  </div>
                )}
              </div>

              <div className="border-b">
                <button
                  onClick={() =>
                    setExpandedRegulation(expandedRegulation === 1 ? null : 1)
                  }
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-gray-900">
                    Sales Tax License
                  </h3>
                  {expandedRegulation === 1 ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedRegulation === 1 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 mb-3">
                      Register with the {city} Department of Finance for sales
                      tax collection. Required for all food sales within city
                      limits.
                    </p>
                    <a
                      href="#"
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {city} Finance Dept. →
                    </a>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() =>
                    setExpandedRegulation(expandedRegulation === 2 ? null : 2)
                  }
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-gray-900">
                    Cottage Food Law
                  </h3>
                  {expandedRegulation === 2 ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedRegulation === 2 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 mb-3">
                      Colorado allows certain low-risk foods to be prepared in
                      home kitchens. Annual sales limited to $5,000.
                    </p>
                    <div className="space-y-2">
                      <a
                        href="#"
                        className="block text-blue-600 hover:text-blue-700 text-sm"
                      >
                        CO Cottage Food Guide →
                      </a>
                      <a
                        href="#"
                        className="block text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Approved Food List →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Blog Previews */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Learn More About {city} Food Business
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="#"
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <ExternalLink className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Starting a Food Business in {city}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Complete guide to launching your culinary venture in {city}.
                </p>
                <span className="text-blue-600 font-medium text-sm">
                  Read More →
                </span>
              </a>

              <a
                href="#"
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Shared Kitchen vs. Commissary
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Understanding the differences and choosing what's right for
                  your business.
                </p>
                <span className="text-blue-600 font-medium text-sm">
                  Learn More →
                </span>
              </a>

              <a
                href="#"
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Common Kitchen Rental Mistakes
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Avoid these pitfalls when renting your first commercial
                  kitchen space.
                </p>
                <span className="text-blue-600 font-medium text-sm">
                  Read Guide →
                </span>
              </a>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-stone-100 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-stone-200 transition-colors"
                >
                  <h3 className="font-bold text-gray-900 text-lg pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {expandedFaq === index ? (
                      <ChevronDown className="w-6 h-6 text-gray-700 transform rotate-180 transition-transform" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-700 transition-transform" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 bg-white">
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Can't find the perfect kitchen?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Help us expand our directory or get notified when new kitchens
            become available in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors text-lg">
              💬 Suggest a Kitchen
            </button>
            <button className="px-8 py-4 border border-gray-600 hover:bg-gray-800 rounded-xl font-semibold transition-colors text-lg">
              🔔 Get Notified
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Shared Kitcehn Locator
              </h3>
              <p className="text-gray-400 mb-4 max-w-md">
                The leading marketplace for commercial kitchen rentals. Find
                verified, professional kitchen spaces for your food business.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Renters</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Browse Kitchens
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Resources
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Kitchen Owners</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  List Your Kitchen
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Owner Dashboard
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Shared Kitcehn Locator. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CommercialKitchenDirectory
