import Link from 'next/link'

export const metadata = {
  title: 'Commercial Kitchen Blog — Guides for Food Entrepreneurs',
  description:
    'Guides, tips, and resources for renting commercial kitchens, starting food businesses, and navigating food licensing requirements.',
  alternates: { canonical: 'https://sharedkitchenlocator.com/blog' },
  openGraph: {
    title: 'Commercial Kitchen Blog — Guides for Food Entrepreneurs',
    description: 'Guides, tips, and resources for renting commercial kitchens, starting food businesses, and navigating food licensing requirements.',
    images: [{ url: 'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Kitchen Blog — Guides for Food Entrepreneurs',
    description: 'Guides, tips, and resources for renting commercial kitchens, starting food businesses, and navigating food licensing requirements.',
    images: ['https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg'],
  },
}

const posts = [
  {
    slug: 'how-much-to-rent-a-commercial-kitchen',
    title: 'How Much Does It Cost to Rent a Commercial Kitchen?',
    excerpt:
      'A complete pricing guide covering hourly, daily, and monthly rates for commercial kitchen rentals across the US.',
  },
  {
    slug: 'commissary-kitchen-requirements',
    title: 'Commissary Kitchen Requirements: What You Need to Know',
    excerpt:
      'Everything you need to know about health permits, food handler certifications, and compliance requirements for using a commissary kitchen.',
  },
  {
    slug: 'ghost-kitchen-guide',
    title: 'How to Start a Ghost Kitchen: Complete Guide',
    excerpt:
      'Step-by-step guide to launching a delivery-only restaurant from a shared commercial kitchen.',
  },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Commercial Kitchen Blog</h1>
        <p className="text-xl text-gray-600 mb-12">Guides and resources for food entrepreneurs</p>
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
              <span className="text-blue-600 font-medium mt-4 inline-block">Read More &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
