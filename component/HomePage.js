'use client'

import React, { useState } from 'react'
import { ChevronDown, ArrowRight, MapPin } from 'lucide-react'
import SearchBar from '@/component/SearchBar'
import Link from 'next/link'

const HomePage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      question: "What's the difference between shared-use and commissary kitchens?",
      answer: 'Shared-use kitchens are rented by the hour for immediate preparation, while commissary kitchens offer longer-term storage and wholesale food preparation with monthly agreements.',
    },
    {
      question: 'How much does it cost to rent a commercial kitchen?',
      answer: 'Prices vary by location and amenities, but most shared kitchens charge $15-50 per hour. Monthly memberships range from $500-3,000 depending on the city and level of access.',
    },
    {
      question: 'Do I need a food handler permit to use a shared kitchen?',
      answer: 'Yes, most shared kitchens require a valid food handler certification (such as ServSafe) and a business license before you can book time. Requirements vary by state and city.',
    },
    {
      question: 'Can I use a shared kitchen for a food truck business?',
      answer: 'Absolutely. Most health departments require food truck operators to have a commissary kitchen for prep, storage, and cleaning. Many kitchens on our platform cater specifically to food truck operators.',
    },
    {
      question: 'What equipment is typically included?',
      answer: 'Most commercial kitchens include commercial ovens, ranges, fryers, mixers, prep tables, walk-in coolers/freezers, dishwashing stations, and dry storage. Specialty equipment varies by facility.',
    },
    {
      question: 'Can I store my ingredients overnight?',
      answer: 'Most kitchens offer cold storage options for an additional fee. Check individual kitchen policies for overnight storage availability and pricing.',
    },
    {
      question: 'What is a commissary kitchen?',
      answer: 'A commissary kitchen is a licensed commercial kitchen facility that multiple food businesses can rent to prepare, cook, and store food. Commissary kitchens provide professional equipment, cold and dry storage, and health department compliance — making them ideal for food trucks, caterers, and packaged food producers who need a legal base of operations.',
    },
    {
      question: 'What is a ghost kitchen?',
      answer: 'A ghost kitchen (also called a virtual kitchen or cloud kitchen) is a commercial kitchen space used exclusively for preparing food for delivery. There is no dine-in or walk-up service. Ghost kitchens let you run one or more delivery-only restaurant brands from a single location using platforms like DoorDash, UberEats, and Grubhub.',
    },
    {
      question: 'Do I need a commissary kitchen for a food truck?',
      answer: 'In most US cities, yes. Health departments require food truck operators to have a commissary kitchen as their licensed base for food prep, equipment cleaning, wastewater disposal, and overnight food storage. Without a commissary agreement, you typically cannot get or renew a food truck permit.',
    },
    {
      question: 'How do I find a commercial kitchen near me?',
      answer: 'Use Shared Kitchen Locator to search 950+ verified commercial kitchens across 43 US cities. Search by city, compare pricing and amenities, and contact kitchen owners directly to request a tour or book time.',
    },
    {
      question: 'What should I look for when renting a commercial kitchen?',
      answer: 'Key factors include hourly or monthly rates, equipment available (ovens, mixers, walk-in coolers), storage options (dry, cold, frozen), health department licensing, hours of access, minimum booking requirements, and whether the kitchen provides liability insurance or requires your own.',
    },
    {
      question: 'What licenses do I need to use a commercial kitchen?',
      answer: 'Requirements vary by state and city, but most require a food handler certification (like ServSafe), a business license, liability insurance, and in some cases a cottage food permit or food manufacturing license. The kitchen itself should have a current health department permit. Check your local health department or our food licensing guides for specific requirements.',
    },
  ]

  const popularCities = [
    { name: 'Chicago', state: 'IL', slug: 'chicago/il', tagline: 'Deep-dish & beyond' },
    { name: 'Los Angeles', state: 'CA', slug: 'los-angeles/ca', tagline: 'West coast flavors' },
    { name: 'New York', state: 'NY', slug: 'new-york/ny', tagline: 'The city that eats' },
    { name: 'Houston', state: 'TX', slug: 'houston/tx', tagline: 'Southern heat' },
    { name: 'Atlanta', state: 'GA', slug: 'atlanta/ga', tagline: 'Soul food capital' },
    { name: 'Miami', state: 'FL', slug: 'miami/fl', tagline: 'Latin fusion hub' },
    { name: 'Denver', state: 'CO', slug: 'denver/co', tagline: 'Mountain fresh' },
    { name: 'Seattle', state: 'WA', slug: 'seattle/wa', tagline: 'Pacific Northwest' },
  ]

  const solutions = [
    { title: 'Catering', desc: 'Large-capacity equipment, ample prep areas, and storage for serving materials.' },
    { title: 'Food Trucks', desc: 'Prep space and storage for mobile operations. Meet commissary requirements.' },
    { title: 'Bakeries', desc: 'Professional ovens, mixers, and temperature-controlled storage for artisan goods.' },
    { title: 'Ghost Kitchens', desc: 'Delivery-optimized spaces for virtual brands and high-volume fulfillment.' },
    { title: 'Meal Prep', desc: 'Hourly kitchen access for personal chef operations and subscription meals.' },
    { title: 'Food Producers', desc: 'Manufacturing space for sauces, snacks, and FDA-compliant packaged goods.' },
  ]

  return (
    <main style={{ background: 'var(--cream)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden grain" style={{ background: 'var(--espresso)', minHeight: '85vh' }}>
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(200, 150, 62, 0.4), transparent 70%), radial-gradient(ellipse at 70% 80%, rgba(189, 91, 60, 0.3), transparent 60%)'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col justify-center" style={{ minHeight: '85vh' }}>
          <div className="max-w-3xl">
            <p className="animate-fade-up text-sm font-medium tracking-widest uppercase mb-6" style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}>
              950+ kitchens across 43 cities
            </p>
            <h1 className="animate-fade-up animation-delay-100 font-editorial text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-8" style={{ color: 'var(--cream)' }}>
              Find the kitchen
              <br />
              <span className="italic" style={{ color: 'var(--amber)' }}>your food business</span>
              <br />
              deserves.
            </h1>
            <p className="animate-fade-up animation-delay-200 text-lg mb-10 max-w-xl leading-relaxed" style={{ color: '#B8AFA5' }}>
              Verified shared-use, commissary, and ghost kitchens with flexible hourly, daily, and monthly rates. Start cooking today.
            </p>
            <div className="animate-fade-up animation-delay-300 max-w-xl">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CITY CARDS ─── */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}>
                Popular Markets
              </p>
              <h2 className="font-editorial text-4xl lg:text-5xl" style={{ color: 'var(--espresso)' }}>
                Browse by city
              </h2>
            </div>
            <Link href="/browse-kitchens" className="hidden md:flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--warm-brown)' }}>
              All 43 cities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCities.map((city, i) => (
              <Link
                key={city.slug}
                href={`/commercial-kitchen-for-rent/${city.slug}`}
                className="group relative rounded-2xl overflow-hidden hover-lift"
                style={{ aspectRatio: '4/3' }}
              >
                <div className="absolute inset-0" style={{
                  background: [
                    'linear-gradient(135deg, #2C1810 0%, #5C3D2E 100%)',
                    'linear-gradient(135deg, #1E3A2F 0%, #4A6B5D 100%)',
                    'linear-gradient(135deg, #2A1F3D 0%, #5A4B6B 100%)',
                    'linear-gradient(135deg, #3D2B1F 0%, #7A5C45 100%)',
                    'linear-gradient(135deg, #1F2E3D 0%, #4B6A7A 100%)',
                    'linear-gradient(135deg, #3D1F2B 0%, #7A4555 100%)',
                    'linear-gradient(135deg, #2B3D1F 0%, #5A7A45 100%)',
                    'linear-gradient(135deg, #1F2A3D 0%, #455A7A 100%)',
                  ][i]
                }} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                <div className="relative h-full flex flex-col justify-end p-5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--amber)' }} />
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(250,246,240,0.6)' }}>
                      {city.state}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl" style={{ color: 'var(--cream)' }}>
                    {city.name}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: 'rgba(250,246,240,0.5)' }}>
                    {city.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="md:hidden text-center mt-6">
            <Link href="/browse-kitchens" className="text-sm font-medium flex items-center justify-center gap-2" style={{ color: 'var(--warm-brown)' }}>
              View all 43 cities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL INTRO ─── */}
      <section className="py-24" style={{ background: 'var(--light-warm)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium tracking-widest uppercase mb-6" style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}>
            How it works
          </p>
          <h2 className="font-editorial text-4xl lg:text-5xl mb-8 leading-tight" style={{ color: 'var(--espresso)' }}>
            Skip the $150k buildout.
            <br />
            <span className="italic" style={{ color: 'var(--terracotta)' }}>Start cooking this week.</span>
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-16" style={{ color: 'var(--warm-gray)' }}>
            Shared-use commercial kitchens give food entrepreneurs licensed, fully-equipped space to cook, prep, and package food legally — without the massive upfront investment of building your own facility.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { num: '01', title: 'Search', text: 'Browse verified kitchens in your city. Filter by hourly rate, equipment, and availability.' },
              { num: '02', title: 'Connect', text: 'Request pricing directly from kitchen owners. Get tour availability and booking details.' },
              { num: '03', title: 'Cook', text: 'Show up, cook, and grow your food business. All equipment, storage, and compliance handled.' },
            ].map((step) => (
              <div key={step.num} className="p-8 rounded-2xl" style={{ background: 'var(--cream)' }}>
                <span className="font-editorial text-5xl block mb-4" style={{ color: 'var(--border-warm)' }}>
                  {step.num}
                </span>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--espresso)' }}>
                  {step.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON ─── */}
      <section className="py-24" style={{ background: 'var(--cream)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--sage)', letterSpacing: '0.15em' }}>
              The smart choice
            </p>
            <h2 className="font-editorial text-4xl lg:text-5xl" style={{ color: 'var(--espresso)' }}>
              Build vs. Rent
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Build */}
            <div className="rounded-2xl p-10" style={{ background: 'var(--light-warm)', border: '1px solid var(--border-warm)' }}>
              <h3 className="font-editorial text-2xl mb-8" style={{ color: 'var(--warm-gray)' }}>
                Building Your Own
              </h3>
              <div className="space-y-5">
                {[
                  '$150,000+ initial investment',
                  '6-12 months construction',
                  'Permits, inspections, licensing',
                  'Equipment maintenance',
                  'Utilities, insurance, taxes',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5" style={{ color: 'var(--warm-gray)' }}>&#8212;</span>
                    <span className="text-lg" style={{ color: 'var(--warm-gray)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rent */}
            <div className="rounded-2xl p-10" style={{ background: 'var(--espresso)' }}>
              <h3 className="font-editorial text-2xl mb-8" style={{ color: 'var(--amber)' }}>
                Renting Kitchen Space
              </h3>
              <div className="space-y-5">
                {[
                  'Start cooking immediately',
                  'Pay only for time used',
                  'Professional equipment included',
                  'Maintenance handled for you',
                  'Built-in compliance',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5" style={{ color: 'var(--amber)' }}>&#10003;</span>
                    <span className="text-lg" style={{ color: 'var(--cream)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOLUTIONS ─── */}
      <section className="py-24" style={{ background: 'var(--espresso)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}>
              For every food business
            </p>
            <h2 className="font-editorial text-4xl lg:text-5xl" style={{ color: 'var(--cream)' }}>
              Kitchen solutions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((sol) => (
              <div key={sol.title} className="rounded-2xl p-8 group transition-all duration-300" style={{ background: 'rgba(250,246,240,0.06)', border: '1px solid rgba(250,246,240,0.08)' }}>
                <h3 className="font-editorial text-2xl mb-3" style={{ color: 'var(--cream)' }}>
                  {sol.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#8C8279' }}>
                  {sol.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MID CTA ─── */}
      <section className="py-24 relative overflow-hidden grain" style={{ background: 'var(--terracotta)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.2), transparent 70%)'
        }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-editorial text-4xl lg:text-5xl mb-6" style={{ color: 'var(--cream)' }}>
            Ready to start cooking?
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(250,246,240,0.75)' }}>
            Browse 950+ verified commercial kitchens across 43 cities. From hourly pop-ups to monthly leases.
          </p>
          <Link
            href="/browse-kitchens"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
            style={{ background: 'var(--cream)', color: 'var(--espresso)' }}
          >
            Browse All Kitchens <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ─── TOOLS ─── */}
      <section className="py-24" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--sage)', letterSpacing: '0.15em' }}>
              Free tools
            </p>
            <h2 className="font-editorial text-4xl lg:text-5xl" style={{ color: 'var(--espresso)' }}>
              Resources for food entrepreneurs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: '/resources/nutrition-label-maker', title: 'Nutrition Label Maker', desc: 'Generate FDA-compliant nutrition facts labels for free. English and Spanish.', tag: 'Most Popular' },
              { href: '/resources/recipe-cost-tracker', title: 'Recipe Cost Tracker', desc: 'Calculate ingredient costs per serving and track your profit margins.', tag: 'Calculator' },
              { href: '/resources/food-expiration-date-checker', title: 'Food Expiration Checker', desc: 'USDA food safety guidelines and shelf life data for commercial kitchens.', tag: 'Database' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl p-8 hover-lift"
                style={{ background: 'var(--light-warm)', border: '1px solid var(--border-warm)' }}
              >
                <span className="inline-block text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full mb-4" style={{ background: 'var(--cream)', color: 'var(--warm-gray)', letterSpacing: '0.08em' }}>
                  {tool.tag}
                </span>
                <h3 className="font-editorial text-2xl mb-3 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--espresso)' }}>
                  {tool.title}
                </h3>
                <p className="leading-relaxed mb-4" style={{ color: 'var(--warm-gray)' }}>
                  {tool.desc}
                </p>
                <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--terracotta)' }}>
                  Try it free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24" style={{ background: 'var(--light-warm)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-editorial text-4xl" style={{ color: 'var(--espresso)' }}>
              Common questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden"
                style={{ background: 'var(--cream)', border: '1px solid var(--border-warm)' }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors"
                >
                  <h3 className="font-medium pr-4" style={{ color: 'var(--espresso)' }}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--warm-gray)' }}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="leading-relaxed" style={{ color: 'var(--warm-gray)' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
