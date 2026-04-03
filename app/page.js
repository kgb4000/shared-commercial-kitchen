import HomePage from '@/component/HomePage'

export const metadata = {
  title: 'Commercial Kitchen for Rent — Find Shared Kitchens in 43 Cities | Shared Kitchen Locator',
  description:
    'Find commercial kitchens for rent, commissary kitchens, and shared-use kitchen spaces across 43 US cities. 380+ verified listings with hourly, daily, and monthly rates.',
  keywords: 'commercial kitchen for rent, shared kitchen near me, commissary kitchen near me, commercial kitchen rental near me, kitchen rentals, shared use commercial kitchen',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com',
  },
  openGraph: {
    title: 'Commercial Kitchen for Rent — 43 Cities, 380+ Kitchens',
    description:
      'Find shared-use, commissary, and ghost kitchens for rent across 43 US cities.',
    type: 'website',
  },
}

export default function Page() {
  return <HomePage />
}
