import Link from 'next/link'

export const metadata = {
  title: 'Bakery Kitchen for Rent — Find Baking Kitchens & Bakery Rental Space',
  description:
    'Find a bakery kitchen for rent near you. Browse commercial baking kitchens with commercial ovens, mixers, proofers, and walk-in coolers. Hourly and monthly bakery rental space for home bakers, cake businesses, bread artisans, and pastry chefs.',
  keywords:
    'bakery kitchen for rent, rent baking space, baking kitchens, bakery rental space, rent a kitchen for baking, bakery rental',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/bakery-kitchen-rental',
  },
  openGraph: {
    title: 'Bakery Kitchen for Rent — Find Baking Kitchens Near You',
    description:
      'Find bakery rental space with commercial ovens, mixers, proofers, and walk-in coolers. Browse baking kitchens for rent across the US.',
    type: 'website',
    images: [
      {
        url: 'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakery Kitchen for Rent — Find Baking Kitchens Near You',
    description:
      'Find bakery rental space with commercial ovens, mixers, proofers, and walk-in coolers.',
    images: [
      'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg',
    ],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a bakery kitchen for rent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A bakery kitchen for rent is a licensed, health-department-approved commercial kitchen equipped specifically for baking. It provides professional-grade ovens, mixers, proofers, cooling racks, and refrigeration that home kitchens cannot offer. Bakers rent these spaces by the hour or month to produce bread, cakes, pastries, and other baked goods at a commercial scale without the cost of building their own facility.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to rent a bakery kitchen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bakery kitchen rental rates typically range from $20 to $45 per hour for shared-use access, or $600 to $2,500 per month for dedicated space. Rates vary by city, kitchen size, and included equipment. Many shared kitchens offer off-peak discounts for early morning hours — popular with bakers who prefer overnight or pre-dawn production schedules.',
      },
    },
    {
      '@type': 'Question',
      name: 'What equipment is included in a bakery kitchen rental?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most commercial bakery kitchens include deck ovens or convection ovens, commercial stand mixers (20-quart and 60-quart), dough proofers, sheet pan racks, stainless steel prep tables, cooling racks, walk-in coolers and freezers, and dry storage. Higher-end facilities may also offer spiral mixers, deck ovens with steam injection, chocolate tempering equipment, and pastry display cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a license to rent a bakery kitchen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most commercial kitchens require renters to hold a valid food handler's permit or food manager certification (such as ServSafe). If you are selling baked goods, you will also need a business license and, depending on your state, a cottage food license or retail food establishment permit. The kitchen operator can typically guide you through local requirements.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can a home baker rent a commercial bakery kitchen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Shared-use commercial bakery kitchens are designed for exactly this purpose. Home bakers who have outgrown their home kitchen — or who need a licensed facility to sell legally — rent baking space by the hour or block. Most facilities welcome small-scale bakers and offer flexible scheduling, including early morning time slots favored by bread and pastry production.',
      },
    },
  ],
}

const cities = [
  { name: 'Chicago', state: 'IL', slug: 'chicago/il' },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles/ca' },
  { name: 'New York', state: 'NY', slug: 'new-york/ny' },
  { name: 'Houston', state: 'TX', slug: 'houston/tx' },
  { name: 'Miami', state: 'FL', slug: 'miami/fl' },
  { name: 'Dallas', state: 'TX', slug: 'dallas/tx' },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio/tx' },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix/az' },
  { name: 'San Diego', state: 'CA', slug: 'san-diego/ca' },
  { name: 'Denver', state: 'CO', slug: 'denver/co' },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta/ga' },
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia/pa' },
  { name: 'Seattle', state: 'WA', slug: 'seattle/wa' },
  { name: 'San Francisco', state: 'CA', slug: 'san-francisco/ca' },
  { name: 'Austin', state: 'TX', slug: 'austin/tx' },
  { name: 'Boston', state: 'MA', slug: 'boston/ma' },
]

