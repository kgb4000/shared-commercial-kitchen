import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Commercial Kitchen for Rent — Find Kitchen Rentals in 43 Cities',
  description:
    'Find commercial kitchens for rent, commissary kitchen space, and shared-use kitchen rentals across 43 US cities. Browse verified kitchen rentals with hourly, daily, and monthly rates.',
  keywords:
    'commercial kitchen for rent, commercial kitchen rentals, rent commercial kitchen, commissary kitchen, commercial kitchen space for rent, commercial kitchen for hire, kitchen rentals',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/commercial-kitchen-for-rent',
  },
  openGraph: {
    title: 'Commercial Kitchen for Rent — 43 Cities, 380+ Kitchens',
    description: 'Find commercial kitchens for rent across 43 US cities.',
    type: 'website',
    images: [{ url: 'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Kitchen for Rent — 43 Cities, 380+ Kitchens',
    description: 'Find commercial kitchens for rent across 43 US cities.',
    images: ['https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg'],
  },
}

// Normalize inconsistent city names found in data files
function normalizeCityName(city, slug) {
  if (!city || city === slug) {
    // Derive a readable name from the slug
    return slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }
  // Title-case the city name to fix values like "dallas", "SAn Diego"
  return city
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

function getCityData() {
  const dataDir = path.join(process.cwd(), 'data')
  const cities = fs
    .readdirSync(dataDir)
    .filter((d) => {
      const fullPath = path.join(dataDir, d)
      return (
        fs.statSync(fullPath).isDirectory() &&
        fs.existsSync(path.join(fullPath, 'data.json'))
      )
    })
    .map((d) => {
      const data = JSON.parse(
        fs.readFileSync(path.join(dataDir, d, 'data.json'), 'utf-8')
      )
      const state = (data.state || '').toUpperCase()
      const city = normalizeCityName(data.city, d)
      return {
        slug: d,
        city,
        state,
        // URL uses lowercase state abbreviation
        stateSlug: state.toLowerCase(),
        count: (data.kitchens || []).length,
      }
    })
    .filter((c) => c.state) // exclude any entries with no state
    .sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city))

  // Group by state
  const byState = {}
  for (const city of cities) {
    if (!byState[city.state]) byState[city.state] = []
    byState[city.state].push(city)
  }

  const totalKitchens = cities.reduce((sum, c) => sum + c.count, 0)
  return { cities, byState, totalKitchens }
}

