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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Shared Kitchen Locator
              </h3>
              <p className="text-gray-400 mb-4 max-w-md">
                The leading marketplace for commercial kitchen rentals. Find
                verified, professional kitchen spaces for your food business.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Renters</h4>
              <div className="space-y-2">
                <Link
                  href="/browse-kitchens"
                  className="hover:text-blue-600 text-white font-medium transition-colors"
                >
                  Browse Kitchens
                </Link>
                {/* <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a> */}
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Resources
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Kitchen Owners</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block hover:text-gray-400 text-white transition-colors"
                >
                  List Your Kitchen
                </a>
                {/* <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Owner Dashboard
                </a> */}
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Shared Kitchen Locator. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
