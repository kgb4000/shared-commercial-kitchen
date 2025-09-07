#!/usr/bin/env node

/**
 * Script to add city insights data to existing city data files
 * Usage: node scripts/add-city-insights.js [cityname]
 * Example: node scripts/add-city-insights.js chicago
 */

const fs = require('fs')
const path = require('path')

// Default insights template
const createDefaultInsights = (cityName, stateName) => ({
  residents: {
    count: "Data available upon request",
    description: `${cityName} residents increasingly prefer convenient food options, with takeout and delivery becoming integral parts of daily life. This creates opportunities for food entrepreneurs to serve busy families and professionals.`,
    driveTime: "15 min"
  },
  workforce: {
    count: "Data available upon request",
    description: `The modern workforce in ${cityName} values convenience, with client meetings often paired with delivery meals and companies providing food stipends, making delivery a major aspect of today's work environment.`,
    driveTime: "15 min"
  },
  students: {
    count: "Data available upon request",
    description: `College students in ${cityName} are increasingly ordering meals via delivery, moving away from traditional dining hall experiences. This demographic shift creates significant opportunities for food delivery businesses.`,
    driveTime: "15 min"
  },
  income: {
    median: "Contact for data",
    description: `${cityName} residents with higher disposable incomes are more likely to order food delivery consistently and spend more per order, making this market attractive for premium food businesses.`
  },
  foodScene: {
    title: `${cityName}'s Growing Food Scene`,
    description: `${cityName} boasts a vibrant and diverse culinary landscape that continues to evolve. From food trucks to fine dining establishments, the city offers endless opportunities for food entrepreneurs to tap into established food culture while introducing innovative concepts.`
  },
  businessOpportunity: {
    title: `Why Start a Food Business in ${cityName}`,
    description: `${cityName} presents excellent opportunities for food entrepreneurs due to its diverse population, growing economy, and strong demand for convenient dining options. Renting a commercial kitchen in ${cityName} allows you to test concepts, scale production, and build a loyal customer base in a supportive business environment.`
  }
})

function formatCityName(slug) {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function addInsightsData(citySlug) {
  const dataPath = path.join(process.cwd(), 'data', citySlug, 'data.json')
  
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ City data file not found: ${dataPath}`)
    return
  }

  try {
    // Read existing data
    const rawData = fs.readFileSync(dataPath, 'utf8')
    const cityData = JSON.parse(rawData)
    
    // Check if insights already exists
    if (cityData.insights) {
      console.log(`ℹ️  Insights already exist for ${citySlug}`)
      return
    }

    const cityName = formatCityName(citySlug)
    const stateName = cityData.state ? cityData.state.toUpperCase() : 'Unknown'

    // Add insights to existing data
    cityData.insights = createDefaultInsights(cityName, stateName)

    // Write back to file with pretty formatting
    fs.writeFileSync(dataPath, JSON.stringify(cityData, null, 2))
    
    console.log(`✅ Successfully added insights to ${cityName}, ${stateName}`)
    console.log(`📂 Updated: ${dataPath}`)
    console.log(`🔧 You can now customize the insights data in the data file`)
    
  } catch (error) {
    console.error(`❌ Error processing ${citySlug}:`, error.message)
  }
}

function processAllCities() {
  const dataDir = path.join(process.cwd(), 'data')
  
  if (!fs.existsSync(dataDir)) {
    console.error(`❌ Data directory not found: ${dataDir}`)
    return
  }

  const cities = fs.readdirSync(dataDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  console.log(`🔍 Found ${cities.length} cities`)
  
  let processed = 0
  let skipped = 0

  cities.forEach(city => {
    const dataPath = path.join(dataDir, city, 'data.json')
    if (fs.existsSync(dataPath)) {
      try {
        const cityData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
        if (!cityData.insights) {
          addInsightsData(city)
          processed++
        } else {
          console.log(`⏭️  Skipping ${city} (already has insights)`)
          skipped++
        }
      } catch (error) {
        console.error(`❌ Error reading ${city}:`, error.message)
      }
    }
  })

  console.log(`\n📊 Summary:`)
  console.log(`   Processed: ${processed}`)
  console.log(`   Skipped: ${skipped}`)
  console.log(`   Total: ${cities.length}`)
}

// Main execution
const cityArg = process.argv[2]

if (cityArg === '--all') {
  console.log('🚀 Processing all cities...')
  processAllCities()
} else if (cityArg) {
  console.log(`🚀 Adding insights for: ${cityArg}`)
  addInsightsData(cityArg)
} else {
  console.log('📋 Usage:')
  console.log('  node scripts/add-city-insights.js [cityname]     # Add insights to specific city')
  console.log('  node scripts/add-city-insights.js --all         # Add insights to all cities')
  console.log('\nExamples:')
  console.log('  node scripts/add-city-insights.js chicago')
  console.log('  node scripts/add-city-insights.js new-york')
  console.log('\n📊 Data Sources for Real Statistics:')
  console.log('  • US Census Bureau: https://data.census.gov/')
  console.log('  • Bureau of Labor Statistics: https://www.bls.gov/data/')
  console.log('  • City/County official websites')
  console.log('  • Nielsen Consumer Reports')
  console.log('  • Local Economic Development offices')
}