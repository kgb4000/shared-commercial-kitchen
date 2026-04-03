import BrowseKitchens from '@/component/BrowseKitchens'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Browse Commercial Kitchens by City — 43 Cities, 380+ Kitchens',
  description:
    'Browse commercial kitchen spaces by city and state. Find commissary kitchens, shared commercial kitchens, and ghost kitchens across 43 US cities.',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/browse-kitchens',
  },
  openGraph: {
    title: 'Browse Commercial Kitchens by City',
    description:
      'Find commercial kitchen rentals across 43 US cities. 380+ verified listings.',
  },
}

function getCityData() {
  const dataDir = path.join(process.cwd(), 'data')
  return fs
    .readdirSync(dataDir)
    .filter((d) => {
      const fullPath = path.join(dataDir, d)
      return (
        fs.statSync(fullPath).isDirectory() &&
        fs.existsSync(path.join(fullPath, 'data.json'))
      )
    })
    .map((d) => {
      const data = JSON.parse(
        fs.readFileSync(path.join(dataDir, d, 'data.json'), 'utf-8')
      )
      return {
        slug: d,
        city: data.city || d.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        state: (data.state || '').toUpperCase(),
        count: (data.kitchens || []).length,
      }
    })
    .filter((c) => c.state)
    .sort((a, b) => b.count - a.count)
}

export default function Page() {
  const cities = getCityData()
  return <BrowseKitchens cities={cities} />
}
