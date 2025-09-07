// utils/dataUtils.js
// Utility functions for normalizing kitchen and place data

/**
 * Normalizes kitchen data from various sources to ensure consistent field names
 * @param {Object} kitchen - Raw kitchen data
 * @returns {Object} - Normalized kitchen data
 */
export function normalizeKitchenData(kitchen) {
  if (!kitchen || typeof kitchen !== 'object') {
    console.warn('Invalid kitchen data provided:', kitchen)
    return {}
  }

  return {
    // Only include safe, normalized fields (no spread to avoid complex objects)
    
    // Standardize place ID fields (most important for Google Places API)
    placeId:
      kitchen.placeId ||
      kitchen.place_id ||
      kitchen.googlePlaceId ||
      kitchen.google_place_id ||
      kitchen.id ||
      null,

    // Standardize name fields
    name:
      kitchen.title ||
      kitchen.name ||
      kitchen.displayName?.text ||
      kitchen.display_name ||
      'Unknown Kitchen',

    // Standardize rating fields
    rating:
      kitchen.totalScore ||
      kitchen.rating ||
      kitchen.google_rating ||
      kitchen.averageRating ||
      null,

    // Standardize review count fields
    reviewCount:
      kitchen.reviewsCount ||
      kitchen.reviewCount ||
      kitchen.user_ratings_total ||
      kitchen.userRatingCount ||
      kitchen.total_reviews ||
      0,

    // Standardize address fields
    address:
      kitchen.address ||
      kitchen.formattedAddress ||
      kitchen.full_address ||
      kitchen.street_address ||
      null,

    // Standardize contact fields
    phone:
      kitchen.phone ||
      kitchen.nationalPhoneNumber ||
      kitchen.phoneNumber ||
      kitchen.phone_number ||
      null,

    website:
      kitchen.website ||
      kitchen.websiteUri ||
      kitchen.url ||
      kitchen.website_url ||
      null,

    // Standardize image fields
    imageUrl:
      kitchen.imageUrl ||
      kitchen.photo ||
      kitchen.image ||
      kitchen.photo_url ||
      kitchen.image_url ||
      null,

    // Standardize location fields
    city:
      kitchen.city ||
      kitchen.locality ||
      extractCityFromAddress(kitchen.address || kitchen.formattedAddress),

    state:
      kitchen.state ||
      kitchen.us_state ||
      kitchen.administrative_area_level_1 ||
      extractStateFromAddress(kitchen.address || kitchen.formattedAddress),

    // Standardize business info
    verified:
      kitchen.verified ||
      kitchen.is_verified ||
      kitchen.businessStatus === 'OPERATIONAL' ||
      false,

    capacity:
      kitchen.capacity ||
      kitchen.max_capacity ||
      kitchen.seating_capacity ||
      null,

    // Standardize hours
    openingHours:
      kitchen.openingHours || kitchen.opening_hours || kitchen.hours || null,

    // Standardize description (handle case where about is an object)
    description: (() => {
      if (kitchen.description && typeof kitchen.description === 'string') {
        return kitchen.description
      }
      if (kitchen.about) {
        if (typeof kitchen.about === 'string') {
          return kitchen.about
        }
        if (typeof kitchen.about === 'object' && kitchen.about !== null) {
          return null // Don't use complex objects as descriptions
        }
      }
      return kitchen.summary || null
    })(),

    // Standardize tags/categories
    tags: kitchen.tags || kitchen.categories || kitchen.types || [],

    // Keep original data for debugging (removed to prevent object rendering errors)
    // _originalData: process.env.NODE_ENV === 'development' ? kitchen : undefined,
  }
}

/**
 * Normalizes Google Places data to match our kitchen data structure
 * @param {Object} place - Google Places API response data
 * @returns {Object} - Normalized place data
 */
export function normalizeGooglePlaceData(place) {
  if (!place || typeof place !== 'object') {
    console.warn('Invalid Google place data provided:', place)
    return {}
  }

  return {
    placeId: place.id,
    name: place.displayName?.text || 'Unknown Place',
    rating: place.rating || null,
    reviewCount: place.userRatingCount || 0,
    address: place.formattedAddress || null,
    phone: place.nationalPhoneNumber || place.internationalPhoneNumber || null,
    website: place.websiteUri || null,
    businessStatus: place.businessStatus || 'UNKNOWN',
    types: place.types || [],
    reviews: place.reviews || [],
    photos: place.photos || [],
    openingHours:
      place.currentOpeningHours?.weekdayDescriptions ||
      place.regularOpeningHours?.weekdayDescriptions ||
      null,
    editorialSummary: place.editorialSummary?.text || null,
    priceLevel: place.priceLevel || null,
    location: place.location || null,

    // Additional Google-specific fields
    googleMapsUri: place.googleMapsUri || null,
    isOpenNow: place.currentOpeningHours?.openNow || null,

    // Keep original for debugging
    _originalGoogleData:
      process.env.NODE_ENV === 'development' ? place : undefined,
  }
}