export default function CommercialKitchenForRent() {
  const { cities, byState, totalKitchens } = getCityData()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Commercial Kitchen for Rent',
    description: `Find commercial kitchens for rent across ${cities.length} US cities. ${totalKitchens}+ verified kitchen listings.`,
    url: 'https://sharedkitchenlocator.com/commercial-kitchen-for-rent',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://sharedkitchenlocator.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Commercial Kitchen for Rent',
          item: 'https://sharedkitchenlocator.com/commercial-kitchen-for-rent',
        },
      ],
    },
  }

  const sortedStates = Object.entries(byState).sort(([a], [b]) =>
    a.localeCompare(b)
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Commercial Kitchens for Rent
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find shared-use commercial kitchens, commissary kitchen space, and
              ghost kitchen rentals across {cities.length} US cities.{' '}
              {totalKitchens}+ verified listings.
            </p>
            <div className="flex flex-wrap justify-center gap-10 text-gray-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalKitchens}+
                </div>
                <div className="text-sm uppercase tracking-wide mt-1">
                  Verified Kitchens
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {cities.length}
                </div>
                <div className="text-sm uppercase tracking-wide mt-1">
                  Cities
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {Object.keys(byState).length}
                </div>
                <div className="text-sm uppercase tracking-wide mt-1">
                  States
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Cities by State */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Browse Commercial Kitchen Rentals by City
            </h2>
            <p className="text-gray-600 mb-8">
              Select a city to see available commercial kitchens, pricing, and
              availability.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedStates.map(([state, stateCities]) => (
                <div
                  key={state}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                    {state}
                  </h3>
                  <ul className="space-y-2">
                    {stateCities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/commercial-kitchen-for-rent/${city.slug}/${city.stateSlug}`}
                          className="flex justify-between items-center text-sm text-gray-700 hover:text-blue-600 transition-colors group"
                        >
                          <span className="group-hover:underline">
                            {city.city}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {city.count} kitchen{city.count !== 1 ? 's' : ''}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Find the Perfect Commercial Kitchen Rental
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What Is a Commercial Kitchen for Rent?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A commercial kitchen for rent is a licensed,
                  health-department-approved facility available for food
                  businesses to prepare, cook, and package food products. Also
                  called commissary kitchens, shared-use kitchens, or ghost
                  kitchens, these spaces provide professional equipment and
                  storage without the massive investment of building your own
                  facility.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Commercial kitchen rentals typically range from $15 to $50 per
                  hour or $500 to $3,000 per month, depending on the city and
                  level of access. Most include commercial-grade equipment, walk-in
                  coolers, dry storage, and cleaning supplies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Types of Commercial Kitchen Rentals
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li>
                    <strong className="text-gray-900">Shared-use kitchens</strong>{' '}
                    — Hourly rentals with shared equipment, ideal for startups
                    and small food businesses.
                  </li>
                  <li>
                    <strong className="text-gray-900">Commissary kitchens</strong>{' '}
                    — Longer-term arrangements with dedicated storage, perfect for
                    food trucks and catering companies.
                  </li>
                  <li>
                    <strong className="text-gray-900">Ghost kitchens</strong> —
                    Delivery-optimized spaces for virtual restaurant brands and
                    online food businesses.
                  </li>
                  <li>
                    <strong className="text-gray-900">Incubator kitchens</strong>{' '}
                    — Mentor-supported spaces designed to help food entrepreneurs
                    launch and grow.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Who Rents Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Who Rents Commercial Kitchen Space?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Food Truck Operators',
                  body: 'Food trucks require a licensed commissary kitchen for prep, storage, and cleaning. Renting a commercial kitchen satisfies health department commissary requirements at a fraction of the cost of owning a facility.',
                },
                {
                  title: 'Caterers & Event Chefs',
                  body: 'Catering companies need large, fully equipped kitchens for event prep. Renting by the day or shift gives caterers access to professional equipment without the overhead of a permanent lease.',
                },
                {
                  title: 'Cottage Food & CPG Brands',
                  body: 'Entrepreneurs scaling beyond home kitchen limits use commercial kitchen rentals to produce packaged goods that meet state and federal labeling and safety requirements.',
                },
                {
                  title: 'Personal Chefs & Meal Prep',
                  body: 'Personal chefs and meal-prep services rent commercial kitchens to produce large quantities of food in a licensed, insured environment for delivery to clients.',
                },
                {
                  title: 'Bakers & Pastry Chefs',
                  body: 'Commercial ovens, mixers, and proofing space make shared kitchens ideal for bakers who need more capacity than a home kitchen provides.',
                },
                {
                  title: 'Ghost Restaurant Brands',
                  body: 'Virtual restaurants operating exclusively through delivery apps use ghost kitchens and shared spaces to run multiple brands from a single location without dining room overhead.',
                },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Commercial Kitchen Rental FAQ
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: 'How much does it cost to rent a commercial kitchen?',
                  a: 'Commercial kitchen rental rates vary by city and facility. Hourly rates typically range from $15 to $50 per hour. Monthly memberships or dedicated space leases range from $500 to $3,000+ per month. Major metros like New York, Los Angeles, and Chicago tend to be at the higher end.',
                },
                {
                  q: 'Do I need a license to rent a commercial kitchen?',
                  a: "Most commercial kitchens require renters to hold a valid food handler's permit or food manager certification. Some states also require a cottage food or cottage business license. The kitchen operator will usually guide you through the requirements.",
                },
                {
                  q: 'What is the difference between a commissary kitchen and a shared-use kitchen?',
                  a: 'A commissary kitchen is a licensed facility used as a home base for mobile food operations like food trucks. A shared-use kitchen is a broader term for any licensed kitchen that multiple food businesses share. In practice, most commissary kitchens are also shared-use kitchens.',
                },
                {
                  q: 'What equipment is typically included in a commercial kitchen rental?',
                  a: 'Most commercial kitchens include commercial ranges, ovens, convection ovens, fryers, mixers, food processors, walk-in coolers and freezers, prep tables, and dry storage. Higher-end facilities may also offer blast chillers, combi ovens, and specialized baking equipment.',
                },
                {
                  q: 'Can I rent a commercial kitchen by the hour?',
                  a: "Yes. Many shared-use and commissary kitchens offer hourly rental blocks, often with a minimum booking of 2 to 4 hours. This is ideal for small-batch producers and food entrepreneurs who don't need full-time access.",
                },
                {
                  q: 'How do I find a commercial kitchen for rent near me?',
                  a: 'Use the city links above to browse verified commercial kitchens in your area. Each city page lists available facilities with addresses, pricing, amenities, and contact information.',
                },
              ].map(({ q, a }) => (
                <div
                  key={q}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {q}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12 bg-blue-50 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Rent a Commercial Kitchen?
            </h2>
            <p className="text-gray-600 mb-6">
              Browse {totalKitchens}+ verified kitchens across {cities.length}{' '}
              cities.
            </p>
            <Link
              href="/browse-kitchens"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Kitchens
            </Link>
          </section>
        </div>
      </div>
    </>
  )
}
