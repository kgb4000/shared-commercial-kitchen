import NutritionLabelMaker from '@/component/NutritionLabelMaker'

export const metadata = {
  title: 'Nutrition Label Maker | English & Spanish | FDA Compliant',
  description:
    'Generate FDA-compliant nutrition labels for free. Save $300-800 per product with our instant nutrition facts label maker. English & Spanish supported.',
  alternates: {
    canonical:
      'https://sharedkitchenlocator.com/resources/nutrition-label-maker',
  },

  openGraph: {
    title: 'Free FDA Nutrition Label Generator',
    description:
      'Generate FDA-compliant nutrition labels for free. Save $300-800 per product.',
    type: 'website',
  },
}

export default function Page() {
  return <NutritionLabelMaker />
}
