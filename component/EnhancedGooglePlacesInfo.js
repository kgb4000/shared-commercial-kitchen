import { useState, useEffect } from 'react'

export default function GooglePlaceInfo({ placeId }) {
  const [place, setPlace] = useState(null)

  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch('/api/google-place-details', {
        method: 'POST',
        body: JSON.stringify({ placeId }),
      })
      const data = await res.json()
      if (data.success) setPlace(data.place)
    }
    if (placeId) fetchDetails()
  }, [placeId])

  if (!place) return null

  return (
    <div className="mt-6 border-t pt-6">
      {/* ✅ Reviews */}
      {place.reviews?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <ul className="space-y-4">
            {place.reviews.map((review, idx) => (
              <li key={idx} className="border p-4 rounded">
                <p className="font-medium">
                  {review.authorAttribution.displayName}
                </p>
                <p className="text-sm text-gray-600">{review.rating} ★</p>
                <p className="text-gray-700 mt-1">{review.text.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Photos */}
      {place.photos?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {place.photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo.urlSmall}
                alt={`Kitchen photo ${idx + 1}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ImageGallery({ photos, kitchenName }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-8">
        <div className="text-center text-gray-500">
          <span className="text-4xl mb-2 block">🏢</span>
          <p>No photos available</p>
        </div>
      </div>
    )
  }

  const mainPhoto = photos[0]
  const additionalPhotos = photos.slice(1, 4)

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Kitchen Photos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main large photo */}
        <div className="lg:col-span-2 lg:row-span-2">
          <a
            href={mainPhoto.urlLarge || mainPhoto.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-64 lg:h-full"
          >
            <img
              src={mainPhoto.url}
              alt={`${kitchenName} - Main view`}
              className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
              loading="lazy"
            />
          </a>
        </div>

        {/* Additional smaller photos */}
        {additionalPhotos.map((photo, index) => (
          <div key={index} className="lg:col-span-1">
            <a
              href={photo.urlLarge || photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-32"
            >
              <img
                src={photo.url}
                alt={`${kitchenName} - View ${index + 2}`}
                className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                loading="lazy"
              />
            </a>
          </div>
        ))}

        {/* Show more photos indicator */}
        {photos.length > 4 && (
          <div className="lg:col-span-1 h-32 bg-gray-800 bg-opacity-75 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <span className="text-2xl block">📷</span>
              <span className="text-sm">{photos.length - 4} more photos</span>
            </div>
          </div>
        )}
      </div>

      {/* View all photos link */}
      {photos.length > 1 && (
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Click any photo to view full size • {photos.length} total photos
            available
          </p>
        </div>
      )}
    </div>
  )
}
