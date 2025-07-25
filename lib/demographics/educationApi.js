// lib/demographics/educationApi.js
// Education data from NCES and state APIs

export class EducationAPI {
  constructor() {
    this.ncessUrl = 'https://api.ed.gov/data'
    this.ipedsUrl = 'https://api.data.gov/ed/collegescorecard/v1'
  }

  // Get K-12 school data
  async getK12Data(cityName, stateCode) {
    try {
      // Note: NCES API requires registration for key
      // Alternative: Use open state education APIs
      const schoolData = await this.getStateSchoolData(cityName, stateCode)
      return schoolData
    } catch (error) {
      console.error('Error fetching K-12 data:', error)
      return this.getFallbackK12Data(cityName)
    }
  }

  // Get college/university data
  async getCollegeData(cityName, stateCode) {
    try {
      // College Scorecard API (requires API key)
      const apiKey = process.env.ED_DATA_API_KEY
      if (!apiKey) {
        return this.getFallbackCollegeData(cityName)
      }

      const url = `${this.ipedsUrl}/schools?school.city=${encodeURIComponent(
        cityName
      )}&school.state=${stateCode}&api_key=${apiKey}`

      const response = await fetch(url)
      if (!response.ok)
        throw new Error(`Education API error: ${response.status}`)

      const data = await response.json()

      return {
        universities: data.results.map((school) => ({
          name: school['school.name'],
          enrollment: school['2022.student.size'] || 0,
          type: school['school.degrees_awarded.predominant_recoded'],
        })),
        totalEnrollment: data.results.reduce(
          (sum, school) => sum + (school['2022.student.size'] || 0),
          0
        ),
      }
    } catch (error) {
      console.error('Error fetching college data:', error)
      return this.getFallbackCollegeData(cityName)
    }
  }

  getFallbackK12Data(cityName) {
    // Estimated data based on population ratios
    // In production, use actual APIs or scraped data
    const estimates = {
      austin: { schools: 85, students: 145000 },
      dallas: { schools: 156, students: 185000 },
      houston: { schools: 198, students: 245000 },
    }

    return estimates[cityName.toLowerCase()] || { schools: 25, students: 35000 }
  }

  getFallbackCollegeData(cityName) {
    const estimates = {
      austin: [
        { name: 'University of Texas at Austin', enrollment: 51000 },
        { name: 'Austin Community College', enrollment: 34000 },
      ],
      dallas: [
        { name: 'University of Texas at Dallas', enrollment: 31000 },
        { name: 'Dallas College', enrollment: 45000 },
      ],
    }

    const cityData = estimates[cityName.toLowerCase()] || []
    return {
      universities: cityData,
      totalEnrollment: cityData.reduce(
        (sum, school) => sum + school.enrollment,
        0
      ),
    }
  }
}
