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
    'Find shared-use, commissary, and ghost kitchens in Denver, CO. Compare pricing, amenities, and more.',
  alternates: {
    canonical: 'https://sharedcommercialkitchenlocator.com',
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
