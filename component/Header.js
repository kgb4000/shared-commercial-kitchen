'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'var(--cream)',
        borderBottom: '1px solid var(--border-warm)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="font-editorial text-xl"
            style={{ color: 'var(--espresso)' }}
          >
            Shared Kitchen Locator
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/browse-kitchens"
              className="text-sm font-medium tracking-wide uppercase transition-colors"
              style={{ color: 'var(--warm-gray)', letterSpacing: '0.05em' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--espresso)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--warm-gray)')}
            >
              Browse Kitchens
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium tracking-wide uppercase transition-colors"
              style={{ color: 'var(--warm-gray)', letterSpacing: '0.05em' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--espresso)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--warm-gray)')}
            >
              Resources
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium tracking-wide uppercase transition-colors"
              style={{ color: 'var(--warm-gray)', letterSpacing: '0.05em' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--espresso)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--warm-gray)')}
            >
              Guides
            </Link>
            <Link
              href="/browse-kitchens"
              className="px-5 py-2 text-sm font-medium rounded-full transition-all"
              style={{ background: 'var(--espresso)', color: 'var(--cream)' }}
            >
              Find a Kitchen
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            borderTop: '1px solid var(--border-warm)',
            background: 'var(--cream)',
          }}
        >
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/browse-kitchens"
              className="block text-sm font-medium"
              style={{ color: 'var(--warm-brown)' }}
            >
              Browse Kitchens
            </Link>
            <Link
              href="/resources/nutrition-label-maker"
              className="block text-sm font-medium"
              style={{ color: 'var(--warm-brown)' }}
            >
              Resources
            </Link>
            <Link
              href="/blog"
              className="block text-sm font-medium"
              style={{ color: 'var(--warm-brown)' }}
            >
              Guides
            </Link>
            <Link
              href="/browse-kitchens"
              className="block text-center px-5 py-2.5 text-sm font-medium rounded-full"
              style={{ background: 'var(--espresso)', color: 'var(--cream)' }}
            >
              Find a Kitchen
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
