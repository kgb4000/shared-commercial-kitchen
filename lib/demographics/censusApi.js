// lib/demographics/censusApi.js
// US Census API integration

const CENSUS_BASE_URL = 'https://api.census.gov/data'
const ACS_YEAR = '2022' // American Community Survey latest year

export class CensusAPI {
  constructor() {
    // Census API is free, no key required
    this.baseUrl = CENSUS_BASE_URL
  }

  // Get population and demographic data for a city
  async getCityDemographics(cityName, stateCode, countyCode) {
    try {
      // ACS 5-year estimates for detailed demographics
      const variables = [
        'B01003_001E', // Total population
        'B19013_001E', // Median household income
        'B25003_001E', // Total housing units
        'B25003_002E', // Owner-occupied housing
        'B25003_003E', // Renter-occupied housing
        'B01001_001E', // Total population for age breakdown
        'B01001_009E', // Male 25-29
        'B01001_010E', // Male 30-34
        'B01001_011E', // Male 35-39
        'B01001_012E', // Male 40-44
        'B01001_033E', // Female 25-29
        'B01001_034E', // Female 30-34
        'B01001_035E', // Female 35-39
        'B01001_036E', // Female 40-44
        'B08301_001E', // Total commuters
        'B08301_010E', // Public transportation
        'B08301_021E', // Work from home
      ]

      const url = `${this.baseUrl}/${ACS_YEAR}/acs/acs5?get=${variables.join(
        ','
      )}&for=place:*&in=state:${stateCode}`

      const response = await fetch(url)
      if (!response.ok) throw new Error(`Census API error: ${response.status}`)

      const data = await response.json()

      // Find the city in the response
      const cityData = data.find(
        (row) =>
          row[data[0].indexOf('NAME')] &&
          row[data[0].indexOf('NAME')]
            .toLowerCase()
            .includes(cityName.toLowerCase())
      )

      if (!cityData) {
        throw new Error(`City ${cityName} not found in Census data`)
      }

      return this.parseCensusData(cityData, data[0])
    } catch (error) {
      console.error('Error fetching Census data:', error)
      throw error
    }
  }

  // Get historical data for trends
  async getHistoricalData(
    cityName,
    stateCode,
    years = ['2018', '2019', '2020', '2021', '2022']
  ) {
    const historicalData = []

    for (const year of years) {
      try {
        const url = `${this.baseUrl}/${year}/acs/acs5?get=B01003_001E,B19013_001E&for=place:*&in=state:${stateCode}`
        const response = await fetch(url)
        const data = await response.json()

        const cityData = data.find(
          (row) =>
            row[data[0].indexOf('NAME')] &&
            row[data[0].indexOf('NAME')]
              .toLowerCase()
              .includes(cityName.toLowerCase())
        )

        if (cityData) {
          historicalData.push({
            year,
            population: parseInt(cityData[0]) || 0,
            medianIncome: parseInt(cityData[1]) || 0,
          })
        }
      } catch (error) {
        console.warn(`Could not fetch data for ${year}:`, error)
      }
    }

    return historicalData
  }

  parseCensusData(cityData, headers) {
    const getValue = (index) => parseInt(cityData[index]) || 0

    // Calculate age demographics (25-44 prime delivery age)
    const male25to44 = getValue(6) + getValue(7) + getValue(8) + getValue(9)
    const female25to44 =
      getValue(10) + getValue(11) + getValue(12) + getValue(13)
    const total25to44 = male25to44 + female25to44

    return {
      totalPopulation: getValue(0),
      medianIncome: getValue(1),
      totalHousing: getValue(2),
      ownerOccupied: getValue(3),
      renterOccupied: getValue(4),
      demographics: {
        age25to44: total25to44,
        percentRenters:
          getValue(2) > 0 ? ((getValue(4) / getValue(2)) * 100).toFixed(1) : 0,
      },
      commuting: {
        totalCommuters: getValue(14),
        publicTransport: getValue(15),
        workFromHome: getValue(16),
      },
    }
  }
}
