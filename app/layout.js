import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}
