'use client'

import { MapPin, TrendingUp, Users, DollarSign, Utensils, Star } from 'lucide-react'

const NeighborhoodGuide = ({ kitchen, cityInsights }) => {
  const neighborhood = kitchen.neighborhood || kitchen.city
  const city = kitchen.city
  const state = kitchen.state

  // Generate neighborhood-specific insights
  const neighborhoodData = {
    demographics: {
      population: cityInsights?.residents?.count || '50K+',
      medianIncome: cityInsights?.income?.median || '$75K',
      businesses: '200+ food businesses'
    },
    foodScene: {
      restaurants: '150+ restaurants',
      foodTrucks: '25+ food trucks', 
      farmers_markets: '3 weekly markets'
    },
    businessOpportunity: {
      deliveryDemand: cityInsights?.businessOpportunity?.deliveryGrowth || 'High',
      competition: 'Moderate',
      startup_costs: cityInsights?.businessOpportunity?.startupCost || '$45K'
    }
  }

  const advantages = [
    'High foot traffic area',
    'Easy highway access',
    'Nearby supplier networks',
    'Established food scene',
    'Parking availability',
    'Public transportation access'
  ]

  const nearbyBusinesses = [
    { name: 'Restaurant Supply Co.', type: 'Equipment & Supplies', distance: '0.5 mi' },
    { name: 'Fresh Market Distributors', type: 'Food Wholesale', distance: '0.8 mi' },
    { name: 'City Permits Office', type: 'Licensing', distance: '1.2 mi' },
    { name: 'Food Safety Training', type: 'Certification', distance: '0.3 mi' }
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Neighborhood Guide</h3>
        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
          {neighborhood}
        </span>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <Users className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-sm text-gray-600">Population</p>
          <p className="text-lg font-bold text-blue-700">{neighborhoodData.demographics.population}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600 mb-2" />
          <p className="text-sm text-gray-600">Median Income</p>
          <p className="text-lg font-bold text-green-700">{neighborhoodData.demographics.medianIncome}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
          <Utensils className="w-5 h-5 text-purple-600 mb-2" />
          <p className="text-sm text-gray-600">Food Businesses</p>
          <p className="text-lg font-bold text-purple-700">{neighborhoodData.demographics.businesses}</p>
        </div>
      </div>

      {/* Food Scene Overview */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          Local Food Scene
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Restaurants</span>
            <span className="font-medium">{neighborhoodData.foodScene.restaurants}</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Food Trucks</span>
            <span className="font-medium">{neighborhoodData.foodScene.foodTrucks}</span>
          </div>
          <div className="flex justify-between p-2 bg-gray-50 rounded">
            <span>Farmers Markets</span>
            <span className="font-medium">{neighborhoodData.foodScene.farmers_markets}</span>
          </div>
        </div>
      </div>

      {/* Business Advantages */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          Location Advantages
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {advantages.map((advantage, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>{advantage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Businesses */}
      <div>
        <h4 className="font-semibold mb-3">Nearby Food Business Resources</h4>
        <div className="space-y-2">
          {nearbyBusinesses.map((business, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">{business.name}</p>
                <p className="text-xs text-gray-600">{business.type}</p>
              </div>
              <span className="text-xs text-blue-600 font-medium">{business.distance}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Pro Tip:</strong> {neighborhood} is known for its thriving food scene and entrepreneur-friendly environment. 
          Perfect for testing new concepts before expanding citywide.
        </p>
      </div>
    </div>
  )
}

export default NeighborhoodGuide