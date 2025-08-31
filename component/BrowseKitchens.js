'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, ChevronRight, Users, Building } from 'lucide-react'
import SearchBar from '@/component/SearchBar'

export async function getServerSideProps(context) {
  const { city, state } = context.params
  const events = await fetchEventsFromEventbrite(city, state)

  return {
    props: {
      events,
    },
  }
}

const BrowseKitchensByLocation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className=" text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center  max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Browse Commercial Kitchens by Location
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto mb-8">
              Find commissary kitchens, shared commercial spaces, and ghost
              kitchens in cities across the United States
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Kitchen Searches
            </h2>
            <p className="text-lg text-gray-600">
              Most searched commercial kitchen locations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'New York', state: 'NY', count: 41 },
              { city: 'Los Angeles', state: 'CA', count: 27 },
              { city: 'Washington', state: 'DC', count: 8 },
              { city: 'Houston', state: 'TX', count: 16 },
              { city: 'Miami', state: 'FL', count: 11 },
              { city: 'Atlanta', state: 'GA', count: 13 },
              { city: 'Denver', state: 'CO', count: 15 },
              { city: 'Philadelphia', state: 'PA', count: 24 },
              { city: 'Dallas', state: 'TX', count: 8 },
              { city: 'San Francisco', state: 'CA', count: 10 },
              { city: 'Austin', state: 'TX', count: 28 },
              { city: 'San Antonio', state: 'TX', count: 13 },
              { city: 'San Jose', state: 'CA', count: 13 },
              { city: 'Chicago', state: 'IL', count: 38 },
              { city: 'Pittsburg', state: 'PA', count: 6 },
              { city: 'Phoenix', state: 'AZ', count: 9 },
            ].map((location, index) => (
              <a
                key={index}
                href={`/commercial-kitchen-for-rent/${location.city
                  .toLowerCase()
                  .replace(' ', '-')}/${location.state
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, '-')}`}
                className="group block bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl p-6 transition-all duration-200"
              >
                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {location.city}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{location.state}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                    <Building className="w-4 h-4" />
                    <span>{location.count} kitchens</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Commercial Kitchens Nationwide
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                Our comprehensive directory features commercial kitchen rentals
                in major cities across the United States. Whether you're looking
                for commissary kitchens in California, ghost kitchens in New
                York, or food truck facilities in Texas, we help connect food
                entrepreneurs with licensed commercial kitchen spaces.
              </p>
              <p className="mb-6">
                Each kitchen listing includes detailed information about
                equipment, pricing, availability, and local health department
                compliance. From bakery-specific facilities to large-scale
                catering kitchens, find the perfect commercial space for your
                food business needs.
              </p>
              <p>
                Browse by state and city to discover commercial kitchen rental
                opportunities in your area. All facilities are verified,
                licensed, and ready to help your food business succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowseKitchensByLocation
