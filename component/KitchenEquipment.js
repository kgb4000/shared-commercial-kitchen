'use client'

import { CheckCircle, Users, Square, Utensils, Refrigerator, Flame } from 'lucide-react'

const KitchenEquipment = ({ kitchen = {}, specifications }) => {
  // Extract or generate equipment data with safe fallbacks
  const equipment = specifications?.equipment || kitchen?.equipment || [
    'Commercial Gas Ranges',
    'Convection Ovens', 
    'Walk-in Refrigerator',
    'Walk-in Freezer',
    'Prep Tables',
    'Triple Sink Station',
    'Hand Wash Stations',
    'Food Storage Shelving'
  ]

  const specs = specifications || {
    squareFootage: kitchen?.squareFootage || '1200 sq ft',
    capacity: kitchen?.capacity || '8-12 people',
    parkingSpaces: kitchen?.parking || '6 spaces',
    accessibility: kitchen?.accessibility !== false
  }

  const categories = {
    cooking: ['Commercial Gas Ranges', 'Convection Ovens', 'Griddles', 'Fryers', 'Steamers'],
    refrigeration: ['Walk-in Refrigerator', 'Walk-in Freezer', 'Reach-in Coolers', 'Prep Coolers'],
    prep: ['Prep Tables', 'Cutting Boards', 'Food Processors', 'Mixers', 'Slicers'],
    cleaning: ['Triple Sink Station', 'Hand Wash Stations', 'Dish Machine', 'Sanitizing Station']
  }

  const getEquipmentByCategory = (category) => {
    return equipment.filter(item => 
      categories[category].some(cat => 
        item.toLowerCase().includes(cat.toLowerCase().split(' ')[0])
      )
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Utensils className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Kitchen Specifications</h3>
      </div>
      
      {/* Key Specs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Square className="w-6 h-6 text-gray-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Size</p>
          <p className="font-semibold text-sm">{specs.squareFootage}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Users className="w-6 h-6 text-gray-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Capacity</p>
          <p className="font-semibold text-sm">{specs.capacity}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="w-6 h-6 text-gray-600 mx-auto mb-1 flex items-center justify-center text-lg">🚗</div>
          <p className="text-xs text-gray-600">Parking</p>
          <p className="font-semibold text-sm">{specs.parkingSpaces}</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="w-6 h-6 text-gray-600 mx-auto mb-1 flex items-center justify-center text-lg">♿</div>
          <p className="text-xs text-gray-600">Accessible</p>
          <p className="font-semibold text-sm">{specs.accessibility ? 'Yes' : 'No'}</p>
        </div>
      </div>

      {/* Equipment Categories */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <Flame className="w-4 h-4 text-red-500 mr-2" />
            <h4 className="font-medium">Cooking Equipment</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {getEquipmentByCategory('cooking').map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <Refrigerator className="w-4 h-4 text-blue-500 mr-2" />
            <h4 className="font-medium">Refrigeration</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {getEquipmentByCategory('refrigeration').map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 text-purple-500 mr-2 flex items-center justify-center">🔧</div>
            <h4 className="font-medium">Prep & Storage</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {getEquipmentByCategory('prep').map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Show remaining equipment */}
        {equipment.filter(item => 
          !Object.values(categories).flat().some(cat => 
            item.toLowerCase().includes(cat.toLowerCase().split(' ')[0])
          )
        ).length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Additional Equipment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {equipment.filter(item => 
                !Object.values(categories).flat().some(cat => 
                  item.toLowerCase().includes(cat.toLowerCase().split(' ')[0])
                )
              ).map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default KitchenEquipment