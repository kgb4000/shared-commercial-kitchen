// app/api/kitchens/[slug]/route.js
// Add this at the top for debugging
import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

console.log('=== DEBUG INFO ===')
console.log('Current working directory:', process.cwd())
console.log('Data directory path:', path.join(process.cwd(), 'data'))
console.log(
  'Data directory exists:',
  fs.existsSync(path.join(process.cwd(), 'data'))
)

if (fs.existsSync(path.join(process.cwd(), 'data'))) {
  const items = fs.readdirSync(path.join(process.cwd(), 'data'))
  console.log('Items in data directory:', items)
}

// Function to get all city data files
function getCityDataFiles() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const cities = fs
      .readdirSync(dataDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    console.log('📁 Found cities:', cities)
    return cities
  } catch (error) {
    console.error('❌ Error reading data directory:', error)
    return []
  }
}

// Function to load kitchen data from a specific city
function loadCityKitchens(cityName) {
  try {
    const cityDataPath = path.join(process.cwd(), 'data', cityName, 'data.json')

    if (!fs.existsSync(cityDataPath)) {
      console.log(`📂 No data.json found for city: ${cityName}`)
      return []
    }

    const rawData = fs.readFileSync(cityDataPath, 'utf8')
    const cityData = JSON.parse(rawData)

    // Handle different possible data structures
    let kitchens = []

    if (Array.isArray(cityData)) {
      kitchens = cityData
    } else if (cityData.kitchens && Array.isArray(cityData.kitchens)) {
      kitchens = cityData.kitchens
    } else if (cityData.data && Array.isArray(cityData.data)) {
      kitchens = cityData.data
    } else if (cityData.results && Array.isArray(cityData.results)) {
      kitchens = cityData.results
    } else {
      console.warn(
        `⚠️ Unexpected data structure in ${cityName}/data.json:`,
        Object.keys(cityData)
      )
      return []
    }

    // Add city information to each kitchen
    kitchens = kitchens.map((kitchen) => ({
      ...kitchen,
      city: cityName,
      dataSource: `data/${cityName}/data.json`,
      slug:
        kitchen.slug ||
        generateSlug(
          kitchen.title || kitchen.name || kitchen.displayName?.text
        ),
    }))

    console.log(`✅ Loaded ${kitchens.length} kitchens from ${cityName}`)
    return kitchens
  } catch (error) {
    console.error(`❌ Error loading data for city ${cityName}:`, error)
    return []
  }
}

// Function to generate a URL-friendly slug from a name
function generateSlug(name) {
  if (!name) return 'unknown-kitchen'

  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Function to find a kitchen by slug across all cities
function findKitchenBySlug(targetSlug) {
  const cities = getCityDataFiles()

  for (const city of cities) {
    const kitchens = loadCityKitchens(city)

    for (const kitchen of kitchens) {
      // Check multiple possible slug formats
      const possibleSlugs = [
        kitchen.slug,
        generateSlug(kitchen.title),
        generateSlug(kitchen.name),
        generateSlug(kitchen.displayName?.text),
        // Also check if the slug might be based on address or other fields
        generateSlug(`${kitchen.title || kitchen.name}-${city}`),
      ].filter(Boolean)

      if (possibleSlugs.includes(targetSlug)) {
        console.log(
          `🎯 Found kitchen "${kitchen.title || kitchen.name}" in ${city}`
        )
        return {
          ...kitchen,
          foundIn: city,
          matchedSlug: targetSlug,
        }
      }
    }
  }

  console.log(`❌ Kitchen not found for slug: ${targetSlug}`)
  return null
}

// Function to search kitchens by various criteria
function searchKitchens(searchTerm) {
  const cities = getCityDataFiles()
  const results = []
  const searchLower = searchTerm.toLowerCase()

  for (const city of cities) {
    const kitchens = loadCityKitchens(city)

    const matches = kitchens.filter((kitchen) => {
      const searchableFields = [
        kitchen.title,
        kitchen.name,
        kitchen.displayName?.text,
        kitchen.address,
        kitchen.formattedAddress,
        kitchen.description,
        city,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchableFields.includes(searchLower)
    })

    results.push(...matches)
  }

  return results
}

export async function GET(request, { params }) {
  try {
    const { slug } = params

    console.log('🍳 Kitchen API called for slug:', slug)
    console.log('📂 Data directory:', path.join(process.cwd(), 'data'))

    if (!slug) {
      return NextResponse.json(
        { error: 'Kitchen slug is required' },
        { status: 400 }
      )
    }

    // Find kitchen by slug
    const kitchen = findKitchenBySlug(slug)

    if (!kitchen) {
      // If not found by slug, try searching by name
      const searchResults = searchKitchens(slug.replace(/-/g, ' '))

      if (searchResults.length > 0) {
        console.log(`🔍 Found kitchen by search instead of exact slug`)
        const foundKitchen = searchResults[0]

        return NextResponse.json({
          ...foundKitchen,
          fetchedAt: new Date().toISOString(),
          source: 'file-search',
          note: 'Found by search, not exact slug match',
        })
      }

      console.log('❌ Kitchen not found:', slug)

      // Return available kitchens for debugging
      const cities = getCityDataFiles()
      const allKitchens = []

      for (const city of cities.slice(0, 2)) {
        // Limit to first 2 cities for debugging
        const kitchens = loadCityKitchens(city)
        allKitchens.push(
          ...kitchens.slice(0, 3).map((k) => ({
            // Limit to 3 per city
            slug: k.slug,
            title: k.title || k.name,
            city: city,
          }))
        )
      }

      return NextResponse.json(
        {
          error: 'Kitchen not found',
          searchedSlug: slug,
          availableKitchens: allKitchens,
          suggestion:
            'Check the available slugs above or verify your data files',
        },
        { status: 404 }
      )
    }

    console.log('✅ Kitchen found:', kitchen.title || kitchen.name)

    // Add metadata
    const response = {
      ...kitchen,
      fetchedAt: new Date().toISOString(),
      source: 'file-system',
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('💥 Kitchen API error:', error)

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

// Optional: Add POST method for updating kitchen data
export async function POST(request, { params }) {
  try {
    const { slug } = params
    const updates = await request.json()

    console.log('🔄 Kitchen update requested for:', slug)

    // Find the kitchen first
    const kitchen = findKitchenBySlug(slug)

    if (!kitchen) {
      return NextResponse.json(
        { error: 'Kitchen not found for update' },
        { status: 404 }
      )
    }

    // In a real implementation, you might:
    // 1. Update the JSON file
    // 2. Validate the data
    // 3. Create a backup
    // 4. Trigger a rebuild

    console.log(
      '📝 Kitchen update simulation - data would be written to:',
      kitchen.dataSource
    )

    return NextResponse.json({
      message: 'Kitchen update received (simulation)',
      kitchen: { ...kitchen, ...updates },
      note: 'In production, this would update the JSON file',
    })
  } catch (error) {
    console.error('💥 Kitchen update error:', error)

    return NextResponse.json(
      {
        error: 'Failed to update kitchen',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
