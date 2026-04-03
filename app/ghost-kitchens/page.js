import Link from 'next/link'

export const metadata = {
  title: 'Ghost Kitchen for Rent — Find Ghost Kitchens Near You',
  description:
    'Find ghost kitchens for rent near you. Browse delivery-optimized commercial kitchen space in 20+ cities. Flexible hourly and monthly rates for virtual restaurant brands.',
  keywords:
    'ghost kitchen for rent, ghost kitchen near me, ghost kitchen rental near me, ghost kitchen for rent near me, virtual kitchen rental, cloud kitchen for rent, delivery kitchen space',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/ghost-kitchens',
  },
  openGraph: {
    title: 'Ghost Kitchen for Rent — Find Ghost Kitchens Near You',
    description:
      'Browse ghost kitchen rentals across 20+ US cities. Delivery-optimized commercial kitchen space with flexible hourly and monthly rates.',
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
    title: 'Ghost Kitchen for Rent — Find Ghost Kitchens Near You',
    description:
      'Browse ghost kitchen rentals across 20+ US cities. Delivery-optimized commercial kitchen space with flexible hourly and monthly rates.',
    images: [
      'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg',
    ],
  },
}

const faqs = [
  {
    question: 'What is a ghost kitchen for rent?',
    answer:
      'A ghost kitchen for rent is a licensed, health-department-approved commercial kitchen space available to food businesses operating delivery-only restaurant concepts. Also called virtual kitchens or cloud kitchens, these facilities let you cook and fulfill delivery orders through DoorDash, Uber Eats, and Grubhub without a dine-in dining room. Monthly rates typically range from $700 to $3,000 depending on the city and level of access.',
  },
  {
    question: 'How do I find a ghost kitchen near me?',
    answer:
      'Use the city links on this page to browse ghost kitchen rentals in your area. Each city page lists licensed commercial kitchens available for ghost kitchen operations, including pricing, equipment, and contact information. You can also use the Browse Kitchens page to filter by city, hours, and available equipment.',
  },
  {
    question: 'How much does it cost to rent a ghost kitchen?',
    answer:
      'Ghost kitchen rental costs vary by market. Hourly rates in shared commissary kitchens run $15 to $50 per hour. Dedicated ghost kitchen suites with 24/7 access typically cost $1,500 to $5,000 per month in major metros like New York, Los Angeles, and Chicago. Smaller markets like Nashville and Portland tend to run $700 to $2,000 per month.',
  },
  {
    question: 'What permits do I need to operate a ghost kitchen?',
    answer:
      "To operate a ghost kitchen legally you need a business license from your city or county, a food handler or food manager certification (like ServSafe), a food facility permit from your local health department, and a commissary agreement letter from your shared kitchen. If your state taxes prepared food you will also need a seller's permit or sales tax ID. Total permit costs typically run $200 to $800 and take 4 to 8 weeks to process.",
  },
  {
    question: 'Can I run multiple restaurant brands from one ghost kitchen?',
    answer:
      'Yes. One of the key advantages of the ghost kitchen model is the ability to operate multiple virtual restaurant brands from a single licensed kitchen. Each brand can have its own menu, branding, and presence on delivery platforms like DoorDash and Uber Eats, all produced from the same physical space and equipment. This lets you maximize revenue per kitchen hour and test multiple concepts with minimal additional cost.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

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
  { name: 'Detroit', state: 'MI', slug: 'detroit/mi' },
]

const useCases = [
  {
    label: 'Virtual Restaurants',
    body: 'Launch a delivery-only restaurant brand on DoorDash, Uber Eats, and Grubhub without a brick-and-mortar location. A ghost kitchen gives you the licensed production space you need to operate legally and scale fast.',
  },
  {
    label: 'Multi-Brand Operators',
    body: 'Run two or three distinct virtual restaurant brands from a single kitchen. Each brand has its own menu and platform presence while sharing the same equipment, labor, and kitchen rental cost.',
  },
  {
    label: 'Food Trucks Going Delivery',
    body: 'Extend your food truck revenue into off-hours by using a ghost kitchen for delivery orders. Your commissary kitchen already qualifies — just register your delivery concept on the platforms.',
  },
  {
    label: 'Restaurant Overflow',
    body: 'Existing restaurants use ghost kitchen space to handle delivery volume without overwhelming the main kitchen. Separate your dine-in and delivery operations to protect quality on both channels.',
  },
  {
    label: 'CPG & Meal Kit Brands',
    body: 'Packaged food brands and meal kit companies use ghost kitchen space to produce, portion, and package product at scale — meeting health department requirements without investing in a permanent facility.',
  },
  {
    label: 'Pop-Up & Catering Concepts',
    body: 'Test a new cuisine or seasonal menu concept in a ghost kitchen before committing to a long-term location. The low overhead makes it an ideal incubator for culinary experimentation.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Find a kitchen near you',
    body: 'Browse licensed commercial kitchens in your city using the links below. Filter by equipment, hours, and storage options to match your menu requirements.',
  },
  {
    number: '02',
    title: 'Tour and sign a rental agreement',
    body: 'Contact the kitchen operator to schedule a walkthrough. Confirm the facility holds a current health department permit — you will need this for your own permit application.',
  },
  {
    number: '03',
    title: 'Get your permits',
    body: 'Apply for a food facility permit from your local health department. Most applications require a commissary agreement letter from your shared kitchen operator. Budget $200 to $800 and 4 to 8 weeks.',
  },
  {
    number: '04',
    title: 'Register on delivery platforms',
    body: 'Submit your business license and health permit to DoorDash, Uber Eats, and Grubhub. Typical platform onboarding takes one to two weeks after documents are submitted.',
  },
  {
    number: '05',
    title: 'Start cooking and fulfilling orders',
    body: "Once listed, accept orders and manage them through each platform's tablet or a unified order management system. Track sales by brand, day, and item to optimize your menu and hours.",
  },
]

export default function GhostKitchensPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div style={{ background: 'var(--cream)' }}>

        {/* HERO */}
        <section
          className="relative grain overflow-hidden"
          style={{ background: 'var(--espresso)', minHeight: '72vh' }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(30,17,8,0.92) 0%, rgba(30,17,8,0.75) 60%, rgba(61,43,31,0.6) 100%)',
            }}
          />

          <div
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
            style={{ minHeight: '72vh', paddingTop: '6rem', paddingBottom: '5rem' }}
          >
            <div className="max-w-3xl">
              <p
                className="text-sm font-medium uppercase mb-5 tracking-widest"
                style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}
              >
                Ghost kitchen rentals &middot; 20+ cities
              </p>

              <h1
                className="font-editorial leading-[1.05] mb-7"
                style={{ color: 'var(--cream)', fontSize: 'clamp(2.6rem, 6vw, 4.25rem)' }}
              >
                Ghost kitchens for rent
                <br />
                <span className="italic" style={{ color: 'var(--amber)' }}>
                  near you.
                </span>
              </h1>

              <p
                className="text-lg mb-10 max-w-xl leading-relaxed"
                style={{ color: '#B8AFA5' }}
              >
                Launch your delivery-only restaurant brand from a licensed, fully
                equipped commercial kitchen. Flexible hourly and monthly rates.
                No dining room required.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/browse-kitchens"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: 'var(--amber)', color: 'var(--espresso)' }}
                >
                  Find a Ghost Kitchen
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="#cities"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all"
                  style={{
                    background: 'transparent',
                    color: 'var(--cream)',
                    border: '1px solid rgba(250,246,240,0.25)',
                  }}
                >
                  Browse by city
                </Link>
              </div>
            </div>

            <div
              className="flex flex-wrap gap-8 mt-16 pt-10"
              style={{ borderTop: '1px solid rgba(250,246,240,0.1)' }}
            >
              {[
                { value: '950+', label: 'Verified kitchens' },
                { value: '20+', label: 'Cities' },
                { value: '$15\u2013$50', label: 'Per hour' },
                { value: 'Free', label: 'To search' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="font-editorial text-2xl"
                    style={{ color: 'var(--amber)' }}
                  >
                    {value}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: '#8C8279' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT IS A GHOST KITCHEN */}
        <section className="py-24" style={{ background: 'var(--cream)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p
                  className="text-sm font-medium uppercase tracking-widest mb-4"
                  style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
                >
                  What is a ghost kitchen?
                </p>
                <h2
                  className="font-editorial text-4xl lg:text-5xl mb-6 leading-tight"
                  style={{ color: 'var(--espresso)' }}
                >
                  A commercial kitchen built{' '}
                  <span className="italic" style={{ color: 'var(--terracotta)' }}>
                    for delivery.
                  </span>
                </h2>
                <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--warm-gray)' }}>
                  A ghost kitchen &mdash; also called a virtual kitchen, dark kitchen, or cloud
                  kitchen &mdash; is a licensed commercial facility used exclusively to fulfill
                  delivery and takeout orders. There is no dining room, no front-of-house
                  staff, and no walk-in customers. The kitchen exists solely to cook,
                  package, and hand off food to delivery drivers.
                </p>
                <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--warm-gray)' }}>
                  The model dramatically lowers the cost of starting a food business. Instead
                  of signing a 10-year commercial lease and spending $250,000 on dining room
                  buildout, you rent kitchen time in an existing licensed facility and take
                  orders through DoorDash, Uber Eats, or your own direct-order channel.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                  Ghost kitchen operators can test new concepts, run multiple brands
                  simultaneously, and scale production without the fixed overhead that sinks
                  traditional restaurants.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: '\u2193',
                    label: 'Lower startup costs',
                    body: 'Launch for $5k\u2013$25k vs. $250k+ for a traditional restaurant build-out.',
                  },
                  {
                    icon: '\u21bb',
                    label: 'Month-to-month flexibility',
                    body: 'No long-term lease commitment. Scale up, scale down, or pivot your concept fast.',
                  },
                  {
                    icon: '\xd72',
                    label: 'Run multiple brands',
                    body: 'Operate two or three virtual restaurant brands from a single rented kitchen.',
                  },
                  {
                    icon: '\u25ce',
                    label: 'Data-driven menu',
                    body: 'Delivery platforms give you real-time analytics on what sells, when, and where.',
                  },
                ].map(({ icon, label, body }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-6 hover-lift"
                    style={{
                      background: 'var(--light-warm)',
                      border: '1px solid var(--border-warm)',
                    }}
                  >
                    <p
                      className="font-editorial text-2xl mb-3"
                      style={{ color: 'var(--amber)' }}
                    >
                      {icon}
                    </p>
                    <h3
                      className="font-semibold text-sm mb-2"
                      style={{ color: 'var(--espresso)' }}
                    >
                      {label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHO USES GHOST KITCHENS */}
        <section className="py-24" style={{ background: 'var(--light-warm)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p
                className="text-sm font-medium uppercase tracking-widest mb-4"
                style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
              >
                Who rents ghost kitchen space?
              </p>
              <h2
                className="font-editorial text-4xl lg:text-5xl"
                style={{ color: 'var(--espresso)' }}
              >
                Built for every delivery{' '}
                <span className="italic" style={{ color: 'var(--terracotta)' }}>
                  operator.
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map(({ label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl p-8 hover-lift"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: 'var(--terracotta)', letterSpacing: '0.12em' }}
                  >
                    {label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24" style={{ background: 'var(--espresso)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p
                className="text-sm font-medium uppercase tracking-widest mb-4"
                style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}
              >
                How it works
              </p>
              <h2
                className="font-editorial text-4xl lg:text-5xl"
                style={{ color: 'var(--cream)' }}
              >
                From zero to first order in{' '}
                <span className="italic" style={{ color: 'var(--amber)' }}>
                  five steps.
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map(({ number, title, body }) => (
                <div key={number} className="flex flex-col">
                  <p
                    className="font-editorial text-4xl mb-4"
                    style={{ color: 'rgba(200,150,62,0.35)' }}
                  >
                    {number}
                  </p>
                  <h3
                    className="font-semibold text-sm mb-3 leading-snug"
                    style={{ color: 'var(--cream)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8C8279' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CITY GRID */}
        <section id="cities" className="py-24" style={{ background: 'var(--cream)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <p
                className="text-sm font-medium uppercase tracking-widest mb-4"
                style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
              >
                Ghost kitchen rentals by city
              </p>
              <h2
                className="font-editorial text-4xl lg:text-5xl"
                style={{ color: 'var(--espresso)' }}
              >
                Find ghost kitchen space{' '}
                <span className="italic" style={{ color: 'var(--terracotta)' }}>
                  near you.
                </span>
              </h2>
              <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--warm-gray)' }}>
                Select your city to browse licensed commercial kitchens available for
                ghost kitchen and delivery-only restaurant operations.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {cities.map(({ name, state, slug }) => (
                <Link
                  key={slug}
                  href={`/commercial-kitchen-for-rent/${slug}`}
                  className="group rounded-xl px-4 py-4 transition-all hover-lift text-left"
                  style={{
                    background: 'var(--light-warm)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <p
                    className="font-semibold text-sm leading-snug group-hover:underline"
                    style={{ color: 'var(--espresso)' }}
                  >
                    {name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--warm-gray)' }}>
                    {state}
                  </p>
                </Link>
              ))}
            </div>

            <p className="mt-8 text-sm" style={{ color: 'var(--warm-gray)' }}>
              Don&rsquo;t see your city?{' '}
              <Link
                href="/browse-kitchens"
                className="font-medium hover:underline"
                style={{ color: 'var(--amber)' }}
              >
                Browse all 43 cities &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24" style={{ background: 'var(--light-warm)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p
                className="text-sm font-medium uppercase tracking-widest mb-4"
                style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
              >
                Common questions
              </p>
              <h2
                className="font-editorial text-4xl lg:text-5xl"
                style={{ color: 'var(--espresso)' }}
              >
                Ghost kitchen rental{' '}
                <span className="italic" style={{ color: 'var(--terracotta)' }}>
                  FAQ.
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map(({ question, answer }) => (
                <div
                  key={question}
                  className="rounded-2xl p-7"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <h3
                    className="font-semibold text-base mb-3"
                    style={{ color: 'var(--espresso)' }}
                  >
                    {question}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                    {answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24" style={{ background: 'var(--espresso)' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p
              className="text-sm font-medium uppercase tracking-widest mb-6"
              style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}
            >
              Ready to launch?
            </p>
            <h2
              className="font-editorial text-4xl lg:text-5xl mb-6 leading-tight"
              style={{ color: 'var(--cream)' }}
            >
              Find your ghost kitchen{' '}
              <span className="italic" style={{ color: 'var(--amber)' }}>
                today.
              </span>
            </h2>
            <p
              className="text-base mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: '#B8AFA5' }}
            >
              Browse 950+ licensed commercial kitchens across 43 US cities. Compare
              pricing, equipment, and storage options &mdash; then contact operators
              directly to book a tour.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/browse-kitchens"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'var(--amber)', color: 'var(--espresso)' }}
              >
                Browse Ghost Kitchens
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/blog/ghost-kitchen-guide"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all"
                style={{
                  background: 'transparent',
                  color: 'var(--cream)',
                  border: '1px solid rgba(250,246,240,0.25)',
                }}
              >
                Read the ghost kitchen guide
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
