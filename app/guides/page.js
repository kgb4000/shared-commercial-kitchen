import Link from 'next/link'
import guides from '@/food-licensing-guides/los-angeles'

export const metadata = {
  title: 'Food Business Licensing Guide',
  description:
    'Step-by-step guides for food businesses operating from shared-use commercial kitchens across different states.',
}

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Food Business Licensing Guide
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Step-by-step guides for food businesses operating from shared-use
          commercial kitchens across different states.
        </p>

        <ul className="grid gap-6 md:grid-cols-2">
          {Object.entries(guides).map(([guide]) => (
            <li key={guide}>
              <Link href={`/guides/${guide}`}>
                <div className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                  <h2 className="text-xl font-semibold text-blue-700 mb-1">
                    {guide.title}
                  </h2>
                  <p className="text-gray-600">{guide.subtitle}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
