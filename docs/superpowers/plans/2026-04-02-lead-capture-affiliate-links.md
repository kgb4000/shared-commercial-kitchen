# Lead Capture Forms & Affiliate Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add revenue generation to sharedkitchenlocator.com via lead capture forms (emailed via Resend) and affiliate link sections across the site.

**Architecture:** New `LeadCaptureForm` client component in the kitchen detail sidebar posts to a `/api/lead` route that sends email via Resend. New `AffiliateLinks` component renders categorized affiliate link cards from a centralized data file. Both components are placed across existing pages with zero database changes.

**Tech Stack:** Next.js 15.3 (App Router), React 19, Resend (email), Tailwind CSS

---

## File Structure

| File | Responsibility |
|------|---------------|
| `data/affiliateLinks.js` | Centralized affiliate link data organized by category |
| `component/LeadCaptureForm.js` | Client component — lead capture form with validation and submission |
| `component/AffiliateLinks.js` | Reusable affiliate link grid filtered by category |
| `app/api/lead/route.js` | POST endpoint — validates input, sends email via Resend |
| `component/KitchenDetail.js` | Modified — add LeadCaptureForm to sidebar, AffiliateLinks after description |
| `component/CommercialKitchenDirectory.js` | Modified — add AffiliateLinks to left sidebar |
| `component/CityInsights.js` | Modified — add AffiliateLinks after key benefits |
| `app/resources/nutrition-label-maker/page.js` | Modified — add AffiliateLinks after tool |
| `app/resources/recipe-cost-tracker/page.js` | Modified — add AffiliateLinks after tool |
| `app/resources/food-expiration-date-checker/page.js` | Modified — add AffiliateLinks after tool |

---

### Task 1: Install Resend and Configure Environment

**Files:**
- Modify: `package.json`
- Modify: `.env.local`

- [ ] **Step 1: Install resend**

```bash
cd /Volumes/Elements/code/shared-kitchen-app && npm install resend
```

- [ ] **Step 2: Add environment variables to .env.local**

Add these two lines to the end of `.env.local`:

```
RESEND_API_KEY=re_your_api_key_here
LEAD_EMAIL_TO=your@email.com
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json .env.local
git commit -m "chore: add resend dependency and lead email env vars"
```

---

### Task 2: Create Affiliate Links Data

**Files:**
- Create: `data/affiliateLinks.js`

- [ ] **Step 1: Create the affiliate links data file**

Create `data/affiliateLinks.js`:

```javascript
export const affiliateLinks = {
  certifications: [
    {
      name: 'ServSafe Food Handler',
      description: 'Get certified to handle food safely',
      url: 'https://www.servsafe.com/ServSafe-Food-Handler',
      category: 'certifications',
    },
    {
      name: 'ServSafe Manager',
      description: 'Management-level food safety certification',
      url: 'https://www.servsafe.com/ServSafe-Manager',
      category: 'certifications',
    },
  ],
  'business-formation': [
    {
      name: 'LegalZoom LLC',
      description: 'Form your food business LLC',
      url: 'https://www.legalzoom.com/business/business-formation/llc-overview.html',
      category: 'business-formation',
    },
    {
      name: 'Incfile',
      description: 'Free LLC formation for your food business',
      url: 'https://www.incfile.com/form-an-llc/',
      category: 'business-formation',
    },
  ],
  insurance: [
    {
      name: 'Next Insurance',
      description: 'Affordable business insurance for food entrepreneurs',
      url: 'https://www.nextinsurance.com/',
      category: 'insurance',
    },
    {
      name: 'FLIP Event Insurance',
      description: 'Event and pop-up food insurance',
      url: 'https://www.fliprogram.com/',
      category: 'insurance',
    },
  ],
  equipment: [
    {
      name: 'WebstaurantStore',
      description: 'Commercial kitchen equipment and supplies',
      url: 'https://www.webstaurantstore.com/',
      category: 'equipment',
    },
    {
      name: 'Amazon Commercial Kitchen',
      description: 'Kitchen equipment with fast shipping',
      url: 'https://www.amazon.com/commercial-kitchen-equipment/b?node=12900641',
      category: 'equipment',
    },
  ],
  software: [
    {
      name: 'Square POS',
      description: 'Free point-of-sale for food businesses',
      url: 'https://squareup.com/us/en/point-of-sale/restaurants',
      category: 'software',
    },
    {
      name: 'Toast POS',
      description: 'Restaurant-grade POS system',
      url: 'https://pos.toasttab.com/',
      category: 'software',
    },
    {
      name: 'QuickBooks',
      description: 'Accounting for small food businesses',
      url: 'https://quickbooks.intuit.com/',
      category: 'software',
    },
  ],
  delivery: [
    {
      name: 'DoorDash for Merchants',
      description: 'Reach more customers with delivery',
      url: 'https://get.doordash.com/',
      category: 'delivery',
    },
    {
      name: 'UberEats for Restaurants',
      description: 'Grow your delivery business',
      url: 'https://merchants.ubereats.com/',
      category: 'delivery',
    },
  ],
}

export function getAffiliateLinks(categories) {
  const links = []
  for (const category of categories) {
    if (affiliateLinks[category]) {
      links.push(...affiliateLinks[category])
    }
  }
  return links
}
```

