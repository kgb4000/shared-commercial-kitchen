const fs = require('fs')
const path = require('path')

const API_KEY = process.env.GOOGLE_PLACES_API_KEY
const DATA_DIR = path.join(__dirname, '..', 'data')
const DELAY_MS = 150

if (!API_KEY) {
  console.error('Missing GOOGLE_PLACES_API_KEY environment variable')
  process.exit(1)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ── Google Places API helpers ──────────────────────────────────────

async function searchKitchens(city, state) {
  const results = []
  let pageToken = null

  for (let page = 0; page < 3; page++) {
    const body = {
      textQuery: `commercial kitchen for rent in ${city}, ${state}`,
      maxResultCount: 20,
    }
    if (pageToken) body.pageToken = pageToken

    const res = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.types,nextPageToken',
        },
        body: JSON.stringify(body),
      }
    )

    if (!res.ok) {
      console.error(`  Text Search failed for ${city}, ${state}: ${res.status}`)
      break
    }

    const data = await res.json()
    if (data.places) {
      const filtered = data.places.filter((place) => {
        const name = (place.displayName?.text || '').toLowerCase()
        const types = place.types || []

        // Reject businesses that aren't actual kitchens for rent
        const rejectTypes = [
          'furniture_store', 'home_goods_store', 'hardware_store',
          'cleaning_service', 'event_venue', 'wedding_venue',
          'real_estate_agency', 'moving_company', 'storage',
          'restaurant_supply', 'appliance_store',
        ]
        if (types.some((t) => rejectTypes.includes(t))) return false

        // Reject by name patterns
        const rejectNames = [
          'equipment', 'supply', 'supplies', 'cleaners', 'cleaning',
          'repair', 'installation', 'accelerator space', 'event space',
          'wedding', 'furniture', 'appliance', 'real estate',
          'kitchen and bath', 'kitchen & bath', 'bath and kitchen', 'bath & kitchen',
          'plumbing', 'hvac', 'remodel', 'renovation', 'contractor',
          'construction', 'cabinet', 'countertop', 'granite', 'marble',
          'tile', 'flooring', 'roofing', 'electric', 'pest control',
          'janitorial', 'handyman', 'locksmith', 'painting',
          'kitchens and bath', 'kitchens & bath', 'baths',
          'localworks', 'coworking', 'co-working', 'wework', 'regus',
          'office space', 'workspace', 'showroom', 'home depot', 'lowes', 'ikea',
          'crate & barrel', 'crate and barrel', 'warehouse', 'wholesale', 'distributor',
          'restaurant headquarters', 'restaurant services', 'restaurant group',
          'kitchen source', 'kitchen design', 'kitchen studio',
          'logistics', 'management', 'consulting', 'staffing',
          'expansive', 'building resources',
        ]
        if (rejectNames.some((r) => name.includes(r))) return false

        return true
      })
      results.push(...filtered)
    }

    pageToken = data.nextPageToken
    if (!pageToken) break
    await sleep(DELAY_MS)
  }

  return results
}

async function getPlaceDetails(placeId) {
  const fields = [
    'id',
    'displayName',
    'formattedAddress',
    'location',
    'rating',
    'userRatingCount',
    'nationalPhoneNumber',
    'websiteUri',
    'regularOpeningHours',
    'photos',
  ].join(',')

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': fields,
      },
    }
  )

  if (!res.ok) {
    console.error(`  Place Details failed for ${placeId}: ${res.status}`)
    return null
  }

  return res.json()
}

function buildPhotoUrl(photoName, maxWidth) {
  return `https://places.googleapis.com/v1/${photoName}/media?key=${API_KEY}&maxWidthPx=${maxWidth}`
}

// ── Data processing ────────────────────────────────────────────────

function applyDetails(kitchen, details) {
  if (!details) return kitchen

  // Update fields from API, preserving existing values as fallback
  if (details.rating != null) kitchen.totalScore = details.rating
  if (details.rating != null) kitchen.rating = details.rating
  if (details.userRatingCount != null)
    kitchen.reviewsCount = details.userRatingCount
  if (details.userRatingCount != null)
    kitchen.reviews = details.userRatingCount
  if (details.formattedAddress) kitchen.address = details.formattedAddress
  if (details.nationalPhoneNumber) {
    kitchen.phone = details.nationalPhoneNumber
    kitchen.phoneUnformatted = details.nationalPhoneNumber.replace(/\D/g, '')
  }
  if (details.websiteUri) kitchen.website = details.websiteUri
  if (details.location) {
    kitchen.location = {
      lat: details.location.latitude,
      lng: details.location.longitude,
    }
  }

  // Opening hours
  if (details.regularOpeningHours?.weekdayDescriptions) {
    kitchen.openingHours = details.regularOpeningHours.weekdayDescriptions.map(
      (desc) => {
        const colonIndex = desc.indexOf(':')
        return {
          day: desc.slice(0, colonIndex).trim(),
          hours: desc.slice(colonIndex + 1).trim(),
        }
      }
    )
  }

  // Photos
  if (details.photos && details.photos.length > 0) {
    kitchen.imageUrl = buildPhotoUrl(details.photos[0].name, 800)
    kitchen.images = details.photos
      .slice(0, 10)
      .map((p) => buildPhotoUrl(p.name, 800))
  }

  kitchen.scrapedAt = new Date().toISOString()

  return kitchen
}

