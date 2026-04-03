import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Free Tools for Food Entrepreneurs — Nutrition Labels, Cost Tracking, Expiration Dates',
  description:
    'Free tools for food businesses: FDA-compliant nutrition label maker, recipe cost tracker, food expiration checker, and food licensing guides.',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/resources',
  },
}

const tools = [
  {
    href: '/resources/nutrition-label-maker',
    title: 'Nutrition Label Maker',
    tag: 'Most Popular',
    description:
      'Create FDA-compliant nutrition facts labels instantly. Standard vertical, horizontal, linear, and tabular formats. English and Spanish.',
    features: [
      'FDA-compliant formatting',
      'Multiple layout options',
      'English & Spanish labels',
      'Download as image',
    ],
    stat: 'Save $300-800 per product on labeling services',
    cta: 'Create Labels',
  },
  {
    href: '/resources/recipe-cost-tracker',
    title: 'Recipe Cost Tracker',
    tag: 'Calculator',
    description:
      'Calculate exact ingredient costs per serving, track inventory usage, and set profitable pricing for your food products.',
    features: [
      'Ingredient cost per serving',
      'Profit margin analysis',
      'Inventory tracking',
      'Production batch logging',
    ],
    stat: 'Know your true cost per plate',
    cta: 'Track Costs',
  },
  {
    href: '/resources/food-expiration-date-checker',
    title: 'Food Expiration Checker',
    tag: 'Database',
    description:
      'USDA FoodKeeper database for shelf life and storage guidelines. Look up any food item for refrigerator, freezer, and pantry storage times.',
    features: [
      'USDA FoodKeeper data',
      'Fridge, freezer & pantry times',
      'Safety guidelines',
      'Commercial kitchen compliance',
    ],
    stat: 'Reduce food waste and stay compliant',
    cta: 'Check Dates',
  },
  {
    href: '/resources/food-expiration-database',
    title: 'Food Expiration Database',
    tag: 'Reference',
    description:
      'Browse the complete USDA food storage database. Search by category for detailed shelf life information on hundreds of food items.',
    features: [
      'Full USDA database',
      'Category browsing',
      'Detailed storage methods',
      'Printable reference charts',
    ],
    stat: 'Comprehensive food safety reference',
    cta: 'Browse Database',
  },
]

const guides = [
  {
    href: '/blog/how-much-to-rent-a-commercial-kitchen',
    title: 'Commercial Kitchen Pricing Guide',
    description: 'Hourly, daily, and monthly rates across US cities.',
  },
  {
    href: '/blog/commissary-kitchen-requirements',
    title: 'Commissary Kitchen Requirements',
    description: 'Permits, certifications, and compliance checklist.',
  },
  {
    href: '/blog/ghost-kitchen-guide',
    title: 'How to Start a Ghost Kitchen',
    description: 'Step-by-step guide to launching a delivery-only restaurant.',
  },
  {
    href: '/food-licensing-guides',
    title: 'Food Licensing Guides',
    description: 'State-by-state food business licensing requirements.',
  },
]

export default function ResourcesPage() {
  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section className="py-20" style={{ background: 'var(--espresso)' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-5"
            style={{ color: 'var(--amber)', letterSpacing: '0.15em' }}
          >
            Free tools & guides
          </p>
          <h1
            className="font-editorial text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ color: 'var(--cream)' }}
          >
            Everything you need to
            <br />
            <span className="italic" style={{ color: 'var(--amber)' }}>
              run your food business
            </span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#8C8279' }}>
            Professional-grade tools for nutrition labeling, cost tracking, food safety, and business planning. All free.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--terracotta)', letterSpacing: '0.15em' }}
            >
              Tools
            </p>
            <h2
              className="font-editorial text-3xl lg:text-4xl"
              style={{ color: 'var(--espresso)' }}
            >
              Free tools for food entrepreneurs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl p-8 hover-lift"
                style={{
                  background: 'var(--light-warm)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="inline-block text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full"
                    style={{
                      background: 'var(--cream)',
                      color: 'var(--warm-gray)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {tool.tag}
                  </span>
                  <ArrowRight
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    style={{ color: 'var(--terracotta)' }}
                  />
                </div>

                <h3
                  className="font-editorial text-2xl mb-3"
                  style={{ color: 'var(--espresso)' }}
                >
                  {tool.title}
                </h3>
                <p
                  className="leading-relaxed mb-6"
                  style={{ color: 'var(--warm-gray)' }}
                >
                  {tool.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {tool.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <span style={{ color: 'var(--sage)' }}>&#10003;</span>
                      <span style={{ color: 'var(--warm-brown)' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className="rounded-lg px-4 py-3 mb-6"
                  style={{
                    background: 'var(--cream)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--sage)' }}
                  >
                    {tool.stat}
                  </p>
                </div>

                <span
                  className="inline-flex items-center gap-2 font-medium text-sm"
                  style={{ color: 'var(--terracotta)' }}
                >
                  {tool.cta}{' '}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-20" style={{ background: 'var(--light-warm)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--sage)', letterSpacing: '0.15em' }}
            >
              Guides
            </p>
            <h2
              className="font-editorial text-3xl lg:text-4xl"
              style={{ color: 'var(--espresso)' }}
            >
              Business guides & articles
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl p-6 hover-lift"
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <h3
                  className="font-semibold mb-2 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: 'var(--espresso)' }}
                >
                  {guide.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--warm-gray)' }}
                >
                  {guide.description}
                </p>
                <span
                  className="flex items-center gap-1 text-sm font-medium"
                  style={{ color: 'var(--terracotta)' }}
                >
                  Read{' '}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            Ready to find your kitchen?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: 'rgba(250,246,240,0.7)' }}
          >
            Browse 380+ verified commercial kitchens across 43 cities.
          </p>
          <Link
            href="/browse-kitchens"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-105"
            style={{ background: 'var(--cream)', color: 'var(--espresso)' }}
          >
            Browse All Kitchens{' '}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
