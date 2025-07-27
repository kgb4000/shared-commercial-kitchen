// app/api/debug/data-structure/route.js
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const detailed = searchParams.get('detailed') === 'true'
    const city = searchParams.get('city')

    console.log('🔍 Data structure debug requested')

    const dataDir = path.join(process.cwd(), 'data')

    if (!fs.existsSync(dataDir)) {
      return NextResponse.json(
        {
          error: 'Data directory not found',
          expectedPath: dataDir,
          suggestion: 'Make sure your /data folder exists in the project root',
        },
        { status: 404 }
      )
    }

    // Get all city directories
    const cities = fs
      .readdirSync(dataDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    console.log('📁 Found cities:', cities)

    const analysis = {
      dataDirectory: dataDir,
      totalCities: cities.length,
      cities: {},
      summary: {
        totalKitchens: 0,
        citiesWithData: 0,
        citiesWithErrors: 0,
        commonDataStructures: {},
      },
    }

    // Analyze each city (or specific city if requested)
    const citiesToAnalyze = city ? [city] : cities

    for (const cityName of citiesToAnalyze) {
      const cityDataPath = path.join(dataDir, cityName, 'data.json')

      try {
        if (!fs.existsSync(cityDataPath)) {
          analysis.cities[cityName] = {
            status: 'no_data_file',
            path: cityDataPath,
            exists: false,
          }
          continue
        }

        const rawData = fs.readFileSync(cityDataPath, 'utf8')
        const cityData = JSON.parse(rawData)

        // Analyze data structure
        const isArray = Array.isArray(cityData)
        const topLevelKeys = isArray ? ['array'] : Object.keys(cityData)

        let kitchens = []
        let dataLocation = 'root'

        if (isArray) {
          kitchens = cityData
          dataLocation = 'root (array)'
        } else if (cityData.kitchens && Array.isArray(cityData.kitchens)) {
          kitchens = cityData.kitchens
          dataLocation = 'kitchens'
        } else if (cityData.data && Array.isArray(cityData.data)) {
          kitchens = cityData.data
          dataLocation = 'data'
        } else if (cityData.results && Array.isArray(cityData.results)) {
          kitchens = cityData.results
          dataLocation = 'results'
        } else if (cityData.places && Array.isArray(cityData.places)) {
          kitchens = cityData.places
          dataLocation = 'places'
        } else {
          // Try to find arrays in the data
          for (const [key, value] of Object.entries(cityData)) {
            if (Array.isArray(value) && value.length > 0) {
              kitchens = value
              dataLocation = key
              break
            }
          }
        }

        // Analyze first few kitchens to understand structure
        const sampleKitchens = kitchens.slice(0, 3)
        const kitchenFields = new Set()
        const kitchenFieldTypes = {}

        sampleKitchens.forEach((kitchen) => {
          if (kitchen && typeof kitchen === 'object') {
            Object.keys(kitchen).forEach((field) => {
              kitchenFields.add(field)
              if (!kitchenFieldTypes[field]) {
                kitchenFieldTypes[field] = typeof kitchen[field]
              }
            })
          }
        })

        // Look for place ID fields specifically
        const placeIdFields = Array.from(kitchenFields).filter(
          (field) =>
            field.toLowerCase().includes('place') ||
            field.toLowerCase().includes('id')
        )

        // Look for rating fields
        const ratingFields = Array.from(kitchenFields).filter(
          (field) =>
            field.toLowerCase().includes('rating') ||
            field.toLowerCase().includes('score')
        )

        // Look for name fields
        const nameFields = Array.from(kitchenFields).filter(
          (field) =>
            field.toLowerCase().includes('name') ||
            field.toLowerCase().includes('title')
        )

        analysis.cities[cityName] = {
          status: 'success',
          path: cityDataPath,
          dataStructure: {
            isArray: isArray,
            topLevelKeys: topLevelKeys,
            dataLocation: dataLocation,
            kitchenCount: kitchens.length,
          },
          kitchenFields: {
            total: kitchenFields.size,
            all: Array.from(kitchenFields),
            placeIdFields: placeIdFields,
            ratingFields: ratingFields,
            nameFields: nameFields,
            fieldTypes: kitchenFieldTypes,
          },
          sampleKitchen: detailed
            ? sampleKitchens[0]
            : {
                availableFields: Array.from(kitchenFields),
                name:
                  sampleKitchens[0]?.title ||
                  sampleKitchens[0]?.name ||
                  sampleKitchens[0]?.displayName?.text,
                hasPlaceId: placeIdFields.some(
                  (field) => sampleKitchens[0]?.[field]
                ),
                hasRating: ratingFields.some(
                  (field) => sampleKitchens[0]?.[field]
                ),
              },
        }

        analysis.summary.totalKitchens += kitchens.length
        analysis.summary.citiesWithData++

        // Track common data structures
        const structureKey = `${dataLocation}-${isArray ? 'array' : 'object'}`
        analysis.summary.commonDataStructures[structureKey] =
          (analysis.summary.commonDataStructures[structureKey] || 0) + 1
      } catch (error) {
        analysis.cities[cityName] = {
          status: 'error',
          path: cityDataPath,
          error: error.message,
        }
        analysis.summary.citiesWithErrors++
      }
    }

    // Add recommendations
    analysis.recommendations = []

    if (analysis.summary.citiesWithErrors > 0) {
      analysis.recommendations.push(
        `⚠️ ${analysis.summary.citiesWithErrors} cities have data errors - check JSON syntax`
      )
    }

    if (analysis.summary.citiesWithData === 0) {
      analysis.recommendations.push(
        `❌ No valid data found - check that data.json files exist in city folders`
      )
    } else {
      analysis.recommendations.push(
        `✅ Found ${analysis.summary.totalKitchens} kitchens across ${analysis.summary.citiesWithData} cities`
      )
    }

    // Suggest the most common data structure
    const mostCommonStructure = Object.entries(
      analysis.summary.commonDataStructures
    ).sort(([, a], [, b]) => b - a)[0]

    if (mostCommonStructure) {
      analysis.recommendations.push(
        `📊 Most common structure: ${mostCommonStructure[0]} (${mostCommonStructure[1]} cities)`
      )
    }

    return NextResponse.json(analysis, {
      headers: {
        'Cache-Control': 'no-cache', // Always fresh for debugging
      },
    })
  } catch (error) {
    console.error('💥 Data structure debug error:', error)

    return NextResponse.json(
      {
        error: 'Failed to analyze data structure',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

// POST method for testing specific operations
export async function POST(request) {
  try {
    const { action, city, slug } = await request.json()

    switch (action) {
      case 'test-kitchen-lookup':
        // Test finding a specific kitchen
        const response = await fetch(
          `${request.url.split('/api')[0]}/api/kitchens/${slug}`
        )
        const result = await response.json()

        return NextResponse.json({
          action: 'test-kitchen-lookup',
          slug: slug,
          found: response.ok,
          result: result,
        })

      case 'list-city-kitchens':
        // List all kitchens in a specific city
        const dataDir = path.join(process.cwd(), 'data')
        const cityDataPath = path.join(dataDir, city, 'data.json')

        if (!fs.existsSync(cityDataPath)) {
          return NextResponse.json(
            {
              action: 'list-city-kitchens',
              city: city,
              error: 'City data file not found',
              path: cityDataPath,
            },
            { status: 404 }
          )
        }

        const rawData = fs.readFileSync(cityDataPath, 'utf8')
        const cityData = JSON.parse(rawData)

        // Extract kitchens (using same logic as main API)
        let kitchens = []
        if (Array.isArray(cityData)) {
          kitchens = cityData
        } else if (cityData.kitchens) {
          kitchens = cityData.kitchens
        } else if (cityData.data) {
          kitchens = cityData.data
        } else if (cityData.results) {
          kitchens = cityData.results
        }

        const kitchenSummary = kitchens.map((kitchen, index) => ({
          index: index,
          name:
            kitchen.title ||
            kitchen.name ||
            kitchen.displayName?.text ||
            `Kitchen ${index + 1}`,
          slug: kitchen.slug || 'no-slug',
          placeId: kitchen.placeId || kitchen.place_id || 'no-place-id',
          hasRating: !!(kitchen.rating || kitchen.totalScore),
          hasAddress: !!(kitchen.address || kitchen.formattedAddress),
        }))

        return NextResponse.json({
          action: 'list-city-kitchens',
          city: city,
          totalKitchens: kitchens.length,
          kitchens: kitchenSummary,
        })

      default:
        return NextResponse.json(
          {
            error: 'Unknown action',
            availableActions: ['test-kitchen-lookup', 'list-city-kitchens'],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('💥 Data structure debug POST error:', error)

    return NextResponse.json(
      {
        error: 'Failed to process debug request',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
