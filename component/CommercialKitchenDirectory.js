'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { slugify } from '@/lib/slugify'
import {
  MapPin,
  Star,
  Shield,
  ExternalLink,
  Heart,
  Share2,
  Phone,
  ArrowRight,
  Filter,
} from 'lucide-react'
import AffiliateLinks from './AffiliateLinks'
import BreadCrumbs from '@/component/BreadCrumbs'
import AdSenseAd from '@/component/AdSenseAd'
import OptimizedImage from '@/component/OptimizedImage'

const CommercialKitchenDirectory = ({
  city = '',
  state = '',
  kitchens = [],
  relatedCities = [],
}) => {
  const [showSidebar, setShowSidebar] = useState(true)

  const displayKitchens =
    kitchens.length > 0
      ? kitchens.map((kitchen, index) => ({
          id: kitchen.placeId || index,
          name: kitchen.name || kitchen.title,
          title: kitchen.title || kitchen.name,
          image:
            kitchen.imageUrl ||
            kitchen.photo ||
            '/images/commercial-kitchen-for-rent.jpg',
          rating: kitchen.totalScore || kitchen.rating || 0,
          reviews: kitchen.reviewsCount || kitchen.reviews || 0,
          tags: kitchen.tags || [],
          price: kitchen.price || null,
          verified: kitchen.totalScore > 4.0,
          description:
            kitchen.description ||
            'Commercial kitchen space available for rent.',
          availability: kitchen.hours || 'Contact for hours',
          phone: kitchen.phone,
          website: kitchen.website || kitchen.site,
          address: kitchen.street,
          neighborhood: kitchen.neighborhood,
          city: kitchen.city,
          state: kitchen.state,
        }))
      : []

  return (
    <div style={{ background: 'var(--cream)' }}>
      <BreadCrumbs city={city} state={state} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <p
              className="text-sm font-medium tracking-widest uppercase mb-2"
              style={{ color: 'var(--terracotta)', letterSpacing: '0.12em' }}
            >
              {displayKitchens.length} verified kitchens
            </p>
            <h1
              className="font-editorial text-3xl lg:text-4xl"
              style={{ color: 'var(--espresso)' }}
            >
              Commercial Kitchen for Rent in {city}
            </h1>
          </div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
            style={{
              background: 'var(--light-warm)',
              color: 'var(--warm-brown)',
              border: '1px solid var(--border-warm)',
            }}
          >
            <Filter className="w-4 h-4" />
            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {showSidebar && (
            <div className="lg:col-span-1 space-y-6">
              {/* Related Cities */}
              {relatedCities && relatedCities.length > 0 && (
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'var(--light-warm)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  <h3
                    className="font-editorial text-lg mb-4"
                    style={{ color: 'var(--espresso)' }}
                  >
                    More kitchens in {state}
                  </h3>
                  <div className="space-y-1">
                    {relatedCities.slice(0, 6).map((relatedCity, index) => (
                      <Link
                        key={index}
                        href={relatedCity.url}
                        className="flex items-center justify-between py-2.5 px-3 rounded-lg group transition-colors"
                        style={{ color: 'var(--warm-brown)' }}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin
                            className="w-3.5 h-3.5"
                            style={{ color: 'var(--amber)' }}
                          />
                          <span className="text-sm font-medium">
                            {relatedCity.name}
                          </span>
                        </div>
                        <ArrowRight
                          className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--terracotta)' }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: 'var(--light-warm)',
                  border: '1px solid var(--border-warm)',
                }}
              >
                <h3
                  className="text-sm font-medium tracking-widest uppercase mb-4"
                  style={{
                    color: 'var(--amber)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Resources
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      href: '/resources/nutrition-label-maker',
                      label: 'Nutrition Label Maker',
                    },
                    {
                      href: '/resources/recipe-cost-tracker',
                      label: 'Recipe Cost Tracker',
                    },
                    {
                      href: '/resources/food-expiration-date-checker',
                      label: 'Food Expiration Checker',
                    },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm group transition-colors"
                      style={{ color: 'var(--warm-brown)' }}
                    >
                      <span>{link.label}</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--terracotta)' }}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <AffiliateLinks
                categories={[
                  'certifications',
                  'business-formation',
                  'insurance',
                ]}
                title="Start Your Food Business"
                columns={1}
              />
            </div>
          )}

          {/* Kitchen Listings */}
          <div className={showSidebar ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayKitchens.map((kitchen) => (
                <div
                  key={kitchen.id}
                  className="rounded-2xl overflow-hidden group hover-lift"
                  style={{
                    background: 'var(--light-warm)',
                    border: '1px solid var(--border-warm)',
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={kitchen.image}
                      alt={kitchen.name || kitchen.title || 'Kitchen image'}
                      width={400}
                      height={240}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                      fallbackSrc="/images/commercial-kitchen-for-rent.jpg"
                    />
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <button
                        className="p-2 rounded-full backdrop-blur-sm transition-colors"
                        style={{
                          background: 'rgba(250,246,240,0.85)',
                        }}
                      >
                        <Heart
                          className="w-4 h-4"
                          style={{ color: 'var(--warm-gray)' }}
                        />
                      </button>
                      <button
                        className="p-2 rounded-full backdrop-blur-sm transition-colors"
                        style={{
                          background: 'rgba(250,246,240,0.85)',
                        }}
                      >
                        <Share2
                          className="w-4 h-4"
                          style={{ color: 'var(--warm-gray)' }}
                        />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                        style={{
                          background: 'rgba(122, 139, 111, 0.9)',
                          color: 'var(--cream)',
                        }}
                      >
                        {kitchen.availability}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="font-semibold text-lg leading-tight"
                        style={{ color: 'var(--espresso)' }}
                      >
                        {kitchen.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      {kitchen.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star
                            className="w-4 h-4 fill-current"
                            style={{ color: 'var(--amber)' }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--espresso)' }}
                          >
                            {kitchen.rating}
                          </span>
                          {kitchen.reviews > 0 && (
                            <span
                              className="text-sm"
                              style={{ color: 'var(--warm-gray)' }}
                            >
                              ({kitchen.reviews})
                            </span>
                          )}
                        </div>
                      )}
                      {kitchen.verified && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: 'rgba(122, 139, 111, 0.12)',
                            color: 'var(--sage)',
                          }}
                        >
                          <Shield className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    <p
                      className="text-sm mb-3 leading-relaxed line-clamp-2"
                      style={{ color: 'var(--warm-gray)' }}
                    >
                      {kitchen.description}
                    </p>

                    {kitchen.address && (
                      <div
                        className="flex items-center gap-1.5 text-sm mb-4"
                        style={{ color: 'var(--warm-gray)' }}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">
                          {kitchen.address}
                          {kitchen.city ? `, ${kitchen.city}` : ''}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link
                        href={`/commercial-kitchen-for-rent/${slugify(city)}/${slugify(state)}/kitchen/${slugify(kitchen.title || kitchen.name)}`}
                        className="flex-1 px-4 py-2.5 rounded-full text-sm font-medium text-center transition-all hover:scale-[1.02]"
                        style={{
                          background: 'var(--espresso)',
                          color: 'var(--cream)',
                        }}
                      >
                        View Details
                      </Link>
                      {kitchen.phone && (
                        <a
                          href={`tel:${kitchen.phone}`}
                          className="px-3 py-2.5 rounded-full transition-colors"
                          style={{
                            border: '1px solid var(--border-warm)',
                            color: 'var(--warm-brown)',
                          }}
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
                      {kitchen.website && (
                        <a
                          href={kitchen.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2.5 rounded-full transition-colors"
                          style={{
                            border: '1px solid var(--border-warm)',
                            color: 'var(--warm-brown)',
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
                Showing {displayKitchens.length} kitchens in {city}
              </p>
            </div>

            <div className="my-8">
              <AdSenseAd />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommercialKitchenDirectory
