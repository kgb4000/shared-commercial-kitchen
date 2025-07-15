// app/sitemap.xml/route.js
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  const baseUrl = 'https://sharedkitchenlocator.com' // Replace with your actual domain
  const dataDir = path.join(process.cwd(), 'data')

  let urls = []

  try {
    const cityFolders = await fs.readdir(dataDir)

    for (const cityFolder of cityFolders) {
      try {
        const filePath = path.join(dataDir, cityFolder, 'data.json')
        const file = await fs.readFile(filePath, 'utf-8')
        const data = JSON.parse(file)

        const city = data.city || cityFolder
        const state = data.state || 'unknown'

        const citySlug = city.toLowerCase().replace(/\s+/g, '-')
        const stateSlug = state.toLowerCase()

        urls.push(
          `<url>
            <loc>${baseUrl}/commercial-kitchen-for-rent/${citySlug}/${stateSlug}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
          </url>`
        )
      } catch (error) {
        console.warn(`⚠️ Skipping ${cityFolder}: ${error.message}`)
      }
    }
  } catch (err) {
    console.error('❌ Failed to read data directory:', err.message)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join('\n')}
  </urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
