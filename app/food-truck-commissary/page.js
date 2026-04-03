import Link from 'next/link'

export const metadata = {
  title: 'Food Truck Commissary Kitchen Near Me — Find a Commissary for Food Trucks',
  description:
    'Find a food truck commissary kitchen near you. Browse licensed commissary kitchens that meet health department requirements for mobile food vendors in 20+ US cities.',
  keywords:
    'food truck commissary near me, commissary for food trucks near me, commissary kitchen for food trucks, food truck commissary kitchen, commissaries for food trucks',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/food-truck-commissary',
  },
  openGraph: {
    title: 'Food Truck Commissary Kitchen Near Me | Shared Kitchen Locator',
    description:
      'Find licensed commissary kitchens for food trucks in 20+ US cities. Health-department-approved facilities with prep space, storage, and commissary letters.',
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
    title: 'Food Truck Commissary Kitchen Near Me | Shared Kitchen Locator',
    description:
      'Find licensed commissary kitchens for food trucks in 20+ US cities.',
    images: [
      'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg',
    ],
  },
}

const faqs = [
  {
    question: 'Does every food truck need a commissary kitchen?',
    answer:
      'In most US jurisdictions, yes. Health departments require food trucks to have a licensed commissary kitchen as their official base of operations — a fixed address where food is prepped, stored, and equipment is cleaned. Some counties allow limited food prep on the truck itself, but a commissary agreement is still required for storage and sanitation. Check with your local health department for the exact rules in your area.',
  },
  {
    question: 'What does a commissary kitchen provide for a food truck?',
    answer:
      'A commissary kitchen for food trucks typically provides: a licensed space for food preparation and cooking, refrigerated and dry storage for ingredients and supplies, a 3-compartment sink for washing equipment, a place to dump wastewater and fill fresh water tanks, and a signed commissary agreement letter for your health permit application.',
  },
  {
    question: 'How much does a food truck commissary kitchen cost?',
    answer:
      'Food truck commissary kitchen costs vary by city and the level of access you need. Monthly memberships typically range from $300 to $1,500 per month. Hourly rates for prep-only use run $15 to $40 per hour. Some facilities charge separately for storage, water/wastewater services, and parking. Urban markets like Los Angeles, New York, and Chicago tend to be at the higher end of that range.',
  },
  {
    question: 'What documents do I need from a commissary kitchen?',
    answer:
      "You will need a signed commissary agreement letter from the kitchen operator. This letter confirms the commissary's name, address, and health permit number, states that they will provide your truck with kitchen access and/or storage, and includes both parties' signatures and the agreement term dates. Most health departments require this letter when you apply for your mobile food vendor permit.",
  },
  {
    question: 'Can a food truck commissary also serve as overnight parking?',
    answer:
      'Some commissary kitchens offer overnight or long-term parking for food trucks as an add-on service, but most do not. Dedicated food truck commissaries and shared yards are more likely to include parking. When evaluating a commissary, ask specifically about truck parking — whether it is available, whether there is a fee, and whether the facility has utility hookups for overnight stays.',
  },
]

const jsonLdString = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
})

const cities = [
  { name: 'Chicago', state: 'IL', slug: 'chicago/il' },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles/ca' },
  { name: 'New York', state: 'NY', slug: 'new-york/ny' },
  { name: 'Houston', state: 'TX', slug: 'houston/tx' },
  { name: 'Atlanta', state: 'GA', slug: 'atlanta/ga' },
  { name: 'Miami', state: 'FL', slug: 'miami/fl' },
  { name: 'Denver', state: 'CO', slug: 'denver/co' },
  { name: 'Seattle', state: 'WA', slug: 'seattle/wa' },
  { name: 'Dallas', state: 'TX', slug: 'cypress/tx' },
  { name: 'Phoenix', state: 'AZ', slug: 'phoenix/az' },
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia/pa' },
  { name: 'San Francisco', state: 'CA', slug: 'san-francisco/ca' },
  { name: 'Austin', state: 'TX', slug: 'austin/tx' },
  { name: 'Portland', state: 'OR', slug: 'portland/or' },
  { name: 'Nashville', state: 'TN', slug: 'nashville/tn' },
  { name: 'Orlando', state: 'FL', slug: 'orlando/fl' },
  { name: 'Boston', state: 'MA', slug: 'boston/ma' },
  { name: 'Las Vegas', state: 'NV', slug: 'las-vegas/nv' },
  { name: 'Charlotte', state: 'NC', slug: 'charlotte/nc' },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio/tx' },
]

