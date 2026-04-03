# Monthly Kitchen Data Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A GitHub Actions workflow that runs monthly to refresh existing kitchen data and discover new kitchens across 43 cities using Google Places API, updating static JSON files.

**Architecture:** A standalone Node.js script reads all `/data/*/data.json` files, calls Google Places Text Search to discover new kitchens per city, calls Place Details to refresh all kitchen data (ratings, hours, photos, contact info), writes updated JSON back, and exits. A GitHub Actions workflow runs this monthly and commits any changes.

**Tech Stack:** Node.js (no extra dependencies — uses built-in `fs` and `fetch`), Google Places API v1, GitHub Actions

---

## File Structure

| File | Responsibility |
|------|---------------|
| `scripts/refresh-kitchen-data.js` | Main script — orchestrates discovery + refresh for all cities |
| `.github/workflows/refresh-kitchen-data.yml` | GitHub Actions workflow — schedule, run script, commit changes |

---

### Task 1: Create the Refresh Script

**Files:**
- Create: `scripts/refresh-kitchen-data.js`

- [ ] **Step 1: Create the script file**

Create `scripts/refresh-kitchen-data.js`:

```javascript
const fs = require('fs')
const path = require('path')

const API_KEY = process.env.GOOGLE_PLACES_API_KEY
const DATA_DIR = path.join(__dirname, '..', 'data')
const DELAY_MS = 150

if (!API_KEY) {
  console.error('Missing GOOGLE_PLACES_API_KEY environment variable')
  process.exit(1)
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ── Google Places API helpers ──────────────────────────────────────

async function searchKitchens(city, state) {
  const results = []
  let pageToken = null

  for (let page = 0; page < 3; page++) {
    const body = {
      textQuery: `commercial kitchen for rent in ${city}, ${state}`,
      maxResultCount: 20,
    }
    if (pageToken) body.pageToken = pageToken

    const res = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.websiteUri,nextPageToken',
        },
        body: JSON.stringify(body),
      }
    )

    if (!res.ok) {
      console.error(`  Text Search failed for ${city}, ${state}: ${res.status}`)
      break
    }

    const data = await res.json()
    if (data.places) {
      results.push(...data.places)
    }

    pageToken = data.nextPageToken
    if (!pageToken) break
    await sleep(DELAY_MS)
  }

  return results
}

async function getPlaceDetails(placeId) {
  const fields = [
    'id',
    'displayName',
    'formattedAddress',
    'location',
    'rating',
    'userRatingCount',
    'nationalPhoneNumber',
    'websiteUri',
    'regularOpeningHours',
    'photos',
  ].join(',')

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': fields,
      },
    }
  )

  if (!res.ok) {
    console.error(`  Place Details failed for ${placeId}: ${res.status}`)
    return null
  }

  return res.json()
}

function buildPhotoUrl(photoName, maxWidth) {
  return `https://places.googleapis.com/v1/${photoName}/media?key=${API_KEY}&maxWidthPx=${maxWidth}`
}

// ── Data processing ────────────────────────────────────────────────

function applyDetails(kitchen, details) {
  if (!details) return kitchen

  // Update fields from API, preserving existing values as fallback
  if (details.rating != null) kitchen.totalScore = details.rating
  if (details.rating != null) kitchen.rating = details.rating
  if (details.userRatingCount != null)
    kitchen.reviewsCount = details.userRatingCount
  if (details.userRatingCount != null)
    kitchen.reviews = details.userRatingCount
  if (details.formattedAddress) kitchen.address = details.formattedAddress
  if (details.nationalPhoneNumber) {
    kitchen.phone = details.nationalPhoneNumber
    kitchen.phoneUnformatted = details.nationalPhoneNumber.replace(/\D/g, '')
  }
  if (details.websiteUri) kitchen.website = details.websiteUri
  if (details.location) {
    kitchen.location = {
      lat: details.location.latitude,
      lng: details.location.longitude,
    }
  }

  // Opening hours
  if (details.regularOpeningHours?.weekdayDescriptions) {
    kitchen.openingHours = details.regularOpeningHours.weekdayDescriptions.map(
      (desc) => {
        const colonIndex = desc.indexOf(':')
        return {
          day: desc.slice(0, colonIndex).trim(),
          hours: desc.slice(colonIndex + 1).trim(),
        }
      }
    )
  }

  // Photos
  if (details.photos && details.photos.length > 0) {
    kitchen.imageUrl = buildPhotoUrl(details.photos[0].name, 800)
    kitchen.images = details.photos
      .slice(0, 10)
      .map((p) => buildPhotoUrl(p.name, 800))
  }

  kitchen.scrapedAt = new Date().toISOString()

  return kitchen
}

