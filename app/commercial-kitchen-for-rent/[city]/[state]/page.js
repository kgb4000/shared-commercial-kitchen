import path from 'path'
import fs from 'fs/promises'
import CommercialKitchenDirectory from '@/component/CommercialKitchenDirectory'

function formatCityName(slug) {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }) {
  const formattedCity = formatCityName(params.city)
  const formattedState = params.state.toUpperCase()

  const canonicalUrl = `https://sharedkitchenlocator.com/commercial-kitchen-for-rent/${params.city}/${params.state}`

  return {
    title: `Commercial kitchen space for rent in ${formattedCity}, ${formattedState} | Rent a Kitchen Today!`,
    description: `Find shared-use, commissary, and ghost kitchens in ${formattedCity}, ${formattedState}. Verified listings, flexible pricing.`,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function CityKitchenPage({ params }) {
  const { city, state } = params
  const formattedCity = formatCityName(city)
  const formattedState = state.toUpperCase()

  let kitchenData = []
  let relatedCities = []

  try {
    // Load kitchen data
    const cityDataPath = path.join(process.cwd(), 'data', city, 'data.json')
    const cityFile = await fs.readFile(cityDataPath, 'utf-8')
    kitchenData = JSON.parse(cityFile)

    // Read all city directories
    const dataDir = path.join(process.cwd(), 'data')
    const folders = await fs.readdir(dataDir)

    // Check each folder for same-state match
    for (const folder of folders) {
      if (folder === city) continue

      try {
        const file = await fs.readFile(
          path.join(dataDir, folder, 'data.json'),
          'utf-8'
        )
        const parsed = JSON.parse(file)

        if (parsed?.state?.toUpperCase() === formattedState) {
          relatedCities.push({
            slug: folder,
            name: formatCityName(folder),
            url: `/commercial-kitchen-for-rent/${folder}/${state}`,
          })
        }
      } catch (err) {
        console.warn(`⚠️ Could not read data for ${folder}: ${err.message}`)
      }
    }
  } catch (error) {
    console.error(`❌ Error loading data for ${city}-${state}:`, error.message)
  }

  return (
    <CommercialKitchenDirectory
      city={formattedCity}
      state={formattedState}
      kitchens={kitchenData?.kitchens || []}
      relatedCities={relatedCities}
    />
  )
}
