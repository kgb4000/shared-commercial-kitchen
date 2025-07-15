export async function fetchEventsFromEventbrite(city, state) {
  const res = await fetch(
    `https://www.eventbriteapi.com/v3/events/search/?location.address=${city},${state}&location.within=25mi&expand=venue&categories=110&sort_by=date`,
    {
      headers: {
        Authorization: `Bearer ${process.env.EVENTBRITE_API_KEY}`,
      },
    }
  )

  if (!res.ok) {
    console.error(`[Eventbrite] Error: ${res.status}`)
    return []
  }

  const data = await res.json()
  return data.events || []
}
