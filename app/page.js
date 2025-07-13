import Image from 'next/image'
import Link from 'next/link'
// import data from './data/denver/data.json' // adjust the path as needed
import data from '@/data/denver/data.json'

export default function Home() {
  return (
    <>
      <div className="container max-w-5xl mx-auto my-10 px-6">
        <h1 className="text-5xl font-bold max-w-xl mb-4">
          Commercial Kitchens for Rent in Denver, CO
        </h1>
        <p className="text-md max-w-xl">
          Need a fully licensed, health-inspected kitchen to launch or scale
          your food business? Tired of sky-high rent, long-term leases, or
          working out of your home kitchen? Explore our handpicked list of the
          best commercial, commissary, and shared-use kitchens in Denver, CO —
          complete with reviews, photos, amenities, and 24/7 access options.
        </p>
      </div>
      <section>
        <div className="container max-w-5xl mx-auto grid md:grid-cols-3 gap-4 px-6">
          <div className="container max-w-3xl mx-auto col-span-2">
            <div className="p-6 bg-blue-100 md:px-6">
              <h2 className="font-bold text-xl">
                Why Rent a Kitchen in Denver, CO?
              </h2>
              <p className="text-md mb-2">
                Denver is one of the fastest-growing food startup hubs in the
                U.S., making it a prime location for launching and scaling your
                culinary business.
              </p>
              <p className="text-md mb-2">
                Renting a commercial kitchen here gives you access to health
                department-approved facilities without the upfront cost of
                building your own.
              </p>
              <p className="text-md mb-2">
                Whether you're a food truck owner, caterer, meal prep chef, or
                launching a CPG brand, shared-use kitchens in Denver offer
                flexible hourly or monthly rates, 24/7 access, and essential
                amenities like cold storage, dishwashing stations, and secure
                dry storage.
              </p>
              {/* <p className="text-md mb-2">
                Denver’s growing population and booming tourism sector also make
                it an ideal test market for food concepts. With access to
                farm-fresh ingredients, a strong local food community, and
                active small business support programs like Denver Economic
                Development & Opportunity (DEDO), you’ll find the resources to
                thrive. Plus, working out of a commissary kitchen helps you stay
                compliant with DDPHE food safety regulations from day one.
              </p>
              <p className="text-md mb-2">
                Whether you're launching a brand-new venture or scaling
                operations, renting a kitchen in Denver gives you the
                infrastructure, support, and flexibility to grow without limits.
              </p> */}
            </div>
            <div className="my-4">
              <h2 className="font-bold text-xl">
                Find Kitchens for Rent in Colorado Cities
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container max-w-7xl mx-auto px-6 py-20 grid grid-cols-3 gap-10 items-center">
          <Image
            src="/images/commercial-kitchen-pots-on-stove.jpg"
            width="640"
            height="960"
            className="order-2 rounded-4xl"
            alt="Commercial kitchen with pots on teh stove."
          />
          <div className="col-span-2">
            <h2 className="text-2xl md:text-3xl mb-4">
              Food Laws and Licenses in Denver, CO
            </h2>
            <p className="md:text-xl mb-2">
              Operating a food business in Denver means complying with both city
              and state health regulations.
            </p>
            <p className="md:text-xl mb-2">
              At a minimum, most food entrepreneurs will need to secure a{' '}
              <strong>Retail Food Establishment License </strong>through the{' '}
              <a
                href="https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Public-Health-Environment/Environmental-Health/Food-Safety"
                target="_blank"
                className="text-amber-600 font-semibold underline-offset-3"
              >
                Denver Department of Public Health & Environment (DDPHE)
              </a>
              .
            </p>
            <p className="md:text-xl mb-2">
              This license applies to food trucks, caterers, ghost kitchens, and
              anyone preparing food for sale. The application process includes a
              plan review, food safety certification, and inspection of the
              commercial kitchen you’ll be operating from.
            </p>
            <p className="md:text-xl mb-2">
              If your business involves manufacturing or packaging food for
              resale (such as baked goods or meal prep services), you may also
              need to register with the Colorado Department of Public Health &
              Environment (CDPHE).
            </p>
            <p className="md:text-xl mb-2">
              Additionally, mobile food vendors and food trucks are required to
              submit a Commissary Agreement, verifying that they’ll regularly
              use a licensed commissary kitchen for prep, storage, and
              sanitation.
            </p>
            <p className="md:text-xl mb-2">
              You can find the required forms and applications on the{' '}
              <a
                href="https://cdphe.colorado.gov/dehs/rf/resources"
                target="_blank"
                className="text-amber-600 font-semibold underline-offset-3"
              >
                Denver Mobile Food Vendor Resources Page
              </a>
              .
            </p>
            <p className="md:text-xl mb-2">
              Before applying, make sure your kitchen rental provider is
              licensed and in good standing with the city.
            </p>
            <p className="md:text-xl mb-2">
              It's also a good idea to schedule a Pre-Operational Inspection to
              catch any issues early. For zoning requirements and fire code
              compliance, check with Denver Development Services.
            </p>
            <p className="md:text-xl mb-2">
              Starting off right ensures you're compliant — and gives your food
              business a solid foundation for growth.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-2xl md:text-3xl mb-4 text-center max-w-xl mx-auto">
            Latest from our blog
          </h2>
          <p className="text-center md:text-xl">
            Learn how to grow your business with our expert advice
          </p>
          <div className="grid grid-cols-3 gap-10 my-10">
            {/* <div>
              <Image
                src="/images/dude-cooking.jpg"
                width="800"
                height="1100"
                className="mb-4 rounded-4xl"
              />
              <h2 className="text-xl font-bold">
                The Ultimate Guide to Starting a Food Business
              </h2>
            </div>
            <div>
              <Image
                src="/images/dude-cooking.jpg"
                width="800"
                height="1100"
                className="mb-4 rounded-4xl"
              />
              <h2 className="text-xl font-bold">
                The Ultimate Guide to Starting a Food Business
              </h2>
            </div>
            <div>
              <Image
                src="/images/dude-cooking.jpg"
                width="800"
                height="1100"
                className="mb-4 rounded-4xl"
              />
              <h2 className="text-xl font-bold">
                The Ultimate Guide to Starting a Food Business
              </h2>
            </div> */}
          </div>
        </div>
      </section>
      <section className="bg-slate-100">
        <div className="container max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-2xl md:text-3xl mb-4 text-center max-w-xl mx-auto font-bold">
            Frequently Asked Questions
          </h2>
          <div className="mb-6">
            <div className="flex items-top space-x-2 text-sm mb-2">
              <span className="text-2xl font-bold">#1.</span>
              <div>
                <p className="text-xl md:text-2xl font-bold mb-4">
                  Do I need a license to use a commercial kitchen in Denver?
                </p>
                <p className="md:text-xl">
                  Yes. If you’re preparing food for sale to the public, you’ll
                  need a Retail Food License from the Denver Department of
                  Public Health & Environment (DDPHE). Mobile vendors, caterers,
                  and food producers must comply with local and state
                  regulations.
                </p>
              </div>
            </div>
            <div className="flex items-top space-x-2 text-sm mb-2">
              <span className="text-2xl font-bold">#2.</span>
              <div>
                <p className="text-xl md:text-2xl font-bold mb-4">
                  Can I rent a kitchen in Denver by the hour or just monthly?
                </p>
                <p className="md:text-xl">
                  Many shared-use kitchens in Denver offer both hourly and
                  monthly rental options. Hourly rentals are great for
                  early-stage businesses or pop-ups, while monthly memberships
                  work well for high-volume food producers or caterers.
                </p>
              </div>
            </div>
            <div className="flex items-top space-x-2 text-sm mb-2">
              <span className="text-2xl font-bold">#3.</span>
              <div>
                <p className="text-xl md:text-2xl font-bold mb-4">
                  What amenities are typically included in a shared-use kitchen?
                </p>
                <p className="md:text-xl">
                  Most kitchens offer prep tables, commercial ovens,
                  refrigerators, cold and dry storage, dishwashing stations, and
                  sometimes specialty equipment (like mixers or smokers).
                  Amenities vary by location — use our filters to compare
                  options.
                </p>
              </div>
            </div>
            <div className="flex items-top space-x-2 text-sm mb-2">
              <span className="text-2xl font-bold">#4.</span>
              <div>
                <p className="text-xl md:text-2xl font-bold mb-4">
                  Is insurance required to use a commissary kitchen?
                </p>
                <p className="md:text-xl">
                  Yes. Most kitchens require that you carry general liability
                  insurance (often with $1M coverage) and list the facility as
                  an additional insured. Some may also require product liability
                  or worker’s comp, depending on your business type.
                </p>
              </div>
            </div>
            <div className="flex items-top space-x-2 text-sm mb-2">
              <span className="text-2xl font-bold">#5.</span>
              <div>
                <p className="text-xl md:text-2xl font-bold mb-4">
                  What types of food businesses use commercial kitchens?
                </p>
                <p className="md:text-xl">
                  Shared-use kitchens in Denver are used by food trucks,
                  caterers, bakers, ghost kitchens, meal prep businesses, food
                  product startups, and pop-up chefs. They're also great for
                  testing new concepts before opening a brick-and-mortar
                  location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
