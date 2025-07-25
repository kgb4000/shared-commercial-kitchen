// lib/kitchenDataMapper.js

/**
 * Maps and merges kitchen data from your database with Google Places API data
 */
export function mergeKitchenWithPlacesData(kitchen, placesData) {
  if (!placesData) return kitchen

  return {
    // Keep original kitchen data as base
    ...kitchen,

    // Enhance with Google Places data where available
    googlePlaces: {
      id: placesData.id,
      displayName: placesData.displayName?.text,
      formattedAddress: placesData.formattedAddress,
      location: placesData.location,
      rating: placesData.rating,
      userRatingCount: placesData.userRatingCount,
      priceLevel: placesData.priceLevel,
      businessStatus: placesData.businessStatus,
      types: placesData.types,
      photos: placesData.photos,
      reviews: placesData.reviews,
      openingHours:
        placesData.currentOpeningHours || placesData.regularOpeningHours,
      phone: placesData.nationalPhoneNumber,
      website: placesData.websiteUri,
      googleMapsUri: placesData.googleMapsUri,
      editorialSummary: placesData.editorialSummary?.text,
    },

    // Computed fields that prefer Google data when available
    enhancedRating: placesData.rating || kitchen.rating || kitchen.totalScore,
    enhancedReviewCount:
      placesData.userRatingCount || kitchen.reviews || kitchen.reviewsCount,
    enhancedAddress:
      placesData.formattedAddress || kitchen.full_address || kitchen.address,
    enhancedPhone: placesData.nationalPhoneNumber || kitchen.phone,
    enhancedWebsite: placesData.websiteUri || kitchen.site,
  }
}

/**
 * Extracts the best available image from kitchen data
 */
export function getBestKitchenImage(kitchen, placesData) {
  // Priority order: Google Places photos, then original kitchen images
  if (placesData?.photos && placesData.photos.length > 0) {
    return {
      url: placesData.photos[0].url,
      urlLarge: placesData.photos[0].urlLarge,
      source: 'google',
      attribution: placesData.photos[0].authorAttributions?.[0]?.displayName,
    }
  }

  if (kitchen.imageUrl) {
    return {
      url: kitchen.imageUrl,
      source: 'original',
    }
  }

  if (kitchen.photo) {
    return {
      url: kitchen.photo,
      source: 'original',
    }
  }

  // Fallback image
  return {
    url: '/fallback-kitchen.jpg',
    source: 'fallback',
  }
}

/**
 * Formats business hours for display
 */
export function formatBusinessHours(kitchen, placesData) {
  // Prefer Google Places opening hours
  if (placesData?.currentOpeningHours?.weekdayDescriptions) {
    return placesData.currentOpeningHours.weekdayDescriptions.map((desc) => ({
      display: desc,
      source: 'google',
    }))
  }

  if (placesData?.regularOpeningHours?.weekdayDescriptions) {
    return placesData.regularOpeningHours.weekdayDescriptions.map((desc) => ({
      display: desc,
      source: 'google',
    }))
  }

  // Fall back to original kitchen hours
  if (kitchen.working_hours) {
    return Object.entries(kitchen.working_hours).map(([day, hours]) => ({
      display: `${day}: ${hours}`,
      source: 'original',
    }))
  }

  return null
}

/**
 * Determines if a kitchen should be considered verified
 */
export function getVerificationStatus(kitchen, placesData) {
  // Verified if explicitly marked in original data
  if (kitchen.verified === true) {
    return { verified: true, source: 'original' }
  }

  // Verified if Google Places shows as operational
  if (placesData?.businessStatus === 'OPERATIONAL') {
    return { verified: true, source: 'google' }
  }

  // Check if it has substantial Google presence
  if (placesData?.userRatingCount && placesData.userRatingCount > 5) {
    return { verified: true, source: 'google_activity' }
  }

  return { verified: false, source: 'unverified' }
}

/**
 * Gets the best available description
 */
export function getBestDescription(kitchen, placesData) {
  // Priority: original description, Google editorial summary, fallback
  if (kitchen.description) {
    return { text: kitchen.description, source: 'original' }
  }

  if (placesData?.editorialSummary?.text) {
    return { text: placesData.editorialSummary.text, source: 'google' }
  }

  // Generate a fallback based on kitchen type and location
  const location =
    kitchen.city ||
    placesData?.formattedAddress?.split(',')[0] ||
    'this location'
  return {
    text: `Professional shared-use commercial kitchen facility available for rent in ${location}.`,
    source: 'generated',
  }
}

/**
 * Combines and deduplicates reviews from multiple sources
 */
export function combineReviews(kitchen, placesData) {
  const reviews = []

  // Add Google Places reviews (these are usually the most detailed)
  if (placesData?.reviews) {
    reviews.push(
      ...placesData.reviews.map((review) => ({
        ...review,
        source: 'google',
        id: `google_${review.authorAttribution?.uri || Math.random()}`,
      }))
    )
  }

  // You could add other review sources here if available in your data

  return reviews.slice(0, 10) // Limit to most recent 10 reviews
}

/**
 * Creates structured data for SEO
 */
export function generateKitchenStructuredData(kitchen, placesData) {
  const mergedData = mergeKitchenWithPlacesData(kitchen, placesData)
  const image = getBestKitchenImage(kitchen, placesData)

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: kitchen.title || kitchen.name,
    description: getBestDescription(kitchen, placesData).text,
    address: {
      '@type': 'PostalAddress',
      streetAddress: kitchen.street,
      addressLocality: kitchen.city,
      addressRegion: kitchen.state || kitchen.us_state,
      postalCode: kitchen.postal_code?.toString(),
      addressCountry: kitchen.country_code || 'US',
    },
    geo:
      kitchen.latitude && kitchen.longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: kitchen.latitude,
            longitude: kitchen.longitude,
          }
        : undefined,
    telephone: mergedData.enhancedPhone,
    url: mergedData.enhancedWebsite,
    image: image.url,
    aggregateRating: mergedData.enhancedRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: mergedData.enhancedRating,
          ratingCount: mergedData.enhancedReviewCount || 1,
        }
      : undefined,
    openingHours:
      formatBusinessHours(kitchen, placesData)?.map((h) => h.display) ||
      undefined,
  }
}
