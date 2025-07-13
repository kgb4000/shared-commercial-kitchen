'use client'

import { Search } from 'lucide-react'
import SearchBar from './SearchBar'

export default function Hero({ city, state, kitchenCount }) {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Commercial Kitchen
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover verified shared-use, ghost, and commissary kitchens in{' '}
            <span className="font-semibold">
              {city}, {state.toUpperCase()}
            </span>
            . Flexible pricing, professional amenities, available 24/7.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <SearchBar />
            </div>
          </div>

          {/* <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {kitchenCount}
              </div>
              <div className="text-gray-600">Verified Kitchens</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">Available Access</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">$20+</div>
              <div className="text-gray-600">Starting Price</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}
