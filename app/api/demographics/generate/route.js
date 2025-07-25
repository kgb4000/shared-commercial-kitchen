// app/api/demographics/generate/route.js
import { NextResponse } from 'next/server'
import { DemographicGenerator } from '@/lib/demographics/demographicGenerator'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request) {
  try {
    const {
      cityName,
      stateCode,
      countyCode,
      saveToFile = true,
    } = await request.json()

    console.log(`=== Generating Demographics for ${cityName}, ${stateCode} ===`)

    if (!cityName || !stateCode) {
      return NextResponse.json(
        { error: 'cityName and stateCode are required' },
        { status: 400 }
      )
    }

    const generator = new DemographicGenerator()

    // Generate demographic data
    const demographics = await generator.generateCityDemographics(
      cityName,
      stateCode,
      countyCode
    )

    console.log('✅ Demographics generated successfully')

    // Save to file if requested
    if (saveToFile) {
      await saveDemographicsToFile(cityName, demographics)
      console.log('💾 Demographics saved to file')
    }

    return NextResponse.json({
      success: true,
      demographics,
      generatedAt: new Date().toISOString(),
      dataQuality: demographics.dataQuality,
    })
  } catch (error) {
    console.error('💥 Error generating demographics:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate demographics',
        details: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

// Batch generate for multiple cities
export async function PUT(request) {
  try {
    const { cities } = await request.json()

    if (!Array.isArray(cities)) {
      return NextResponse.json(
        { error: 'cities must be an array' },
        { status: 400 }
      )
    }

    console.log(
      `=== Batch Generating Demographics for ${cities.length} cities ===`
    )

    const generator = new DemographicGenerator()
    const results = []

    for (const city of cities) {
      try {
        console.log(`Processing ${city.name}...`)

        const demographics = await generator.generateCityDemographics(
          city.name,
          city.stateCode,
          city.countyCode
        )

        await saveDemographicsToFile(city.name, demographics)

        results.push({
          city: city.name,
          success: true,
          dataQuality: demographics.dataQuality.confidence,
        })

        // Rate limiting - wait between requests
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error processing ${city.name}:`, error)
        results.push({
          city: city.name,
          success: false,
          error: error.message,
        })
      }
    }

    const successCount = results.filter((r) => r.success).length
    console.log(
      `✅ Batch complete: ${successCount}/${cities.length} cities processed`
    )

    return NextResponse.json({
      success: true,
      results,
      summary: {
        total: cities.length,
        successful: successCount,
        failed: cities.length - successCount,
      },
      completedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('💥 Error in batch generation:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate batch demographics',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

// Helper function to save demographics data
async function saveDemographicsToFile(cityName, demographics) {
  try {
    // Determine city folder name (normalize)
    const cityFolder = cityName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    // Create city data directory if it doesn't exist
    const cityDataDir = path.join(process.cwd(), 'data', cityFolder)

    try {
      await fs.access(cityDataDir)
    } catch {
      await fs.mkdir(cityDataDir, { recursive: true })
    }

    // Save demographics.json
    const demographicsPath = path.join(cityDataDir, 'demographics.json')
    await fs.writeFile(demographicsPath, JSON.stringify(demographics, null, 2))

    // Also update the main data.json to include demographic summary
    const dataJsonPath = path.join(cityDataDir, 'data.json')
    try {
      const existingData = await fs.readFile(dataJsonPath, 'utf-8')
      const cityData = JSON.parse(existingData)

      // Add demographic summary to main data file
      cityData.demographicSummary = {
        lastUpdated: demographics.lastUpdated,
        totalPopulation: demographics.residents.total,
        medianIncome: demographics.residents.keyDemographics.medianIncome,
        marketScore: demographics.residents.marketIndicators?.marketScore || 5,
        hasFullDemographics: true,
      }

      await fs.writeFile(dataJsonPath, JSON.stringify(cityData, null, 2))
    } catch (error) {
      console.warn(
        `Could not update main data.json for ${cityName}:`,
        error.message
      )
    }

    return true
  } catch (error) {
    console.error(`Error saving demographics for ${cityName}:`, error)
    throw error
  }
}

// GET route to check available demographics
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const cityName = searchParams.get('city')

    if (cityName) {
      // Get specific city demographics
      const demographics = await getDemographicsFromFile(cityName)
      if (demographics) {
        return NextResponse.json({
          success: true,
          demographics,
          cached: true,
        })
      } else {
        return NextResponse.json(
          { error: 'Demographics not found for this city' },
          { status: 404 }
        )
      }
    } else {
      // List all cities with demographics
      const citiesWithDemographics = await listCitiesWithDemographics()
      return NextResponse.json({
        success: true,
        cities: citiesWithDemographics,
        count: citiesWithDemographics.length,
      })
    }
  } catch (error) {
    console.error('Error getting demographics:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve demographics' },
      { status: 500 }
    )
  }
}

async function getDemographicsFromFile(cityName) {
  try {
    const cityFolder = cityName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
    const demographicsPath = path.join(
      process.cwd(),
      'data',
      cityFolder,
      'demographics.json'
    )

    const fileContent = await fs.readFile(demographicsPath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    return null
  }
}

async function listCitiesWithDemographics() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const cities = await fs.readdir(dataDir, { withFileTypes: true })

    const citiesWithDemographics = []

    for (const city of cities) {
      if (city.isDirectory()) {
        const demographicsPath = path.join(
          dataDir,
          city.name,
          'demographics.json'
        )
        try {
          await fs.access(demographicsPath)
          const demographics = await getDemographicsFromFile(city.name)
          if (demographics) {
            citiesWithDemographics.push({
              folder: city.name,
              cityName: demographics.cityName,
              state: demographics.state,
              population: demographics.residents.total,
              lastUpdated: demographics.lastUpdated,
              dataQuality: demographics.dataQuality.confidence,
            })
          }
        } catch {
          // City doesn't have demographics yet
        }
      }
    }

    return citiesWithDemographics
  } catch (error) {
    console.error('Error listing cities:', error)
    return []
  }
}
