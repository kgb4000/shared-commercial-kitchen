export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const state = searchParams.get('state')

  const url = new URL('https://www.eventbriteapi.com/v3/events/search/')
  url.searchParams.set('token', process.env.EVENTBRITE_API_KEY)
  url.searchParams.set('location.address', `${city}, ${state}`)
  url.searchParams.set('location.within', '25mi')
  url.searchParams.set('expand', 'venue')
  url.searchParams.set('sort_by', 'date')
  url.searchParams.set('categories', '110') // Food & Drink

  try {
    const res = await fetch(url.toString())
    const data = await res.json()

    // Log full response
    console.log('📦 Raw Eventbrite response:', data)

    if (!Array.isArray(data.events)) {
      console.error('❌ Event data not found or malformed.')
      return new Response(JSON.stringify([]), { status: 200 })
    }

    console.log('🎟 Events fetched:', data.events.length)
    return new Response(JSON.stringify(data.events), { status: 200 })
  } catch (err) {
    console.error('❌ Eventbrite fetch failed:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    })
  }
}
