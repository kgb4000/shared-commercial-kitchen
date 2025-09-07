/**
 * US Census API utility functions
 * Get your free API key at: https://api.census.gov/data/key_signup.html
 * Set as environment variable: CENSUS_API_KEY=your_key_here
 */

// State FIPS codes for common states
const STATE_CODES = {
  'CA': '06', 'TX': '48', 'NY': '36', 'FL': '12', 'IL': '17',
  'PA': '42', 'OH': '39', 'GA': '13', 'NC': '37', 'MI': '26',
  'WA': '53', 'AZ': '04', 'MA': '25', 'CO': '08', 'MD': '24'
}

/**
 * Get basic demographic data for a city
 * @param {string} cityName - City name (e.g., "Houston")
 * @param {string} stateCode - 2-letter state code (e.g., "TX")
 * @returns {Promise<Object>} Demographic data
 */
export async function getCityDemographics(cityName, stateCode) {
  const apiKey = process.env.CENSUS_API_KEY
  
  if (!apiKey) {
    console.warn('⚠️ CENSUS_API_KEY not found. Using placeholder data.')
    return getPlaceholderData(cityName, stateCode)
  }

  const stateFips = STATE_CODES[stateCode.toUpperCase()]
  
  if (!stateFips) {
    console.warn(`⚠️ State code ${stateCode} not found in STATE_CODES`)
    return getPlaceholderData(cityName, stateCode)
  }

  try {
    // ACS 5-Year Estimates (most recent comprehensive data)
    const variables = [
      'B01003_001E', // Total Population
      'B19013_001E', // Median Household Income
      'B08303_001E', // Total Commuters
      'B15003_022E', // Bachelor's degree
      'B15003_023E', // Master's degree
      'B15003_024E', // Professional degree
      'B15003_025E', // Doctorate degree
    ].join(',')

    const url = `https://api.census.gov/data/2021/acs/acs5?get=${variables}&for=place:*&in=state:${stateFips}&key=${apiKey}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Census API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Find city data (case-insensitive search)
    const cityData = data.find(row => {
      const placeName = row[row.length - 1] // Place name is usually last
      return placeName && placeName.toLowerCase().includes(cityName.toLowerCase())
    })
    
    if (!cityData) {
      console.warn(`⚠️ City "${cityName}" not found in Census data`)
      return getPlaceholderData(cityName, stateCode)
    }
    
    // Parse the data
    const [
      totalPop,
      medianIncome, 
      totalCommuters,
      bachelors,
      masters,
      professional,
      doctorate
    ] = cityData

    // Calculate derived statistics
    const collegeDegrees = parseInt(bachelors || 0) + parseInt(masters || 0) + 
                          parseInt(professional || 0) + parseInt(doctorate || 0)
    
    return {
      population: formatNumber(parseInt(totalPop)),
      medianIncome: medianIncome ? `$${formatNumber(parseInt(medianIncome))}` : 'Data not available',
      commuters: formatNumber(parseInt(totalCommuters || totalPop * 0.6)), // Estimate if not available
      collegeGraduates: formatNumber(collegeDegrees),
      lastUpdated: new Date().toISOString().split('T')[0],
      source: 'US Census 2021 ACS 5-Year Estimates'
    }
    
  } catch (error) {
    console.error('❌ Census API error:', error.message)
    return getPlaceholderData(cityName, stateCode)
  }
}

/**
 * Format numbers for display (e.g., 123456 -> "123K")
 */
function formatNumber(num) {
  if (!num || isNaN(num)) return 'N/A'
  
  if (num >= 1000000) {
    return Math.round(num / 100000) / 10 + 'M'
  } else if (num >= 1000) {
    return Math.round(num / 100) / 10 + 'K'
  }
  
  return num.toString()
}

/**
 * Fallback data when API is not available
 */
function getPlaceholderData(cityName, stateCode) {
  return {
    population: 'Contact for data',
    medianIncome: 'Contact for data', 
    commuters: 'Contact for data',
    collegeGraduates: 'Contact for data',
    lastUpdated: new Date().toISOString().split('T')[0],
    source: 'Placeholder data - Configure CENSUS_API_KEY for real data'
  }
}

/**
 * Get university enrollment data (you'll need to add specific APIs)
 * This is a template - replace with actual university APIs
 */
export async function getUniversityEnrollment(cityName, stateCode) {
  // Example for Houston - you'd replace this with actual university APIs
  const universityData = {
    'houston': { enrollment: 47000, name: 'University of Houston' },
    'austin': { enrollment: 51000, name: 'University of Texas at Austin' },
    'chicago': { enrollment: 34000, name: 'University of Chicago + others' }
  }
  
  const data = universityData[cityName.toLowerCase()]
  
  return {
    studentCount: data ? formatNumber(data.enrollment) : 'Contact for data',
    primaryUniversity: data ? data.name : 'Local universities',
    lastUpdated: new Date().toISOString().split('T')[0],
    source: data ? 'University enrollment reports' : 'Estimate based on local institutions'
  }
}

/**
 * Example usage in your city page:
 * 
 * // In your city page component or API route
 * const demographics = await getCityDemographics('Houston', 'TX')
 * const students = await getUniversityEnrollment('Houston', 'TX') 
 * 
 * // Update your insights object:
 * const insights = {
 *   residents: {
 *     count: demographics.population,
 *     description: "...",
 *     source: demographics.source
 *   },
 *   income: {
 *     median: demographics.medianIncome,
 *     description: "...",
 *     source: demographics.source  
 *   },
 *   students: {
 *     count: students.studentCount,
 *     description: "...",
 *     source: students.source
 *   }
 * }
 */