function createNewKitchen(place, cityName, stateName) {
  return {
    title: place.displayName?.text || 'Unknown Kitchen',
    price: null,
    categoryName: 'Commercial kitchen',
    address: place.formattedAddress || '',
    neighborhood: '',
    street: '',
    city: cityName,
    postalCode: '',
    state: stateName,
    countryCode: 'US',
    website: place.websiteUri || '',
    phone: place.nationalPhoneNumber || '',
    phoneUnformatted: (place.nationalPhoneNumber || '').replace(/\D/g, ''),
    claimThisBusiness: false,
    location: {
      lat: place.location?.latitude || 0,
      lng: place.location?.longitude || 0,
    },
    permanentlyClosed: false,
    temporarilyClosed: false,
    placeId: place.id,
    categories: ['Commercial kitchen'],
    imagesCount: 0,
    imageCategories: [],
    scrapedAt: new Date().toISOString(),
    openingHours: [],
    additionalInfo: {},
    url: `https://www.google.com/maps/search/?api=1&query_place_id=${place.id}`,
    reviews: place.userRatingCount || 0,
    rating: place.rating || 0,
    totalScore: place.rating || 0,
    reviewsCount: place.userRatingCount || 0,
    isAdvertisement: false,
    imageUrl: '',
    images: [],
    verified: false,
  }
}

// ── Main ───────────────────────────────────────────────────────────

async function processCity(cityDir) {
  const dataPath = path.join(DATA_DIR, cityDir, 'data.json')
  if (!fs.existsSync(dataPath)) return { updated: 0, added: 0 }

  const cityData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  const kitchens = cityData.kitchens || []
  const cityName = cityData.city || cityDir
  const stateName = cityData.state || ''

  console.log(`\n📍 ${cityName}, ${stateName} (${kitchens.length} kitchens)`)

  // Step 1: Discover new kitchens
  let added = 0
  try {
    const searchResults = await searchKitchens(cityName, stateName)
    const existingIds = new Set(kitchens.map((k) => k.placeId).filter(Boolean))

    for (const place of searchResults) {
      if (place.id && !existingIds.has(place.id)) {
        const newKitchen = createNewKitchen(place, cityName, stateName)
        kitchens.push(newKitchen)
        existingIds.add(place.id)
        added++
        console.log(`  + New: ${newKitchen.title}`)
      }
    }
    await sleep(DELAY_MS)
  } catch (err) {
    console.error(`  Discovery error: ${err.message}`)
  }

  // Step 2: Refresh all kitchens with Place Details
  let updated = 0
  for (const kitchen of kitchens) {
    if (!kitchen.placeId) continue

    try {
      const details = await getPlaceDetails(kitchen.placeId)
      if (details) {
        applyDetails(kitchen, details)
        updated++
      }
      await sleep(DELAY_MS)
    } catch (err) {
      console.error(`  Refresh error for ${kitchen.title}: ${err.message}`)
    }
  }

  // Step 3: Write updated data
  cityData.kitchens = kitchens
  fs.writeFileSync(dataPath, JSON.stringify(cityData, null, 2) + '\n')

  console.log(`  ✅ ${updated} refreshed, ${added} new`)
  return { updated, added }
}

