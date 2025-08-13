// =======================================================================
// FILE 1: app/api/market-intelligence/route.js
// Enhanced to handle any city/location with caching
// =======================================================================

import redis from '@/lib/redis'

// Cache market intelligence data for 24 hours
async function getCachedMarketData(cacheKey) {
  try {
    const cached = await redis.get(cacheKey)
    return cached ? JSON.parse(cached) : null
  } catch (error) {
    console.error('Cache read error:', error)
    return null
  }
}

async function setCachedMarketData(cacheKey, data) {
  try {
    await redis.setEx(cacheKey, 86400, JSON.stringify(data)) // 24 hour cache
    console.log(`💾 Cached market data for ${cacheKey}`)
  } catch (error) {
    console.error('Cache write error:', error)
  }
}

export async function POST(request) {
  try {
    const { lat, lng, address, city, state } = await request.json()

    if (!lat || !lng) {
      return Response.json(
        { success: false, error: 'Latitude and longitude required' },
        { status: 400 }
      )
    }

    console.log('🔍 Fetching market intelligence for:', {
      city,
      state,
      lat,
      lng,
    })

    // Create cache key based on coordinates (rounded to avoid cache misses)
    const roundedLat = Math.round(lat * 1000) / 1000
    const roundedLng = Math.round(lng * 1000) / 1000
    const cacheKey = `market:${roundedLat}:${roundedLng}`

    // Check cache first
    const cachedData = await getCachedMarketData(cacheKey)
    if (cachedData) {
      console.log('✅ Returning cached market intelligence')
      return Response.json({
        ...cachedData,
        fromCache: true,
        cachedAt: cachedData.generatedAt,
      })
    }

    // Fetch fresh data
    const [demographics, competition, deliveryZones] = await Promise.all([
      getDemographicsData(lat, lng),
      getCompetitionData(lat, lng),
      getDeliveryZoneData(lat, lng, city, state),
    ])

    const marketIntelligence = {
      success: true,
      location: { lat, lng, address, city, state },
      demographics,
      competition,
      deliveryZones,
      generatedAt: new Date().toISOString(),
      fromCache: false,
    }

    // Cache the results
    await setCachedMarketData(cacheKey, marketIntelligence)

    console.log(`✅ Market intelligence generated for ${city}, ${state}`)
    return Response.json(marketIntelligence)
  } catch (error) {
    console.error('❌ Market intelligence error:', error)
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// Enhanced demographics function that works for any US location
async function getDemographicsData(lat, lng) {
  try {
    console.log('📊 Fetching demographics data...')

    // Get Census Tract (works for any US coordinate)
    const geoResponse = await fetch(
      `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${lng}&y=${lat}&benchmark=2020&vintage=2020&format=json`
    )

    if (!geoResponse.ok) {
      throw new Error('Failed to get census tract')
    }

    const geoData = await geoResponse.json()
    const censusBlock = geoData.result?.geographies?.['2020 Census Blocks']?.[0]

    if (!censusBlock) {
      throw new Error('Census tract not found - may be outside US')
    }

    const { STATE: state, COUNTY: county, TRACT: tract } = censusBlock
    console.log(`📍 Found census tract: ${state}-${county}-${tract}`)

    // Get comprehensive demographic data
    const variables = [
      'B01003_001E', // Total population
      'B19013_001E', // Median household income
      'B25064_001E', // Median gross rent
      'B08301_010E', // Public transportation commuters
      'B08301_021E', // Walk to work
      'B01001_007E', // Male 25-29
      'B01001_008E', // Male 30-34
      'B01001_009E', // Male 35-39
      'B01001_031E', // Female 25-29
      'B01001_032E', // Female 30-34
      'B01001_033E', // Female 35-39
      'B25001_001E', // Total housing units
      'B08303_001E', // Total commuters
      'B15003_022E', // Bachelor's degree
      'B15003_023E', // Master's degree
      'B15003_024E', // Professional degree
      'B15003_025E', // Doctorate degree
    ].join(',')

    const censusResponse = await fetch(
      `https://api.census.gov/data/2022/acs/acs5?get=${variables}&for=tract:${tract}&in=state:${state}&in=county:${county}`
    )

    if (!censusResponse.ok) {
      throw new Error('Failed to fetch census data')
    }

    const censusData = await censusResponse.json()

    if (!censusData || censusData.length < 2) {
      throw new Error('Invalid census data response')
    }

    const data = censusData[1]

    // Calculate metrics
    const youngProfessionalCount = [5, 6, 7, 9, 10, 11].reduce((sum, index) => {
      return sum + (parseInt(data[index]) || 0)
    }, 0)

    const totalPopulation = parseInt(data[0]) || 0
    const collegeDegreeCount = [14, 15, 16, 17].reduce((sum, index) => {
      return sum + (parseInt(data[index]) || 0)
    }, 0)

    const demographics = {
      totalPopulation,
      medianIncome: parseInt(data[1]) || null,
      medianRent: parseInt(data[2]) || null,
      publicTransitCommuters: parseInt(data[3]) || 0,
      walkToWorkCommuters: parseInt(data[4]) || 0,
      youngProfessionals: {
        count: youngProfessionalCount,
        percentage:
          totalPopulation > 0
            ? Math.round((youngProfessionalCount / totalPopulation) * 100)
            : 0,
      },
      collegeEducated: {
        count: collegeDegreeCount,
        percentage:
          totalPopulation > 0
            ? Math.round((collegeDegreeCount / totalPopulation) * 100)
            : 0,
      },
      totalHousingUnits: parseInt(data[12]) || 0,
      totalCommuters: parseInt(data[13]) || 0,
      tract: `${state}-${county}-${tract}`,
      state,
      county,
    }

    console.log(`✅ Demographics fetched for tract ${state}-${county}-${tract}`)
    return demographics
  } catch (error) {
    console.error('❌ Demographics error:', error)
    throw error
  }
}

// Enhanced competition function that adapts to different cities
async function getCompetitionData(lat, lng) {
  try {
    console.log('🏪 Fetching competition data...')

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }/api/google-place-api`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `restaurants near ${lat},${lng}`,
          page: 1,
          pageSize: 20,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch competition data')
    }

    const data = await response.json()

    if (!data.success || !data.places) {
      throw new Error('Invalid competition data response')
    }

    const restaurants = data.places
      .map((place) => ({
        name: place.name || place.displayName?.text,
        rating: place.rating || 0,
        reviewCount: place.userRatingCount || 0,
        priceLevel: place.priceLevel || 0,
        types: place.types || [],
        address: place.formattedAddress,
        businessStatus: place.businessStatus,
        distance: calculateDistance(lat, lng, place.latitude, place.longitude),
      }))
      .filter((place) => place.name)

    const analysis = analyzeCompetitionByRegion(restaurants, lat, lng)

    console.log(
      `✅ Competition analysis complete: ${restaurants.length} restaurants`
    )

    return {
      restaurants: restaurants.slice(0, 15),
      totalCount: restaurants.length,
      analysis,
    }
  } catch (error) {
    console.error('❌ Competition error:', error)
    throw error
  }
}

// City-aware competition analysis
function analyzeCompetitionByRegion(restaurants, lat, lng) {
  const totalRestaurants = restaurants.length
  const averageRating =
    restaurants.reduce((sum, r) => sum + (r.rating || 0), 0) / totalRestaurants

  // Categorize cuisines
  const cuisineTypes = {}
  restaurants.forEach((r) => {
    r.types.forEach((type) => {
      if (
        type.includes('restaurant') ||
        type.includes('food') ||
        type.includes('meal')
      ) {
        cuisineTypes[type] = (cuisineTypes[type] || 0) + 1
      }
    })
  })

  // Price distribution
  const priceLevels = { 1: 0, 2: 0, 3: 0, 4: 0 }
  restaurants.forEach((r) => {
    if (r.priceLevel >= 1 && r.priceLevel <= 4) {
      priceLevels[r.priceLevel]++
    }
  })

  // Regional market gap analysis
  const marketGaps = identifyRegionalMarketGaps(
    cuisineTypes,
    priceLevels,
    totalRestaurants,
    lat,
    lng
  )

  return {
    totalCompetitors: totalRestaurants,
    averageRating: Math.round(averageRating * 10) / 10,
    cuisineBreakdown: cuisineTypes,
    priceDistribution: priceLevels,
    marketGaps,
    competitiveDensity: getCompetitiveDensity(totalRestaurants, lat, lng),
    averageDistance:
      restaurants.reduce((sum, r) => sum + (r.distance || 0), 0) /
      totalRestaurants,
  }
}

// Regional market gap identification
function identifyRegionalMarketGaps(
  cuisineTypes,
  priceLevels,
  totalRestaurants,
  lat,
  lng
) {
  const gaps = []

  // Determine region type (urban vs suburban vs rural)
  const regionType = getRegionType(lat, lng, totalRestaurants)

  // Common cuisine gaps by region
  const regionalCuisineExpectations = {
    urban: [
      'asian',
      'mexican',
      'italian',
      'american',
      'breakfast',
      'vegan',
      'mediterranean',
    ],
    suburban: [
      'mexican',
      'italian',
      'american',
      'chinese',
      'breakfast',
      'pizza',
    ],
    rural: ['american', 'mexican', 'pizza', 'breakfast'],
  }

  const expectedCuisines =
    regionalCuisineExpectations[regionType] ||
    regionalCuisineExpectations.suburban

  expectedCuisines.forEach((cuisine) => {
    const found = Object.keys(cuisineTypes).some((type) =>
      type.toLowerCase().includes(cuisine)
    )
    if (!found) {
      gaps.push(`Limited ${cuisine} options`)
    }
  })

  // Price gap analysis by region
  if (regionType === 'urban') {
    if (priceLevels[3] + priceLevels[4] < totalRestaurants * 0.2) {
      gaps.push('Upscale dining opportunity')
    }
    if (priceLevels[1] < totalRestaurants * 0.3) {
      gaps.push('Budget-friendly options needed')
    }
  } else if (regionType === 'suburban') {
    if (priceLevels[2] < totalRestaurants * 0.4) {
      gaps.push('Mid-range casual dining gap')
    }
  }

  // Delivery-focused opportunities
  const deliveryFriendlyCount = Object.keys(cuisineTypes).filter(
    (type) =>
      type.includes('fast') || type.includes('casual') || type.includes('pizza')
  ).length

  if (deliveryFriendlyCount < totalRestaurants * 0.4) {
    gaps.push('Delivery-optimized concepts opportunity')
  }

  return gaps.length > 0 ? gaps : [`${regionType} market appears well-served`]
}

// Determine region type based on coordinates and restaurant density
function getRegionType(lat, lng, restaurantCount) {
  // This is a simplified classification
  // In production, you could use more sophisticated geographic APIs

  if (restaurantCount > 15) return 'urban'
  if (restaurantCount > 8) return 'suburban'
  return 'rural'
}

function getCompetitiveDensity(totalRestaurants, lat, lng) {
  const regionType = getRegionType(lat, lng, totalRestaurants)

  const thresholds = {
    urban: { high: 20, medium: 12 },
    suburban: { high: 15, medium: 8 },
    rural: { high: 8, medium: 4 },
  }

  const threshold = thresholds[regionType]

  if (totalRestaurants >= threshold.high) return 'High'
  if (totalRestaurants >= threshold.medium) return 'Medium'
  return 'Low'
}

// Enhanced delivery zones with city-specific insights
async function getDeliveryZoneData(lat, lng, city, state) {
  try {
    console.log(`🚚 Analyzing delivery zones for ${city}, ${state}...`)

    const zones = [
      { radius: 1, name: '1 mile' },
      { radius: 2, name: '2 miles' },
      { radius: 3, name: '3 miles' },
      { radius: 5, name: '5 miles' },
    ]

    // Get city-specific population density estimates
    const populationDensity = await estimatePopulationDensity(
      lat,
      lng,
      city,
      state
    )

    const deliveryZones = zones.map((zone) => {
      const areaInSqMiles = Math.PI * Math.pow(zone.radius, 2)
      const estimatedPopulation = Math.round(areaInSqMiles * populationDensity)

      return {
        radius: zone.radius,
        name: zone.name,
        estimatedPopulation,
        estimatedDeliveryTime: calculateDeliveryTime(zone.radius, city),
        coverageArea: Math.round(areaInSqMiles * 100) / 100,
      }
    })

    // Get nearby business districts specific to this city
    const nearbyAreas = await getCityBusinessDistricts(lat, lng, city, state)

    console.log(`✅ Delivery zones calculated for ${city}, ${state}`)

    return {
      zones: deliveryZones,
      optimalRadius: getOptimalRadius(city, state),
      nearbyBusinessDistricts: nearbyAreas,
      analysis: {
        recommended: `${getOptimalRadius(
          city,
          state
        )}-mile radius optimal for ${city} market`,
        citySpecificNotes: getCitySpecificDeliveryNotes(city, state),
        considerations: [
          'Local traffic patterns and rush hours',
          'Parking availability for delivery drivers',
          'Competition delivery coverage',
          'Customer density vs delivery costs',
        ],
      },
    }
  } catch (error) {
    console.error('❌ Delivery zone error:', error)
    throw error
  }
}

// City-specific delivery optimization
function getOptimalRadius(city, state) {
  // Major metropolitan areas
  const majorCities = [
    'new york',
    'los angeles',
    'chicago',
    'houston',
    'phoenix',
    'philadelphia',
    'san antonio',
    'san diego',
    'dallas',
    'san jose',
  ]

  if (majorCities.some((major) => city.toLowerCase().includes(major))) {
    return 2 // Tighter radius for dense urban areas
  }

  return 3 // Standard radius for most markets
}

function getCitySpecificDeliveryNotes(city, state) {
  const cityNotes = {
    'new york': 'Consider subway accessibility and parking restrictions',
    'los angeles': 'Factor in heavy traffic during peak hours',
    chicago: 'Winter weather impacts delivery times significantly',
    miami: 'Tourist areas have higher delivery demand',
    seattle: 'Hills and weather affect delivery efficiency',
    'san francisco': 'Steep terrain and limited parking challenges',
  }

  const cityKey = city.toLowerCase()
  return (
    cityNotes[cityKey] || `Standard delivery considerations for ${city} market`
  )
}

async function estimatePopulationDensity(lat, lng, city, state) {
  // Basic population density estimates by region type
  // In production, you could use more sophisticated demographic APIs

  const majorUrbanAreas = [
    'new york',
    'san francisco',
    'boston',
    'washington dc',
  ]
  const largeUrbanAreas = [
    'los angeles',
    'chicago',
    'philadelphia',
    'seattle',
    'miami',
  ]
  const mediumUrbanAreas = [
    'houston',
    'dallas',
    'atlanta',
    'denver',
    'portland',
  ]

  const cityLower = city.toLowerCase()

  if (majorUrbanAreas.some((major) => cityLower.includes(major))) return 8000
  if (largeUrbanAreas.some((large) => cityLower.includes(large))) return 5000
  if (mediumUrbanAreas.some((medium) => cityLower.includes(medium))) return 3000

  return 2000 // Default suburban density
}

function calculateDeliveryTime(radiusMiles, city) {
  const baseTime = 5 // Base prep/pickup time

  // City-specific average speeds
  const citySpeedMap = {
    'new york': 15,
    'san francisco': 18,
    'los angeles': 20,
    chicago: 22,
    default: 25,
  }

  const avgSpeed = citySpeedMap[city.toLowerCase()] || citySpeedMap.default
  const driveTime = (radiusMiles / avgSpeed) * 60

  return Math.round(baseTime + driveTime)
}

async function getCityBusinessDistricts(lat, lng, city, state) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }/api/google-place-api`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `business district ${city} ${state}`,
          page: 1,
          pageSize: 5,
        }),
      }
    )

    const data = await response.json()

    if (data.success && data.places) {
      return data.places.map((place) => ({
        name: place.name || place.displayName?.text,
        address: place.formattedAddress,
        types: place.types,
        distance: calculateDistance(lat, lng, place.latitude, place.longitude),
      }))
    }
  } catch (error) {
    console.error('Business districts error:', error)
  }

  return []
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  if (!lat2 || !lng2) return 0

  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}
