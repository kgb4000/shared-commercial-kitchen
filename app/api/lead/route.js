import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, kitchenName, kitchenUrl } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Shared Kitchen Locator <onboarding@resend.dev>',
      to: process.env.LEAD_EMAIL_TO,
      subject: `New Lead — ${kitchenName || 'Unknown Kitchen'}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        '',
        'Message:',
        message,
        '',
        `Kitchen: ${kitchenName || 'N/A'}`,
        `Page: ${kitchenUrl || 'N/A'}`,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
