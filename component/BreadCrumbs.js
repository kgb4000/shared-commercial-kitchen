export default function BreadCrumbs({ city, state }) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <span>›</span>
          <a href="#" className="hover:text-blue-600 transition-colors">
            {state}
          </a>
          <span>›</span>
          <a href="#" className="hover:text-blue-600 transition-colors">
            {city}
          </a>
          <span>›</span>
          <span className="text-gray-900 font-medium">
            Commercial Kitchens for Rent
          </span>
        </div>
      </div>
    </div>
  )
}
