const fs = require('fs')
const path = require('path')

const API_KEY = process.env.GOOGLE_PLACES_API_KEY
const DATA_DIR = path.join(__dirname, '..', 'data')
const DELAY_MS = 200

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
  'crate & barrel', 'warehouse', 'wholesale', 'distributor',
  'restaurant headquarters', 'restaurant services', 'restaurant group',
  'kitchen source', 'kitchen design', 'kitchen studio',
  'logistics', 'management', 'consulting', 'staffing',
  'expansive', 'building resources',
  'improvement', 'depot', 'worklodge', 'party rental', 'party rentals',
  'event rental', 'tent rental', 'lodge', 'hotel', 'motel',
  'food truck builder', 'foodservice', 'food service',
  'catering co', 'catering company', 'catering llc', 'catering service',
  'restaurant improvement', 'restaurant depot',
  'grocery', 'supermarket', 'bodega',
  'brewery', 'winery', 'distillery',
  'bistro', 'chef services', 'chef service', 'personal chef', 'private chef',
  'kitchenlift', 'kitchen lift', 'interior design', 'home staging',
  'salon', 'beauty', 'photography', 'photo studio',
  'temple', 'mosque', 'church',
  'gym ', 'fitness', 'yoga',
  'auto ', 'car wash', 'mechanic',
  'dry clean', 'laundry',
  'enterprises', 'woodwork', 'knives', 'knife', 'cutlery',
  'forum', 'arena', 'stadium', 'coliseum',
  'public market', 'farmers market', 'flea market',
  'antique', 'gallery',
  'business center', 'conference center', 'convention center',
  'banquet hall', 'banquet ', 'reception hall', 'ballroom',
  'event center', 'event venue', 'event planning', 'event space',
  'wedding', 'bridal', 'unlimited',
]

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function searchCity(city, state) {
  // Search specifically for shared/commissary kitchens
  const queries = [
    `shared commercial kitchen for rent in ${city}, ${state}`,
    `commissary kitchen in ${city}, ${state}`,
  ]
  
  const allResults = []
  const seenIds = new Set()
  
  for (const query of queries) {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,places.types',
      },
      body: JSON.stringify({ textQuery: query, maxResultCount: 20 }),
    })
    
    if (!res.ok) {
      console.error(`  Search failed for "${query}": ${res.status}`)
      continue
    }
    
    const data = await res.json()
    for (const place of (data.places || [])) {
      if (!seenIds.has(place.id)) {
        seenIds.add(place.id)
        allResults.push(place)
      }
    }
    await sleep(DELAY_MS)
  }
  
  // Filter junk
  return allResults.filter(place => {
    const name = (place.displayName?.text || '').toLowerCase()
    if (rejectNames.some(r => name.includes(r))) {
      console.log(`  SKIP: ${place.displayName?.text}`)
      return false
    }
    return true
  })
}

async function getDetails(placeId) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,location,rating,userRatingCount,nationalPhoneNumber,websiteUri,regularOpeningHours,photos',
    },
  })
  if (!res.ok) return null
  return res.json()
}

function buildPhotoUrl(photoName, maxWidth) {
  return `https://places.googleapis.com/v1/${photoName}/media?key=${API_KEY}&maxWidthPx=${maxWidth}`
}

