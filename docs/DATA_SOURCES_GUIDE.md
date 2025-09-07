# Data Sources Guide for City Insights

This guide explains how to obtain real demographic and market data for your city insights sections.

## Do You Need APIs and Data Sources?

**Short Answer**: Not necessarily for basic implementation, but YES for accurate, real-time data.

**Current Implementation**: 
- Uses static data stored in JSON files
- Easy to manage and fast to load
- No API costs or rate limits
- Perfect for MVP and testing

**With APIs/Data Sources**:
- Real-time, accurate demographic data
- Automatic updates
- More credible statistics
- Better SEO and user trust

## Free Data Sources

### 1. US Census Bureau (Best Free Option)
- **Website**: https://data.census.gov/
- **What it provides**: Population, income, demographics
- **API**: https://www.census.gov/data/developers/data-sets.html
- **Cost**: Free
- **Rate Limits**: 500 requests per day

**Key Endpoints:**
```
# Population data
https://api.census.gov/data/2021/acs/acs5?get=B01003_001E&for=place:*&in=state:48

# Median Income
https://api.census.gov/data/2021/acs/acs5?get=B19013_001E&for=place:*&in=state:48

# Educational Attainment
https://api.census.gov/data/2021/acs/acs5?get=B15003_022E,B15003_023E,B15003_024E,B15003_025E&for=place:*&in=state:48
```

### 2. Bureau of Labor Statistics
- **Website**: https://www.bls.gov/data/
- **What it provides**: Employment data, wages
- **API**: https://www.bls.gov/developers/api_reference.htm
- **Cost**: Free (limited)
- **Rate Limits**: 25 requests per day (free)

### 3. Local Government Open Data
Many cities provide open data portals:

**Examples:**
- Houston: https://data.houstontx.gov/
- Chicago: https://data.cityofchicago.org/
- NYC: https://opendata.cityofnewyork.us/
- LA: https://data.lacity.org/

### 4. University/College Data
- **NCES (National Center for Education Statistics)**: https://nces.ed.gov/
- **Individual university websites**: Often publish enrollment numbers

## Paid Data Sources (More Comprehensive)

### 1. Nielsen Consumer Insights
- **What it provides**: Consumer behavior, spending habits
- **Cost**: Contact for pricing
- **Quality**: Very high, industry standard

### 2. Esri Demographics
- **What it provides**: Detailed demographics, consumer spending
- **Cost**: Varies by usage
- **Quality**: Excellent for business planning

### 3. Data.com / Salesforce
- **What it provides**: Business and demographic data
- **Cost**: Subscription-based
- **Integration**: Good API support

## Implementation Options

### Option 1: Static Data (Current)
```json
{
  "insights": {
    "residents": {
      "count": "221K",
      "description": "...",
      "driveTime": "15 min"
    }
  }
}
```

**Pros:**
- Fast loading
- No API costs
- Easy to customize
- Works offline

**Cons:**
- Manual updates required
- May become outdated
- Less credible without sources

### Option 2: API Integration
```javascript
// Example Census API integration
async function getCityPopulation(cityName, state) {
  const response = await fetch(`https://api.census.gov/data/2021/acs/acs5?get=B01003_001E&for=place:*&in=state:${state}`)
  // Process response...
}
```

**Pros:**
- Always current data
- More credible
- Automatic updates
- Better for SEO

**Cons:**
- API costs (for some)
- Rate limits
- Dependency on external services
- More complex implementation

### Option 3: Hybrid Approach (Recommended)
- Use APIs to populate initial data
- Cache results in JSON files
- Update periodically (monthly/quarterly)
- Best of both worlds

## Real Data Examples

### Houston Demographics (from Census API)
```json
{
  "residents": {
    "count": "2.3M",
    "description": "Houston's diverse population of 2.3 million represents one of the most multicultural cities in America...",
    "source": "US Census 2021 ACS 5-Year"
  },
  "income": {
    "median": "$52,338",
    "description": "...",
    "source": "US Census 2021 ACS 5-Year"
  }
}
```

### College Student Numbers
```javascript
// Example: University of Houston enrollment
{
  "students": {
    "count": "47K",
    "description": "The University of Houston enrolls over 47,000 students...",
    "source": "UH Fall 2023 Enrollment Report"
  }
}
```

## Quick Start: Getting Real Data

### 1. Set Up Census API Key (Free)
```bash
# Get your free key at: https://api.census.gov/data/key_signup.html
export CENSUS_API_KEY="your_key_here"
```

### 2. Basic Population Query
```javascript
const getCityData = async (cityName, stateCode) => {
  const key = process.env.CENSUS_API_KEY
  const url = `https://api.census.gov/data/2021/acs/acs5?get=B01003_001E,B19013_001E&for=place:*&in=state:${stateCode}&key=${key}`
  
  const response = await fetch(url)
  const data = await response.json()
  
  // Find your city in the results
  const cityData = data.find(row => 
    row.includes(cityName.toUpperCase())
  )
  
  return {
    population: cityData[0],
    medianIncome: cityData[1]
  }
}
```

### 3. Update Your Data Files
```javascript
// Run this script to update all your cities
const cities = ['houston', 'chicago', 'miami']

cities.forEach(async city => {
  const data = await getCityData(city, stateCode)
  // Update your JSON files...
})
```

## Data Source Credibility

### Most Credible Sources (in order):
1. **US Census Bureau** - Official government data
2. **Bureau of Labor Statistics** - Employment/wage data
3. **Local Government** - City-specific data
4. **Universities** - Student enrollment data
5. **Nielsen/Market Research** - Consumer behavior

### What to Include in Source Attribution:
```json
{
  "residents": {
    "count": "221K",
    "description": "...",
    "source": "US Census 2021 ACS 5-Year Estimates",
    "lastUpdated": "2024-01-15"
  }
}
```

## Automation Ideas

### 1. Monthly Data Update Script
```bash
# Cron job to update data monthly
0 0 1 * * node scripts/update-city-data.js
```

### 2. Build-Time Data Fetching
```javascript
// Next.js build-time data fetching
export async function getStaticProps() {
  const cityData = await fetchRealCityData()
  return { props: { cityData }, revalidate: 86400 } // 24 hours
}
```

### 3. Serverless Functions
```javascript
// API route: /api/city-data/[city]
export default async function handler(req, res) {
  const { city } = req.query
  const data = await fetchCensusData(city)
  res.json(data)
}
```

## Cost Considerations

### Free Tier Limits:
- **Census API**: 500 requests/day
- **BLS API**: 25 requests/day  
- **Most City APIs**: Varies, usually generous

### Paid Options:
- **Nielsen**: $500-5000+/month
- **Esri**: $100-1000+/month
- **Custom research**: $1000-10000+ per city

## Recommendations

### For MVP/Testing:
✅ Use static data with realistic estimates
✅ Focus on compelling copy and user experience
✅ Add "Contact for current data" disclaimers

### For Production:
✅ Integrate Census API for basic demographics
✅ Add university websites for student data
✅ Use local government sources when available
✅ Update data quarterly or bi-annually

### For Enterprise:
✅ Consider Nielsen or Esri for comprehensive data
✅ Implement real-time API integration
✅ Add data source attribution
✅ Set up automated updates

## Example Implementation Priority:

1. **Phase 1**: Static data with good copy (Current)
2. **Phase 2**: Census API for population/income
3. **Phase 3**: Add university enrollment data
4. **Phase 4**: Market research data for consumer behavior
5. **Phase 5**: Real-time integration with caching

This approach lets you launch quickly with compelling content while building toward more comprehensive, data-driven insights.