/**
 * Merges kitchen data with Google Places data, prioritizing Google data where available
 * @param {Object} kitchen - Normalized kitchen data
 * @param {Object} googlePlace - Normalized Google Places data
 * @returns {Object} - Merged data
 */
export function mergeKitchenWithGoogleData(kitchen, googlePlace) {
  if (!kitchen) return googlePlace || {}
  if (!googlePlace) return kitchen

  return {
    ...kitchen,

    // Prefer Google data for these fields as it's more up-to-date
    rating: googlePlace.rating || kitchen.rating,
    reviewCount: googlePlace.reviewCount || kitchen.reviewCount,
    phone: googlePlace.phone || kitchen.phone,
    website: googlePlace.website || kitchen.website,
    address: googlePlace.address || kitchen.address,
    businessStatus: googlePlace.businessStatus || kitchen.businessStatus,

    // Google-specific fields
    reviews: googlePlace.reviews || [],
    photos: googlePlace.photos || [],
    types: googlePlace.types || kitchen.tags || [],
    openingHours: googlePlace.openingHours || kitchen.openingHours,
    editorialSummary: googlePlace.editorialSummary || kitchen.description,
    isOpenNow: googlePlace.isOpenNow,
    googleMapsUri: googlePlace.googleMapsUri,

    // Keep both sources for reference (removed to prevent object rendering errors)
    // _kitchenSource: kitchen,
    // _googleSource: googlePlace,
  }
}

/**
 * Extracts city from an address string
 * @param {string} address - Address string
 * @returns {string} - Extracted city or default
 */
function extractCityFromAddress(address) {
  if (!address || typeof address !== 'string') return 'Unknown City'

  // Try to extract city from common address formats
  const parts = address.split(',')
  if (parts.length >= 2) {
    // Usually format: "Street, City, State ZIP"
    return parts[1].trim()
  }

  return 'Unknown City'
}

/**
 * Extracts state from an address string
 * @param {string} address - Address string
 * @returns {string} - Extracted state or default
 */
function extractStateFromAddress(address) {
  if (!address || typeof address !== 'string') return 'Unknown State'

  const parts = address.split(',')
  if (parts.length >= 3) {
    // Usually format: "Street, City, State ZIP"
    const stateZip = parts[2].trim()
    // Extract just the state part (before the ZIP)
    const statePart = stateZip.split(' ')[0]
    return statePart || 'Unknown State'
  }

  return 'Unknown State'
}

/**
 * Validates that a place ID is in the correct format
 * @param {string} placeId - Place ID to validate
 * @returns {boolean} - Whether the place ID appears valid
 */
export function isValidPlaceId(placeId) {
  if (!placeId || typeof placeId !== 'string') return false

  // Google Place IDs are typically 20+ characters and start with certain prefixes
  if (placeId.length < 10) return false

  // Common Place ID prefixes
  const validPrefixes = ['ChIJ', 'EiQ', 'Ei', 'GhIJ']
  const hasValidPrefix = validPrefixes.some((prefix) =>
    placeId.startsWith(prefix)
  )

  return hasValidPrefix || placeId.length > 20
}

/**
 * Gets the best available place ID from kitchen data
 * @param {Object} kitchen - Kitchen data (normalized or raw)
 * @returns {string|null} - Best available place ID or null
 */
export function getBestPlaceId(kitchen) {
  const normalized = normalizeKitchenData(kitchen)
  const placeId = normalized.placeId

  if (isValidPlaceId(placeId)) {
    return placeId
  }

  console.warn('No valid place ID found in kitchen data:', {
    placeId: placeId,
    availableFields: Object.keys(kitchen || {}),
    idLikeFields: Object.keys(kitchen || {}).filter(
      (key) =>
        key.toLowerCase().includes('id') || key.toLowerCase().includes('place')
    ),
  })

  return null
}

/**
 * Format phone number for display
 * @param {string} phone - Raw phone number
 * @returns {string|null} - Formatted phone number
 */
export function formatPhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return null

  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const number = cleaned.slice(1)
    return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`
  }

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  // Return original if we can't format it
  return phone
}

/**
 * Extract neighborhood from address
 * @param {string} address - Full address
 * @returns {string} - Neighborhood or default
 */
export function extractNeighborhood(address) {
  if (!address || typeof address !== 'string') return 'Downtown'

  const parts = address.split(',')
  if (parts.length >= 2) {
    return parts[1].trim()
  }

  return 'Downtown'
}
