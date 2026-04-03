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
      <div className="rounded-2xl p-4 my-6" style={{ background: 'var(--light-warm)', border: '1px solid var(--border-warm)' }}>
        <h3 className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--amber)', letterSpacing: '0.1em' }}>{title}</h3>
        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={`${link.url}?utm_source=sharedkitchenlocator&utm_medium=affiliate&utm_campaign=${link.category}`}
              target="_blank"
              rel="noopener sponsored"
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-shadow hover:shadow-sm"
              style={{ background: 'var(--cream)', border: '1px solid var(--border-warm)', color: 'var(--warm-brown)' }}
            >
              <span className="font-medium">{link.name}</span>
              <span style={{ color: 'var(--terracotta)' }} className="ml-2 shrink-0">&rarr;</span>
            </a>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--warm-gray)' }}>
          Some links are affiliate links. We may earn a commission at no extra
          cost to you.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 my-8" style={{ background: 'var(--light-warm)', border: '1px solid var(--border-warm)' }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--espresso)' }}>{title}</h3>
      <div className={`grid ${gridCols} gap-4`}>
        {links.map((link) => (
          <a
            key={link.name}
            href={`${link.url}?utm_source=sharedkitchenlocator&utm_medium=affiliate&utm_campaign=${link.category}`}
            target="_blank"
            rel="noopener sponsored"
            className="rounded-xl p-4 hover:shadow-md transition-shadow block"
            style={{ background: 'var(--cream)', border: '1px solid var(--border-warm)' }}
          >
            <h4 className="font-medium mb-1" style={{ color: 'var(--espresso)' }}>{link.name}</h4>
            <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>{link.description}</p>
            <span className="text-sm font-medium mt-2 inline-block" style={{ color: 'var(--terracotta)' }}>
              Learn More &rarr;
            </span>
          </a>
        ))}
      </div>
      <p className="text-xs mt-4" style={{ color: 'var(--warm-gray)' }}>
        Some links are affiliate links. We may earn a commission at no extra
        cost to you.
      </p>
    </div>
  )
}
