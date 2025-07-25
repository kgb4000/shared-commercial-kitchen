// lib/demographicsUtils.js
import fs from 'fs/promises'
import path from 'path'

/**
 * Get demographics data for a city from the file system
 * This is a server-side function for use in pages and API routes
 */
export async function getDemographicsFromFile(cityName) {
  try {
    if (!cityName) return null

    // Normalize city name to match folder structure
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

    // Check if file exists
    await fs.access(demographicsPath)

    // Read and parse the file
    const fileContent = await fs.readFile(demographicsPath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // File doesn't exist or can't be read
    console.log(`Demographics not found for ${cityName}:`, error.message)
    return null
  }
}

/**
 * Get demographics data for multiple cities
 */
export async function getAllDemographics() {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const cities = await fs.readdir(dataDir, { withFileTypes: true })

    const allDemographics = {}

    for (const city of cities) {
      if (city.isDirectory()) {
        const demographics = await getDemographicsFromFile(city.name)
        if (demographics) {
          allDemographics[city.name] = demographics
        }
      }
    }

    return allDemographics
  } catch (error) {
    console.error('Error getting all demographics:', error)
    return {}
  }
}

/**
 * Check if demographics exist for a city
 */
export async function hasDemographics(cityName) {
  const demographics = await getDemographicsFromFile(cityName)
  return !!demographics
}

/**
 * Get a summary of demographic data (for quick display)
 */
export async function getDemographicSummary(cityName) {
  const demographics = await getDemographicsFromFile(cityName)

  if (!demographics) return null

  return {
    cityName: demographics.cityName,
    state: demographics.state,
    population: demographics.residents?.total || 0,
    medianIncome: demographics.residents?.keyDemographics?.medianIncome || 0,
    marketScore: demographics.residents?.marketIndicators?.marketScore || 0,
    studentCount: demographics.students?.total || 0,
    workerCount: demographics.workers?.total || 0,
    lastUpdated: demographics.lastUpdated,
    hasFullData: true,
  }
}

/**
 * Create marketing messages from demographic data
 */
export function createMarketingMessages(demographics) {
  if (!demographics) return []

  const messages = []

  // Population and age demographics
  if (demographics.residents?.keyDemographics?.age25to44 > 10000) {
    messages.push({
      type: 'opportunity',
      message: `${demographics.residents.keyDemographics.age25to44.toLocaleString()} residents aged 25-44 - prime food delivery demographic`,
      icon: 'users',
      priority: 'high',
    })
  }

  // Income level
  if (demographics.residents?.keyDemographics?.medianIncome > 60000) {
    messages.push({
      type: 'opportunity',
      message: `High median income ($${demographics.residents.keyDemographics.medianIncome.toLocaleString()}) indicates strong spending power`,
      icon: 'dollar',
      priority: 'high',
    })
  }

  // Housing type
  const apartmentPercent = parseInt(
    demographics.residents?.keyDemographics?.apartmentDwellers?.replace(
      '%',
      ''
    ) || 0
  )
  if (apartmentPercent > 40) {
    messages.push({
      type: 'opportunity',
      message: `${demographics.residents.keyDemographics.apartmentDwellers} apartment dwellers - ideal for delivery services`,
      icon: 'home',
      priority: 'medium',
    })
  }

  // Student market
  if (demographics.students?.collegeStudents > 15000) {
    messages.push({
      type: 'opportunity',
      message: `${demographics.students.collegeStudents.toLocaleString()} college students create late-night delivery demand`,
      icon: 'graduation',
      priority: 'medium',
    })
  }

  // Tech workers
  if (demographics.workers?.industries?.Technology?.employees > 20000) {
    messages.push({
      type: 'opportunity',
      message: `${demographics.workers.industries.Technology.employees.toLocaleString()} tech workers need convenient lunch options`,
      icon: 'building',
      priority: 'high',
    })
  }

  // Growth trends
  if (
    demographics.residents?.trends?.populationGrowth?.includes('15%') ||
    demographics.residents?.trends?.populationGrowth?.includes('20%')
  ) {
    messages.push({
      type: 'trend',
      message: `Strong population growth: ${demographics.residents.trends.populationGrowth}`,
      icon: 'trending',
      priority: 'medium',
    })
  }

  return messages.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

/**
 * Calculate estimated revenue potential based on demographics
 */
export function calculateRevenuePotential(demographics, deliveryRadius = 3) {
  if (!demographics) return null

  const population = demographics.residents?.total || 0
  const medianIncome =
    demographics.residents?.keyDemographics?.medianIncome || 50000
  const apartmentPercent = parseInt(
    demographics.residents?.keyDemographics?.apartmentDwellers?.replace(
      '%',
      ''
    ) || 30
  )

  // Estimate customers in delivery radius (assuming 15% of population)
  const estimatedCustomers = Math.round(population * 0.15)

  // Average monthly food spending (13% of income for food, 30% of that on delivery/takeout)
  const monthlyFoodSpending = Math.round((medianIncome * 0.13 * 0.3) / 12)

  // Delivery-friendly factor (more apartments = more delivery orders)
  const deliveryFactor = Math.min((apartmentPercent / 100) * 1.5, 1.5)

  return {
    estimatedCustomers,
    monthlySpendingPerCustomer: Math.round(
      monthlyFoodSpending * deliveryFactor
    ),
    potentialMonthlyRevenue: Math.round(
      estimatedCustomers * monthlyFoodSpending * deliveryFactor * 0.02
    ), // 2% market share
    deliveryRadius,
    confidenceLevel: demographics.dataQuality?.confidence || 70,
  }
}

/**
 * Get demographic data with caching (client-side safe)
 */
export async function getDemographicsAPI(cityName) {
  try {
    const response = await fetch(
      `/api/demographics/generate?city=${encodeURIComponent(cityName)}`
    )

    if (response.ok) {
      const data = await response.json()
      return data.demographics
    } else if (response.status === 404) {
      return null // Demographics not found
    } else {
      throw new Error(`API error: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching demographics via API:', error)
    return null
  }
}

/**
 * Format demographic data for display
 */
export function formatDemographicData(demographics) {
  if (!demographics) return null

  return {
    population: new Intl.NumberFormat().format(
      demographics.residents?.total || 0
    ),
    medianIncome: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(demographics.residents?.keyDemographics?.medianIncome || 0),

    apartmentDwellers:
      demographics.residents?.keyDemographics?.apartmentDwellers || '0%',

    youngProfessionals: new Intl.NumberFormat().format(
      demographics.residents?.keyDemographics?.age25to44 || 0
    ),

    students: new Intl.NumberFormat().format(demographics.students?.total || 0),

    workers: new Intl.NumberFormat().format(demographics.workers?.total || 0),

    marketScore:
      demographics.residents?.marketIndicators?.marketScore?.toFixed(1) ||
      'N/A',

    lastUpdated: new Date(demographics.lastUpdated).toLocaleDateString(),

    confidence: demographics.dataQuality?.confidence || 0,
  }
}
