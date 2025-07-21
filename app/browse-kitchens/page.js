import BrowseKitchensByLocation from '@/component/BrowseKitchens'
import NutritionLabelMaker from '@/component/NutritionLabelMaker'

export const metadata = {
  title:
    'Commercial Kitchen Spaces for Rent by Location - Find Kitchens Near You',
  description:
    'Search commercial kitchen spaces by city and state. Discover commissary kitchens, shared commercial facilities, and ghost kitchens in major US cities.',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/browse-kitchens',
  },

  openGraph: {
    title:
      'Commercial Kitchen Spaces for Rent by Location - Find Kitchens Near You',
    description:
      'Search commercial kitchen spaces by city and state. Discover commissary kitchens, shared commercial facilities, and ghost kitchens in major US cities.',
  },
}

export default function Page() {
  return <BrowseKitchensByLocation />
}
