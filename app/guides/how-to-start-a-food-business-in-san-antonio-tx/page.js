// app/guides/san-antonio/page.js
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

// export async function generateMetadata() {
//   return {
//     title:
//       'How to Start a Food Business in San Antonio, Texas | Shared Kitchen Locator',
//     description:
//       'Licenses, permits, and best practices for restaurants, caterers, food trucks, farmers market vendors, and cottage food producers in San Antonio.',
//     openGraph: {
//       title: 'How to Start a Food Business in San Antonio',
//       description:
//         'Step-by-step: zoning, food establishment licenses, mobile vending, temporary events, farmers markets, cottage foods, and more.',
//       type: 'article',
//     },
//   }
// }

const sections = [
  { id: 'general-setup', label: '1. General Business Setup & Zoning' },
  { id: 'city-licenses', label: '2. City Food Establishment Licenses' },
  { id: 'mobile-vending', label: '3. Mobile Food Vending' },
  { id: 'temporary-events', label: '4. Temporary Food Events' },
  { id: 'markets', label: '5. Farmers/Flea Markets & Trade Shows' },
  { id: 'cottage-food', label: '6. Cottage Food Operations' },
  { id: 'manufacturing', label: '7. Food Manufacturing & Wholesale' },
  { id: 'resources', label: '8. Helpful Contacts & Resources' },
  { id: 'summary', label: '9. Quick Start Checklist' },
]

const fees = [
  { range: '1–10 employees', fee: '$412' },
  { range: '11–25 employees', fee: '$732.33' },
  { range: '26–50 employees', fee: '$994.98' },
  { range: 'Over 50 employees', fee: '$1,240.12' },
]

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium text-gray-700">
      {children}
    </span>
  )
}

function Callout({ title = 'Heads up', children, tone = 'info' }) {
  const tones = {
    info: 'bg-blue-50 border-blue-200',
    warn: 'bg-amber-50 border-amber-200',
    success: 'bg-emerald-50 border-emerald-200',
  }
  return (
    <div className={`rounded-xl border p-4 my-6 ${tones[tone]}`}>
      <p className="mb-1 text-sm font-semibold">{title}</p>
      <div className="prose prose-sm max-w-none text-gray-700">{children}</div>
    </div>
  )
}

function SectionHeader({ id, children }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-xl font-semibold text-gray-900 my-4"
    >
      {children}
    </h2>
  )
}