export default function FoodTruckCommissary() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <div style={{ background: 'var(--cream)', color: 'var(--espresso)' }}>
        {/* Hero */}
        <section
          style={{ background: 'var(--espresso)' }}
          className="relative overflow-hidden"
        >
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <p
              className="text-xs uppercase tracking-widest mb-4 font-medium"
              style={{ color: 'var(--amber)' }}
            >
              Commissary Kitchens for Food Trucks
            </p>
            <h1
              className="font-editorial text-4xl md:text-6xl leading-tight mb-6"
              style={{ color: 'var(--cream)' }}
            >
              Find a Food Truck<br />Commissary Near You
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'var(--warm-gray)' }}
            >
              Every food truck needs a licensed commissary kitchen on file with the
              health department. Browse inspected, permitted commissary kitchens
              across 20 US cities — with prep space, storage, wastewater services,
              and signed commissary letters.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/browse-kitchens"
                className="inline-block px-8 py-4 rounded-lg font-semibold text-base transition-opacity hover:opacity-90"
                style={{
                  background: 'var(--amber)',
                  color: 'var(--espresso)',
                }}
              >
                Browse Commissary Kitchens
              </Link>
              <a
                href="#cities"
                className="inline-block px-8 py-4 rounded-lg font-semibold text-base transition-colors"
                style={{
                  border: '1px solid var(--warm-gray)',
                  color: 'var(--cream)',
                }}
              >
                Find by City
              </a>
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap gap-10 mt-14 pt-10"
              style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              {[
                { value: '950+', label: 'Verified Kitchens' },
                { value: '20', label: 'Cities' },
                { value: 'Free', label: 'To Search' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    className="font-editorial text-3xl"
                    style={{ color: 'var(--amber)' }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest mt-1"
                    style={{ color: 'var(--warm-gray)' }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-16">

          {/* Why food trucks need commissary kitchens */}
          <section className="mb-20">
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              The Basics
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-6"
              style={{ color: 'var(--espresso)' }}
            >
              Why Food Trucks Need a Commissary Kitchen
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: 'var(--warm-brown)' }}
                >
                  A food truck is a mobile food unit — and mobile food units are
                  not permitted to operate as self-contained food businesses in
                  most US jurisdictions. Health departments require every food truck
                  operator to have a{' '}
                  <strong style={{ color: 'var(--espresso)' }}>
                    licensed commissary kitchen
                  </strong>{' '}
                  as their official fixed base of operations.
                </p>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: 'var(--warm-brown)' }}
                >
                  The commissary is where your truck reports before and after each
                  service: for food prep and cooking, ingredient storage, equipment
                  cleaning, wastewater disposal, and fresh water resupply. Without a
                  commissary agreement on file, you cannot obtain or renew your mobile
                  food vendor permit.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--warm-brown)' }}
                >
                  Shared commissary kitchens make this requirement affordable. Rather
                  than building or leasing your own facility, you pay a monthly or
                  hourly fee for access to a licensed, inspected kitchen that already
                  meets every health department standard.
                </p>
              </div>
              <div>
                <div
                  className="rounded-xl p-6"
                  style={{
                    background: 'var(--light-warm)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <h3
                    className="font-editorial text-xl mb-4"
                    style={{ color: 'var(--espresso)' }}
                  >
                    What a Commissary Provides Your Truck
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Licensed food preparation and cooking space',
                      'Refrigerated storage for ingredients',
                      'Dry storage for dry goods and supplies',
                      '3-compartment sink for equipment washing',
                      'Wastewater dump station and fresh water fill',
                      'Signed commissary agreement letter for permits',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: 'var(--warm-brown)' }}
                      >
                        <span
                          className="shrink-0 text-xs font-bold mt-0.5"
                          style={{ color: 'var(--amber)' }}
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Health Department Requirements */}
          <section className="mb-20">
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              Compliance
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-6"
              style={{ color: 'var(--espresso)' }}
            >
              Health Department Requirements for Food Truck Commissaries
            </h2>
            <p
              className="text-base leading-relaxed mb-8 max-w-3xl"
              style={{ color: 'var(--warm-brown)' }}
            >
              Requirements vary by state and county, but most jurisdictions share a
              common core set of standards. Here is what health departments typically
              look for when reviewing your commissary arrangement.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Kitchen Permit',
                  heading: 'Valid Health Department Permit',
                  body: 'The commissary must hold a current food facility permit from the local health department, confirming it has passed inspections for sanitation, equipment, and ventilation. Always ask to see the permit number and the most recent inspection report before signing.',
                },
                {
                  label: 'Commissary Letter',
                  heading: 'Signed Commissary Agreement',
                  body: "Your health department requires a signed commissary agreement letter as part of your mobile food vendor permit application. The letter states the commissary's name, address, permit number, and confirms they will provide you with kitchen access and/or storage.",
                },
                {
                  label: 'Your Permit',
                  heading: 'Mobile Food Vendor Permit',
                  body: "In addition to the commissary agreement, you will apply for your own mobile food vendor permit or mobile food unit permit with your local health department. Processing times range from a few days to several weeks, so plan ahead before your launch date.",
                },
                {
                  label: 'Certification',
                  heading: 'Food Handler Certification',
                  body: 'Nearly every state requires at least one person on your truck to hold a valid food handler card or food manager certification (such as ServSafe). Some commissary kitchens also require proof of certification before granting access.',
                },
                {
                  label: 'Insurance',
                  heading: 'General Liability Insurance',
                  body: 'Most commissary kitchens require food truck operators to carry general liability insurance — typically $1 million per occurrence — before using the space. The kitchen is usually listed as an additional insured. Expect annual premiums of $400 to $1,200.',
                },
                {
                  label: 'Sanitation',
                  heading: 'Wastewater & Water Services',
                  body: 'Health codes require food trucks to dispose of wastewater at an approved facility and fill fresh water tanks at a regulated source. Many commissaries provide both services on-site, but confirm this before signing — not all shared kitchens accommodate trucks.',
                },
              ].map(({ label, heading, body }) => (
                <div
                  key={heading}
                  className="rounded-xl p-6"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-widest mb-2 font-medium"
                    style={{ color: 'var(--terracotta)' }}
                  >
                    {label}
                  </p>
                  <h3
                    className="font-editorial text-lg mb-3"
                    style={{ color: 'var(--espresso)' }}
                  >
                    {heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What to look for */}
          <section className="mb-20">
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              Choosing Right
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-6"
              style={{ color: 'var(--espresso)' }}
            >
              What to Look for in a Food Truck Commissary Kitchen
            </h2>
            <p
              className="text-base leading-relaxed mb-10 max-w-3xl"
              style={{ color: 'var(--warm-brown)' }}
            >
              Not every licensed kitchen is set up to serve food trucks. Here is a
              practical checklist for evaluating whether a commissary will actually
              work for your operation.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  heading: 'Truck Access & Parking',
                  items: [
                    'Wide driveway or lot that accommodates full-size trucks',
                    'Overnight parking available (critical for many operators)',
                    'Utility hookups (electricity, water) for overnight stays',
                    'Loading dock or level surface for unloading supplies',
                  ],
                },
                {
                  heading: 'Dedicated Storage',
                  items: [
                    'Locked or labeled refrigerator shelves for your ingredients',
                    'Dry storage space for your individual operation',
                    'Freezer access included or available as an add-on',
                    'Space for truck supplies, packaging, and equipment',
                  ],
                },
                {
                  heading: 'Water & Wastewater',
                  items: [
                    'Fresh water fill station compatible with your tank',
                    'Grease trap and wastewater dump on-site',
                    'Clear policy on frequency of dump/fill included in rate',
                    'Potable water tested and certified for food use',
                  ],
                },
                {
                  heading: 'Hours & Scheduling',
                  items: [
                    'Access hours that match your prep and service schedule',
                    'Early morning access for breakfast or brunch trucks',
                    'Online or app-based booking without manual approval delays',
                    'Clear cancellation policy and no-show penalties',
                  ],
                },
                {
                  heading: 'Compliance Documentation',
                  items: [
                    'Willingness to provide signed commissary agreement letter',
                    'Current health permit posted and available for inspection',
                    'Recent inspection report with no critical violations',
                    'Permit explicitly covers commissary use for mobile vendors',
                  ],
                },
                {
                  heading: 'Cost Transparency',
                  items: [
                    'All-inclusive monthly rate vs. itemized add-ons clearly stated',
                    'No hidden fees for wastewater, water, or parking',
                    'Flexible month-to-month terms available',
                    'Rate locks or renewal terms spelled out in the contract',
                  ],
                },
              ].map(({ heading, items }) => (
                <div
                  key={heading}
                  className="rounded-xl p-6"
                  style={{
                    background: 'var(--light-warm)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <h3
                    className="font-editorial text-xl mb-4"
                    style={{ color: 'var(--espresso)' }}
                  >
                    {heading}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: 'var(--warm-brown)' }}
                      >
                        <span
                          className="shrink-0 rounded-full mt-2"
                          style={{
                            background: 'var(--amber)',
                            width: '6px',
                            height: '6px',
                            flexShrink: 0,
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* City Links */}
          <section id="cities" className="mb-20">
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              Find by Location
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-3"
              style={{ color: 'var(--espresso)' }}
            >
              Food Truck Commissary Kitchens by City
            </h2>
            <p
              className="text-base mb-8 max-w-2xl"
              style={{ color: 'var(--warm-gray)' }}
            >
              Select your city to browse licensed commissary kitchens available for
              food truck operators in that area.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cities.map(({ name, state, slug }) => (
                <Link
                  key={slug}
                  href={`/commercial-kitchen-for-rent/${slug}`}
                  className="rounded-lg px-4 py-4 text-sm font-medium transition-all hover-lift"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-warm)',
                    color: 'var(--espresso)',
                  }}
                >
                  <span className="block font-semibold">{name}</span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--warm-gray)' }}
                  >
                    {state}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-20">
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: 'var(--terracotta)' }}
            >
              Common Questions
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-8"
              style={{ color: 'var(--espresso)' }}
            >
              Food Truck Commissary FAQ
            </h2>

            <div className="space-y-4">
              {faqs.map(({ question, answer }) => (
                <div
                  key={question}
                  className="rounded-xl p-6"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <h3
                    className="font-editorial text-lg mb-3"
                    style={{ color: 'var(--espresso)' }}
                  >
                    {question}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--warm-gray)' }}
                  >
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            className="rounded-2xl px-8 py-14 text-center mb-8"
            style={{ background: 'var(--espresso)' }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: 'var(--amber)' }}
            >
              Ready to Roll
            </p>
            <h2
              className="font-editorial text-3xl md:text-4xl mb-4"
              style={{ color: 'var(--cream)' }}
            >
              Find Your Food Truck Commissary
            </h2>
            <p
              className="text-base mb-8 max-w-xl mx-auto"
              style={{ color: 'var(--warm-gray)' }}
            >
              Browse 950+ verified commissary and shared kitchens across 20 US
              cities. Filter by equipment, hours, and food truck services.
            </p>
            <Link
              href="/browse-kitchens"
              className="inline-block px-10 py-4 rounded-lg font-semibold text-base transition-opacity hover:opacity-90"
              style={{
                background: 'var(--amber)',
                color: 'var(--espresso)',
              }}
            >
              Browse Commissary Kitchens
            </Link>
          </section>

        </div>
      </div>
    </>
  )
}
