'use client'

import React, { useState } from 'react'
import { MapPin, Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BrowseKitchens({ cities = [] }) {
  const [filter, setFilter] = useState('')

  const totalKitchens = cities.reduce((sum, c) => sum + c.count, 0)

  // Group by state
  const byState = {}
  for (const city of cities) {
    if (!byState[city.state]) byState[city.state] = []
    byState[city.state].push(city)
  }

  const sortedStates = Object.entries(byState).sort(([a], [b]) =>
    a.localeCompare(b)
  )

  const filteredStates = filter
    ? sortedStates
        .map(([state, stateCities]) => [
          state,
          stateCities.filter(
            (c) =>
              c.city.toLowerCase().includes(filter.toLowerCase()) ||
              c.state.toLowerCase().includes(filter.toLowerCase())
          ),
        ])
        .filter(([, stateCities]) => stateCities.length > 0)
    : sortedStates

  // Top 8 for featured section
  const featured = cities.slice(0, 8)

  return (
    <main style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section className="py-20" style={{ background: 'var(--espresso)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-5"
            style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}
          >
            {totalKitchens}+ kitchens across {cities.length} cities
          </p>
          <h1
            className="font-editorial text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ color: 'var(--cream)' }}
          >
            Browse kitchens
            <br />
            <span className="italic" style={{ color: 'var(--amber)' }}>
              by location
            </span>
          </h1>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: '#8C8279' }}>
            Commissary kitchens, shared-use spaces, and ghost kitchens in every
            major US market.
          </p>

          {/* Filter input */}
          <div className="max-w-md mx-auto relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: 'rgba(250,246,240,0.35)' }}
            />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by city or state..."
              className="w-full pl-14 pr-5 py-4 rounded-full text-base focus:outline-none focus:ring-2 transition-all"
              style={{
                background: 'rgba(250,246,240,0.08)',
                color: 'var(--cream)',
                border: '1px solid rgba(250,246,240,0.12)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      {!filter && (
        <section className="py-20" style={{ background: 'var(--cream)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-12">
              <p
                className="text-sm font-medium tracking-widest uppercase mb-3"
                style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
              >
                Most kitchens
              </p>
              <h2
                className="font-editorial text-3xl lg:text-4xl"
                style={{ color: 'var(--espresso)' }}
              >
                Top markets
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((city, i) => (
                <Link
                  key={city.slug}
                  href={`/commercial-kitchen-for-rent/${city.slug}/${city.state.toLowerCase()}`}
                  className="group relative rounded-2xl overflow-hidden hover-lift"
                  style={{ aspectRatio: '5/3' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: [
                        'linear-gradient(135deg, #2C1810 0%, #5C3D2E 100%)',
                        'linear-gradient(135deg, #1E3A2F 0%, #4A6B5D 100%)',
                        'linear-gradient(135deg, #2A1F3D 0%, #5A4B6B 100%)',
                        'linear-gradient(135deg, #3D2B1F 0%, #7A5C45 100%)',
                        'linear-gradient(135deg, #1F2E3D 0%, #4B6A7A 100%)',
                        'linear-gradient(135deg, #3D1F2B 0%, #7A4555 100%)',
                        'linear-gradient(135deg, #2B3D1F 0%, #5A7A45 100%)',
                        'linear-gradient(135deg, #1F2A3D 0%, #455A7A 100%)',
                      ][i],
                    }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                  <div className="relative h-full flex flex-col justify-end p-5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin
                        className="w-3.5 h-3.5"
                        style={{ color: 'var(--amber)' }}
                      />
                      <span
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: 'rgba(250,246,240,0.6)' }}
                      >
                        {city.state}
                      </span>
                    </div>
                    <h3
                      className="font-editorial text-xl lg:text-2xl"
                      style={{ color: 'var(--cream)' }}
                    >
                      {city.city}
                    </h3>
                    <p
                      className="text-xs mt-1"
                      style={{ color: 'rgba(250,246,240,0.5)' }}
                    >
                      {city.count} kitchens
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Cities by State */}
      <section
        className="py-20"
        style={{ background: 'var(--light-warm)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--sage)', letterSpacing: '0.15em' }}
            >
              Full directory
            </p>
            <h2
              className="font-editorial text-3xl lg:text-4xl"
              style={{ color: 'var(--espresso)' }}
            >
              {filter ? `Results for "${filter}"` : 'All cities by state'}
            </h2>
          </div>

          {filteredStates.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl"
              style={{ background: 'var(--cream)' }}
            >
              <p className="text-lg" style={{ color: 'var(--warm-gray)' }}>
                No cities match &ldquo;{filter}&rdquo;
              </p>
              <button
                onClick={() => setFilter('')}
                className="mt-4 text-sm font-medium"
                style={{ color: 'var(--terracotta)' }}
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStates.map(([state, stateCities]) => (
                <div
                  key={state}
                  className="rounded-2xl p-7"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <h3
                    className="font-editorial text-xl mb-5 pb-3"
                    style={{
                      color: 'var(--espresso)',
                      borderBottom: '1px solid var(--border-warm)',
                    }}
                  >
                    {state}
                  </h3>
                  <div className="space-y-1">
                    {stateCities
                      .sort((a, b) => b.count - a.count)
                      .map((city) => (
                        <Link
                          key={city.slug}
                          href={`/commercial-kitchen-for-rent/${city.slug}/${city.state.toLowerCase()}`}
                          className="flex items-center justify-between py-2.5 px-3 rounded-lg group transition-colors"
                          style={{ color: 'var(--warm-brown)' }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              'var(--light-warm)')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = 'transparent')
                          }
                        >
                          <span className="font-medium text-sm">
                            {city.city}
                          </span>
                          <span className="flex items-center gap-2">
                            <span
                              className="text-xs"
                              style={{ color: 'var(--warm-gray)' }}
                            >
                              {city.count}
                            </span>
                            <ArrowRight
                              className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ color: 'var(--terracotta)' }}
                            />
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-20 text-center relative overflow-hidden grain"
        style={{ background: 'var(--terracotta)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.2), transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2
            className="font-editorial text-3xl lg:text-4xl mb-4"
            style={{ color: 'var(--cream)' }}
          >
            Know a kitchen we&apos;re missing?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: 'rgba(250,246,240,0.7)' }}
          >
            Help us grow the directory. Suggest a commercial kitchen in your
            city.
          </p>
          <button
            className="px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-105"
            style={{ background: 'var(--cream)', color: 'var(--espresso)' }}
          >
            Suggest a Kitchen
          </button>
        </div>
      </section>
    </main>
  )
}
