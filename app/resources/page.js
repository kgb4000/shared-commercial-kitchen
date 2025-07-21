import {
  Calculator,
  Clock,
  Tag,
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
} from 'lucide-react'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free Tools to Grow Your
            <span className="text-emerald-600 block">Food Business</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Essential resources designed specifically for shared kitchen
            entrepreneurs. Save time, reduce costs, and ensure compliance with
            our professional-grade tools.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Used by 10,000+ food entrepreneurs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>100% Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Proven to increase profitability</span>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Nutrition Label Maker */}
          <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                  <Tag className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Nutrition Label Maker
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Create FDA-compliant nutrition labels for your food products
                instantly. Perfect for shared kitchen entrepreneurs selling
                packaged foods.
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>FDA-compliant formatting</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Automatic nutrient calculations</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Multiple serving size options</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Print-ready PDF exports</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-emerald-800 font-medium text-sm">
                  💰 Save $200+ on professional labeling services
                </p>
              </div>

              <a
                href="/tools/nutrition-label-maker"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Create Nutrition Label
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </article>

          {/* Food Expiration Checker */}
          <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Food Expiration Date Checker
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Reduce food waste and ensure safety with our comprehensive
                expiration date database. Essential for shared kitchen food
                safety compliance.
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>1000+ food items database</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Storage condition guidelines</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Safety alerts and notifications</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Batch tracking capabilities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-emerald-800 font-medium text-sm">
                  💰 Reduce food waste by up to 30%
                </p>
              </div>

              <a
                href="/tools/expiration-checker"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Check Expiration Dates
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </article>

          {/* Recipe Cost Tracker */}
          <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors">
                  <Calculator className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recipe Cost Tracker
                </h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Calculate exact recipe costs and set profitable pricing for your
                shared kitchen business. Track ingredient costs and profit
                margins.
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Ingredient cost calculation</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Profit margin analysis</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Bulk pricing optimization</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Menu pricing recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-emerald-800 font-medium text-sm">
                  💰 Increase profit margins by 15-25%
                </p>
              </div>

              <a
                href="/tools/recipe-cost-tracker"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Track Recipe Costs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </article>
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Launch Your Food Business?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Find the perfect shared kitchen space near you and start building
            your culinary empire today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/find-kitchens"
              className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Find Shared Kitchens
            </a>
            <a
              href="/blog/starting-food-business-guide"
              className="border border-white text-white hover:bg-white hover:text-emerald-600 font-semibold py-3 px-8 rounded-lg transition-all"
            >
              Read Success Guide
            </a>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SharedKitchenLocator</h3>
              <p className="text-gray-400">
                Connecting food entrepreneurs with shared kitchen spaces and
                business tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/tools/nutrition-label-maker"
                    className="hover:text-white transition-colors"
                  >
                    Nutrition Label Maker
                  </a>
                </li>
                <li>
                  <a
                    href="/tools/expiration-checker"
                    className="hover:text-white transition-colors"
                  >
                    Expiration Date Checker
                  </a>
                </li>
                <li>
                  <a
                    href="/tools/recipe-cost-tracker"
                    className="hover:text-white transition-colors"
                  >
                    Recipe Cost Tracker
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/guides"
                    className="hover:text-white transition-colors"
                  >
                    Business Guides
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SharedKitchenLocator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