function createNewKitchen(place, cityName, stateName) {
  return {
    title: place.displayName?.text || 'Unknown Kitchen',
    price: null,
    categoryName: 'Commercial kitchen',
    address: place.formattedAddress || '',
    neighborhood: '',
    street: '',
    city: cityName,
    postalCode: '',
    state: stateName,
    countryCode: 'US',
    website: place.websiteUri || '',
    phone: place.nationalPhoneNumber || '',
    phoneUnformatted: (place.nationalPhoneNumber || '').replace(/\D/g, ''),
    claimThisBusiness: false,
    location: {
      lat: place.location?.latitude || 0,
      lng: place.location?.longitude || 0,
    },
    permanentlyClosed: false,
    temporarilyClosed: false,
    placeId: place.id,
    categories: ['Commercial kitchen'],
    imagesCount: 0,
    imageCategories: [],
    scrapedAt: new Date().toISOString(),
    openingHours: [],
    additionalInfo: {},
    url: `https://www.google.com/maps/search/?api=1&query_place_id=${place.id}`,
    reviews: place.userRatingCount || 0,
    rating: place.rating || 0,
    totalScore: place.rating || 0,
    reviewsCount: place.userRatingCount || 0,
    isAdvertisement: false,
    imageUrl: '',
    images: [],
    verified: false,
  }
}

// ── Main ───────────────────────────────────────────────────────────

async function processCity(cityDir) {
  const dataPath = path.join(DATA_DIR, cityDir, 'data.json')
  if (!fs.existsSync(dataPath)) return { updated: 0, added: 0 }

  const cityData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  const kitchens = cityData.kitchens || []
  const cityName = cityData.city || cityDir
  const stateName = cityData.state || ''

  console.log(`\n📍 ${cityName}, ${stateName} (${kitchens.length} kitchens)`)

  // Step 1: Discover new kitchens
  let added = 0
  try {
    const searchResults = await searchKitchens(cityName, stateName)
    const existingIds = new Set(kitchens.map((k) => k.placeId).filter(Boolean))

    for (const place of searchResults) {
      if (place.id && !existingIds.has(place.id)) {
        const newKitchen = createNewKitchen(place, cityName, stateName)
        kitchens.push(newKitchen)
        existingIds.add(place.id)
        added++
        console.log(`  + New: ${newKitchen.title}`)
      }
    }
    await sleep(DELAY_MS)
  } catch (err) {
    console.error(`  Discovery error: ${err.message}`)
  }

  // Step 2: Refresh all kitchens with Place Details
  let updated = 0
  for (const kitchen of kitchens) {
    if (!kitchen.placeId) continue

    try {
      const details = await getPlaceDetails(kitchen.placeId)
      if (details) {
        applyDetails(kitchen, details)
        updated++
      }
      await sleep(DELAY_MS)
    } catch (err) {
      console.error(`  Refresh error for ${kitchen.title}: ${err.message}`)
    }
  }

  // Step 3: Write updated data
  cityData.kitchens = kitchens
  fs.writeFileSync(dataPath, JSON.stringify(cityData, null, 2) + '\n')

  console.log(`  ✅ ${updated} refreshed, ${added} new`)
  return { updated, added }
}

async function main() {
  console.log('🔄 Kitchen Data Refresh')
  console.log(`📅 ${new Date().toISOString()}\n`)

  const cityDirs = fs
    .readdirSync(DATA_DIR)
    .filter((d) => {
      const fullPath = path.join(DATA_DIR, d)
      return (
        fs.statSync(fullPath).isDirectory() &&
        fs.existsSync(path.join(fullPath, 'data.json'))
      )
    })
    .sort()

  console.log(`Found ${cityDirs.length} cities`)

  let totalUpdated = 0
  let totalAdded = 0

  for (const cityDir of cityDirs) {
    const { updated, added } = await processCity(cityDir)
    totalUpdated += updated
    totalAdded += added
  }

  console.log(`\n🏁 Done: ${totalUpdated} updated, ${totalAdded} new kitchens`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
