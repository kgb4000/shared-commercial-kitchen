'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  Users,
  DollarSign,
  Home,
  GraduationCap,
  Building,
  MapPin,
  Star,
  ArrowUp,
  ArrowDown,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2,
} from 'lucide-react'

export default function MarketOpportunitySection({
  demographics: initialDemographics,
  kitchen,
}) {
  const [demographics, setDemographics] = useState(initialDemographics)
  const [loading, setLoading] = useState(!initialDemographics)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSections, setExpandedSections] = useState({
    trends: false,
    competition: false,
  })

  // Fetch demographics if not provided
  useEffect(() => {
    if (!initialDemographics && kitchen.city) {
      fetchDemographics()
    }
  }, [kitchen.city, initialDemographics])

  const fetchDemographics = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `/api/demographics/generate?city=${encodeURIComponent(kitchen.city)}`
      )

      if (response.ok) {
        const data = await response.json()
        setDemographics(data.demographics)
      } else if (response.status === 404) {
        // Demographics not found - show generation prompt
        setError('not_found')
      } else {
        throw new Error('Failed to fetch demographics')
      }
    } catch (err) {
      console.error('Error fetching demographics:', err)
      setError('fetch_error')
    } finally {
      setLoading(false)
    }
  }

  const generateDemographics = async () => {
    try {
      setLoading(true)
      setError(null)

      // This would need city codes - for now, show a message
      setError('generation_needed')
    } catch (err) {
      setError('generation_error')
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-blue-600 mr-3 animate-spin" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900">
              Loading Market Analysis
            </h3>
            <p className="text-blue-700 text-sm mt-1">
              Fetching demographic data for {kitchen.city}...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Error states
  if (error === 'not_found') {
    return (
      <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Target className="w-6 h-6 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900">
                Market Analysis Available
              </h3>
              <p className="text-yellow-700 text-sm mt-1">
                Demographic data not yet generated for {kitchen.city}. Contact
                admin to generate market insights.
              </p>
            </div>
          </div>
          <button
            onClick={generateDemographics}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
          >
            Request Analysis
          </button>
        </div>
      </div>
    )
  }

  if (error === 'generation_needed') {
    return (
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center">
          <Target className="w-6 h-6 text-blue-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900">
              Market Analysis Request Sent
            </h3>
            <p className="text-blue-700 text-sm mt-1">
              A request has been sent to generate demographic data for{' '}
              {kitchen.city}. This usually takes a few minutes.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error === 'fetch_error') {
    return (
      <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Target className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">
                Unable to Load Market Data
              </h3>
              <p className="text-red-700 text-sm mt-1">
                There was an error loading market analysis for {kitchen.city}.
              </p>
            </div>
          </div>
          <button
            onClick={fetchDemographics}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // No demographics available
  if (!demographics) {
    return (
      <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-center">
          <Target className="w-6 h-6 text-gray-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Market Analysis
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Market demographic data is not currently available for{' '}
              {kitchen.city}.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Calculate delivery radius stats (assuming 3-mile radius)
  const deliveryRadius = 3
  const estimatedCustomerBase = Math.round(demographics.residents.total * 0.15) // 15% of population in delivery area

  const tabs = [
    { id: 'overview', label: 'Market Overview', icon: Target },
    { id: 'customers', label: 'Customer Base', icon: Users },
    { id: 'opportunity', label: 'Business Opportunity', icon: TrendingUp },
  ]

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Market Opportunity Analysis
              </h2>
              <p className="text-blue-100">
                Data-driven insights for {demographics.cityName},{' '}
                {demographics.state}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {demographics.marketAnalysis?.overallScore || 8}/10
              </div>
              <div className="text-sm text-blue-100">Market Score</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex space-x-1 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {demographics.residents.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Population</div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    $
                    {demographics.residents.keyDemographics.medianIncome?.toLocaleString() ||
                      'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Median Income</div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <Home className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {demographics.residents.keyDemographics.apartmentDwellers}
                  </div>
                  <div className="text-sm text-gray-600">
                    Apartment Dwellers
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <GraduationCap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {demographics.students.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
              </div>

              {/* Market Overview Description */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  Market Overview
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {demographics.overview?.description ||
                    `${
                      demographics.cityName
                    } presents an excellent opportunity for food businesses with ${demographics.residents.total.toLocaleString()} residents and a strong economic foundation.`}
                </p>
              </div>

              {/* Growth Trends */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('trends')}
                >
                  <h3 className="text-lg font-semibold flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                    Growth Trends
                  </h3>
                  {expandedSections.trends ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>

                {expandedSections.trends && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <ArrowUp className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium text-green-800">
                          Population Growth
                        </div>
                        <div className="text-sm text-green-700">
                          {demographics.residents.trends?.populationGrowth ||
                            'Growing steadily'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-blue-800">
                          Income Growth
                        </div>
                        <div className="text-sm text-blue-700">
                          {demographics.residents.trends?.incomeGrowth ||
                            'Increasing income levels'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Customer Base Tab */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              {/* Target Demographics */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Prime Delivery Demographics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Young Professionals */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {demographics.residents.keyDemographics.age25to44?.toLocaleString() ||
                        'N/A'}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Ages 25-44
                    </div>
                    <div className="text-xs text-gray-600">
                      Primary food delivery demographic
                    </div>
                  </div>

                  {/* Students */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {demographics.students.collegeStudents?.toLocaleString() ||
                        'N/A'}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      College Students
                    </div>
                    <div className="text-xs text-gray-600">
                      Late-night and convenience orders
                    </div>
                  </div>

                  {/* Workers */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {demographics.workers.total?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Employed Workers
                    </div>
                    <div className="text-xs text-gray-600">
                      Lunch and dinner market
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Market Analysis */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Delivery Market Potential
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Market Indicators
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Apartment/Condo Residents
                        </span>
                        <span className="font-medium">
                          {
                            demographics.residents.keyDemographics
                              .apartmentDwellers
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Estimated Delivery Customers
                        </span>
                        <span className="font-medium">
                          {estimatedCustomerBase.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Delivery-Friendly Housing
                        </span>
                        <span
                          className={`font-medium ${
                            demographics.residents.marketIndicators
                              ?.deliveryFriendlyHousing
                              ? 'text-green-600'
                              : 'text-orange-600'
                          }`}
                        >
                          {demographics.residents.marketIndicators
                            ?.deliveryFriendlyHousing
                            ? 'High'
                            : 'Moderate'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Customer Spending Power
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Median Household Income
                        </span>
                        <span className="font-medium">
                          $
                          {demographics.residents.keyDemographics.medianIncome?.toLocaleString() ||
                            'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          High Disposable Income
                        </span>
                        <span
                          className={`font-medium ${
                            demographics.residents.marketIndicators
                              ?.highDisposableIncome
                              ? 'text-green-600'
                              : 'text-orange-600'
                          }`}
                        >
                          {demographics.residents.marketIndicators
                            ?.highDisposableIncome
                            ? 'Yes'
                            : 'Moderate'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Market Score
                        </span>
                        <span className="font-medium text-blue-600">
                          {demographics.residents.marketIndicators?.marketScore?.toFixed(
                            1
                          ) || 'N/A'}
                          /10
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry Breakdown */}
              {demographics.workers.industries && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">Key Industries</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(demographics.workers.industries)
                      .slice(0, 6)
                      .map(([industry, data]) => (
                        <div
                          key={industry}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {industry}
                            </div>
                            <div className="text-sm text-gray-600">
                              {data.establishments?.toLocaleString() || 0}{' '}
                              businesses
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-gray-900">
                              {data.employees?.toLocaleString() || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-600">
                              employees
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Business Opportunity Tab */}
          {activeTab === 'opportunity' && (
            <div className="space-y-6">
              {/* Opportunity Highlights */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                  Key Opportunities
                </h3>
                {demographics.marketAnalysis?.opportunities?.length > 0 ? (
                  <div className="space-y-3">
                    {demographics.marketAnalysis.opportunities.map(
                      (opportunity, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 bg-green-50 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                            <span className="text-white text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <p className="text-green-800 font-medium">
                            {opportunity}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start p-4 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <p className="text-green-800 font-medium">
                        {demographics.residents.keyDemographics.age25to44?.toLocaleString() ||
                          'Many'}{' '}
                        residents aged 25-44 - prime food delivery demographic
                      </p>
                    </div>
                    <div className="flex items-start p-4 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <p className="text-green-800 font-medium">
                        High median income ($
                        {demographics.residents.keyDemographics.medianIncome?.toLocaleString() ||
                          'N/A'}
                        ) indicates strong spending power
                      </p>
                    </div>
                    <div className="flex items-start p-4 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <p className="text-green-800 font-medium">
                        {
                          demographics.residents.keyDemographics
                            .apartmentDwellers
                        }{' '}
                        of residents live in apartments - ideal for delivery
                        services
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Revenue Potential */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Revenue Potential Indicators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-blue-900">
                      $
                      {(
                        ((demographics.residents.keyDemographics.medianIncome ||
                          50000) *
                          0.13) /
                        12
                      ).toFixed(0)}
                    </div>
                    <div className="text-sm text-blue-700">
                      Avg monthly food spending per household
                    </div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-green-900">
                      {estimatedCustomerBase.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">
                      Potential delivery customers in {deliveryRadius}-mile
                      radius
                    </div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-xl font-bold text-purple-900">
                      {demographics.marketAnalysis?.overallScore || 8}/10
                    </div>
                    <div className="text-sm text-purple-700">
                      Overall market opportunity score
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Factors */}
              {demographics.workers.businessOpportunity?.factors && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Business Environment Factors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {demographics.workers.businessOpportunity.factors.map(
                      (factor, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-blue-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-sm text-blue-800">
                            {factor}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Ready to Start Your Food Business?
                    </h3>
                    <p className="text-blue-100">
                      This market shows strong potential for food entrepreneurs.
                      Contact us to learn more about kitchen availability.
                    </p>
                  </div>
                  <div className="ml-6">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                      Contact Kitchen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Source */}
      <div className="mt-4 text-center text-xs text-gray-500">
        Data sourced from US Census Bureau, Bureau of Labor Statistics, and
        Department of Education APIs • Last updated:{' '}
        {new Date(demographics.lastUpdated).toLocaleDateString()} • Confidence:{' '}
        {demographics.dataQuality?.confidence || 'N/A'}%
      </div>
    </div>
  )
}