const equipment = [
  {
    name: 'Commercial Ovens',
    detail:
      'Deck ovens, convection ovens, and combination steam ovens sized for full sheet pans and multiple racks. Many facilities include ovens with steam injection for artisan bread crusts.',
  },
  {
    name: 'Commercial Mixers',
    detail:
      '20-quart and 60-quart planetary mixers for doughs, batters, and frostings. Some kitchens also offer spiral mixers optimized for bread doughs requiring lower temperature development.',
  },
  {
    name: 'Dough Proofers',
    detail:
      'Temperature and humidity-controlled proofing cabinets that hold full sheet pan racks, ensuring consistent fermentation for yeasted breads, croissants, and enriched doughs.',
  },
  {
    name: 'Cooling Racks & Sheet Pans',
    detail:
      'Rolling sheet pan racks, speed racks, and stainless cooling racks. Most facilities stock standard half-sheet and full-sheet pans, along with loaf pans, cake rings, and molds.',
  },
  {
    name: 'Walk-In Coolers & Freezers',
    detail:
      'Shared walk-in refrigeration and dedicated freezer space for storing doughs, pre-baked goods, fillings, and finished products between production sessions.',
  },
  {
    name: 'Prep Tables & Dry Storage',
    detail:
      'Stainless steel work surfaces, marble slabs for pastry work, and assigned dry storage lockers or shelves for flour, sugar, and other shelf-stable ingredients between sessions.',
  },
]

const whoUses = [
  {
    title: 'Home Bakers Scaling Up',
    body: 'Bakers who have outgrown their home kitchen — or whose state cottage food law caps their revenue — rent commercial baking space to produce larger volumes legally. A shared bakery kitchen provides the licensed environment needed to sell at farmers markets, to restaurants, and through online channels.',
  },
  {
    title: 'Custom Cake & Celebration Businesses',
    body: 'Custom cake decorators need refrigerated storage, large mixers for buttercream, and ample counter space for tiered builds. A shared bakery kitchen provides all of this without the overhead of a dedicated storefront.',
  },
  {
    title: 'Artisan Bread Bakers',
    body: 'Sourdough and artisan bread production demands deck ovens with steam, large spiral mixers, and precise proofing conditions. Shared commercial kitchens with bakery-specific equipment make small-batch artisan bread businesses viable without six-figure equipment investments.',
  },
  {
    title: 'Pastry Chefs & Caterers',
    body: 'Pastry professionals producing desserts for catering events, restaurant accounts, or wholesale orders rent baking space by the shift. The commercial equipment and dedicated time blocks allow for high-volume output on a predictable schedule.',
  },
]

export default function BakeryKitchenRental() {
  const jsonLdString = JSON.stringify(jsonLd)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* Hero */}
      <section
        className="relative py-20 px-4"
        style={{ background: 'var(--espresso)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}
          >
            Bakery Kitchen Rental
          </p>
          <h1
            className="font-editorial text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
            style={{ color: 'var(--cream)' }}
          >
            Bakery Kitchens for Rent
          </h1>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--light-warm)' }}
          >
            Find commercial baking space with the ovens, mixers, and proofers
            your business needs — by the hour or by the month, with no
            long-term lease required.
          </p>
          <Link
            href="/browse-kitchens"
            className="inline-block font-semibold px-8 py-4 rounded-lg text-base transition-opacity hover:opacity-90"
            style={{ background: 'var(--amber)', color: 'var(--espresso)' }}
          >
            Browse Baking Kitchens
          </Link>
        </div>
      </section>

      {/* What Is a Bakery Kitchen Rental */}
      <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p
                className="text-sm font-medium tracking-widest uppercase mb-3"
                style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
              >
                What it is
              </p>
              <h2
                className="font-editorial text-3xl md:text-4xl mb-6"
                style={{ color: 'var(--espresso)' }}
              >
                What Is a Bakery Kitchen for Rent?
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: 'var(--warm-brown)' }}
              >
                A bakery kitchen for rent is a licensed, health-department-approved
                commercial facility equipped specifically for baking. Unlike a
                general commercial kitchen, a dedicated baking kitchen typically
                includes deck or convection ovens, high-capacity stand mixers,
                temperature-controlled proofers, and cooling infrastructure designed
                for the rhythms of bread, pastry, and cake production.
              </p>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: 'var(--warm-brown)' }}
              >
                These shared-use facilities let bakers rent baking space by the
                hour — often as little as two or three hours per session — or
                secure a monthly membership for regular production schedules. The
                kitchen operator handles health permits, equipment maintenance, and
                facility insurance, so renters focus on baking rather than facility
                management.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--warm-brown)' }}
              >
                Bakery rental space typically costs{' '}
                <strong style={{ color: 'var(--espresso)' }}>
                  $20 to $45 per hour
                </strong>{' '}
                for shared-use access, or{' '}
                <strong style={{ color: 'var(--espresso)' }}>
                  $600 to $2,500 per month
                </strong>{' '}
                for dedicated time blocks — a fraction of the cost of leasing and
                equipping a standalone bakery.
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'var(--light-warm)',
                border: '1px solid var(--border-warm)',
              }}
            >
              <h3
                className="font-editorial text-xl mb-5"
                style={{ color: 'var(--espresso)' }}
              >
                How it works
              </h3>
              <ol className="space-y-4">
                {[
                  {
                    step: '1',
                    text: 'Find a shared bakery kitchen near you using the city links below or the kitchen browser.',
                  },
                  {
                    step: '2',
                    text: 'Check that the facility is licensed by your local health department and carries liability insurance.',
                  },
                  {
                    step: '3',
                    text: 'Confirm equipment — ovens, mixer sizes, proofer capacity — matches your production needs.',
                  },
                  {
                    step: '4',
                    text: 'Book a trial shift (most facilities offer short initial rentals) to assess workflow before committing.',
                  },
                  {
                    step: '5',
                    text: 'Sign a rental agreement, secure your production time slots, and bring your ingredients.',
                  },
                ].map(({ step, text }) => (
                  <li key={step} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: 'var(--amber)',
                        color: 'var(--espresso)',
                      }}
                    >
                      {step}
                    </span>
                    <p
                      className="text-sm leading-relaxed pt-0.5"
                      style={{ color: 'var(--warm-brown)' }}
                    >
                      {text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section
        className="py-20 px-4"
        style={{ background: 'var(--light-warm)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
            >
              Equipment
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-4"
              style={{ color: 'var(--espresso)' }}
            >
              What Equipment Is in a Bakery Rental Kitchen?
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: 'var(--warm-gray)' }}
            >
              Commercial baking kitchens are stocked with professional equipment
              that home and cottage kitchens cannot replicate.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipment.map(({ name, detail }) => (
              <div
                key={name}
                className="rounded-xl p-6 hover-lift"
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <h3
                  className="font-editorial text-lg mb-3"
                  style={{ color: 'var(--espresso)' }}
                >
                  {name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--warm-gray)' }}
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Uses Bakery Kitchens */}
      <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
            >
              Who rents
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-4"
              style={{ color: 'var(--espresso)' }}
            >
              Who Uses Bakery Kitchen Rentals?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {whoUses.map(({ title, body }) => (
              <div
                key={title}
                className="rounded-xl p-7 hover-lift"
                style={{
                  background: 'var(--light-warm)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <h3
                  className="font-editorial text-xl mb-3"
                  style={{ color: 'var(--espresso)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--warm-brown)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Links */}
      <section
        className="py-20 px-4"
        style={{ background: 'var(--light-warm)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
            >
              Browse by city
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-4"
              style={{ color: 'var(--espresso)' }}
            >
              Find Bakery Kitchen Rentals Near You
            </h2>
            <p className="text-base" style={{ color: 'var(--warm-gray)' }}>
              Browse commercial kitchens with baking equipment in these cities.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cities.map(({ name, state, slug }) => (
              <Link
                key={slug}
                href={`/commercial-kitchen-for-rent/${slug}`}
                className="rounded-xl p-4 text-center transition-all hover-lift"
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <span
                  className="block font-semibold text-sm"
                  style={{ color: 'var(--espresso)' }}
                >
                  {name}
                </span>
                <span className="text-xs" style={{ color: 'var(--warm-gray)' }}>
                  {state}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
            >
              Common questions
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl"
              style={{ color: 'var(--espresso)' }}
            >
              Bakery Kitchen Rental FAQ
            </h2>
          </div>
          <div className="space-y-5">
            {jsonLd.mainEntity.map(({ name, acceptedAnswer }) => (
              <div
                key={name}
                className="rounded-xl p-7"
                style={{
                  background: 'var(--light-warm)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <h3
                  className="font-editorial text-lg mb-3"
                  style={{ color: 'var(--espresso)' }}
                >
                  {name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--warm-brown)' }}
                >
                  {acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4"
        style={{ background: 'var(--espresso)' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-editorial text-3xl md:text-4xl mb-4"
            style={{ color: 'var(--cream)' }}
          >
            Ready to Rent Baking Space?
          </h2>
          <p
            className="text-base mb-8 leading-relaxed"
            style={{ color: 'var(--light-warm)' }}
          >
            Browse licensed commercial kitchens with professional baking
            equipment. Filter by city, equipment, and availability to find your
            perfect bakery kitchen rental.
          </p>
          <Link
            href="/browse-kitchens"
            className="inline-block font-semibold px-8 py-4 rounded-lg text-base transition-opacity hover:opacity-90"
            style={{ background: 'var(--amber)', color: 'var(--espresso)' }}
          >
            Browse All Kitchens
          </Link>
        </div>
      </section>
    </>
  )
}
