'use client'

import { useState } from 'react'

export default function LeadCaptureForm({ kitchenName, kitchenUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in renting ${kitchenName}. Please send me pricing and availability.`,
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          kitchenName,
          kitchenUrl,
        }),
      })

      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 rounded-2xl" style={{ background: 'var(--light-warm)', border: '1px solid var(--border-warm)' }}>
        <div className="text-center">
          <div className="text-3xl mb-2" style={{ color: 'var(--sage)' }}>&#10003;</div>
          <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--espresso)' }}>
            Thanks for your inquiry!
          </h3>
          <p className="text-sm" style={{ color: 'var(--warm-gray)' }}>
            We&apos;ll be in touch within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-2xl" style={{ background: 'var(--light-warm)', border: '1px solid var(--border-warm)' }}>
      <h3 className="font-editorial text-xl mb-1" style={{ color: 'var(--espresso)' }}>Request Pricing</h3>
      <p className="text-sm mb-4" style={{ color: 'var(--warm-gray)' }}>
        Get pricing and availability for {kitchenName}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium mb-1" style={{ color: 'var(--warm-brown)' }}>
            Name *
          </label>
          <input
            type="text"
            id="lead-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2"
            style={{ background: 'var(--cream)', border: '1px solid var(--border-warm)', color: 'var(--espresso)', focusRingColor: 'var(--amber)' }}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium mb-1" style={{ color: 'var(--warm-brown)' }}>
            Email *
          </label>
          <input
            type="email"
            id="lead-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2"
            style={{ background: 'var(--cream)', border: '1px solid var(--border-warm)', color: 'var(--espresso)' }}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium mb-1" style={{ color: 'var(--warm-brown)' }}>
            Phone (optional)
          </label>
          <input
            type="tel"
            id="lead-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2"
            style={{ background: 'var(--cream)', border: '1px solid var(--border-warm)', color: 'var(--espresso)' }}
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="lead-message" className="block text-sm font-medium mb-1" style={{ color: 'var(--warm-brown)' }}>
            Message *
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2"
            style={{ background: 'var(--cream)', border: '1px solid var(--border-warm)', color: 'var(--espresso)' }}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 rounded-full font-medium transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'var(--espresso)', color: 'var(--cream)' }}
        >
          {status === 'submitting' ? 'Sending...' : 'Request Pricing'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-center" style={{ color: 'var(--terracotta)' }}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  )
}
