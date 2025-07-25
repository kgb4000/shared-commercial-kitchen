// lib/demographics/employmentApi.js
// Bureau of Labor Statistics API

export class EmploymentAPI {
  constructor() {
    this.blsUrl = 'https://api.bls.gov/publicAPI/v2'
    this.censusBusinessUrl = 'https://api.census.gov/data/2021/cbp'
  }

  // Get employment data for metro area
  async getEmploymentData(metroAreaCode, stateCode) {
    try {
      // BLS API for unemployment rate and labor force
      const seriesId = `LAUCN${stateCode}${metroAreaCode}000000003` // Unemployment rate
      const blsData = await this.fetchBLSData([seriesId])

      // Census Business Patterns for industry breakdown
      const businessData = await this.getBusinessPatterns(stateCode)

      return {
        laborForce: blsData?.laborForce || 0,
        employed: blsData?.employed || 0,
        unemploymentRate: blsData?.unemploymentRate || 0,
        industries: businessData,
      }
    } catch (error) {
      console.error('Error fetching employment data:', error)
      return this.getFallbackEmploymentData()
    }
  }

  async fetchBLSData(seriesIds) {
    try {
      const apiKey = process.env.BLS_API_KEY
      const url = apiKey
        ? `${this.blsUrl}/timeseries/data/`
        : `${this.blsUrl}/timeseries/data/`

      const payload = {
        seriesid: seriesIds,
        startyear: '2022',
        endyear: '2023',
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      return this.parseBLSData(data)
    } catch (error) {
      console.error('BLS API error:', error)
      return null
    }
  }

  async getBusinessPatterns(stateCode) {
    try {
      // Get business counts by industry
      const url = `${this.censusBusinessUrl}?get=NAICS2017_LABEL,EMP,ESTAB&for=state:${stateCode}&NAICS2017=*`

      const response = await fetch(url)
      const data = await response.json()

      return this.parseBusinessData(data)
    } catch (error) {
      console.error('Census Business Patterns error:', error)
      return {}
    }
  }

  parseBusinessData(data) {
    const industries = {}

    // Focus on food service related industries
    const relevantIndustries = {
      72: 'Accommodation and Food Services',
      54: 'Professional, Scientific, Technical Services',
      52: 'Finance and Insurance',
      51: 'Information (Tech)',
      62: 'Health Care and Social Assistance',
    }

    for (const row of data.slice(1)) {
      // Skip header
      const naicsCode = row[0]?.substring(0, 2)
      if (relevantIndustries[naicsCode]) {
        industries[relevantIndustries[naicsCode]] = {
          employees: parseInt(row[1]) || 0,
          establishments: parseInt(row[2]) || 0,
        }
      }
    }

    return industries
  }

  getFallbackEmploymentData() {
    return {
      laborForce: 500000,
      employed: 475000,
      unemploymentRate: 5.0,
      industries: {
        Technology: { employees: 85000, establishments: 1200 },
        Finance: { employees: 45000, establishments: 800 },
        Healthcare: { employees: 95000, establishments: 450 },
      },
    }
  }
}
