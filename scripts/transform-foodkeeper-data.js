#!/usr/bin/env node

/**
 * Transform Excel-format foodkeeper-data.json to USDA API format
 * This script converts the sheet-based data to the ProductList format expected by the app
 */

const fs = require('fs')
const path = require('path')

async function transformFoodKeeperData() {
  const inputPath = path.join(process.cwd(), 'public', 'foodkeeper-data.json')
  const outputPath = path.join(process.cwd(), 'public', 'foodkeeper-data-transformed.json')

  console.log('🔄 Starting FoodKeeper data transformation...')

  try {
    // Read the Excel-format data
    const rawData = fs.readFileSync(inputPath, 'utf8')
    const excelData = JSON.parse(rawData)

    console.log(`📊 Found ${excelData.sheets.length} sheets in the data`)

    // Extract sheets
    const productSheet = excelData.sheets.find(sheet => sheet.name === 'Product')
    const categorySheet = excelData.sheets.find(sheet => sheet.name === 'Category')

    if (!productSheet) {
      throw new Error('Product sheet not found')
    }

    if (!categorySheet) {
      throw new Error('Category sheet not found')
    }

    console.log(`📦 Processing ${productSheet.data.length} products...`)

    // Create category lookup
    const categoryLookup = new Map()
    categorySheet.data.forEach(categoryRow => {
      const categoryData = {}
      categoryRow.forEach(field => {
        Object.assign(categoryData, field)
      })
      categoryLookup.set(categoryData.ID, {
        categoryName: categoryData.Category_Name,
        subcategoryName: categoryData.Subcategory_Name
      })
    })

    // Transform products to USDA API format
    const productList = []

    productSheet.data.forEach(productRow => {
      const product = {}
      
      // Flatten the row data
      productRow.forEach(field => {
        Object.assign(product, field)
      })

      // Get category information
      const categoryInfo = categoryLookup.get(product.Category_ID) || {
        categoryName: 'Unknown',
        subcategoryName: null
      }

      // Create the transformed product with multiple storage options
      const transformedProduct = {
        ProductID: product.ID,
        ProductName: product.Name + (product.Name_subtitle ? ` (${product.Name_subtitle})` : ''),
        CategoryName: categoryInfo.categoryName,
        SubcategoryName: categoryInfo.subcategoryName,
        Keywords: product.Keywords || '',
        FoodStorage: []
      }

      // Add Pantry storage if available
      if (product.DOP_Pantry_Min && product.DOP_Pantry_Max) {
        transformedProduct.FoodStorage.push({
          StorageType: 'Pantry',
          StorageLife: `${product.DOP_Pantry_Min}-${product.DOP_Pantry_Max} ${product.DOP_Pantry_Metric || 'Days'}`,
          DOP_Pantry_Min: product.DOP_Pantry_Min,
          DOP_Pantry_Max: product.DOP_Pantry_Max,
          DOP_Pantry_Metric: product.DOP_Pantry_Metric,
          StorageTips: product.DOP_Pantry_tips || product.Pantry_tips || '',
          ProductDescription: `Storage guidance for ${transformedProduct.ProductName}`
        })
      }

      // Add Refrigerate storage if available
      if (product.DOP_Refrigerate_Min && product.DOP_Refrigerate_Max) {
        transformedProduct.FoodStorage.push({
          StorageType: 'Refrigerate',
          StorageLife: `${product.DOP_Refrigerate_Min}-${product.DOP_Refrigerate_Max} ${product.DOP_Refrigerate_Metric || 'Days'}`,
          DOP_Refrigerate_Min: product.DOP_Refrigerate_Min,
          DOP_Refrigerate_Max: product.DOP_Refrigerate_Max,
          DOP_Refrigerate_Metric: product.DOP_Refrigerate_Metric,
          StorageTips: product.DOP_Refrigerate_tips || product.Refrigerate_tips || '',
          ProductDescription: `Refrigeration guidance for ${transformedProduct.ProductName}`
        })
      }

      // Add Freeze storage if available
      if (product.DOP_Freeze_Min && product.DOP_Freeze_Max) {
        transformedProduct.FoodStorage.push({
          StorageType: 'Freeze',
          StorageLife: `${product.DOP_Freeze_Min}-${product.DOP_Freeze_Max} ${product.DOP_Freeze_Metric || 'Months'}`,
          DOP_Freeze_Min: product.DOP_Freeze_Min,
          DOP_Freeze_Max: product.DOP_Freeze_Max,
          DOP_Freeze_Metric: product.DOP_Freeze_Metric,
          StorageTips: product.DOP_Freeze_Tips || product.Freeze_Tips || '',
          ProductDescription: `Freezing guidance for ${transformedProduct.ProductName}`
        })
      }

      // Only add products that have at least one storage option
      if (transformedProduct.FoodStorage.length > 0) {
        productList.push(transformedProduct)
      }
    })

    // Create the final USDA API format
    const transformedData = {
      ProductList: productList,
      metadata: {
        source: 'USDA FoodKeeper Database',
        transformedAt: new Date().toISOString(),
        totalProducts: productList.length,
        originalFormat: 'Excel sheets',
        targetFormat: 'USDA API'
      }
    }

    console.log(`✅ Transformed ${transformedData.ProductList.length} products with storage data`)

    // Write the transformed data
    fs.writeFileSync(outputPath, JSON.stringify(transformedData, null, 2))

    console.log(`💾 Saved transformed data to: ${outputPath}`)
    console.log(`📊 Final statistics:`)
    console.log(`   - Total products: ${transformedData.ProductList.length}`)
    
    // Count storage types
    let pantryCount = 0, refrigerateCount = 0, freezeCount = 0
    transformedData.ProductList.forEach(product => {
      product.FoodStorage.forEach(storage => {
        if (storage.StorageType === 'Pantry') pantryCount++
        if (storage.StorageType === 'Refrigerate') refrigerateCount++
        if (storage.StorageType === 'Freeze') freezeCount++
      })
    })

    console.log(`   - Pantry storage options: ${pantryCount}`)
    console.log(`   - Refrigerate storage options: ${refrigerateCount}`)
    console.log(`   - Freeze storage options: ${freezeCount}`)
    console.log(`   - Total storage entries: ${pantryCount + refrigerateCount + freezeCount}`)

    console.log('\n🎉 Transformation complete!')
    console.log('\nNext steps:')
    console.log('1. Replace public/foodkeeper-data.json with the transformed version')
    console.log('2. The food expiration checker will automatically use the full database')

  } catch (error) {
    console.error('❌ Error transforming data:', error)
    process.exit(1)
  }
}

// Run the transformation
transformFoodKeeperData()