async function addCity(cityName, stateAbbr, stateFull) {
  const slug = cityName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const dirPath = path.join(DATA_DIR, slug)
  
  // Skip if already exists
  if (fs.existsSync(path.join(dirPath, 'data.json'))) {
    console.log(`⏭️  ${cityName}, ${stateAbbr} already exists — skipping`)
    return 0
  }
  
  console.log(`\n🔍 ${cityName}, ${stateAbbr}`)
  
  const places = await searchCity(cityName, stateAbbr)
  console.log(`  Found ${places.length} potential kitchens`)
  
  if (places.length === 0) {
    console.log(`  ❌ No kitchens found — skipping city`)
    return 0
  }
  
  // Get details for each
  const kitchens = []
  for (const place of places) {
    const details = await getDetails(place.id)
    await sleep(DELAY_MS)
    
    if (!details) continue
    
    const kitchen = {
      title: details.displayName?.text || place.displayName?.text || '',
      price: null,
      categoryName: 'Shared-use commercial kitchen',
      address: details.formattedAddress || place.formattedAddress || '',
      neighborhood: '',
      street: '',
      city: cityName,
      postalCode: '',
      state: stateAbbr,
      countryCode: 'US',
      website: details.websiteUri || '',
      phone: details.nationalPhoneNumber || '',
      phoneUnformatted: (details.nationalPhoneNumber || '').replace(/\D/g, ''),
      claimThisBusiness: false,
      location: {
        lat: details.location?.latitude || 0,
        lng: details.location?.longitude || 0,
      },
      permanentlyClosed: false,
      temporarilyClosed: false,
      placeId: place.id,
      categories: ['Shared-use commercial kitchen'],
      imagesCount: 0,
      imageCategories: [],
      scrapedAt: new Date().toISOString(),
      openingHours: [],
      additionalInfo: {},
      url: `https://www.google.com/maps/search/?api=1&query_place_id=${place.id}`,
      reviews: details.userRatingCount || 0,
      rating: details.rating || 0,
      totalScore: details.rating || 0,
      reviewsCount: details.userRatingCount || 0,
      isAdvertisement: false,
      imageUrl: '',
      images: [],
      verified: false,
    }
    
    // Hours
    if (details.regularOpeningHours?.weekdayDescriptions) {
      kitchen.openingHours = details.regularOpeningHours.weekdayDescriptions.map(desc => {
        const i = desc.indexOf(':')
        return { day: desc.slice(0, i).trim(), hours: desc.slice(i + 1).trim() }
      })
    }
    
    // Photos
    if (details.photos && details.photos.length > 0) {
      kitchen.imageUrl = buildPhotoUrl(details.photos[0].name, 800)
      kitchen.images = details.photos.slice(0, 10).map(p => buildPhotoUrl(p.name, 800))
    }
    
    kitchens.push(kitchen)
    console.log(`  ✓ ${kitchen.title}`)
  }
  
  if (kitchens.length === 0) {
    console.log(`  ❌ No valid kitchens after filtering`)
    return 0
  }
  
  // Write
  fs.mkdirSync(dirPath, { recursive: true })
  fs.writeFileSync(
    path.join(dirPath, 'data.json'),
    JSON.stringify({ city: cityName, state: stateAbbr, kitchens }, null, 2) + '\n'
  )
  
  console.log(`  ✅ Added ${kitchens.length} kitchens`)
  return kitchens.length
}

async function main() {
  if (!API_KEY) { console.error('Missing GOOGLE_PLACES_API_KEY'); process.exit(1) }
  
  console.log('🏙️  Adding new cities\n')
  
  const cities = [
    ['Las Vegas', 'NV'],
    ['Portland', 'OR'],
    ['Charlotte', 'NC'],
    ['Orlando', 'FL'],
    ['Raleigh', 'NC'],
    ['Kansas City', 'MO'],
    ['Cleveland', 'OH'],
    ['Boston', 'MA'],
    ['Sacramento', 'CA'],
    ['St. Louis', 'MO'],
    ['Omaha', 'NE'],
    ['Columbus', 'OH'],
    ['Richmond', 'VA'],
    ['Memphis', 'TN'],
    ['Detroit', 'MI'],
    ['Nashville', 'TN'],
    ['San Bernardino', 'CA'],
    ['Honolulu', 'HI'],
    ['Greenville', 'SC'],
    ['Jacksonville', 'FL'],
  ]
  
  let totalAdded = 0
  for (const [city, state] of cities) {
    const count = await addCity(city, state)
    totalAdded += count
  }
  
  console.log(`\n🏁 Done: ${totalAdded} kitchens added across ${cities.length} cities`)
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })
