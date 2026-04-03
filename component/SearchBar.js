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
    setSuggestions(filtered.slice(0, 5))
  }

  const handleSuggestionClick = (city, state) => {
    setQuery('')
    setSuggestions([])
    router.push(`/commercial-kitchen-for-rent/${city}/${state}`)
  }

  return (
    <div className="relative">
      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(250,246,240,0.4)' }} />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search by city..."
        className="w-full pl-14 pr-32 py-4 rounded-full text-lg focus:outline-none focus:ring-2 transition-all"
        style={{
          background: 'rgba(250,246,240,0.1)',
          color: 'var(--cream)',
          border: '1px solid rgba(250,246,240,0.15)',
          focusRingColor: 'var(--amber)',
        }}
      />
      <button
        onClick={handleSearch}
        className="absolute right-2 top-2 bottom-2 px-6 rounded-full font-medium text-sm transition-all hover:scale-105"
        style={{ background: 'var(--amber)', color: 'var(--espresso)' }}
      >
        Search
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full rounded-xl shadow-2xl max-h-60 overflow-auto" style={{ background: 'var(--cream)', border: '1px solid var(--border-warm)' }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(s.city, s.state)}
              className="px-5 py-3 cursor-pointer text-sm transition-colors"
              style={{ color: 'var(--warm-brown)' }}
              onMouseEnter={e => e.target.style.background = 'var(--light-warm)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}
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
