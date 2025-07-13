'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [cities, setCities] = useState([])
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('/data/cities.json')
      .then((res) => res.json())
      .then((data) => setCities(data))
  }, [])

  const handleSearch = () => {
    const normalized = query.toLowerCase().replace(/\s+/g, '-')
    const match = cities.find(
      (c) => `${c.city}-${c.state}` === normalized || c.city === normalized
    )

    if (match) {
      router.push(`/commercial-kitchen-for-rent/${match.city}/${match.state}`)
    } else {
      alert('City not found')
    }
  }

  const handleInputChange = (e) => {
    const val = e.target.value
    setQuery(val)

    const filtered = cities.filter((c) =>
      `${c.city.replace(/-/g, ' ')} ${c.state}`
        .toLowerCase()
        .includes(val.toLowerCase())
    )
    setSuggestions(filtered.slice(0, 5)) // Limit suggestions
  }

  const handleSuggestionClick = (city, state) => {
    setQuery('')
    setSuggestions([])
    router.push(`/commercial-kitchen-for-rent/${city}/${state}`)
  }

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by city..."
        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />
      <button
        onClick={handleSearch}
        className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-md max-h-60 overflow-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(s.city, s.state)}
              className="px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {s.city
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              , {s.state.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
