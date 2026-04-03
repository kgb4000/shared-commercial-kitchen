import Link from 'next/link'

export default function Footer() {
  return (
    <>
      {/* Pre-footer CTA */}
      <section className="relative overflow-hidden py-20" style={{ background: 'var(--espresso)' }}>
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(200, 150, 62, 0.3), transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(189, 91, 60, 0.2), transparent 50%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-editorial text-3xl lg:text-4xl mb-4" style={{ color: 'var(--cream)' }}>
            Can&apos;t find the perfect kitchen?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#8C8279' }}>
            Help us expand our directory or get notified when new kitchens become available in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105" style={{ background: 'var(--amber)', color: 'var(--espresso)' }}>
              Suggest a Kitchen
            </button>
            <button className="px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105" style={{ border: '1px solid rgba(250,246,240,0.15)', color: 'var(--cream)' }}>
              Get Notified
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--warm-brown)', color: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <Link href="/" className="font-editorial text-xl block mb-4" style={{ color: 'var(--cream)' }}>
                Shared Kitchen Locator
              </Link>
              <p className="leading-relaxed text-sm" style={{ color: '#8C8279' }}>
                Connecting food entrepreneurs with shared kitchen spaces and business tools across 43 US cities.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium tracking-widest uppercase mb-5" style={{ color: 'var(--amber)', letterSpacing: '0.1em' }}>
                Tools
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/resources/nutrition-label-maker" className="text-sm footer-link">
                    Nutrition Label Maker
                  </Link>
                </li>
                <li>
                  <Link href="/resources/food-expiration-date-checker" className="text-sm footer-link">
                    Food Expiration Checker
                  </Link>
                </li>
                <li>
                  <Link href="/resources/recipe-cost-tracker" className="text-sm footer-link">
                    Recipe Cost Tracker
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium tracking-widest uppercase mb-5" style={{ color: 'var(--amber)', letterSpacing: '0.1em' }}>
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-sm footer-link">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/blog/how-much-to-rent-a-commercial-kitchen" className="text-sm footer-link">
                    Pricing Guide
                  </Link>
                </li>
                <li>
                  <Link href="/blog/commissary-kitchen-requirements" className="text-sm footer-link">
                    Kitchen Requirements
                  </Link>
                </li>
                <li>
                  <Link href="/blog/ghost-kitchen-guide" className="text-sm footer-link">
                    Ghost Kitchen Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium tracking-widest uppercase mb-5" style={{ color: 'var(--amber)', letterSpacing: '0.1em' }}>
                Directory
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/browse-kitchens" className="text-sm footer-link">
                    Browse All Kitchens
                  </Link>
                </li>
                <li>
                  <Link href="/commercial-kitchen-for-rent" className="text-sm footer-link">
                    Kitchens by City
                  </Link>
                </li>
                <li>
                  <Link href="/cocinas-comerciales" className="text-sm footer-link">
                    Cocinas Comerciales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center" style={{ borderTop: '1px solid rgba(250,246,240,0.08)' }}>
            <p className="text-xs" style={{ color: '#6B5F55' }}>
              &copy; {new Date().getFullYear()} Shared Kitchen Locator. All rights reserved.
            </p>
            <p className="text-xs mt-2 sm:mt-0" style={{ color: '#6B5F55' }}>
              Helping food entrepreneurs find their kitchen since 2025.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
