'use client'

import React, { useState } from 'react'
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
import SearchBar from '@/component/SearchBar'
import Header from '@/component/Header'
import Hero from '@/component/Hero'

const CommercialKitchenDirectory = ({
  city,
  state,
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
          image: kitchen.imageUrl || '/api/placeholder/400/280',
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
      question:
        "What's the difference between shared-use and commissary kitchens?",
      answer:
        'Shared-use kitchens are rented by the hour for immediate preparation, while commissary kitchens offer longer-term storage and wholesale food preparation with monthly agreements.',
    },
    {
      question: 'Can I store my ingredients overnight?',
      answer:
        'Most kitchens offer cold storage options for an additional fee. Check individual kitchen policies for overnight storage availability and pricing.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-2xl mx-auto">
              Find Commercial Kitchens for Rent in Your City
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block"></span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              Discover verified shared-use, ghost, and commissary kitchens
              Flexible pricing, and professional amenities
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Additional Sections */}
        <div className="mt-20 space-y-16">
          {/* What is the Shared Commercial Kitchens Locator */}
          <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl lg:text-5xl font-bold mb-10 text-center max-w-4xl mx-auto">
                What is the Shared Commercial Kitchens Locator?
              </h2>
              <p className="py-4 text-center max-w-4xl mx-auto leading-relaxed text-xl text-gray-700">
                The Shared Commercial Kitchens Locator is the premier platform
                connecting culinary entrepreneurs with{' '}
                <strong>commercial kitchen rental</strong> opportunities across
                the country. Whether you're a chef launching a catering
                business, a baker starting a specialty bakery, or a food truck
                owner seeking commissary kitchen space, we help you find the
                perfect <strong>shared-use commercial kitchen</strong> to
                legally operate and grow your food business.
              </p>
              <p className="py-4 text-center max-w-4xl mx-auto leading-relaxed text-xl text-gray-700">
                Our curated network of{' '}
                <strong>FDA-approved commissary kitchens</strong> and{' '}
                <strong>licensed commercial kitchen spaces</strong> ensures you
                can focus on what you do best – creating amazing food – while we
                handle finding you the right culinary workspace.
              </p>
            </div>
          </section>

          {/* Three Feature Cards */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-10">
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Find Commercial Kitchen Rentals
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Connect with commissary kitchen spaces and shared commercial
                    kitchens available for hourly, daily, or monthly rental.
                    Perfect for chefs, caterers, bakers, food trucks, and food
                    entrepreneurs seeking licensed kitchen space.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Licensed & Health Code Compliant
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    All kitchens meet commercial kitchen health codes and
                    licensing requirements, helping you stay compliant with
                    local regulations and avoid costly shutdowns or fines.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Professional Kitchen Equipment & Storage
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Access commercial-grade kitchen equipment, walk-in coolers,
                    freezers, dry storage, and cleaning supplies without the
                    massive upfront investment of building your own facility.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding Shared-Use Commercial Kitchens */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl lg:text-5xl font-bold mb-10 text-center max-w-4xl mx-auto">
                Understanding Shared-Use Commercial Kitchens
              </h2>
              <div className="grid md:grid-cols-2 gap-14 mb-20">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    What is a Commissary Kitchen?
                  </h3>
                  <p className="py-2 leading-relaxed text-lg text-gray-700">
                    A <strong>commissary kitchen</strong> (also called a{' '}
                    <strong>shared-use commercial kitchen</strong>) is a
                    professionally licensed facility where multiple food
                    businesses can prepare, cook, and package their products.
                    These <strong>commercial kitchen rentals</strong> provide
                    all the equipment, storage, and workspace needed to operate
                    a food business legally.
                  </p>
                  <p className="py-2 leading-relaxed text-lg text-gray-700">
                    Unlike home kitchens, commissary kitchens meet strict health
                    department regulations and FDA guidelines, allowing you to
                    sell your products to the public, supply restaurants, or
                    operate a food truck business.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Who Uses Commercial Kitchen Space?
                  </h3>
                  <div className="space-y-3">
                    <p className="leading-relaxed text-lg text-gray-700">
                      🍰 <strong>Bakeries and pastry chefs</strong> creating
                      specialty desserts
                    </p>
                    <p className="leading-relaxed text-lg text-gray-700">
                      🚚 <strong>Food truck operators</strong> preparing mobile
                      menu items
                    </p>
                    <p className="leading-relaxed text-lg text-gray-700">
                      🍽️ <strong>Caterers</strong> handling events and corporate
                      dining
                    </p>
                    <p className="leading-relaxed text-lg text-gray-700">
                      🏪 <strong>Specialty food producers</strong> making
                      sauces, snacks, and packaged goods
                    </p>
                    <p className="leading-relaxed text-lg text-gray-700">
                      👨‍🍳 <strong>Personal chefs</strong> preparing meal prep
                      services
                    </p>
                    <p className="leading-relaxed text-lg text-gray-700">
                      🥘 <strong>Ghost kitchen operators</strong> running
                      delivery-only restaurants
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Box */}
              <div className="border-2 border-gray-200 p-14 rounded-3xl bg-gray-50">
                <h3 className="text-3xl font-bold mb-10 text-center max-w-md mx-auto text-gray-900">
                  Commercial Kitchen Rental vs. Building Your Own
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-4xl mx-auto">
                  <div>
                    <h4 className="text-2xl font-bold mb-6 text-gray-900">
                      Building Your Own Kitchen
                    </h4>
                    <div className="space-y-3">
                      <p className="leading-relaxed text-lg text-gray-700">
                        ❌ $150,000+ initial investment
                      </p>
                      <p className="leading-relaxed text-lg text-gray-700">
                        ❌ 6-12 months construction time
                      </p>
                      <p className="leading-relaxed text-lg text-gray-700">
                        ❌ Permits, inspections, licensing
                      </p>
                      <p className="leading-relaxed text-lg text-gray-700">
                        ❌ Equipment maintenance costs
                      </p>
                      <p className="leading-relaxed text-lg text-gray-700">
                        ❌ Utilities, insurance, taxes
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-6 text-gray-900">
                      Renting Kitchen Space
                    </h4>
                    <div className="space-y-3">
                      <p className="leading-relaxed text-lg text-gray-700">
                        ✅ Start cooking immediately
                      </p>
                      <p className="leading-relaxed text-lg text-gray-700">
                        ✅ Pay only for time used
                      </p>
                      <p className="leading-relaxed text-lg text-gray-700">
                        ✅ Professional equipment included
                      </p>
                      <p className="leading-relaxed text-lg text-gray-700">
                        ✅ Maintenance handled by facility
                      </p>
                      <p className="leading-relaxed text-lg text-gray-700">
                        ✅ Compliance assistance provided
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Shared-Use Kitchens */}
          <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl lg:text-5xl font-bold mb-10 text-center max-w-4xl mx-auto text-gray-900">
                Why Choose Shared-Use Kitchens?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="border-2 border-gray-200 p-8 rounded-3xl text-center bg-white hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Lower Costs
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    No equipment purchases, maintenance, or utility bills to
                    worry about.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl text-center bg-white hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Community
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Network with fellow food entrepreneurs and share knowledge.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl text-center bg-white hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Fast Start
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Start cooking immediately without lengthy setup processes.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl text-center bg-white hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">📈</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Scale Easily
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Grow your business with flexible space and incubator
                    programs.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl text-center bg-white hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Stay Compliant
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Professionally managed kitchens ensure health code
                    compliance.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl text-center bg-white hover:shadow-lg transition-shadow">
                  <div className="text-6xl mb-4">🔧</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Pro Equipment
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Access commercial-grade equipment maintained by
                    professionals.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Commercial Kitchen Solutions */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl lg:text-5xl font-bold mb-10 text-center max-w-4xl mx-auto text-gray-900">
                Commercial Kitchen Solutions for Every Food Business
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Catering Companies
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Find commercial kitchen space for catering with
                    large-capacity equipment, ample prep areas, and storage for
                    serving materials. Perfect for wedding caterers, corporate
                    dining, and special event food service.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Food Truck Operators
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Access commissary kitchen space for food trucks with the
                    prep space and storage needed for mobile food operations.
                    Meet health department requirements for food truck
                    licensing.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Bakeries & Pastry Shops
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Find commercial baking kitchen rentals with professional
                    ovens, mixers, and temperature-controlled storage for
                    artisan breads, cakes, and specialty pastries.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Specialty Food Producers
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Rent commercial kitchen space for manufacturing sauces,
                    snacks, beverages, and packaged goods. Access co-packing
                    services and FDA-compliant production facilities.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Ghost Kitchens
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Launch delivery-only restaurants and virtual brands with
                    flexible commercial kitchen rentals designed for high-volume
                    order fulfillment and multi-brand operations.
                  </p>
                </div>
                <div className="border-2 border-gray-200 p-8 rounded-3xl hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Personal Chefs & Meal Prep
                  </h3>
                  <p className="leading-relaxed text-lg text-gray-700">
                    Book commercial kitchen space by the hour for meal
                    preparation services, personal chef operations, and
                    subscription meal businesses.
                  </p>
                </div>
              </div>
            </div>
          </section>

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
                KitchenHub
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
            <p>&copy; 2025 KitchenHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CommercialKitchenDirectory