- [ ] **Step 2: Commit**

```bash
git add data/affiliateLinks.js
git commit -m "feat: add centralized affiliate links data"
```

---

### Task 3: Create Lead Capture Form Component

**Files:**
- Create: `component/LeadCaptureForm.js`

- [ ] **Step 1: Create the LeadCaptureForm component**

Create `component/LeadCaptureForm.js`:

```javascript
'use client'

import { useState } from 'react'

export default function LeadCaptureForm({ kitchenName, kitchenUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in renting ${kitchenName}. Please send me pricing and availability.`,
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="text-center">
          <div className="text-3xl mb-2">&#10003;</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Thanks for your inquiry!
          </h3>
          <p className="text-sm text-gray-600">
            We&apos;ll be in touch within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold mb-1">Request Pricing</h3>
      <p className="text-sm text-gray-600 mb-4">
        Get pricing and availability for {kitchenName}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label
            htmlFor="lead-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name *
          </label>
          <input
            type="text"
            id="lead-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="lead-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="lead-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="lead-phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone (optional)
          </label>
          <input
            type="tel"
            id="lead-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label
            htmlFor="lead-message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message *
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Request Pricing'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-red-600 text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  )
}
```

- [ ] **Step 2: Verify the component renders without errors**

```bash
cd /Volumes/Elements/code/shared-kitchen-app && npx next build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add component/LeadCaptureForm.js
git commit -m "feat: add LeadCaptureForm component"
```

---

### Task 4: Create Lead Email API Route

**Files:**
- Create: `app/api/lead/route.js`

- [ ] **Step 1: Create the API route**

Create `app/api/lead/route.js`:

```javascript
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
```

- [ ] **Step 2: Commit**

```bash
git add app/api/lead/route.js
git commit -m "feat: add lead email API route via Resend"
```

---

### Task 5: Create AffiliateLinks Component

**Files:**
- Create: `component/AffiliateLinks.js`

- [ ] **Step 1: Create the AffiliateLinks component**

Create `component/AffiliateLinks.js`:

```javascript
import { getAffiliateLinks } from '@/data/affiliateLinks'

export default function AffiliateLinks({
  categories,
  title = 'Recommended Resources',
  columns = 3,
}) {
  const links = getAffiliateLinks(categories)

  if (links.length === 0) return null

  const gridCols =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

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
```

- [ ] **Step 2: Commit**

```bash
git add component/AffiliateLinks.js
git commit -m "feat: add reusable AffiliateLinks component"
```

---

### Task 6: Add LeadCaptureForm to Kitchen Detail Sidebar

**Files:**
- Modify: `component/KitchenDetail.js` (lines 1711-1720)

- [ ] **Step 1: Add the import at the top of KitchenDetail.js**

Add this import near the top of the file, after the existing imports:

```javascript
import LeadCaptureForm from './LeadCaptureForm'
```

- [ ] **Step 2: Replace the commented-out ContactForm with LeadCaptureForm**

In `component/KitchenDetail.js`, find the right sidebar section (around line 1711-1720):

```javascript
              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Contact Form */}
                {/* <ContactForm
                  kitchen={kitchen}
                  placeDetails={initialGoogleData}
                /> */}
                <div className="my-8">
                  <AdSenseAd />
                </div>
