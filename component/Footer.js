import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Can't find the perfect kitchen?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Help us expand our directory or get notified when new kitchens
            become available in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors text-lg">
              💬 Suggest a Kitchen
            </button>
            <button className="px-8 py-4 border border-gray-600 hover:bg-gray-800 rounded-xl font-semibold transition-colors text-lg">
              🔔 Get Notified
            </button>
          </div>
        </div>
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
                    href="/resources/nutrition-label-maker"
                    className="hover:text-white transition-colors"
                  >
                    Nutrition Label Maker
                  </a>
                </li>
                <li>
                  <a
                    href="/resources/food-expiration-date-checker"
                    className="hover:text-white transition-colors"
                  >
                    Food Expiration Date Checker
                  </a>
                </li>
                <li>
                  <a
                    href="/resources/recipe-cost-tracker"
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
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Business Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} SharedKitchenLocator. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