function Anchor({ href, children }) {
  return (
    <a
      className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

function FeeTable() {
  return (
    <div className="overflow-hidden rounded-xl border my-6">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Employees
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Annual License Fee
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {fees.map((row) => (
            <tr key={row.range}>
              <td className="px-4 py-2">{row.range}</td>
              <td className="px-4 py-2">{row.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MobileTOC({ items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm"
        aria-expanded={open}
        aria-controls="toc-list"
      >
        <span className="font-medium">Table of contents</span>
        <span className="text-xs">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && (
        <nav id="toc-list" className="mb-6 space-y-2">
          {items.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  )
}

function DesktopTOC({ items, activeId }) {
  return (
    <aside className="sticky top-28 hidden h-max w-72 shrink-0 lg:block">
      <div className="rounded-xl border p-4">
        <p className="mb-2 text-sm font-semibold">Table of contents</p>
        <nav className="space-y-2">
          {items.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`block rounded-lg px-3 py-2 text-sm hover:bg-gray-50 ${
                activeId === s.id ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observers = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id)
          })
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])
  return active
}

// function formatCityName(slug) {
//   return slug
//     .replace(/-/g, ' ')
//     .split(' ')
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ')
// }

export default function Page({ params }) {
  const formattedCity = params.city
  const formattedState = params.state
  const activeId = useActiveSection(sections.map((s) => s.id))
  const year = useMemo(() => new Date().getFullYear(), [])
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10">
      {/* Breadcrumbs + Header */}
      <nav aria-label="Breadcrumb" className="mb-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="px-1">
            /
          </li>
          <li>
            <Link href="/guides" className="hover:underline">
              Guides
            </Link>
          </li>
          <li aria-hidden="true" className="px-1">
            /
          </li>
          <li aria-current="page" className="text-gray-700">
            San Antonio, TX
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          How to Start a Food Business in San Antonio, Texas
        </h1>
        <p className="mt-2 max-w-3xl text-gray-600">
          San Antonio entrepreneurs must meet city health-department rules and
          Texas state requirements before serving the public.
        </p>
        <p className="mt-2 max-w-3xl text-gray-600">
          This guide walks through licenses, permits, and best practices for
          restaurants, bakeries, caterers, food trucks, farmers market vendors,
          and home-based cottage food producers.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge>Last reviewed: {year}</Badge>
          <Badge>City: San Antonio</Badge>
          <Badge>State: Texas</Badge>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="#summary"
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Jump to Checklist
          </a>
          <button
            onClick={() => window.print()}
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Print / Save PDF
          </button>
        </div>
      </header>

      <div className="flex gap-8">
        <div className="min-w-0 flex-1">
          <MobileTOC items={sections} />

          {/* 1. General business setup */}
          <article className="prose prose-gray max-w-none">
            <SectionHeader id="general-setup">
              1. General business setup & zoning
            </SectionHeader>
            <div className="my-4">
              <h3 className="!my-4 text-lg font-semibold">
                1.1 Zoning & Certificate of Occupancy (CoO)
              </h3>
              <p className="my-4">
                <strong>Find a zoned location:</strong> Before applying for any
                food license, secure a location zoned for the intended use and
                complete the City <b>Certificate of Occupancy (CoO)</b> process
                through the Development & Business Services Center (“One Stop”),
                1901 S. Alamo St.
              </p>
              <p className="my-4">
                Clerks can help verify that building, electrical, plumbing,
                mechanical, environmental, health, and fire inspections are
                approved and recorded.
              </p>
              <p className="my-4">
                A valid <b>CoO</b> must be presented when you purchase a Food
                Establishment License.
              </p>
            </div>
            <div className="my-4">
              <p className="my-4">
                <strong>ADA compliance:</strong> All facilities must meet the
                Americans with Disabilities Act (ADA) requirements. For
                questions, contact the City’s Disability Access Office at{' '}
                <Anchor href="tel:12102077243">210-207-7243</Anchor>.
              </p>
            </div>
            <div className="my-4">
              <h3 className="!my-4 text-lg font-semibold">
                1.2 Business registration & tax permits
              </h3>
              <ul>
                <li className="my-4">
                  <strong>Business structure:</strong> Choose a legal structure
                  and register. Sole proprietors/partnerships using a name other
                  than the owner’s.
                </li>
                <li className="my-4">
                  File a DBA with Bexar County; corporations/LLCs register with
                  the Texas Secretary of State.
                </li>
                <li className="my-4">
                  <strong>Sales tax permit:</strong> If selling taxable items,
                  register for a Texas Sales & Use Tax Permit with the Texas
                  Comptroller.
                </li>
                <li className="my-4">
                  Texas has no general “business license,” but specific
                  activities (e.g., food, alcohol) require permits.
                </li>
                <li className="my-4">
                  <strong>City accounts:</strong> Set up a San Antonio Business
                  Tax Account to pay local license fees and applicable taxes.
                </li>
              </ul>
            </div>
            <Callout title="Pro tip">
              Build a simple business plan first—concept, target customers,
              startup budget, location, and financing. It will guide your
              timeline for permits, build-out, and inspections.
            </Callout>

            {/* 2. Licenses */}
            <SectionHeader id="city-licenses" />
            <h2 className="!mt-10 text-xl font-semibold my-4">
              2. City food establishment licenses
            </h2>
            <h3 className="text-lg font-semibold my-4">
              2.1 Who needs a Food Establishment License?
            </h3>
            <p className="my-4">
              A <em>food establishment</em> includes any operation that stores,
              prepares, packages, or serves food to the public—restaurants,
              retail food stores, satellite/catered feeding locations, remote
              caterers, markets, and food banks.
            </p>
            <p className="my-4">
              Businesses manufacturing food for resale are considered food
              manufacturers when they engage in labeling, combining, or
              purifying foods for sale beyond individual portions.
            </p>

            <h3 className="text-lg font-semibold my-4">
              2.2 Application process & inspections
            </h3>
            <ul>
              <li className="my-4">
                <strong>Construction & site inspections:</strong> Ensure
                building, electrical, plumbing, mechanical, environmental,
                health, and fire inspections are completed and approved—these
                are coordinated through the Development Services Department and
                recorded in the CoO process.
              </li>
              <li className="my-4">
                <strong>Purchase the license:</strong> After zoning approval and
                a valid CoO, purchase the license in person at the One Stop
                Center (1901 S. Alamo St.). Questions:{' '}
                <Anchor href="tel:12102070135">210-207-0135</Anchor>.
              </li>
              <li className="my-4">
                <strong>Annual fees:</strong> Fees depend on the number of
                employees (see table below). Additional fees may apply for extra
                inspections, late renewals, or operating unlicensed.
              </li>
            </ul>
            <div className="not-prose my-4">
              <FeeTable />
            </div>

            <h3 className="text-lg font-semibold my-4">
              2.3 Certified Food Manager & food-handler training
            </h3>
            <ul>
              <li className="my-4">
                At least one <strong>Certified Food Manager</strong> on duty
                during operating hours when serving open, potentially hazardous
                foods.
              </li>
              <li className="my-4">
                All employees who prepare/handle food must complete a{' '}
                <strong>food handler</strong> course accredited by Texas DSHS or
                ANSI; post the certificate where customers can see it.
              </li>
              <li className="my-4">
                Home preparation is prohibited unless you qualify as a{' '}
                <strong>cottage food</strong> operation.
              </li>
            </ul>

            {/* 3. Mobile vending */}
            <SectionHeader id="mobile-vending">
              3. Mobile food vending (trucks, trailers & carts)
            </SectionHeader>
            <p className="my-4">
              San Antonio requires a <strong>Mobile Vending License</strong> for
              any vehicle selling food from a truck, trailer, pushcart, or as a
              foot peddler. Applicants begin by passing a health inspection
              scheduled through the Metropolitan Health District.
            </p>

            <h3 className="text-lg font-semibold">
              3.1 Inspection & background checks
            </h3>
            <ul>
              <li className="my-4">
                <strong>Inspections:</strong> Conducted Tuesdays & Thursdays by
                appointment. Schedule at{' '}
                <Anchor href="tel:12102070135">210-207-0135</Anchor>. Unit must
                be fully equipped and operable.
              </li>
              <li className="my-4">
                <strong>Background checks:</strong> Required only for vendors
                selling frozen/refrigerated confections on public streets (ice
                cream, paletas, raspas). Owners and employees undergo state &
                federal checks via SAPD.
              </li>
            </ul>

            <h3 className="text-lg font-semibold">
              3.2 License categories & equipment (high-level)
            </h3>
            <div className="not-prose grid gap-4 md:grid-cols-3 my-6">
              <div className="rounded-xl border p-4">
                <p className="mb-1 text-sm font-semibold">
                  Non-hazardous (pre-/unpackaged)
                </p>
                <ul className="text-sm text-gray-700">
                  <li className="my-2">Annual license: $103</li>
                  <li className="my-2">
                    Overhead protection for unpackaged foods
                  </li>
                  <li className="my-2">Gravity-fed hand-wash station</li>
                  <li className="my-2">Smooth, cleanable surfaces</li>
                </ul>
              </div>
              <div className="rounded-xl border p-4">
                <p className="mb-1 text-sm font-semibold">
                  Pre-packaged potentially hazardous
                </p>
                <ul className="text-sm text-gray-700">
                  <li className="my-2">Annual license: $206</li>
                  <li className="my-2">Overhead protection (pushcarts)</li>
                  <li className="my-2">Commissary letter required</li>
                  <li className="my-2">Smooth, cleanable surfaces</li>
                </ul>
              </div>
              <div className="rounded-xl border p-4">
                <p className="mb-1 text-sm font-semibold">
                  Open-handled potentially hazardous
                </p>
                <ul className="text-sm text-gray-700">
                  <li className="my-2">Annual license: $309</li>
                  <li className="my-2">
                    2-compartment sink (carts); 3-compartment (vehicles)
                  </li>
                  <li className="my-2">
                    Dedicated hand sink; water heater ≥ 6 gal or instantaneous
                  </li>
                  <li className="my-2">
                    Fresh/waste tanks (waste 15% larger); commissary letter
                  </li>
                  <li className="my-2">Screened service openings</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold my-4">
              3.3 Water tests, commissary & operations
            </h3>
            <ul>
              <li className="my-4">
                <strong>Water sampling:</strong> For units with tanks: provide a
                clean water test from an accredited lab within 30 days of
                licensing; chlorinate weekly; sanitize tanks monthly; keep logs
                on the unit.
              </li>
              <li className="my-4">
                <strong>Commissary:</strong> Report at least weekly for
                cleaning/servicing (refill fresh water, dump waste, oil/grease
                disposal, storage). Keep date/time logs on the unit.
              </li>
              <li className="my-4">
                <strong>Operating rules:</strong> Approved sources & labels;
                hold hazardous foods at safe temps; observe street/right-of-way
                spacing (e.g., 50 ft from intersections), vend curbside/rear
                only, observe parking. Maintain 300 ft from schools one hour
                before/during/after school. Residential vending hours: 7 a.m.–9
                p.m. (Jun–Aug) and 7 a.m.–8 p.m. (Sep–May). No
                tables/chairs/awnings around the unit. Fire inspection required
                for propane/generators/grills.
              </li>
              <li className="my-4">
                <strong>Location restrictions:</strong> Downtown Business
                District requires a special permit; City Parks require Parks &
                Recreation permission; some special-event requirements may be
                waived (see City Ordinance Ch. 13).
              </li>
            </ul>

            {/* 4. Temporary Food Events */}
            <SectionHeader id="temporary-events">
              4. Temporary food events
            </SectionHeader>
            <p className="my-4">
              Any event where food is sold or given away requires a{' '}
              <strong>Temporary Food Establishment License</strong>. The
              ordinance authorizes the health department to add requirements,
              prohibit certain potentially hazardous foods, or waive
              requirements if no health hazard will result.
            </p>
            <h3 className="text-lg font-semibold">
              4.1 Application & booth guidelines
            </h3>
            <ul>
              <li className="my-4">
                <strong>Apply in advance:</strong> Use the city’s Temporary Food
                Establishment Application and follow posted booth sanitation
                guidelines. For exemptions, contact Metro Health at{' '}
                <Anchor href="tel:12102076000">210-207-6000</Anchor> or dial
                3-1-1.
              </li>
              <li className="my-4">
                <strong>Booth requirements (typical):</strong> Overhead
                protection; graded floors/platform; approved water source;
                gravity-fed hand-wash station; three pans for
                wash/rinse/sanitize; lidded garbage container.
              </li>
              <li className="my-4">
                <strong>Sampling:</strong> Bite-sized only; hold hot &gt; 135 °F
                / cold &lt; 41 °F; discard after 4 hours; use utensils or
                gloves—no bare-hand contact.
              </li>
            </ul>

            {/* 5. Markets */}
            <SectionHeader id="markets">
              5. Farmers markets, flea markets & trade shows
            </SectionHeader>
            <h3 className="text-lg font-semibold my-4">
              5.1 Farmers Market, Flea Market or Trade Show Permit
            </h3>
            <p className="my-4">
              A <em>farmers market</em> is a TDA-certified location primarily
              for raw agricultural products or custom processed products by
              agricultural producers. Markets must be on commercial (not
              residential) property.
            </p>
            <ul>
              <li className="my-4">
                For events with two or more temporary food establishments, the
                sponsor/coordinator submits applications and fees for all
                participants.
              </li>
              <li className="my-4">
                Provide market name/location, days of operation, any required
                state manufacturing license, and valid ID. Annual fee (market
                permit): <strong>$77.25</strong>. Apply in person at One Stop.
              </li>
              <li className="my-4">
                <strong>Selling off-site prepared items:</strong> Prepackaged
                foods and eggs allowed with proper labeling (producer
                name/address; “ungraded”; safe-handling; ≤ 45 °F for eggs).
              </li>
              <li className="my-4">
                <strong>Sampling at markets:</strong> Overhead protection;
                bite-size portions; temperature control; gravity-fed hand-wash;
                no bare-hand contact; three-pan washing; lidded trash.
              </li>
            </ul>

            <h3 className="text-lg font-semibold my-4">
              5.2 Farmers Market On-Site Permit
            </h3>
            <ul>
              <li className="my-4">
                Valid only for food <em>prepared on site</em>. Provide the same
                identification and market info as above.
              </li>
              <li className="my-4">
                Cooking permitted at the booth; at least one Food Manager or
                Food Handler certified person present.
              </li>
              <li className="my-4">
                Overhead protection; approved flooring (concrete, rolled
                asphalt, plywood, mats, or other approved surface); temperature
                control; approved water source; gravity-fed hand-wash; three-pan
                washing; lidded trash.
              </li>
              <li className="my-4">
                Annual on-site preparation fee: <strong>$99.91</strong>. Apply
                in person at One Stop.
              </li>
            </ul>

            {/* 6. Cottage Food */}
            <SectionHeader id="cottage-food">
              6. Cottage food operations (home-based)
            </SectionHeader>
            <ul>
              <li className="my-4">
                <strong>No city license required</strong> for cottage foods, but
                you must follow Texas Cottage Food Law and verify any
                zoning/parking rules.
              </li>
              <li className="my-4">
                <strong>Training:</strong> Complete a DSHS-accredited basic food
                safety course for food handlers.
              </li>
              <li className="my-4">
                <strong>Allowed foods:</strong> Non-potentially hazardous items
                that do not require refrigeration (e.g., baked goods without
                cream fillings, candies, coated nuts, unroasted nut butters,
                fruit butters, jams/jellies ≤ pH 4.6, pickled items per list,
                certain dry mixes, granola/cereals, roasted coffee/tea,
                herb/spice mixes).
              </li>
              <li className="my-4">
                <strong>Sales limits & venues:</strong> Direct-to-consumer only
                (no wholesale). Online/mail order only if delivered directly to
                the Texas consumer. Annual gross income capped at{' '}
                <strong>$50,000</strong>.
              </li>
              <li className="my-4">
                <strong>Labeling:</strong> Include operator name/address,
                product name, full ingredient list with sub-ingredients and
                allergens, net weight/volume, and the disclosure: “This food is
                made in a home kitchen and is not inspected by the Texas
                Department of State Health Services or a local health
                department.”
              </li>
            </ul>

            {/* 7. Manufacturing */}
            <SectionHeader id="manufacturing">
              7. Food manufacturing & wholesale
            </SectionHeader>
            <p className="my-4">
              If you manufacture food for wholesale distribution—or
              label/combine/purify foods beyond individual servings— you are a{' '}
              <strong>food manufacturer</strong>.
            </p>
            <p className="my-4">
              Each location needs a{' '}
              <strong>state food manufacturer’s license</strong>. Distributors
              who don’t manufacture need a <strong>wholesale license</strong>.
              These are issued by Texas DSHS and typically expire every two
              years. Contact DSHS for applications and plan review.
            </p>

            {/* 8. Resources */}
            <SectionHeader id="resources">
              8. Helpful contacts & resources
            </SectionHeader>
            <div className="not-prose grid gap-4 sm:grid-cols-2 my-6">
              <div className="rounded-xl border p-4">
                <p className="font-semibold">
                  San Antonio Metro Health (Food & Environmental Health)
                </p>
                <p className="text-sm text-gray-700">
                  One Stop Center, 1901 S. Alamo St. • Mon–Fri 7:45 a.m.–4:30
                  p.m.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href="tel:12102070135"
                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Call 210-207-0135
                  </a>
                  <a
                    href="https://www.sa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Visit sa.gov
                  </a>
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <p className="font-semibold">
                  Small Business Assistance (City of San Antonio)
                </p>
                <p className="text-sm text-gray-700">
                  Economic Development Dept. • Small Business Resource Guide
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href="tel:12102073903"
                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Call 210-207-3903
                  </a>
                  <a
                    href="https://www.sa.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    City resources
                  </a>
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <p className="font-semibold">
                  Texas DSHS (state rules & licenses)
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href="https://www.dshs.texas.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    dshs.texas.gov
                  </a>
                  <a
                    href="https://www.dshs.texas.gov/retail-food-establishments/permitting-information-retail-food-establishments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Texas Food Establishment Rules
                  </a>
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <p className="font-semibold">
                  Texas Comptroller (Sales & Use Tax Permit)
                </p>
                <a
                  href="https://comptroller.texas.gov/taxes/permit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  Apply online
                </a>
              </div>
            </div>

            <Callout tone="warn" title="Keep it current">
              Fees and rules change. Always verify with the City of San Antonio
              and Texas DSHS before you apply or open.
            </Callout>

            {/* 9. Summary */}
            <SectionHeader id="summary">9. Quick start checklist</SectionHeader>
            <ul className="columns-1">
              <li className="my-4">
                Choose a business structure and register (DBA / SOS as needed).
              </li>
              <li>Create a business plan and budget.</li>
              <li className="my-4">
                Secure a zoned location and obtain the Certificate of Occupancy
                (CoO).
              </li>
              <li className="my-4">
                Set up your San Antonio Business Tax Account.
              </li>
              <li className="my-4">
                Apply for the correct license: Food Establishment / Mobile
                Vending / Temporary / Market.
              </li>
              <li className="my-4">
                Farmers market? Add on-site permit if you’ll cook at the market.
              </li>
              <li className="my-4">
                Cottage foods? No city license—follow Texas Cottage Food Law.
              </li>
              <li className="my-4">
                Complete food-safety training (Food Manager + Food Handlers).
              </li>
              <li className="my-4">
                For mobile units: water test, commissary logs, equipment,
                spacing & location rules.
              </li>
              <li className="my-4">
                Maintain records, self-inspect, and renew annually.
              </li>
            </ul>

            <div className="not-prose mt-8 flex flex-wrap gap-3">
              <Link
                href="/browse-kitchens?city=San%20Antonio&state=TX"
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
              >
                Find a licensed commissary in San Antonio
              </Link>
              <a
                href="https://311.sanantonio.gov/kb/docs/articles/business-and-licensing/mobile-food-inspections"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Schedule a mobile unit inspection (311)
              </a>
            </div>
          </article>
        </div>

        {/* Sticky TOC */}
        <DesktopTOC items={sections} activeId={activeId} />
      </div>

      {/* JSON-LD breadcrumbs for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://sharedkitchenlocator.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Guides',
                item: 'https://sharedkitchenlocator.com/guides',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'San Antonio, TX',
                item: 'https://sharedkitchenlocator.com/guides/san-antonio',
              },
            ],
          }),
        }}
      />
    </main>
  )
}