```

Replace with:

```javascript
              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Lead Capture Form */}
                <LeadCaptureForm
                  kitchenName={kitchen.title || kitchen.name || 'this kitchen'}
                  kitchenUrl={typeof window !== 'undefined' ? window.location.href : ''}
                />
                <div className="my-8">
                  <AdSenseAd />
                </div>
```

- [ ] **Step 3: Verify the page renders**

Open `http://localhost:3000/commercial-kitchen-for-rent/chicago/il/kitchen/my-shared-kitchen` and confirm the form appears in the right sidebar above Quick Actions.

- [ ] **Step 4: Commit**

```bash
git add component/KitchenDetail.js
git commit -m "feat: add lead capture form to kitchen detail sidebar"
```

---

### Task 7: Add AffiliateLinks to Kitchen Detail Page

**Files:**
- Modify: `component/KitchenDetail.js` (around line 1393)

- [ ] **Step 1: Add the AffiliateLinks import**

Add this import near the top of `component/KitchenDetail.js`, after the LeadCaptureForm import:

```javascript
import AffiliateLinks from './AffiliateLinks'
```

- [ ] **Step 2: Insert AffiliateLinks between the About section and BusinessInsights**

In `component/KitchenDetail.js`, find the section around line 1392-1397:

```javascript
                  </div>
                </div>
                {/* Nearby Places Section */}
                <BusinessInsights
```

Replace with:

```javascript
                  </div>
                </div>

                {/* Affiliate Links */}
                <AffiliateLinks
                  categories={['certifications', 'insurance', 'equipment']}
                  title="Resources for Kitchen Renters"
                />

                {/* Nearby Places Section */}
                <BusinessInsights
```

- [ ] **Step 3: Verify the page renders**

Open `http://localhost:3000/commercial-kitchen-for-rent/chicago/il/kitchen/my-shared-kitchen` and confirm affiliate links appear below the About section.

- [ ] **Step 4: Commit**

```bash
git add component/KitchenDetail.js
git commit -m "feat: add affiliate links to kitchen detail page"
```

---

### Task 8: Add AffiliateLinks to City Listing Sidebar

**Files:**
- Modify: `component/CommercialKitchenDirectory.js` (around line 190)

- [ ] **Step 1: Add the import**

Add this import near the top of `component/CommercialKitchenDirectory.js`:

```javascript
import AffiliateLinks from './AffiliateLinks'
```

- [ ] **Step 2: Insert AffiliateLinks after the resource links in the sidebar**

In `component/CommercialKitchenDirectory.js`, find the end of the resource links section (around line 189-192):

```javascript
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>
          )}
```

Replace with:

```javascript
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>

              <AffiliateLinks
                categories={['certifications', 'business-formation', 'insurance']}
                title="Start Your Food Business"
                columns={2}
              />
            </div>
          )}
```

- [ ] **Step 3: Verify the page renders**

Open `http://localhost:3000/commercial-kitchen-for-rent/chicago/il` and confirm affiliate links appear in the left sidebar below the resource links.

- [ ] **Step 4: Commit**

```bash
git add component/CommercialKitchenDirectory.js
git commit -m "feat: add affiliate links to city listing sidebar"
```

---

### Task 9: Add AffiliateLinks to City Insights Page

**Files:**
- Modify: `component/CityInsights.js`

- [ ] **Step 1: Add the import**

Add this import near the top of `component/CityInsights.js`:

```javascript
import AffiliateLinks from './AffiliateLinks'
```

- [ ] **Step 2: Find the end of the Key Benefits grid**

In `component/CityInsights.js`, the Key Benefits section starts around line 326 with:

```javascript
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
```

Find the closing `</div>` of that grid and the closing `</div>` of the parent `bg-blue-50` section. Insert AffiliateLinks right after the Key Benefits grid closes, before the parent `bg-blue-50` section closes:

```javascript
          </div>

          <AffiliateLinks
            categories={['business-formation', 'certifications', 'delivery']}
            title="Ready to Get Started?"
          />
        </div>
```

- [ ] **Step 3: Verify the page renders**

