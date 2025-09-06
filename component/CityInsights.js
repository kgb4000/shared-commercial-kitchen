'use client'

import {
  Users,
  Briefcase,
  GraduationCap,
  DollarSign,
  TrendingUp,
  MapPin,
} from 'lucide-react'

const CityInsights = ({ cityData, cityName, stateName }) => {
  // Since stateName comes in as state code (CA, TX, etc.), just use it directly
  // Fallback to 'TX' if not provided
  const stateAbbr = stateName || 'TX'

  // Extract insights data with fallbacks
  const insights = cityData?.insights || {}

  // Default data structure
  const defaultInsights = {
    residents: {
      count: 'Data available upon request',
      description: `${cityName} residents increasingly prefer convenient food options, with takeout and delivery becoming integral parts of daily life. This creates opportunities for food entrepreneurs to serve busy families and professionals.`,
      driveTime: '15 min',
    },
    workforce: {
      count: 'Data available upon request',
      description: `The modern workforce in ${cityName} values convenience, with client meetings often paired with delivery meals and companies providing food stipends, making delivery a major aspect of today's work environment.`,
      driveTime: '15 min',
    },
    students: {
      count: 'Data available upon request',
      description: `College students in ${cityName} are increasingly ordering meals via delivery, moving away from traditional dining hall experiences. This demographic shift creates significant opportunities for food delivery businesses.`,
      driveTime: '15 min',
    },
    income: {
      median: 'Contact for data',
      description: `${cityName} residents with higher disposable incomes are more likely to order food delivery consistently and spend more per order, making this market attractive for premium food businesses.`,
    },
    foodScene: {
      title: `${cityName}'s Growing Food Scene`,
      description: `${cityName} boasts a vibrant and diverse culinary landscape that continues to evolve. From food trucks to fine dining establishments, the city offers endless opportunities for food entrepreneurs to tap into established food culture while introducing innovative concepts.`,
    },
    businessOpportunity: {
      title: `Why Start a Food Business in ${cityName}`,
      description: `${cityName} presents excellent opportunities for food entrepreneurs due to its diverse population, growing economy, and strong demand for convenient dining options. Renting a commercial kitchen in ${cityName} allows you to test concepts, scale production, and build a loyal customer base in a supportive business environment.`,
    },
  }

  // Merge with actual data
  const data = {
    residents: { ...defaultInsights.residents, ...insights.residents },
    workforce: { ...defaultInsights.workforce, ...insights.workforce },
    students: { ...defaultInsights.students, ...insights.students },
    income: { ...defaultInsights.income, ...insights.income },
    foodScene: { ...defaultInsights.foodScene, ...insights.foodScene },
    businessOpportunity: {
      ...defaultInsights.businessOpportunity,
      ...insights.businessOpportunity,
    },
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Food Scene Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-blue-600" />
            {data.foodScene.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {data.foodScene.description}
          </p>
        </div>

        {/* Demographics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Residents */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-4xl font-bold text-gray-900">
                    {data.residents.count}
                  </div>
                  <div className="text-sm text-gray-600">
                    Residents ({data.residents.driveTime})
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {data.residents.description}
            </p>

            {/* Additional residential stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.residents.homeowners || '42.5%'}
                </div>
                <div className="text-xs text-gray-600">Homeowners</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.residents.medianHomeValue || '$201K'}
                </div>
                <div className="text-xs text-gray-600">Median home value</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.residents.diversity || '70+'}
                </div>
                <div className="text-xs text-gray-600">
                  Countries represented
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.residents.hispanicPopulation || '44.6%'}
                </div>
                <div className="text-xs text-gray-600">Hispanic residents</div>
              </div>
            </div>
          </div>

          {/* Workforce */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-green-600" />
                <div>
                  <div className="text-4xl font-bold text-gray-900">
                    {data.workforce.count}
                  </div>
                  <div className="text-sm text-gray-600">
                    Workers ({data.workforce.driveTime})
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {data.workforce.description}
            </p>

            {/* Additional workforce stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.workforce.workFromHome || '8.3%'}
                </div>
                <div className="text-xs text-gray-600">Work from home</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.workforce.averageCommute || '28 min'}
                </div>
                <div className="text-xs text-gray-600">Average commute</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.workforce.highIncome || '25%'}
                </div>
                <div className="text-xs text-gray-600">Earn $100K+</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.workforce.businessLunch || '68%'}
                </div>
                <div className="text-xs text-gray-600">
                  Order lunch regularly
                </div>
              </div>
            </div>
          </div>

          {/* Students */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="text-4xl font-bold text-gray-900">
                    {data.students.count}
                  </div>
                  <div className="text-sm text-gray-600">
                    College Graduates ({data.students.driveTime})
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {data.students.description}
            </p>

            {/* Additional education stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.students.bachelors || '314K'}
                </div>
                <div className="text-xs text-gray-600">Bachelor's degrees</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.students.advanced || '209K'}
                </div>
                <div className="text-xs text-gray-600">Advanced degrees</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.students.foodDelivery || '37%'}
                </div>
                <div className="text-xs text-gray-600">
                  Order delivery regularly
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.students.avgSpend || '$28'}
                </div>
                <div className="text-xs text-gray-600">Average order value</div>
              </div>
            </div>
          </div>

          {/* Income */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-yellow-600" />
                <div>
                  <div className="text-4xl font-bold text-gray-900">
                    {data.income.median}
                  </div>
                  <div className="text-sm text-gray-600">Median Income</div>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              {data.income.description}
            </p>

            {/* Additional income distribution stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.income.under50k || '43%'}
                </div>
                <div className="text-xs text-gray-600">Earn under $50K</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.income.over100k || '25%'}
                </div>
                <div className="text-xs text-gray-600">Earn over $100K</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.income.deliveryFrequency || '2.3x'}
                </div>
                <div className="text-xs text-gray-600">
                  Higher earners order more
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {data.income.avgOrderValue || '$42'}
                </div>
                <div className="text-xs text-gray-600">Average order value</div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Opportunity Section */}
        <div className="bg-blue-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            {data.businessOpportunity.title}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {data.businessOpportunity.description}
          </p>

          {/* Market Statistics */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Market Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {data.businessOpportunity.foodServiceMarket || '$12.8B'}
                </div>
                <div className="text-sm text-gray-600">
                  {stateAbbr} Food Service Market
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {data.businessOpportunity.deliveryGrowth || '23%'}
                </div>
                <div className="text-sm text-gray-600">
                  Annual delivery growth
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {data.businessOpportunity.ghostKitchenROI || '35%'}
                </div>
                <div className="text-sm text-gray-600">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {data.businessOpportunity.startupCost || '$50K'}
                </div>
                <div className="text-sm text-gray-600">Lower startup costs</div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Diverse Market
              </h3>
              <p className="text-sm text-gray-600">
                Access to varied demographics and food preferences
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Growing Demand
              </h3>
              <p className="text-sm text-gray-600">
                Increasing appetite for delivery and convenience food
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Business Support
              </h3>
              <p className="text-sm text-gray-600">
                Access to commercial kitchens and business resources
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CityInsights
