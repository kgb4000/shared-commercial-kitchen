// app/sitemap.xml/route.js
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  const baseUrl = 'https://sharedkitchenlocator.com'
  const dataDir = path.join(process.cwd(), 'data')

  let urls = []

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/browse-kitchens', priority: '0.9', changefreq: 'daily' },
    { url: '/commercial-kitchen-for-rent', priority: '0.9', changefreq: 'weekly' },
    { url: '/resources', priority: '0.8', changefreq: 'weekly' },
    { url: '/resources/nutrition-label-maker', priority: '0.8', changefreq: 'monthly' },
    { url: '/resources/recipe-cost-tracker', priority: '0.7', changefreq: 'monthly' },
    { url: '/resources/food-expiration-date-checker', priority: '0.7', changefreq: 'monthly' },
    { url: '/resources/food-expiration-database', priority: '0.6', changefreq: 'monthly' },
    { url: '/cocinas-comerciales', priority: '0.6', changefreq: 'weekly' },
    { url: '/food-licensing-guides', priority: '0.7', changefreq: 'weekly' },
  ]

  // Auto-discover blog posts from app/blog/ directory
  const blogDir = path.join(process.cwd(), 'app', 'blog')
  try {
    const blogEntries = await fs.readdir(blogDir, { withFileTypes: true })
    staticPages.push({ url: '/blog', priority: '0.7', changefreq: 'weekly' })
    for (const entry of blogEntries) {
      if (entry.isDirectory() && !entry.name.startsWith('[') && !entry.name.startsWith('.')) {
        staticPages.push({ url: `/blog/${entry.name}`, priority: '0.7', changefreq: 'monthly' })
      }
    }
  } catch {
    staticPages.push({ url: '/blog', priority: '0.7', changefreq: 'weekly' })
  }

  const todayDate = new Date().toISOString().split('T')[0]

  staticPages.forEach(page => {
    urls.push(
      `<url>
        <loc>${baseUrl}${page.url}</loc>
        <lastmod>${todayDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`
    )
  })

  try {
    const cityFolders = await fs.readdir(dataDir)

    // State codes for licensing guides
    const stateCodesSet = new Set()
    // Track most recent scrapedAt per city
    const cityLastModMap = new Map()

    for (const cityFolder of cityFolders) {
      try {
        const filePath = path.join(dataDir, cityFolder, 'data.json')
        const file = await fs.readFile(filePath, 'utf-8')
        const data = JSON.parse(file)

        const city = data.city || cityFolder
        const state = data.state || 'unknown'

        // Normalize state to 2-letter code
        let stateCode = state.toLowerCase()
        if (state.length > 2) {
          // Convert full state names to codes
          const stateMap = {
            'california': 'ca', 'texas': 'tx', 'new york': 'ny', 'florida': 'fl',
            'illinois': 'il', 'pennsylvania': 'pa', 'ohio': 'oh', 'georgia': 'ga',
            'north carolina': 'nc', 'michigan': 'mi', 'washington': 'wa', 'arizona': 'az',
            'massachusetts': 'ma', 'colorado': 'co', 'maryland': 'md', 'minnesota': 'mn',
            'wisconsin': 'wi', 'indiana': 'in', 'new jersey': 'nj', 'virginia': 'va',
            'district of columbia': 'dc', 'kansas': 'ks', 'connecticut': 'ct'
          }
          stateCode = stateMap[state.toLowerCase()] || state.toLowerCase()
        }

        const citySlug = cityFolder // Use folder name as slug

        stateCodesSet.add(stateCode)

        // Find most recent scrapedAt for this city
        let cityMostRecentDate = todayDate
        if (data.kitchens && Array.isArray(data.kitchens)) {
          for (const kitchen of data.kitchens) {
            if (kitchen.scrapedAt) {
              const scrapedDate = new Date(kitchen.scrapedAt).toISOString().split('T')[0]
              if (scrapedDate > cityMostRecentDate) {
                cityMostRecentDate = scrapedDate
              }
            }
          }
        }
        cityLastModMap.set(`${citySlug}/${stateCode}`, cityMostRecentDate)

        // City pages
        urls.push(
          `<url>
            <loc>${baseUrl}/commercial-kitchen-for-rent/${citySlug}/${stateCode}</loc>
            <lastmod>${cityMostRecentDate}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>`
        )

        // Individual kitchen pages
        if (data.kitchens && Array.isArray(data.kitchens)) {
          data.kitchens.forEach(kitchen => {
            if (kitchen.title) {
              const kitchenSlug = kitchen.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()

              const lastmod = kitchen.scrapedAt ? new Date(kitchen.scrapedAt).toISOString().split('T')[0] : todayDate

              urls.push(
                `<url>
                  <loc>${baseUrl}/commercial-kitchen-for-rent/${citySlug}/${stateCode}/kitchen/${kitchenSlug}</loc>
                  <lastmod>${lastmod}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>0.6</priority>
                </url>`
              )
            }
          })
        }
      } catch (error) {
        console.warn(`⚠️ Skipping ${cityFolder}: ${error.message}`)
      }
    }

    // State licensing guide pages
    Array.from(stateCodesSet).forEach(stateCode => {
      urls.push(
        `<url>
          <loc>${baseUrl}/food-licensing-guides/${stateCode}</loc>
          <lastmod>${todayDate}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>`
      )
    })

  } catch (err) {
    console.error('❌ Failed to read data directory:', err.message)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n  ')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
