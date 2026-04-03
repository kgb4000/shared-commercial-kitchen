import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import Script from 'next/script'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Find Shared Commercial Kitchens Near You | Shared Kitchen Locator',
  description:
    'Find shared-use, commissary, and ghost kitchens for rent across 43 US cities. Compare pricing, amenities, and book commercial kitchen space.',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com',
  },
  other: {
    'google-adsense-account': 'ca-pub-2967132781692430',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        data-new-gr-c-s-check-loaded="14.1243.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
      >
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2967132781692430"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Shared Kitchen Locator",
                "url": "https://sharedkitchenlocator.com",
                "description": "Shared Kitchen Locator is a free directory of 380+ verified commercial kitchens for rent across 43 US cities. We help food entrepreneurs find shared-use, commissary, and ghost kitchen spaces.",
                "foundingDate": "2025",
                "areaServed": {
                  "@type": "Country",
                  "name": "United States"
                },
                "knowsAbout": [
                  "Commercial kitchen rentals",
                  "Commissary kitchens",
                  "Shared-use kitchens",
                  "Ghost kitchens",
                  "Food business resources"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Shared Kitchen Locator",
                "url": "https://sharedkitchenlocator.com",
                "description": "Find commercial kitchens for rent across 43 US cities",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://sharedkitchenlocator.com/browse-kitchens?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              }
            ])
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
