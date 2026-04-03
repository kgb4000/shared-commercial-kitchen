import Link from 'next/link'

export const metadata = {
  title: 'Church Kitchens for Rent — Find Church & Community Kitchen Rentals',
  description:
    'Find church kitchens for rent near you. Church kitchen rentals offer affordable licensed cooking space for food businesses, caterers, and cottage food producers. Learn what to check before renting a community kitchen.',
  keywords:
    'church kitchens for rent, church kitchen rentals, church kitchens for rent near me, church kitchen for rent near me, community kitchen for rent, community kitchen rental',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/church-kitchen-rental',
  },
  openGraph: {
    title: 'Church Kitchens for Rent — Community Kitchen Rentals Near You',
    description:
      'Find affordable church and community kitchen rentals near you. Learn what to check before renting a church kitchen for your food business.',
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
    title: 'Church Kitchens for Rent — Community Kitchen Rentals Near You',
    description:
      'Find affordable church and community kitchen rentals near you.',
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
      name: 'Can you rent a church kitchen for a food business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many churches rent their kitchens to food businesses, caterers, meal-prep services, and cottage food producers during off-hours — typically evenings and weekends when the church is not otherwise using the space. Before using a church kitchen commercially, confirm the facility holds a valid health department permit, that your intended use is covered under the church\'s insurance policy, and that the kitchen meets your state\'s requirements for food business licensing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to rent a church kitchen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Church kitchen rentals are typically more affordable than dedicated commercial shared kitchens. Rates commonly range from $10 to $25 per hour, or $150 to $600 per month for regular access. Some churches offer reduced rates or barter arrangements for community members or nonprofits. Because church kitchens are not primarily operated as commercial facilities, pricing is often negotiable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are church kitchens health department approved?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Many church kitchens are licensed by their local health department because they regularly host large events, fundraiser dinners, and food drives. However, not all are. Before renting a church kitchen for a commercial food operation, request a copy of the facility's current health department permit and confirm that commercial rental use is permitted under that permit. Some permits cover only non-commercial community use.",
      },
    },
    {
      '@type': 'Question',
      name: 'What should I check before renting a church kitchen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Before signing a church kitchen rental agreement, verify: (1) The facility holds a valid, current health department license. (2) Your food business use is covered under the church's liability insurance, or that you can add your own policy. (3) The kitchen has the equipment your production requires — commercial range, oven, refrigeration, prep surfaces. (4) You understand what cleaning and sanitation responsibilities you carry after each session. (5) The rental is properly documented with a written agreement covering hours, access, and terms.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the alternatives to renting a church kitchen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If a church kitchen does not meet your needs, consider shared-use commercial kitchens (purpose-built for food businesses with full health department licensing), incubator kitchens (which often provide business support alongside kitchen access), community center kitchens, school or university kitchens (sometimes available for rent after hours), or dedicated ghost kitchen facilities. Use the city links on this page to browse verified commercial kitchen options near you.',
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

const whyChurch = [
  {
    title: 'Lower Cost',
    body: 'Church kitchens are not operated as profit centers. Rates are typically $10 to $25 per hour — well below the $20 to $45 per hour common at dedicated commercial shared kitchens. For food entrepreneurs at early stages, that cost difference is significant.',
  },
  {
    title: 'Evening & Weekend Availability',
    body: 'Churches use their kitchens primarily for Sunday meals, midweek events, and special occasions. That leaves large windows of availability — early mornings, weekday afternoons, and full weekends — that align well with production schedules for bakers, caterers, and meal-prep businesses.',
  },
  {
    title: 'Often Already Health-Department Approved',
    body: 'Churches that host regular community meals, fundraiser dinners, and food pantries frequently hold active health department permits. This matters: producing food for sale legally requires a licensed facility, and many church kitchens already qualify.',
  },
  {
    title: 'Community Relationships',
    body: 'Renting from a local church often means a more personal arrangement than a commercial kitchen lease. Many food entrepreneurs find the community context — and the goodwill that comes with supporting a local institution — a meaningful part of the working relationship.',
  },
]

const whatToCheck = [
  {
    label: 'Health department permit',
    detail:
      'Request a copy of the current permit and verify it is active. Confirm that commercial rental use is allowed under the permit — some are restricted to nonprofit or community use only.',
  },
  {
    label: 'Insurance coverage',
    detail:
      "Confirm whether your operations are covered under the church's liability policy or whether you need to add your own coverage. Most food businesses should carry general liability insurance regardless.",
  },
  {
    label: 'Equipment condition',
    detail:
      'Inspect the oven, range, refrigeration, and prep surfaces before signing. Church kitchen equipment varies widely — some are fully commercial-grade, others are residential appliances installed in a large space.',
  },
  {
    label: 'Cleaning & sanitation terms',
    detail:
      'Understand what cleaning you are responsible for after each session. A written checklist prevents disputes and ensures you leave the space in the condition required to maintain the health permit.',
  },
  {
    label: 'Written rental agreement',
    detail:
      'A verbal arrangement is not enough. Get access hours, rates, permitted uses, and responsibilities in writing. This protects both you and the church.',
  },
  {
    label: 'Storage access',
    detail:
      'Confirm whether you have access to refrigerator or freezer space between sessions and whether you can store dry ingredients on-site. Many church kitchens have limited or no dedicated renter storage.',
  },
]

export default function ChurchKitchenRental() {
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
            Community Kitchen Rental
          </p>
          <h1
            className="font-editorial text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
            style={{ color: 'var(--cream)' }}
          >
            Church Kitchens for Rent
          </h1>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--light-warm)' }}
          >
            Church and community kitchen rentals offer affordable, often
            health-department-approved cooking space for food businesses —
            available when you need it most.
          </p>
          <Link
            href="/browse-kitchens"
            className="inline-block font-semibold px-8 py-4 rounded-lg text-base transition-opacity hover:opacity-90"
            style={{ background: 'var(--amber)', color: 'var(--espresso)' }}
          >
            Browse Kitchen Rentals
          </Link>
        </div>
      </section>

      {/* Why Church Kitchens */}
      <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
            >
              Why they work
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-4"
              style={{ color: 'var(--espresso)' }}
            >
              Why Church Kitchen Rentals Are a Popular Option
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: 'var(--warm-gray)' }}
            >
              For food entrepreneurs looking for affordable licensed kitchen
              space, church and community kitchens offer a compelling
              combination of low cost, flexible hours, and existing health
              infrastructure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {whyChurch.map(({ title, body }) => (
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

      {/* What to Check */}
      <section
        className="py-20 px-4"
        style={{ background: 'var(--light-warm)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p
                className="text-sm font-medium tracking-widest uppercase mb-3"
                style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
              >
                Due diligence
              </p>
              <h2
                className="font-editorial text-3xl md:text-4xl mb-6"
                style={{ color: 'var(--espresso)' }}
              >
                What to Check Before Renting a Church Kitchen
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--warm-brown)' }}
              >
                Church kitchens vary enormously in their licensing status,
                equipment quality, and suitability for commercial food
                production. Before committing to a rental agreement, work
                through this checklist to avoid problems with your local health
                authority or insurance provider.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--warm-brown)' }}
              >
                A church kitchen that checks all these boxes can be an
                excellent, cost-effective home base for your food business.
                One that does not may put your business license — or your
                customers — at risk.
              </p>
            </div>
            <div className="space-y-4">
              {whatToCheck.map(({ label, detail }) => (
                <div
                  key={label}
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <h3
                    className="font-semibold text-sm mb-2"
                    style={{ color: 'var(--espresso)' }}
                  >
                    {label}
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
        </div>
      </section>

      {/* How to Find */}
      <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
            >
              Finding one
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-4"
              style={{ color: 'var(--espresso)' }}
            >
              How to Find Church Kitchens for Rent Near You
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: '1',
                heading: 'Search locally',
                body: 'Call churches in your area directly and ask if they rent their kitchen. Many do not advertise — the best opportunities are found through direct outreach. Start with larger congregations that have commercial-scale kitchens.',
              },
              {
                step: '2',
                heading: 'Check community boards',
                body: 'Local Facebook groups, Nextdoor, and neighborhood forums often surface church kitchen rentals before they appear on any directory. Food entrepreneur groups in your city are also a strong resource for word-of-mouth leads.',
              },
              {
                step: '3',
                heading: 'Browse verified commercial kitchens',
                body: 'Use the city links below to find verified commercial kitchen rentals in your area. These facilities are purpose-built for food businesses with confirmed health department licensing, clear rental terms, and professional equipment.',
              },
            ].map(({ step, heading, body }) => (
              <div
                key={step}
                className="rounded-xl p-7 hover-lift"
                style={{
                  background: 'var(--light-warm)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <span
                  className="inline-flex w-8 h-8 rounded-full items-center justify-center text-sm font-bold mb-4"
                  style={{
                    background: 'var(--sage)',
                    color: 'var(--cream)',
                  }}
                >
                  {step}
                </span>
                <h3
                  className="font-editorial text-lg mb-3"
                  style={{ color: 'var(--espresso)' }}
                >
                  {heading}
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

      {/* Alternatives */}
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
              Other options
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-4"
              style={{ color: 'var(--espresso)' }}
            >
              Community Kitchen Alternatives
            </h2>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ color: 'var(--warm-gray)' }}
            >
              If a church kitchen does not fit your needs, these alternatives
              often offer more reliable licensing, better equipment, and
              structured rental agreements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Shared-Use Commercial Kitchens',
                body: 'Purpose-built for food businesses. Full health department licensing, commercial equipment, and formal rental agreements. The most reliable option for scaling a food business.',
              },
              {
                title: 'Incubator Kitchens',
                body: 'Offer kitchen access plus business development support — mentorship, training, licensing guidance, and connections to wholesale buyers and markets.',
              },
              {
                title: 'Community Center Kitchens',
                body: 'YMCAs, recreation centers, and community colleges sometimes rent kitchen space. Licensing status and equipment quality vary — apply the same due-diligence checklist as for church kitchens.',
              },
              {
                title: 'Ghost Kitchen Facilities',
                body: 'Delivery-optimized kitchen suites with dedicated stations, cold storage, and streamlined logistics. Typically higher cost but purpose-built for commercial food production at scale.',
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="rounded-xl p-6 hover-lift"
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <h3
                  className="font-editorial text-base mb-3"
                  style={{ color: 'var(--espresso)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--warm-gray)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Links */}
      <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
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
              Find Community Kitchen Rentals Near You
            </h2>
            <p className="text-base" style={{ color: 'var(--warm-gray)' }}>
              Browse verified commercial kitchen listings — a reliable
              alternative when church kitchens are not available or do not meet
              licensing requirements.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cities.map(({ name, state, slug }) => (
              <Link
                key={slug}
                href={`/commercial-kitchen-for-rent/${slug}`}
                className="rounded-xl p-4 text-center transition-all hover-lift"
                style={{
                  background: 'var(--light-warm)',
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
      <section
        className="py-20 px-4"
        style={{ background: 'var(--light-warm)' }}
      >
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
              Church Kitchen Rental FAQ
            </h2>
          </div>
          <div className="space-y-5">
            {jsonLd.mainEntity.map(({ name, acceptedAnswer }) => (
              <div
                key={name}
                className="rounded-xl p-7"
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
            Find a Licensed Kitchen Near You
          </h2>
          <p
            className="text-base mb-8 leading-relaxed"
            style={{ color: 'var(--light-warm)' }}
          >
            Browse verified commercial and community kitchen rentals with
            confirmed health department licensing, clear rates, and flexible
            scheduling options.
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
