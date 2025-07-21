'use client'

import { useEffect, useState } from 'react'
import {
  Search,
  Clock,
  Thermometer,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'

function Card({ item, onSelect }) {
  const getExpirationStatus = (item) => {
    let days = 0

    if (item.DOP_Refrigerate_Max) {
      days = item.DOP_Refrigerate_Max
    } else if (item.DOP_Pantry_Max) {
      days = item.DOP_Pantry_Max
    } else if (item.DOP_Freeze_Max) {
      days =
        item.DOP_Freeze_Max > 30
          ? item.DOP_Freeze_Max / 30
          : item.DOP_Freeze_Max
    } else if (item.StorageLife) {
      days = parseInt(item.StorageLife.replace(/\D/g, ''))
    }

    if (days <= 3) return 'urgent'
    if (days <= 7) return 'warning'
    return 'good'
  }

  const formatStorageLife = (item) => {
    if (
      item.StorageType &&
      item.StorageType.toLowerCase().includes('refrigerate') &&
      item.DOP_Refrigerate_Min &&
      item.DOP_Refrigerate_Max
    ) {
      return (
        item.DOP_Refrigerate_Min +
        '-' +
        item.DOP_Refrigerate_Max +
        ' ' +
        (item.DOP_Refrigerate_Metric || 'days')
      )
    }
    if (
      item.StorageType &&
      item.StorageType.toLowerCase().includes('freeze') &&
      item.DOP_Freeze_Min &&
      item.DOP_Freeze_Max
    ) {
      return (
        item.DOP_Freeze_Min +
        '-' +
        item.DOP_Freeze_Max +
        ' ' +
        (item.DOP_Freeze_Metric || 'months')
      )
    }
    if (
      item.StorageType &&
      item.StorageType.toLowerCase().includes('pantry') &&
      item.DOP_Pantry_Min &&
      item.DOP_Pantry_Max
    ) {
      return (
        item.DOP_Pantry_Min +
        '-' +
        item.DOP_Pantry_Max +
        ' ' +
        (item.DOP_Pantry_Metric || 'days')
      )
    }
    return item.StorageLife || 'Not specified'
  }

  const status = getExpirationStatus(item)
  const statusColors = {
    urgent: 'border-red-500 bg-red-50',
    warning: 'border-yellow-500 bg-yellow-50',
    good: 'border-green-500 bg-green-50',
    unknown: 'border-gray-300 bg-gray-50',
  }

  const getStatusIcon = (status) => {
    if (status === 'urgent') {
      return <AlertTriangle className="w-5 h-5 text-red-500" />
    } else if (status === 'warning') {
      return <Clock className="w-5 h-5 text-yellow-500" />
    } else if (status === 'good') {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    } else {
      return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div
      className={
        statusColors[status] +
        ' rounded-lg shadow-md p-4 border-2 cursor-pointer hover:shadow-lg transition-shadow'
      }
      onClick={() => onSelect(item)}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {item.ProductName}
          </h3>
          {item.CategoryName && (
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {item.CategoryName +
                (item.SubcategoryName ? ' - ' + item.SubcategoryName : '')}
            </span>
          )}
        </div>
        {getStatusIcon(status)}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">Storage:</span>
          <span className="text-sm text-gray-700">{item.StorageType}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium">Shelf Life:</span>
          <span className="text-sm text-gray-700">
            {formatStorageLife(item)}
          </span>
        </div>

        {item.SafeMinimumInternalTemperature && (
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">Cook to:</span>
            <span className="text-sm text-gray-700">
              {item.SafeMinimumInternalTemperature}
            </span>
          </div>
        )}
      </div>

      {item.ProductDescription && (
        <p className="text-xs text-gray-600 mt-3 line-clamp-2">
          {item.ProductDescription}
        </p>
      )}
    </div>
  )
}

function ProductModal({ product, onClose }) {
  if (!product) return null

  const formatStorageLife = (item) => {
    if (
      item.StorageType &&
      item.StorageType.toLowerCase().includes('refrigerate') &&
      item.DOP_Refrigerate_Min &&
      item.DOP_Refrigerate_Max
    ) {
      return (
        item.DOP_Refrigerate_Min +
        '-' +
        item.DOP_Refrigerate_Max +
        ' ' +
        (item.DOP_Refrigerate_Metric || 'days')
      )
    }
    if (
      item.StorageType &&
      item.StorageType.toLowerCase().includes('freeze') &&
      item.DOP_Freeze_Min &&
      item.DOP_Freeze_Max
    ) {
      return (
        item.DOP_Freeze_Min +
        '-' +
        item.DOP_Freeze_Max +
        ' ' +
        (item.DOP_Freeze_Metric || 'months')
      )
    }
    if (
      item.StorageType &&
      item.StorageType.toLowerCase().includes('pantry') &&
      item.DOP_Pantry_Min &&
      item.DOP_Pantry_Max
    ) {
      return (
        item.DOP_Pantry_Min +
        '-' +
        item.DOP_Pantry_Max +
        ' ' +
        (item.DOP_Pantry_Metric || 'days')
      )
    }
    return product.StorageLife || 'Not specified'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {product.ProductName}
              </h2>
              {product.CategoryName && (
                <span className="inline-block mt-2 text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  {product.CategoryName +
                    (product.SubcategoryName
                      ? ' - ' + product.SubcategoryName
                      : '')}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">
                Storage Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Type:</strong> {product.StorageType}
                  </p>
                  <p>
                    <strong>Shelf Life:</strong> {formatStorageLife(product)}
                  </p>
                  {product.SafeMinimumInternalTemperature && (
                    <p>
                      <strong>Cook to:</strong>{' '}
                      {product.SafeMinimumInternalTemperature}
                    </p>
                  )}
                </div>
                {product.StorageTips && (
                  <div>
                    <p className="font-medium text-blue-700 mb-1">
                      Storage Tips:
                    </p>
                    <p className="text-sm text-blue-600">
                      {product.StorageTips}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {(product.DOP_Refrigerate_Min ||
              product.DOP_Freeze_Min ||
              product.DOP_Pantry_Min) && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">
                  All Storage Options
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  {product.DOP_Pantry_Min && (
                    <div className="text-center p-3 bg-yellow-100 rounded">
                      <p className="font-medium text-yellow-800">Pantry</p>
                      <p className="text-yellow-700">
                        {product.DOP_Pantry_Min +
                          '-' +
                          product.DOP_Pantry_Max +
                          ' ' +
                          product.DOP_Pantry_Metric}
                      </p>
                    </div>
                  )}
                  {product.DOP_Refrigerate_Min && (
                    <div className="text-center p-3 bg-blue-100 rounded">
                      <p className="font-medium text-blue-800">Refrigerator</p>
                      <p className="text-blue-700">
                        {product.DOP_Refrigerate_Min +
                          '-' +
                          product.DOP_Refrigerate_Max +
                          ' ' +
                          product.DOP_Refrigerate_Metric}
                      </p>
                    </div>
                  )}
                  {product.DOP_Freeze_Min && (
                    <div className="text-center p-3 bg-purple-100 rounded">
                      <p className="font-medium text-purple-800">Freezer</p>
                      <p className="text-purple-700">
                        {product.DOP_Freeze_Min +
                          '-' +
                          product.DOP_Freeze_Max +
                          ' ' +
                          product.DOP_Freeze_Metric}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {product.ProductDescription && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">{product.ProductDescription}</p>
              </div>
            )}

            {product.CookingTips && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">
                  Cooking Tips
                </h3>
                <p className="text-orange-700">{product.CookingTips}</p>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">
                Professional Vendor Guidelines
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>
                  • Always check for signs of spoilage before expiration date
                </li>
                <li>• Rotate stock using FIFO (First In, First Out) method</li>
                <li>• Monitor storage temperature consistently</li>
                <li>• Label products with received date for tracking</li>
                <li>• Follow local health department guidelines</li>
                {product.SafeMinimumInternalTemperature && (
                  <li>
                    • Cook to minimum internal temperature of{' '}
                    {product.SafeMinimumInternalTemperature}
                  </li>
                )}
              </ul>
            </div>

            {product.Keywords && (
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Keywords:</strong> {product.Keywords}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FoodExpirationDatabase() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [storageFilter, setStorageFilter] = useState('all')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        console.log('Loading FoodKeeper data...')

        let foodKeeperData

        try {
          const response = await fetch('./foodkeeper-data.json')
          if (response.ok) {
            foodKeeperData = await response.json()
            console.log('Successfully loaded from local JSON file')
          }
        } catch (localError) {
          console.log('Local JSON file not found:', localError.message)
        }

        if (!foodKeeperData) {
          const proxyUrls = [
            'https://api.allorigins.win/raw?url=https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json',
            'https://corsproxy.io/?https://www.fsis.usda.gov/shared/data/EN/foodkeeper.json',
          ]

          for (let i = 0; i < proxyUrls.length; i++) {
            try {
              console.log('Trying proxy...')
              const response = await fetch(proxyUrls[i])

              if (response.ok) {
                const text = await response.text()
                if (
                  text.trim().startsWith('{') ||
                  text.trim().startsWith('[')
                ) {
                  foodKeeperData = JSON.parse(text)
                  console.log('Successfully fetched USDA data via proxy')
                  break
                }
              }
            } catch (proxyError) {
              console.log('Proxy failed:', proxyError.message)
              continue
            }
          }
        }

        if (foodKeeperData && foodKeeperData.ProductList) {
          const processedData = processUSDAFoodKeeperData(foodKeeperData)
          console.log('Processed ' + processedData.length + ' food items')

          setData(processedData)
          setFilteredData(processedData)
          setError(null)
        } else {
          throw new Error('Could not load FoodKeeper data')
        }
      } catch (error) {
        console.error('All data loading methods failed:', error)
        setError(
          "Using built-in sample data. To use real USDA data, save the JSON file as 'foodkeeper-data.json' in your project directory."
        )

        console.log('Loading built-in sample data...')
        const sampleData = getBuiltInSampleData()
        setData(sampleData)
        setFilteredData(sampleData)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  function processUSDAFoodKeeperData(data) {
    if (!data || !data.ProductList || !Array.isArray(data.ProductList)) {
      console.warn('Invalid USDA data structure - missing ProductList array')
      return []
    }

    console.log(
      'Processing ' + data.ProductList.length + ' products from FoodKeeper...'
    )

    const processedItems = data.ProductList.flatMap((product) => {
      if (!product.FoodStorage || !Array.isArray(product.FoodStorage)) {
        return []
      }

      return product.FoodStorage.map((storage, index) => ({
        ProductID: product.ProductID + '-' + index,
        ProductName: product.ProductName || 'Unknown Product',
        CategoryName: product.CategoryName || 'General',
        SubcategoryName: product.SubcategoryName || '',
        StorageType: storage.StorageType || 'Unknown',
        StorageLife: storage.StorageLife || 'Not specified',
        StorageTips: storage.StorageTips || '',
        ProductDescription:
          storage.ProductDescription ||
          product.ProductDescription ||
          'No description available',
        Keywords: product.Keywords || '',

        DOP_Pantry_Min: storage.DOP_Pantry_Min,
        DOP_Pantry_Max: storage.DOP_Pantry_Max,
        DOP_Pantry_Metric: storage.DOP_Pantry_Metric,
        DOP_Refrigerate_Min: storage.DOP_Refrigerate_Min,
        DOP_Refrigerate_Max: storage.DOP_Refrigerate_Max,
        DOP_Refrigerate_Metric: storage.DOP_Refrigerate_Metric,
        DOP_Freeze_Min: storage.DOP_Freeze_Min,
        DOP_Freeze_Max: storage.DOP_Freeze_Max,
        DOP_Freeze_Metric: storage.DOP_Freeze_Metric,

        CookingTips: storage.CookingTips || '',
        WholenessDescription: storage.WholenessDescription || '',
        SafeMinimumInternalTemperature:
          storage.SafeMinimumInternalTemperature || '',
      }))
    })

    console.log(
      'Successfully processed ' + processedItems.length + ' food storage items'
    )
    return processedItems
  }

  function getBuiltInSampleData() {
    const sampleUSDAData = {
      ProductList: [
        {
          ProductID: 1,
          ProductName: 'Ground Beef',
          CategoryName: 'Meat',
          SubcategoryName: 'Fresh',
          Keywords: 'beef,ground,meat,fresh,protein,hamburger',
          FoodStorage: [
            {
              StorageType: 'Refrigerate',
              StorageLife: '1-2 days',
              DOP_Refrigerate_Min: 1,
              DOP_Refrigerate_Max: 2,
              DOP_Refrigerate_Metric: 'Days',
              StorageTips: 'Keep refrigerated at 40°F or below',
              SafeMinimumInternalTemperature: '160°F',
              ProductDescription:
                'Fresh ground beef should be bright red when fresh',
            },
            {
              StorageType: 'Freeze',
              StorageLife: '3-4 months',
              DOP_Freeze_Min: 3,
              DOP_Freeze_Max: 4,
              DOP_Freeze_Metric: 'Months',
              StorageTips: 'Wrap tightly to prevent freezer burn',
              SafeMinimumInternalTemperature: '160°F',
              ProductDescription:
                'Frozen ground beef maintains quality for 3-4 months',
            },
          ],
        },
        {
          ProductID: 2,
          ProductName: 'Chicken Breast',
          CategoryName: 'Poultry',
          SubcategoryName: 'Fresh',
          Keywords: 'chicken,poultry,breast,fresh,protein',
          FoodStorage: [
            {
              StorageType: 'Refrigerate',
              StorageLife: '1-2 days',
              DOP_Refrigerate_Min: 1,
              DOP_Refrigerate_Max: 2,
              DOP_Refrigerate_Metric: 'Days',
              StorageTips: 'Keep refrigerated, use within 1-2 days',
              SafeMinimumInternalTemperature: '165°F',
              ProductDescription: 'Fresh chicken should have no off odors',
            },
            {
              StorageType: 'Freeze',
              StorageLife: '6-9 months',
              DOP_Freeze_Min: 6,
              DOP_Freeze_Max: 9,
              DOP_Freeze_Metric: 'Months',
              StorageTips: 'Package in freezer-safe materials',
              SafeMinimumInternalTemperature: '165°F',
              ProductDescription:
                'Frozen chicken maintains quality for 6-9 months',
            },
          ],
        },
        {
          ProductID: 3,
          ProductName: 'Salmon Fillet',
          CategoryName: 'Seafood',
          SubcategoryName: 'Fresh Fish',
          Keywords: 'salmon,fish,seafood,fresh,protein,fillet',
          FoodStorage: [
            {
              StorageType: 'Refrigerate',
              StorageLife: '1-2 days',
              DOP_Refrigerate_Min: 1,
              DOP_Refrigerate_Max: 2,
              DOP_Refrigerate_Metric: 'Days',
              StorageTips: 'Keep on ice or refrigerated at 32-38°F',
              SafeMinimumInternalTemperature: '145°F',
              ProductDescription: 'Fresh salmon should have firm flesh',
            },
          ],
        },
        {
          ProductID: 4,
          ProductName: 'Greek Yogurt',
          CategoryName: 'Dairy',
          SubcategoryName: 'Yogurt',
          Keywords: 'yogurt,greek,dairy,protein',
          FoodStorage: [
            {
              StorageType: 'Refrigerate',
              StorageLife: '1-3 weeks',
              DOP_Refrigerate_Min: 7,
              DOP_Refrigerate_Max: 21,
              DOP_Refrigerate_Metric: 'Days',
              StorageTips: 'Keep refrigerated, check for mold',
              ProductDescription: 'High-protein yogurt with longer shelf life',
            },
          ],
        },
        {
          ProductID: 5,
          ProductName: 'Tofu',
          CategoryName: 'Plant Protein',
          SubcategoryName: 'Soy Products',
          Keywords: 'tofu,soy,plant protein,vegetarian,vegan,protein',
          FoodStorage: [
            {
              StorageType: 'Refrigerate',
              StorageLife: '3-5 days after opening',
              DOP_Refrigerate_Min: 3,
              DOP_Refrigerate_Max: 5,
              DOP_Refrigerate_Metric: 'Days',
              StorageTips: 'Keep submerged in water, change daily',
              ProductDescription: 'Plant-based protein made from soybeans',
            },
          ],
        },
        {
          ProductID: 6,
          ProductName: 'Black Beans (dried)',
          CategoryName: 'Legumes',
          SubcategoryName: 'Dried Beans',
          Keywords: 'beans,black beans,legumes,dried,protein,plant protein',
          FoodStorage: [
            {
              StorageType: 'Pantry',
              StorageLife: '2-3 years',
              DOP_Pantry_Min: 24,
              DOP_Pantry_Max: 36,
              DOP_Pantry_Metric: 'Months',
              StorageTips: 'Store in airtight container in cool, dry place',
              ProductDescription:
                'High-protein dried legumes with long shelf life',
            },
          ],
        },
        {
          ProductID: 7,
          ProductName: 'Almonds',
          CategoryName: 'Nuts',
          SubcategoryName: 'Tree Nuts',
          Keywords: 'almonds,nuts,protein,healthy fats',
          FoodStorage: [
            {
              StorageType: 'Pantry',
              StorageLife: '12 months',
              DOP_Pantry_Min: 12,
              DOP_Pantry_Max: 12,
              DOP_Pantry_Metric: 'Months',
              StorageTips: 'Store in airtight container',
              ProductDescription:
                'Protein-rich nuts, good source of healthy fats',
            },
          ],
        },
      ],
    }

    return processUSDAFoodKeeperData(sampleUSDAData)
  }

  useEffect(() => {
    let filtered = data

    if (search) {
      const searchTerm = search.toLowerCase()
      filtered = filtered.filter((item) => {
        const searchableFields = [
          item.ProductName,
          item.CategoryName,
          item.SubcategoryName,
          item.Keywords,
          item.ProductDescription,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return searchableFields.includes(searchTerm)
      })
    }

    if (storageFilter !== 'all') {
      filtered = filtered.filter(
        (item) =>
          item.StorageType &&
          item.StorageType.toLowerCase() === storageFilter.toLowerCase()
      )
    }

    setFilteredData(filtered)
  }, [search, storageFilter, data])

  const storageTypes = [
    ...new Set(data.map((item) => item.StorageType)),
  ].filter(Boolean)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading food safety database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Food Vendor Expiration Database
          </h1>
          <p className="text-xl text-gray-600">
            Professional food safety reference for vendors and restaurants
          </p>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Products
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search for food items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="storage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Storage Type
              </label>
              <select
                id="storage"
                value={storageFilter}
                onChange={(e) => setStorageFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Storage Types</option>
                {storageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredData.length} of {data.length} products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Card
                key={item.ProductID}
                item={item}
                onSelect={setSelectedProduct}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No matching products found.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 border-t pt-8">
          <p>
            {error
              ? 'Sample data based on USDA Food Safety and Inspection Service structure'
              : 'Data sourced from USDA Food Safety and Inspection Service'}
          </p>
          <p className="mt-1">
            Always follow local health department guidelines and use proper food
            safety practices
          </p>
          {!error && (
            <p className="mt-2 text-xs text-green-600">
              Successfully loaded live USDA FoodKeeper database
            </p>
          )}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
