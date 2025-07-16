import guides from '@/food-licensing-guides'
import GuideRenderer from '@/component/GuideRenderer'

export async function generateStaticParams() {
  return Object.keys(guides).map((state) => ({ state }))
}

export async function generateMetadata({ params }) {
  const guide = guides[params.state]

  if (!guide) {
    return {
      title: 'Guide Not Found',
      description: 'This guide could not be found.',
    }
  }

  const stateName = guide.title.split(' in ')[1] || params.state

  return {
    title: `${guide.title} | Shared-Use Commercial Kitchens`,
    description: `Step-by-step licensing instructions for food businesses using shared-use kitchens in ${stateName}.`,
  }
}

export default function GuidePage({ params }) {
  const guide = guides[params.state]

  if (!guide) return <div className="p-4">Guide not found</div>

  return (
    <main className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <GuideRenderer guide={guide} />
      </div>
    </main>
  )
}
