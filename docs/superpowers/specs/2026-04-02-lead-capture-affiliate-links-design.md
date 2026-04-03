# Lead Capture Forms & Affiliate Links — Design Spec

## Overview

Add revenue generation to sharedkitchenlocator.com through two mechanisms:
1. **Lead capture forms** on kitchen detail pages that email inquiries to the site owner
2. **Affiliate link sections** across kitchen detail, city listing, city insights, and resource pages

## 1. Lead Capture Form

### Placement
- Kitchen detail page right sidebar, above the existing "Quick Actions" card
- Replaces the currently empty space (the commented-out ContactForm at ~line 1714 of KitchenDetail.js)

### Form Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Name | text | Yes | |
| Email | email | Yes | |
| Phone | tel | No | |
| Message | textarea | Yes | Pre-filled: "I'm interested in renting [Kitchen Name]. Please send me pricing and availability." |

### Submit Button
- Label: "Request Pricing"
- Style: Primary blue (`bg-blue-600 text-white`) matching existing CTA patterns

### Behavior
1. Client-side validation (name, email, message required)
2. POST to `/api/lead` with form data + kitchen name + kitchen URL
3. Loading state on button during submission
4. Success: "Thanks! We'll be in touch within 24 hours."
5. Error: "Something went wrong. Please try again."

### Styling
- Card: `bg-white border border-gray-200 rounded-lg p-6`
- Header: subtle blue gradient like existing pattern `bg-gradient-to-br from-blue-50 to-indigo-50`
- Form inputs: `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`
- Matches existing site design language

## 2. Lead Email API Route

### Endpoint
`POST /api/lead/route.js`

### Request Body
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)",
  "message": "string (required)",
  "kitchenName": "string",
  "kitchenUrl": "string"
}
```

### Validation
- Name: non-empty string
- Email: valid email format
- Message: non-empty string

### Email Delivery
- **Provider:** Resend (free tier, 100 emails/day)
- **Dependency:** `resend` npm package
- **Environment variable:** `RESEND_API_KEY`
- **From address:** `onboarding@resend.dev` (Resend default — switch to custom domain after verifying sharedkitchenlocator.com in Resend dashboard)
- **To address:** Site owner email (env var `LEAD_EMAIL_TO`)

### Email Format
```
Subject: New Lead — [Kitchen Name]

Name: [name]
Email: [email]
Phone: [phone or "Not provided"]

Message:
[message]

Kitchen: [kitchenName]
Page: [kitchenUrl]
```

### Response
- 200: `{ "success": true }`
- 400: `{ "error": "Missing required fields" }`
- 500: `{ "error": "Failed to send email" }`

## 3. Affiliate Links Component

### Component
`AffiliateLinks.js` — reusable component that renders a grid of affiliate link cards filtered by category.

### Props
```js
{
  categories: string[]  // Filter which categories to show, e.g. ["certifications", "insurance"]
  title: string         // Optional section title override
  columns: 2 | 3       // Grid columns (default: 3)
}
```

### Affiliate Link Data

#### Certifications
- ServSafe Food Handler — "Get certified to handle food safely" 
- ServSafe Manager — "Management-level food safety certification"

#### Business Formation
- LegalZoom LLC — "Form your food business LLC"
- Incfile — "Free LLC formation for your food business"

#### Insurance
- Next Insurance — "Affordable business insurance for food entrepreneurs"
- FLIP Event Insurance — "Event and pop-up food insurance"

#### Equipment
- WebstaurantStore — "Commercial kitchen equipment and supplies"
- Amazon Commercial Kitchen — "Kitchen equipment with fast shipping"

#### Software
- Square POS — "Free point-of-sale for food businesses"
- Toast POS — "Restaurant-grade POS system"
- QuickBooks — "Accounting for small food businesses"

#### Delivery Platforms
- DoorDash for Merchants — "Reach more customers with delivery"
- UberEats for Restaurants — "Grow your delivery business"

### Link Attributes
- All links: `target="_blank" rel="noopener sponsored"`
- UTM parameters: `?utm_source=sharedkitchenlocator&utm_medium=affiliate&utm_campaign=[category]`

### Styling
- Section background: `bg-amber-50 border border-amber-100 rounded-lg p-6`
- Card: `bg-white rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow`
- Link button: `text-blue-600 font-medium hover:text-blue-700`
- FTC disclosure text at bottom: `text-xs text-gray-500` — "Some links are affiliate links. We may earn a commission at no extra cost to you."

## 4. Affiliate Links Placement

### Kitchen Detail Page (`KitchenDetail.js`)
- **Location:** Below "About This Kitchen" section (~line 1390)
- **Categories shown:** certifications, insurance, equipment
- **Columns:** 3

### City Listing Page (`CommercialKitchenDirectory.js`)
- **Location:** Left sidebar, below existing resource links (~line 192)
- **Categories shown:** certifications, business-formation, insurance
- **Columns:** 2

### City Insights Page (`CityInsights.js`)
- **Location:** After "Why Start a Food Business" / Key Benefits section
- **Categories shown:** business-formation, certifications, delivery
- **Columns:** 3

### Resource Pages
- **Nutrition Label Maker:** After label output — equipment, software
- **Recipe Cost Tracker:** After calculations — software (accounting, POS)
- **Food Expiration Checker:** After results — certifications, insurance

## 5. Files to Create

| File | Purpose |
|------|---------|
| `component/LeadCaptureForm.js` | Lead capture form component |
| `component/AffiliateLinks.js` | Reusable affiliate links grid |
| `app/api/lead/route.js` | Email delivery API route |
| `data/affiliateLinks.js` | Centralized affiliate link data |

## 6. Files to Modify

| File | Change |
|------|--------|
| `component/KitchenDetail.js` | Add LeadCaptureForm to sidebar, add AffiliateLinks below description |
| `component/CommercialKitchenDirectory.js` | Add AffiliateLinks to left sidebar |
| `component/CityInsights.js` | Add AffiliateLinks after key benefits |
| `app/resources/nutrition-label-maker/page.js` | Add AffiliateLinks after tool |
| `app/resources/recipe-cost-tracker/page.js` | Add AffiliateLinks after tool |
| `app/resources/food-expiration-date-checker/page.js` | Add AffiliateLinks after tool |
| `package.json` | Add `resend` dependency |
| `.env.local` | Add `RESEND_API_KEY`, `LEAD_EMAIL_TO` |

## 7. Out of Scope
- Lead storage/database
- Admin dashboard
- Affiliate click tracking analytics
- Premium/featured listings
- Booking integration
