// lib/demographics/demographicGenerator.js
// Main orchestrator that combines all APIs

import { CensusAPI } from './censusApi.js'
import { EducationAPI } from './educationApi.js'
import { EmploymentAPI } from './employmentApi.js'

export class DemographicGenerator {
  constructor() {
    this.censusApi = new CensusAPI()
    this.educationApi = new EducationAPI()
    this.employmentApi = new EmploymentAPI()
  }

  async generateCityDemographics(cityName, stateCode, countyCode) {
    console.log(`Generating demographics for ${cityName}, ${stateCode}`)

    try {
      // Fetch data from all sources
      const [censusData, historicalData, k12Data, collegeData, employmentData] =
        await Promise.allSettled([
          this.censusApi.getCityDemographics(cityName, stateCode, countyCode),
          this.censusApi.getHistoricalData(cityName, stateCode),
          this.educationApi.getK12Data(cityName, stateCode),
          this.educationApi.getCollegeData(cityName, stateCode),
          this.employmentApi.getEmploymentData(countyCode, stateCode),
        ])

      // Combine and structure the data
      const demographics = this.structureDemographicData({
        cityName,
        stateCode,
        census: censusData.status === 'fulfilled' ? censusData.value : null,
        historical:
          historicalData.status === 'fulfilled' ? historicalData.value : [],
        k12: k12Data.status === 'fulfilled' ? k12Data.value : null,
        college: collegeData.status === 'fulfilled' ? collegeData.value : null,
        employment:
          employmentData.status === 'fulfilled' ? employmentData.value : null,
      })

      return demographics
    } catch (error) {
      console.error('Error generating demographics:', error)
      throw error
    }
  }

  structureDemographicData(data) {
    const {
      cityName,
      stateCode,
      census,
      historical,
      k12,
      college,
      employment,
    } = data

    return {
      cityName,
      state: this.getStateName(stateCode),
      lastUpdated: new Date().toISOString(),

      // Generate overview paragraph
      overview: this.generateOverview(cityName, census, employment),

      residents: {
        total: census?.totalPopulation || 0,
        keyDemographics: {
          age25to44: census?.demographics?.age25to44 || 0,
          medianIncome: census?.medianIncome || 0,
          apartmentDwellers: `${census?.demographics?.percentRenters || 0}%`,
          primaryDeliveryAge:
            Math.round(
              (census?.demographics?.age25to44 / census?.totalPopulation) * 100
            ) || 0,
        },
        trends: this.calculateTrends(historical),
        marketIndicators: this.calculateMarketIndicators(census),
      },

      workers: {
        total: employment?.employed || 0,
        industries: employment?.industries || {},
        unemploymentRate: employment?.unemploymentRate || 0,
        laborForce: employment?.laborForce || 0,
        businessOpportunity: this.assessBusinessOpportunity(employment),
      },

      students: {
        total: (k12?.students || 0) + (college?.totalEnrollment || 0),
        k12Students: k12?.students || 0,
        universities: college?.universities || [],
        collegeStudents: college?.totalEnrollment || 0,
        marketPotential: this.assessStudentMarket(college, k12),
      },

      marketAnalysis: this.generateMarketAnalysis(census, employment, college),

      // Data quality indicators
      dataQuality: {
        census: !!census,
        employment: !!employment,
        education: !!(k12 && college),
        confidence: this.calculateConfidence(census, employment, k12, college),
      },
    }
  }

  generateOverview(cityName, census, employment) {
    const population = census?.totalPopulation || 0
    const income = census?.medianIncome || 0
    const renters = census?.demographics?.percentRenters || 0

    return `${cityName} is a dynamic city with ${population.toLocaleString()} residents and a median household income of $${income.toLocaleString()}. With ${renters}% of residents living in apartments and condos, the area shows strong potential for food delivery services. The diverse economy and growing population create an ideal environment for food entrepreneurs looking to serve both residential customers and the busy workforce.`
  }

  calculateTrends(historical) {
    if (!historical || historical.length < 2) {
      return {
        populationGrowth: 'Data not available',
        incomeGrowth: 'Data not available',
      }
    }

    const latest = historical[historical.length - 1]
    const earliest = historical[0]

    const popGrowth = (
      ((latest.population - earliest.population) / earliest.population) *
      100
    ).toFixed(1)
    const incomeGrowth = (
      ((latest.medianIncome - earliest.medianIncome) / earliest.medianIncome) *
      100
    ).toFixed(1)

    return {
      populationGrowth: `${popGrowth}% over ${historical.length} years`,
      incomeGrowth: `${incomeGrowth}% income growth`,
    }
  }

