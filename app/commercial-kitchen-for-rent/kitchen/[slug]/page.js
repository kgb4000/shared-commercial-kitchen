import fs from 'fs/promises'
import path from 'path'
import KitchenDetail from '@/component/KitchenDetail'
import { slugify } from '@/lib/slugify'
import {
  getDemographicsFromFile,
  createMarketingMessages,
} from '@/lib/demographicsUtils'

export async function getKitchenBySlug(slug) {
  const folders = await fs.readdir(path.join(process.cwd(), 'data'))

  for (const folder of folders) {
    try {
      const filePath = path.join(process.cwd(), 'data', folder, 'data.json')
      const file = await fs.readFile(filePath, 'utf-8')
      const kitchens = JSON.parse(file).kitchens

      const match = kitchens.find(
        (kitchen) => slugify(kitchen.name || kitchen.title) === slug
      )
      if (match) return match
    } catch (err) {
      console.warn(`Skipping ${folder}:`, err.message)
    }
  }

  return null
}

export default async function KitchenPage({ params }) {
  const { slug } = await params // ✅ Await params before destructuring
  const kitchen = await getKitchenBySlug(slug)

  if (!kitchen) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Kitchen Not Found</h1>
        <p className="text-gray-600">
          Please check the URL or try a different listing.
        </p>
      </div>
    )
  }

  // Fetch demographics for the kitchen's city (server-side)
  const demographics = await getDemographicsFromFile(kitchen.city)

  // Create marketing messages if demographics are available
  const marketingMessages = demographics
    ? createMarketingMessages(demographics)
    : []

  return (
    <KitchenDetail
      kitchen={kitchen}
      demographics={demographics}
      marketingMessages={marketingMessages}
    />
  )
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params // ✅ Await params first
  const kitchen = await getKitchenBySlug(resolvedParams.slug)

  if (!kitchen) {
    return {}
  }

  // Enhanced metadata with demographic insights
  const demographics = await getDemographicsFromFile(kitchen.city)

  let description =
    kitchen.description ||
    `Professional shared-use commercial kitchen for rent in ${
      kitchen.city || 'your area'
    }.`

  // Add market insights to description if available
  if (demographics) {
    const population = demographics.residents?.total
    const income = demographics.residents?.keyDemographics?.medianIncome

    if (population && income) {
      description += ` Located in a thriving market with ${population.toLocaleString()} residents and median income of ${income.toLocaleString()}.`
    }
  }

  const title = `${
    kitchen.title || kitchen.name
  } | Commercial Kitchen for Rent in ${kitchen.city} ${kitchen.state}`

  // Get the best image for social sharing
  const imageUrl = kitchen.imageUrl || kitchen.photo || '/fallback-kitchen.jpg'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website', // Fixed: valid OpenGraph type
      url: `/kitchen/${resolvedParams.slug}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: kitchen.title || kitchen.name,
        },
      ],
      siteName: 'Commercial Kitchen Rentals',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    // Business-specific structured data (not OpenGraph)
    other: {
      'business:contact_data:locality': kitchen.city,
      'business:contact_data:region': kitchen.state || kitchen.us_state,
      'business:contact_data:country_name': 'United States',
    },
  }
}
