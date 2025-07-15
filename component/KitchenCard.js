'use client'

import {
  Heart,
  Share2,
  Star,
  Shield,
  Users,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'

export default function KitchenCard({ kitchens, viewType = 'grid' }) {
  const displayKitchens =
    kitchens.length > 0
      ? kitchens.map((kitchen, index) => ({
          id: kitchen.placeId || index,
          name: kitchen.name || kitchen.title,
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
          address: kitchen.street,
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
  return (
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
              src={kitchen.image || '/images/commercial-kitchen-for-rent.jpg'}
              alt={kitchen.name || 'Kitchen image'}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = '/images/commercial-kitchen-for-rent.jpg'
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
                <div className="text-sm text-gray-500">{kitchen.priceType}</div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{kitchen.description}</p>

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
                {kitchen.address}
              </div>
              {/* <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {kitchen.availability}
                      </div> */}
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
  )
}
