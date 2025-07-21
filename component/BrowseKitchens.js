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
  // Comprehensive state and city data
  // const locationData = {
  //   California: {
  //     cities: [
  //       { name: 'Los Angeles', count: 234 },
  //       { name: 'San Francisco', count: 189 },
  //       { name: 'San Diego', count: 156 },
  //       { name: 'Sacramento', count: 98 },
  //       { name: 'Oakland', count: 87 },
  //       { name: 'San Jose', count: 76 },
  //       { name: 'Fresno', count: 45 },
  //       { name: 'Long Beach', count: 43 },
  //       { name: 'Bakersfield', count: 34 },
  //       { name: 'Anaheim', count: 32 },
  //     ],
  //   },
  //   'New York': {
  //     cities: [
  //       { name: 'New York City', count: 345 },
  //       { name: 'Buffalo', count: 89 },
  //       { name: 'Rochester', count: 67 },
  //       { name: 'Yonkers', count: 54 },
  //       { name: 'Syracuse', count: 43 },
  //       { name: 'Albany', count: 38 },
  //       { name: 'New Rochelle', count: 29 },
  //       { name: 'Mount Vernon', count: 24 },
  //       { name: 'Schenectady', count: 19 },
  //       { name: 'Utica', count: 16 },
  //     ],
  //   },
  //   Texas: {
  //     cities: [
  //       { name: 'Houston', count: 267 },
  //       { name: 'Dallas', count: 234 },
  //       { name: 'Austin', count: 198 },
  //       { name: 'San Antonio', count: 156 },
  //       { name: 'Fort Worth', count: 134 },
  //       { name: 'El Paso', count: 89 },
  //       { name: 'Arlington', count: 76 },
  //       { name: 'Corpus Christi', count: 54 },
  //       { name: 'Plano', count: 43 },
  //       { name: 'Lubbock', count: 38 },
  //     ],
  //   },
  //   Florida: {
  //     cities: [
  //       { name: 'Miami', count: 234 },
  //       { name: 'Jacksonville', count: 189 },
  //       { name: 'Tampa', count: 167 },
  //       { name: 'Orlando', count: 145 },
  //       { name: 'St. Petersburg', count: 98 },
  //       { name: 'Hialeah', count: 76 },
  //       { name: 'Tallahassee', count: 65 },
  //       { name: 'Fort Lauderdale', count: 54 },
  //       { name: 'Port St. Lucie', count: 43 },
  //       { name: 'Cape Coral', count: 38 },
  //     ],
  //   },
  //   Illinois: {
  //     cities: [
  //       { name: 'Chicago', count: 289 },
  //       { name: 'Aurora', count: 67 },
  //       { name: 'Rockford', count: 54 },
  //       { name: 'Joliet', count: 43 },
  //       { name: 'Naperville', count: 38 },
  //       { name: 'Springfield', count: 34 },
  //       { name: 'Peoria', count: 29 },
  //       { name: 'Elgin', count: 24 },
  //       { name: 'Waukegan', count: 19 },
  //       { name: 'Cicero', count: 16 },
  //     ],
  //   },
  //   Pennsylvania: {
  //     cities: [
  //       { name: 'Philadelphia', count: 198 },
  //       { name: 'Pittsburgh', count: 134 },
  //       { name: 'Allentown', count: 67 },
  //       { name: 'Erie', count: 45 },
  //       { name: 'Reading', count: 38 },
  //       { name: 'Scranton', count: 34 },
  //       { name: 'Bethlehem', count: 29 },
  //       { name: 'Lancaster', count: 24 },
  //       { name: 'Harrisburg', count: 19 },
  //       { name: 'Altoona', count: 16 },
  //     ],
  //   },
  //   Ohio: {
  //     cities: [
  //       { name: 'Columbus', count: 167 },
  //       { name: 'Cleveland', count: 145 },
  //       { name: 'Cincinnati', count: 134 },
  //       { name: 'Toledo', count: 76 },
  //       { name: 'Akron', count: 65 },
  //       { name: 'Dayton', count: 54 },
  //       { name: 'Parma', count: 32 },
  //       { name: 'Canton', count: 29 },
  //       { name: 'Youngstown', count: 24 },
  //       { name: 'Lorain', count: 19 },
  //     ],
  //   },
  //   Georgia: {
  //     cities: [
  //       { name: 'Atlanta', count: 234 },
  //       { name: 'Augusta', count: 89 },
  //       { name: 'Columbus', count: 67 },
  //       { name: 'Savannah', count: 54 },
  //       { name: 'Athens', count: 43 },
  //       { name: 'Sandy Springs', count: 38 },
  //       { name: 'Roswell', count: 32 },
  //       { name: 'Macon', count: 29 },
  //       { name: 'Johns Creek', count: 24 },
  //       { name: 'Albany', count: 19 },
  //     ],
  //   },
  //   'North Carolina': {
  //     cities: [
  //       { name: 'Charlotte', count: 189 },
  //       { name: 'Raleigh', count: 156 },
  //       { name: 'Greensboro', count: 98 },
  //       { name: 'Durham', count: 87 },
  //       { name: 'Winston-Salem', count: 76 },
  //       { name: 'Fayetteville', count: 54 },
  //       { name: 'Cary', count: 43 },
  //       { name: 'Wilmington', count: 38 },
  //       { name: 'High Point', count: 32 },
  //       { name: 'Asheville', count: 29 },
  //     ],
  //   },
  //   Michigan: {
  //     cities: [
  //       { name: 'Detroit', count: 198 },
  //       { name: 'Grand Rapids', count: 98 },
  //       { name: 'Warren', count: 76 },
  //       { name: 'Sterling Heights', count: 65 },
  //       { name: 'Lansing', count: 54 },
  //       { name: 'Ann Arbor', count: 43 },
  //       { name: 'Flint', count: 38 },
  //       { name: 'Dearborn', count: 32 },
  //       { name: 'Livonia', count: 29 },
  //       { name: 'Westland', count: 24 },
  //     ],
  //   },
  //   'New Jersey': {
  //     cities: [
  //       { name: 'Newark', count: 145 },
  //       { name: 'Jersey City', count: 134 },
  //       { name: 'Paterson', count: 89 },
  //       { name: 'Elizabeth', count: 76 },
  //       { name: 'Edison', count: 65 },
  //       { name: 'Woodbridge', count: 54 },
  //       { name: 'Lakewood', count: 43 },
  //       { name: 'Toms River', count: 38 },
  //       { name: 'Hamilton', count: 32 },
  //       { name: 'Trenton', count: 29 },
  //     ],
  //   },
  //   Virginia: {
  //     cities: [
  //       { name: 'Virginia Beach', count: 134 },
  //       { name: 'Norfolk', count: 98 },
  //       { name: 'Chesapeake', count: 87 },
  //       { name: 'Richmond', count: 76 },
  //       { name: 'Newport News', count: 54 },
  //       { name: 'Alexandria', count: 43 },
  //       { name: 'Hampton', count: 38 },
  //       { name: 'Portsmouth', count: 32 },
  //       { name: 'Suffolk', count: 29 },
  //       { name: 'Roanoke', count: 24 },
  //     ],
  //   },
  // }

  // const allStates = Object.keys(locationData).sort()
  // const filteredStates = selectedState === 'all' ? allStates : [selectedState]

  const getTotalKitchens = (cities) => {
    return cities.reduce((total, city) => total + city.count, 0)
  }

  const getFilteredCities = (cities) => {
    if (!searchQuery) return cities
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

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

      {/* State Filter */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-700 font-semibold mr-4">
              Filter by State:
            </span>
            <button
              onClick={() => setSelectedState('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedState === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All States
            </button>
            {allStates.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedState === state
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>
      </div> */}

      {/* States and Cities Grid */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {filteredStates.map((state) => {
            const stateData = locationData[state]
            const filteredCities = getFilteredCities(stateData.cities)

            if (filteredCities.length === 0 && searchQuery) return null

            return (
              <div
                key={state}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
                        <Building className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{state}</h2>
                        <p className="text-blue-100">
                          {getTotalKitchens(stateData.cities)} commercial
                          kitchens available
                        </p>
                      </div>
                    </div>
                    <a
                      href={`/kitchens/${state
                        .toLowerCase()
                        .replace(' ', '-')}`}
                      className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
                    >
                      View All in {state}
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredCities.map((city) => (
                      <a
                        key={city.name}
                        href={`/kitchens/${state
                          .toLowerCase()
                          .replace(' ', '-')}/${city.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, '-')}`}
                        className="group block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg transition-colors">
                              <MapPin className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {city.name}
                              </h3>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Users className="w-3 h-3" />
                                <span>{city.count} kitchens</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div> */}

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
              { city: 'New York', state: 'NY', count: 345 },
              { city: 'Los Angeles', state: 'CA', count: 234 },
              { city: 'Chicago', state: 'IL', count: 289 },
              { city: 'Houston', state: 'TX', count: 267 },
              { city: 'Miami', state: 'FL', count: 234 },
              { city: 'Atlanta', state: 'GA', count: 234 },
              { city: 'Denver', state: 'CO', count: 234 },
              { city: 'Philadelphia', state: 'PA', count: 198 },
              { city: 'Dallas', state: 'TX', count: 234 },
              { city: 'San Francisco', state: 'CA', count: 234 },
              { city: 'Austin', state: 'TX', count: 234 },
              { city: 'San Antonio', state: 'TX', count: 234 },
              { city: 'San Jose', state: 'CA', count: 234 },
              { city: 'Chicago', state: 'IL', count: 234 },
              { city: 'Pittsburg', state: 'PA', count: 234 },
              { city: 'Phoenix', state: 'AZ', count: 234 },
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
