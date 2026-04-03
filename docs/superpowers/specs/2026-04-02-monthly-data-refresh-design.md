# Monthly Kitchen Data Refresh — Design Spec

## Overview

A GitHub Actions workflow that runs monthly to refresh existing kitchen data and discover new kitchens across the existing 43 cities. Updates static JSON files in `/data/` and commits changes to trigger redeployment.

## 1. Refresh Script

### File
`scripts/refresh-kitchen-data.js` — standalone Node.js script

### Process
1. Read all city directories from `/data/*/data.json`
2. For each city:
   a. **Discover:** Search Google Places Text Search API for "commercial kitchen for rent in [city], [state]"
   b. **Compare:** Match results by `placeId` against existing kitchens
   c. **Add new:** Any unmatched results get added to the city's kitchen list
   d. **Refresh existing:** For each kitchen (existing + new), fetch Place Details API to update: `totalScore`, `reviewsCount`, `address`, `phone`, `website`, `openingHours`, `imageUrl`
3. Write updated `data.json` for each city
4. Log summary: kitchens updated, new kitchens added, errors

### Google Places API Usage
- **Text Search** (discover): 1-2 calls per city (pagination if >20 results) = ~50 calls
- **Place Details** (refresh): 1 call per kitchen = ~900 calls
- **Total per run:** ~943 API calls = ~$17

### Fields Updated Per Kitchen
| Field | Source |
|-------|--------|
| `totalScore` | Place Details `rating` |
| `reviewsCount` | Place Details `userRatingCount` |
| `address` | Place Details `formattedAddress` |
| `phone` | Place Details `nationalPhoneNumber` |
| `website` | Place Details `websiteUri` |
| `openingHours` | Place Details `regularOpeningHours.weekdayDescriptions` |
| `imageUrl` | Place Details `photos[0]` URL |
| `location.lat` | Place Details `location.latitude` |
| `location.lng` | Place Details `location.longitude` |

### Fields Preserved (Not Overwritten)
- `title` / `name` (keep existing, use API value only for new kitchens)
- `placeId` (immutable identifier)
- `verified` (manual flag)
- Any custom fields added manually

### New Kitchen Template
When a new kitchen is discovered, it's added with:
```json
{
  "title": "[from API displayName]",
  "placeId": "[from API]",
  "address": "[from API]",
  "phone": "[from API]",
  "website": "[from API]",
  "totalScore": "[from API]",
  "reviewsCount": "[from API]",
  "openingHours": "[from API]",
  "imageUrl": "[from API]",
  "location": { "lat": 0, "lng": 0 },
  "verified": false
}
```

### Error Handling
- If a Place Details call fails for one kitchen, log the error and continue to the next
- If a Text Search call fails for one city, log the error and skip discovery for that city (still refresh existing kitchens)
- Rate limit: 100ms delay between API calls to avoid quota issues
- Script exits with code 0 if any data was updated, code 1 only on fatal errors

### Environment Variables
- `GOOGLE_PLACES_API_KEY` — Google Places API key with Text Search and Place Details enabled

## 2. GitHub Actions Workflow

### File
`.github/workflows/refresh-kitchen-data.yml`

### Trigger
- **Scheduled:** `cron: '0 0 1 * *'` (1st of every month, midnight UTC)
- **Manual:** `workflow_dispatch` (run anytime from GitHub UI)

### Steps
1. Checkout repository
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Run refresh script (`node scripts/refresh-kitchen-data.js`)
5. Check if any files changed (`git diff`)
6. If changed: commit and push to `main`

### Commit Message
`chore(data): monthly kitchen data refresh — [N] updated, [M] new`

### GitHub Secrets Required
- `GOOGLE_PLACES_API_KEY` — added to repo Settings > Secrets

### Permissions
- `contents: write` — to push commits

## 3. Files to Create

| File | Purpose |
|------|---------|
| `scripts/refresh-kitchen-data.js` | Data refresh and discovery script |
| `.github/workflows/refresh-kitchen-data.yml` | GitHub Actions workflow |

## 4. Files to Modify

None — this is fully additive.

## 5. Out of Scope
- Adding new cities (manual process — create city folder in `/data/`)
- Redis caching (not needed for batch job)
- Dashboard or UI for refresh status
- Automatic redeployment (handled by existing Vercel/Netlify git integration)