Open a city insights page in the browser and confirm affiliate links appear after the Key Benefits section.

- [ ] **Step 4: Commit**

```bash
git add component/CityInsights.js
git commit -m "feat: add affiliate links to city insights page"
```

---

### Task 10: Add AffiliateLinks to Resource Pages

**Files:**
- Modify: `app/resources/nutrition-label-maker/page.js`
- Modify: `app/resources/recipe-cost-tracker/page.js`
- Modify: `app/resources/food-expiration-date-checker/page.js`

- [ ] **Step 1: Update nutrition-label-maker/page.js**

Replace the entire file content:

```javascript
import NutritionLabelMaker from '@/component/NutritionLabelMaker'
import AffiliateLinks from '@/component/AffiliateLinks'

export const metadata = {
  title: 'Nutrition Label Maker | English & Spanish | FDA Compliant',
  description:
    'Generate FDA-compliant nutrition labels for free. Save $300-800 per product with our instant nutrition facts label maker. English & Spanish supported.',
  alternates: {
    canonical:
      'https://sharedkitchenlocator.com/resources/nutrition-label-maker',
  },

  openGraph: {
    title: 'Free FDA Nutrition Label Generator',
    description:
      'Generate FDA-compliant nutrition labels for free. Save $300-800 per product.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <NutritionLabelMaker />
      <div className="max-w-6xl mx-auto px-4">
        <AffiliateLinks
          categories={['equipment', 'software']}
          title="Tools for Food Producers"
        />
      </div>
    </>
  )
}
```

- [ ] **Step 2: Update recipe-cost-tracker/page.js**

The recipe-cost-tracker page is a large client component (1428 lines). Since the component is defined inline in the page file, add the AffiliateLinks import at the top and insert the component before the final closing `</div>` tags.

Add import at top of file:

```javascript
import AffiliateLinks from '@/component/AffiliateLinks'
```

Find the end of the component (around line 1425-1428):

```javascript
          </div>
        </div>
      </div>
    </div>
  )
}
```

Insert AffiliateLinks before the last two closing `</div>` tags:

```javascript
          </div>
        </div>

        <AffiliateLinks
          categories={['software']}
          title="Tools for Managing Your Food Business"
          columns={3}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update food-expiration-date-checker/page.js**

Add import at top of file:

```javascript
import AffiliateLinks from '@/component/AffiliateLinks'
```

Find the USDA disclaimer section (around line 809-824):

```javascript
        <div className="mt-12 text-center text-sm text-gray-500 border-t pt-8">
```

Insert AffiliateLinks just before that disclaimer div:

```javascript
        <AffiliateLinks
          categories={['certifications', 'insurance']}
          title="Food Safety Resources"
          columns={2}
        />

        <div className="mt-12 text-center text-sm text-gray-500 border-t pt-8">
```

- [ ] **Step 4: Verify all three resource pages render**

Open each resource page in the browser:
- `http://localhost:3000/resources/nutrition-label-maker`
- `http://localhost:3000/resources/recipe-cost-tracker`
- `http://localhost:3000/resources/food-expiration-date-checker`

Confirm affiliate link sections appear on each page.

- [ ] **Step 5: Commit**

```bash
git add app/resources/nutrition-label-maker/page.js app/resources/recipe-cost-tracker/page.js app/resources/food-expiration-date-checker/page.js
git commit -m "feat: add affiliate links to all resource pages"
```

---

### Task 11: Visual Verification and Final Build Check

**Files:** None (verification only)

- [ ] **Step 1: Run a production build to check for errors**

```bash
cd /Volumes/Elements/code/shared-kitchen-app && npx next build 2>&1 | tail -30
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Screenshot key pages to verify layout**

Take screenshots of:
1. Kitchen detail page — confirm lead form in sidebar, affiliate links below description
2. City listing page — confirm affiliate links in left sidebar
3. A resource page — confirm affiliate links after tool content

- [ ] **Step 3: Test the lead form submission**

Fill out and submit the lead form on a kitchen detail page. Verify:
- Form shows loading state during submission
- If RESEND_API_KEY is set to a real key: email arrives
- If using placeholder key: API returns 500, form shows error message (expected — confirms error handling works)

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address visual or build issues from verification"
```