async function main() {
  console.log('🔄 Kitchen Data Refresh')
  console.log(`📅 ${new Date().toISOString()}\n`)

  const cityDirs = fs
    .readdirSync(DATA_DIR)
    .filter((d) => {
      const fullPath = path.join(DATA_DIR, d)
      return (
        fs.statSync(fullPath).isDirectory() &&
        fs.existsSync(path.join(fullPath, 'data.json'))
      )
    })
    .sort()

  console.log(`Found ${cityDirs.length} cities`)

  let totalUpdated = 0
  let totalAdded = 0

  for (const cityDir of cityDirs) {
    const { updated, added } = await processCity(cityDir)
    totalUpdated += updated
    totalAdded += added
  }

  console.log(`\n🏁 Done: ${totalUpdated} updated, ${totalAdded} new kitchens`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
```

- [ ] **Step 2: Verify the script runs (dry check)**

```bash
cd /Volumes/Elements/code/shared-kitchen-app && node scripts/refresh-kitchen-data.js 2>&1 | head -5
```

Expected: `Missing GOOGLE_PLACES_API_KEY environment variable` (since we're not passing the key — confirms script loads and validates correctly).

- [ ] **Step 3: Commit**

```bash
git add scripts/refresh-kitchen-data.js
git commit -m "feat: add monthly kitchen data refresh script"
```

---

### Task 2: Create GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/refresh-kitchen-data.yml`

- [ ] **Step 1: Create the workflow file**

```bash
mkdir -p /Volumes/Elements/code/shared-kitchen-app/.github/workflows
```

Create `.github/workflows/refresh-kitchen-data.yml`:

```yaml
name: Monthly Kitchen Data Refresh

on:
  schedule:
    # 1st of every month at midnight UTC
    - cron: '0 0 1 * *'
  workflow_dispatch: # Allow manual trigger from GitHub UI

permissions:
  contents: write

jobs:
  refresh:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run data refresh
        env:
          GOOGLE_PLACES_API_KEY: ${{ secrets.GOOGLE_PLACES_API_KEY }}
        run: node scripts/refresh-kitchen-data.js

      - name: Check for changes
        id: changes
        run: |
          git diff --quiet data/ && echo "changed=false" >> $GITHUB_OUTPUT || echo "changed=true" >> $GITHUB_OUTPUT

      - name: Commit and push changes
        if: steps.changes.outputs.changed == 'true'
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          UPDATED=$(git diff --numstat data/ | wc -l | tr -d ' ')
          ADDED=$(git diff data/ | grep -c '^\+.*"placeId"' || true)
          git add data/
          git commit -m "chore(data): monthly kitchen data refresh — ${UPDATED} files updated, ${ADDED} new kitchens"
          git push
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/refresh-kitchen-data.yml
git commit -m "feat: add GitHub Actions workflow for monthly data refresh"
```

---

### Task 3: Test with a Single City

**Files:** None (verification only)

- [ ] **Step 1: Run the script against a single city to verify it works**

To test without refreshing all 43 cities, temporarily modify the script to process only one city. Or run with the real API key:

```bash
cd /Volumes/Elements/code/shared-kitchen-app && GOOGLE_PLACES_API_KEY=your_key_here node -e "
const { execSync } = require('child_process');
// Quick test: just verify the script starts and processes the first city
process.env.GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
require('./scripts/refresh-kitchen-data.js');
" 2>&1 | head -20
```

Alternatively, verify with a curl to confirm the API key works with Text Search:

```bash
curl -s -X POST 'https://places.googleapis.com/v1/places:searchText' \
  -H 'Content-Type: application/json' \
  -H "X-Goog-Api-Key: YOUR_KEY" \
  -H 'X-Goog-FieldMask: places.id,places.displayName' \
  -d '{"textQuery": "commercial kitchen for rent in Chicago, IL", "maxResultCount": 3}' | head -20
```

Expected: JSON response with place results.

- [ ] **Step 2: Verify data.json was updated**

After a successful run, check that a data file was modified:

```bash
git diff --stat data/
```

Expected: One or more `data.json` files modified.

- [ ] **Step 3: Verify JSON is valid**

```bash
node -e "const fs=require('fs'); const d=JSON.parse(fs.readFileSync('data/chicago/data.json')); console.log('Kitchens:', d.kitchens.length); console.log('First:', d.kitchens[0].title, d.kitchens[0].rating)"
```

Expected: Kitchen count and first kitchen name/rating printed.

- [ ] **Step 4: Reset test changes (don't commit test data)**

```bash
git checkout data/
```

- [ ] **Step 5: Final commit if any script fixes were needed**

```bash
git add scripts/refresh-kitchen-data.js
git commit -m "fix: address issues found during testing"
```
