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

export default function KitchenCard({ kitchen, viewType = 'grid' }) {
  return (
    <div className="group relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Image & Action Buttons */}
      <div className="relative">
        <img
          src={kitchen.imageUrl || '/images/commercial-kitchen-for-rent.jpg'}
          alt={kitchen.name || 'Kitchen image'}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/images/default-kitchen.jpg'
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
            {kitchen.availability || 'Available'}
          </span>
        </div>
      </div>

      {/* Info Section */}
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
                  {kitchen.totalScore ?? '4.8'}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  ({kitchen.reviewsCount ?? 0} reviews)
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
            <div className="text-2xl font-bold text-gray-900">
              {kitchen.price || '$40/hr'}
            </div>
            <div className="text-sm text-gray-500">
              {kitchen.priceType || 'Hourly'}
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {kitchen.description || 'No description provided.'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {kitchen.tags?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {kitchen.tags?.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
              +{kitchen.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {kitchen.capacity || 'Varies'}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {kitchen.address}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Open 24 Hours
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            View Details
          </button>
          <button className="px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button className="px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
