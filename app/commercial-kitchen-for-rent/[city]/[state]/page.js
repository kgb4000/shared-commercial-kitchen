import path from 'path'
import fs from 'fs/promises'
import CommercialKitchenDirectory from '@/component/CommercialKitchenDirectory'
import CityInsights from '@/component/CityInsights'

function formatCityName(slug) {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Allow dynamic routes that aren't in generateStaticParams
export const dynamicParams = true

// Generate static params for valid city/state combinations
export async function generateStaticParams() {
  const staticParams = []
  
  try {
    const fsModule = await import('fs/promises')
    const pathModule = await import('path')
    
    const dataDir = pathModule.join(process.cwd(), 'data')
    const folders = await fsModule.readdir(dataDir)
    
    for (const folder of folders) {
      try {
        const cityDataPath = pathModule.join(dataDir, folder, 'data.json')
        const cityFile = await fsModule.readFile(cityDataPath, 'utf-8')
        const cityData = JSON.parse(cityFile)
        
        // Extract city and state info
        const city = folder // Use folder name as city slug
        const state = (cityData.state || 'ca').toLowerCase()
        
        staticParams.push({
          city,
          state
        })
      } catch (error) {
        console.warn(`⚠️ Error processing ${folder} for generateStaticParams:`, error.message)
      }
    }
    
    console.log(`✅ Generated ${staticParams.length} static params for city/state pages`)
    return staticParams
    
  } catch (error) {
    console.error('❌ Error in city/state generateStaticParams:', error)
    return []
  }
}

export async function generateMetadata({ params }) {
  const { city, state } = await params
  const formattedCity = formatCityName(city)
  const formattedState = state.toUpperCase()

  const canonicalUrl = `https://sharedkitchenlocator.com/commercial-kitchen-for-rent/${city}/${state}`

  return {
    title: `Commercial kitchens for rent in ${formattedCity}, ${formattedState} | Rent a Kitchen Today!`,
    description: `Discover shared-use, commissary & ghost kitchens in ${formattedCity}. Browse verified commercial kitchen rentals with flexible hourly, daily & monthly rates.`,
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function CityKitchenPage({ params }) {
  const { city, state } = await params
  const formattedCity = formatCityName(city)
  const formattedState = state.toUpperCase()

  let cityData = {}
  let relatedCities = []

  try {
    // Load kitchen data
    const cityDataPath = path.join(process.cwd(), 'data', city, 'data.json')
    const cityFile = await fs.readFile(cityDataPath, 'utf-8')
    cityData = JSON.parse(cityFile)

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
    <div>
      <CommercialKitchenDirectory
        city={formattedCity}
        state={formattedState}
        kitchens={cityData?.kitchens || []}
        relatedCities={relatedCities}
      />
      <CityInsights
        cityData={cityData}
        cityName={formattedCity}
        stateName={formattedState}
      />
    </div>
  )
}
