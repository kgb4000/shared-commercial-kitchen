import { getAffiliateLinks } from '@/data/affiliateLinks'

export default function AffiliateLinks({
  categories,
  title = 'Recommended Resources',
  columns = 3,
}) {
  const links = getAffiliateLinks(categories)

  if (links.length === 0) return null

  const gridCols =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  if (columns === 1) {
    return (
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 my-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={`${link.url}?utm_source=sharedkitchenlocator&utm_medium=affiliate&utm_campaign=${link.category}`}
              target="_blank"
              rel="noopener sponsored"
              className="flex items-center justify-between bg-white rounded-md px-3 py-2 border border-amber-200 hover:shadow-sm transition-shadow block text-sm"
            >
              <span className="font-medium text-gray-900">{link.name}</span>
              <span className="text-blue-600 ml-2 shrink-0">&rarr;</span>
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Some links are affiliate links. We may earn a commission at no extra
          cost to you.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className={`grid ${gridCols} gap-4`}>
        {links.map((link) => (
          <a
            key={link.name}
            href={`${link.url}?utm_source=sharedkitchenlocator&utm_medium=affiliate&utm_campaign=${link.category}`}
            target="_blank"
            rel="noopener sponsored"
            className="bg-white rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow block"
          >
            <h4 className="font-medium text-gray-900 mb-1">{link.name}</h4>
            <p className="text-sm text-gray-600">{link.description}</p>
            <span className="text-sm text-blue-600 font-medium mt-2 inline-block">
              Learn More &rarr;
            </span>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Some links are affiliate links. We may earn a commission at no extra
        cost to you.
      </p>
    </div>
  )
}