  calculateMarketIndicators(census) {
    if (!census) return {}

    const deliveryFriendly = census.demographics?.percentRenters > 40
    const highIncome = census.medianIncome > 60000
    const youngProfessionals =
      census.demographics?.age25to44 / census.totalPopulation > 0.25

    return {
      deliveryFriendlyHousing: deliveryFriendly,
      highDisposableIncome: highIncome,
      youngProfessionalDemographic: youngProfessionals,
      marketScore:
        ((deliveryFriendly + highIncome + youngProfessionals) / 3) * 10,
    }
  }

  assessBusinessOpportunity(employment) {
    if (!employment) return { score: 5, factors: [] }

    const factors = []
    let score = 5

    if (employment.unemploymentRate < 5) {
      factors.push('Low unemployment indicates economic stability')
      score += 1
    }

    if (employment.industries?.['Technology']?.employees > 20000) {
      factors.push('Large tech sector with high-spending workers')
      score += 1.5
    }

    if (employment.industries?.['Finance']?.employees > 15000) {
      factors.push('Financial sector workers are prime lunch customers')
      score += 1
    }

    return { score: Math.min(score, 10), factors }
  }

  assessStudentMarket(college, k12) {
    const totalStudents = (college?.totalEnrollment || 0) + (k12?.students || 0)
    let potential = 'Low'

    if (totalStudents > 100000) potential = 'Very High'
    else if (totalStudents > 50000) potential = 'High'
    else if (totalStudents > 25000) potential = 'Moderate'

    return {
      level: potential,
      totalStudents,
      lateNightDeliveryMarket: college?.totalEnrollment > 20000,
      familyMealMarket: k12?.students > 30000,
    }
  }

  generateMarketAnalysis(census, employment, college) {
    const opportunities = []
    const challenges = []

    // Opportunities
    if (census?.demographics?.age25to44 > 20000) {
      opportunities.push(
        `${census.demographics.age25to44.toLocaleString()} residents aged 25-44 - prime food delivery demographic`
      )
    }

    if (census?.medianIncome > 70000) {
      opportunities.push(
        `High median income ($${census.medianIncome.toLocaleString()}) indicates strong spending power`
      )
    }

    if (college?.totalEnrollment > 15000) {
      opportunities.push(
        `${college.totalEnrollment.toLocaleString()} college students create late-night and convenience food demand`
      )
    }

    // Challenges (placeholder - would need competition data)
    if (census?.totalPopulation < 100000) {
      challenges.push('Smaller market size may limit customer base')
    }

    return {
      opportunities,
      challenges,
      overallScore: opportunities.length > challenges.length ? 8 : 6,
    }
  }

  calculateConfidence(census, employment, k12, college) {
    let score = 0
    if (census) score += 40
    if (employment) score += 30
    if (k12) score += 15
    if (college) score += 15
    return score
  }

  getStateName(stateCode) {
    const states = {
      '01': 'Alabama',
      '02': 'Alaska',
      '04': 'Arizona',
      '05': 'Arkansas',
      '06': 'California',
      '08': 'Colorado',
      '09': 'Connecticut',
      10: 'Delaware',
      11: 'District of Columbia',
      12: 'Florida',
      13: 'Georgia',
      15: 'Hawaii',
      16: 'Idaho',
      17: 'Illinois',
      18: 'Indiana',
      19: 'Iowa',
      20: 'Kansas',
      21: 'Kentucky',
      22: 'Louisiana',
      23: 'Maine',
      24: 'Maryland',
      25: 'Massachusetts',
      26: 'Michigan',
      27: 'Minnesota',
      28: 'Mississippi',
      29: 'Missouri',
      30: 'Montana',
      31: 'Nebraska',
      32: 'Nevada',
      33: 'New Hampshire',
      34: 'New Jersey',
      35: 'New Mexico',
      36: 'New York',
      37: 'North Carolina',
      38: 'North Dakota',
      39: 'Ohio',
      40: 'Oklahoma',
      41: 'Oregon',
      42: 'Pennsylvania',
      44: 'Rhode Island',
      45: 'South Carolina',
      46: 'South Dakota',
      47: 'Tennessee',
      48: 'Texas',
      49: 'Utah',
      50: 'Vermont',
      51: 'Virginia',
      53: 'Washington',
      54: 'West Virginia',
      55: 'Wisconsin',
      56: 'Wyoming',
    }
    return states[stateCode] || 'Unknown'
  }
}
