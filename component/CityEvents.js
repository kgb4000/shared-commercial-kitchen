'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_TOKEN = process.env.NEXT_PUBLIC_EVENTBRITE_TOKEN

const CityEvents = ({ city, state }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`/api/events?city=${city}&state=${state}`)
      const events = await res.json()
      setEvents(events)
    }

    fetchEvents()
  }, [city, state])

  if (loading) return <p>Loading events...</p>
  if (events.length === 0) return <p>No upcoming events found.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {events.slice(0, 6).map((event) => (
        <div
          key={event.id}
          className="bg-white p-6 rounded-xl shadow-sm border"
        >
          <h3 className="text-lg font-bold mb-2">{event.name.text}</h3>
          <p className="text-sm text-gray-600 mb-1">
            {new Date(event.start.local).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {event.venue?.address?.localized_address_display}
          </p>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View on Eventbrite →
          </a>
        </div>
      ))}
    </div>
  )
}

export default CityEvents
