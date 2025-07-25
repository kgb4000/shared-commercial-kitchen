'use client'

import { MapPin, ExternalLink, Navigation, Maximize2 } from 'lucide-react'

// Simple Kitchen Map Component (No Google Maps API required)
function SimpleKitchenMap({ kitchen, placeDetails }) {
  // Get coordinates from kitchen data or place details
  const coordinates = {
    lat: kitchen.location?.lat || placeDetails?.location?.latitude || 0,
    lng: kitchen.location?.lng || placeDetails?.location?.longitude || 0,
  }

  const kitchenName = kitchen.title || kitchen.name || 'Kitchen Location'
  const address = kitchen.address || placeDetails?.formattedAddress || ''
  const placeId = kitchen.placeId || kitchen.place_id || ''

  // Fallback for when coordinates are not available
  if (!coordinates.lat || !coordinates.lng) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
          Location & Map
        </h2>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Location Not Available
          </h3>
          <p className="text-gray-600 mb-4">
            We don't have precise coordinates for this kitchen location.
          </p>
          {address && (
            <div className="space-y-3">
              <p className="text-gray-700 font-medium">{address}</p>
              <div className="flex justify-center gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Search on Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Generate static map URL (Google Static Maps API - no JavaScript required)
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=15&size=800x400&maptype=roadmap&markers=color:blue%7Clabel:K%7C${coordinates.lat},${coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

  // Street View URL
  const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=800x400&location=${coordinates.lat},${coordinates.lng}&heading=151.78&pitch=-0.76&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
        Location & Map
      </h2>

      {/* Address and Quick Actions */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2">
              <MapPin className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <span className="font-medium text-gray-900">Address</span>
            </div>
            <p className="text-gray-700 ml-7 break-words">{address}</p>
            {coordinates.lat && coordinates.lng && (
              <p className="text-gray-500 text-sm ml-7 mt-1">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Navigation className="w-4 h-4 mr-1" />
              Directions
            </a>
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Static Map */}
        <div className="relative">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Location Map
          </h3>
          <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <>
                <iframe className="w-full h-64">
                  src={staticMapUrl}
                  alt={`Map showing ${kitchenName} location`}
                  className="w-full h-64 object-cover" onError=
                  {(e) => {
                    // Fallback to OpenStreetMap if Google Static Maps fails
                    e.target.src = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-restaurant+285A98(${coordinates.lng},${coordinates.lat})/${coordinates.lng},${coordinates.lat},15/800x400?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`
                  }}
                </iframe>
                <div className="absolute top-2 right-2">
                  <a
                    href={`https://www.google.com/maps/@${coordinates.lat},${coordinates.lng},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-90 p-2 rounded-lg hover:bg-opacity-100 transition-all shadow-md"
                    title="View larger map"
                  >
                    <Maximize2 className="w-4 h-4 text-gray-600" />
                  </a>
                </div>
              </>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">Map requires API key</p>
                  <a
                    href={`https://www.google.com/maps/@${coordinates.lat},${coordinates.lng},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Street View */}
        <div className="relative">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-green-600" />
            Street View
          </h3>
          <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <>
                <img
                  src={streetViewUrl}
                  alt={`Street view of ${kitchenName}`}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    // Fallback if Street View fails
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <div class="text-center text-gray-500">
                          <div class="text-4xl mb-2">🏢</div>
                          <p class="text-sm">Street View not available</p>
                        </div>
                      </div>
                    `
                  }}
                />
                <div className="absolute top-2 right-2">
                  <a
                    href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coordinates.lat},${coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-90 p-2 rounded-lg hover:bg-opacity-100 transition-all shadow-md"
                    title="View in Street View"
                  >
                    <Maximize2 className="w-4 h-4 text-gray-600" />
                  </a>
                </div>
              </>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🏢</div>
                  <p className="text-sm">Street View requires API key</p>
                  <a
                    href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coordinates.lat},${coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Street View
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <Navigation className="w-4 h-4 mr-2 text-blue-600" />
          Get Directions
        </a>
        <a
          href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <MapPin className="w-4 h-4 mr-2 text-green-600" />
          View on Google Maps
        </a>
        <a
          href={`https://www.google.com/maps/search/parking+near+${coordinates.lat},${coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <ExternalLink className="w-4 h-4 mr-2 text-purple-600" />
          Find Parking
        </a>
      </div>

      {/* Map Info */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Click images to view larger maps • All links open in new window</p>
      </div>
    </div>
  )
}

export default SimpleKitchenMap
