'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Trash2,
  Edit3,
  Package,
  DollarSign,
  Users,
  AlertTriangle,
  TrendingUp,
  ShoppingCart,
} from 'lucide-react'

export default function KitchenTracker() {
  const [activeTab, setActiveTab] = useState('ingredients')
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [sales, setSales] = useState([])
  const [usageHistory, setUsageHistory] = useState([])

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    unit: 'cups',
    pricePerUnit: '',
    currentStock: '',
    minStock: '',
  })

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    servings: '',
    ingredients: [],
  })

  const [selectedRecipe, setSelectedRecipe] = useState('')
  const [quantityToMake, setQuantityToMake] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Load and save data
  useEffect(() => {
    try {
      const savedIngredients = localStorage.getItem('kitchenIngredients')
      const savedRecipes = localStorage.getItem('kitchenRecipes')
      const savedSales = localStorage.getItem('kitchenSales')
      const savedUsageHistory = localStorage.getItem('kitchenUsageHistory')

      if (savedIngredients) setIngredients(JSON.parse(savedIngredients))
      if (savedRecipes) setRecipes(JSON.parse(savedRecipes))
      if (savedSales) setSales(JSON.parse(savedSales))
      if (savedUsageHistory) setUsageHistory(JSON.parse(savedUsageHistory))
    } catch (e) {
      console.error('Error loading data:', e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kitchenIngredients', JSON.stringify(ingredients))
  }, [ingredients])

  useEffect(() => {
    localStorage.setItem('kitchenRecipes', JSON.stringify(recipes))
  }, [recipes])

  useEffect(() => {
    localStorage.setItem('kitchenSales', JSON.stringify(sales))
  }, [sales])

  useEffect(() => {
    localStorage.setItem('kitchenUsageHistory', JSON.stringify(usageHistory))
  }, [usageHistory])

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.pricePerUnit) {
      const ingredient = {
        id: Date.now(),
        name: newIngredient.name,
        unit: newIngredient.unit,
        pricePerUnit: parseFloat(newIngredient.pricePerUnit),
        currentStock: parseFloat(newIngredient.currentStock) || 0,
        minStock: parseFloat(newIngredient.minStock) || 0,
      }
      setIngredients((prev) => [...prev, ingredient])
      setNewIngredient({
        name: '',
        unit: 'cups',
        pricePerUnit: '',
        currentStock: '',
        minStock: '',
      })
    }
  }

  const deleteIngredient = (id) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id))
  }

  const updateIngredient = (id, field, value) => {
    setIngredients((prev) =>
      prev.map((ing) => {
        if (ing.id === id) {
          const isNumericField =
            field.includes('price') || field.includes('Stock')
          return {
            ...ing,
            [field]: isNumericField ? parseFloat(value) || 0 : value,
          }
        }
        return ing
      })
    )
  }

  const addRecipe = () => {
    if (
      newRecipe.name &&
      newRecipe.servings &&
      newRecipe.ingredients.length > 0
    ) {
      const recipe = {
        id: Date.now(),
        name: newRecipe.name,
        servings: parseInt(newRecipe.servings),
        ingredients: newRecipe.ingredients,
      }
      setRecipes((prev) => [...prev, recipe])
      setNewRecipe({ name: '', servings: '', ingredients: [] })
    }
  }

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id))
  }

  const addIngredientToRecipe = () => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredientId: '', quantity: '' }],
    }))
  }

  const updateRecipeIngredient = (index, field, value) => {
    setNewRecipe((prev) => {
      const updatedIngredients = [...prev.ingredients]
      updatedIngredients[index][field] =
        field === 'quantity' ? parseFloat(value) || 0 : value
      return { ...prev, ingredients: updatedIngredients }
    })
  }

  const removeRecipeIngredient = (index) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const calculateRecipeCost = (recipe) => {
    return recipe.ingredients.reduce((total, recipeIng) => {
      const ingredient = ingredients.find(
        (ing) => ing.id === parseInt(recipeIng.ingredientId)
      )
      if (ingredient) {
        return total + ingredient.pricePerUnit * recipeIng.quantity
      }
      return total
    }, 0)
  }

  const calculateCostPerServing = (recipe) => {
    const totalCost = calculateRecipeCost(recipe)
    return recipe.servings > 0 ? totalCost / recipe.servings : 0
  }

  const getLowStockIngredients = () => {
    return ingredients.filter((ing) => ing.currentStock <= ing.minStock)
  }

  const getTotalInventoryValue = () => {
    return ingredients.reduce(
      (total, ing) => total + ing.currentStock * ing.pricePerUnit,
      0
    )
  }

  const recordSale = () => {
    if (!selectedRecipe || !quantityToMake) return

    const recipe = recipes.find((r) => r.id === parseInt(selectedRecipe))
    if (!recipe) return

    // Check ingredient availability
    const insufficientIngredients = []
    for (const recipeIng of recipe.ingredients) {
      const ingredient = ingredients.find(
        (ing) => ing.id === parseInt(recipeIng.ingredientId)
      )
      if (ingredient) {
        const totalNeeded = recipeIng.quantity * parseInt(quantityToMake)
        if (ingredient.currentStock < totalNeeded) {
          insufficientIngredients.push({
            name: ingredient.name,
            needed: totalNeeded,
            available: ingredient.currentStock,
          })
        }
      }
    }

    if (insufficientIngredients.length > 0) {
      const alertMessage = insufficientIngredients
        .map((ing) => `${ing.name}: need ${ing.needed}, have ${ing.available}`)
        .join('\n')
      alert(`Insufficient ingredients:\n${alertMessage}`)
      return
    }

    // Update ingredients and record usage
    const updatedIngredients = [...ingredients]
    const usageEntries = []

    for (const recipeIng of recipe.ingredients) {
      const ingredientIndex = updatedIngredients.findIndex(
        (ing) => ing.id === parseInt(recipeIng.ingredientId)
      )
      if (ingredientIndex !== -1) {
        const totalUsed = recipeIng.quantity * parseInt(quantityToMake)
        updatedIngredients[ingredientIndex].currentStock -= totalUsed

        usageEntries.push({
          id: Date.now() + Math.random(),
          ingredientId: recipeIng.ingredientId,
          ingredientName: updatedIngredients[ingredientIndex].name,
          recipeId: recipe.id,
          recipeName: recipe.name,
          quantityUsed: totalUsed,
          unit: updatedIngredients[ingredientIndex].unit,
          cost: totalUsed * updatedIngredients[ingredientIndex].pricePerUnit,
          timestamp: new Date().toISOString(),
        })
      }
    }

    setIngredients(updatedIngredients)
    setUsageHistory((prev) => [...prev, ...usageEntries])

    const sale = {
      id: Date.now(),
      recipeId: recipe.id,
      recipeName: recipe.name,
      quantity: parseInt(quantityToMake),
      totalServings: recipe.servings * parseInt(quantityToMake),
      totalCost: calculateRecipeCost(recipe) * parseInt(quantityToMake),
      costPerServing: calculateCostPerServing(recipe),
      timestamp: new Date().toISOString(),
    }

    setSales((prev) => [...prev, sale])
    setSelectedRecipe('')
    setQuantityToMake('')
  }

  const deleteSale = (saleId) => {
    const sale = sales.find((s) => s.id === saleId)
    if (!sale) return

    const recipe = recipes.find((r) => r.id === sale.recipeId)
    if (!recipe) return

    // Restore ingredients
    const updatedIngredients = [...ingredients]

    for (const recipeIng of recipe.ingredients) {
      const ingredientIndex = updatedIngredients.findIndex(
        (ing) => ing.id === parseInt(recipeIng.ingredientId)
      )
      if (ingredientIndex !== -1) {
        const totalToRestore = recipeIng.quantity * sale.quantity
        updatedIngredients[ingredientIndex].currentStock += totalToRestore
      }
    }

    setIngredients(updatedIngredients)

    setUsageHistory((prev) =>
      prev.filter(
        (usage) =>
          !(
            usage.recipeId === sale.recipeId &&
            Math.abs(new Date(usage.timestamp) - new Date(sale.timestamp)) <
              1000
          )
      )
    )

    setSales((prev) => prev.filter((s) => s.id !== saleId))
  }

  const getIngredientUsageStats = (ingredientId) => {
    const usage = usageHistory.filter(
      (u) => u.ingredientId === parseInt(ingredientId)
    )
    const totalUsed = usage.reduce((sum, u) => sum + u.quantityUsed, 0)
    const totalCost = usage.reduce((sum, u) => sum + u.cost, 0)
    return { totalUsed, totalCost, usageCount: usage.length }
  }

  const getTotalRevenue = () => {
    return sales.reduce((total, sale) => total + sale.totalCost, 0)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="w-8 h-8" />
            Shared Kitchen Recipe Cost Tracker
          </h1>
          <p className="text-blue-100 mt-2">
            Manage ingredients, track costs, record production, and monitor
            usage
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Ingredients</p>
                <p className="text-2xl font-bold text-blue-600">
                  {ingredients.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inventory Value</p>
                <p className="text-2xl font-bold text-green-600">
                  ${getTotalInventoryValue().toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">
                  {getLowStockIngredients().length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Production Cost</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${getTotalRevenue().toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b bg-white overflow-x-auto">
          {['ingredients', 'recipes', 'production', 'usage', 'analytics'].map(
            (tab) => (
              <button
                key={tab}
                className={`px-6 py-3 font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              {/* Add Ingredient Form */}
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Ingredient
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input
                    type="text"
                    placeholder="Ingredient name"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newIngredient.name}
                    onChange={(e) =>
                      setNewIngredient((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <select
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newIngredient.unit}
                    onChange={(e) =>
                      setNewIngredient((prev) => ({
                        ...prev,
                        unit: e.target.value,
                      }))
                    }
                  >
                    <option value="cups">Cups</option>
                    <option value="lbs">Pounds</option>
                    <option value="oz">Ounces</option>
                    <option value="tbsp">Tablespoons</option>
                    <option value="tsp">Teaspoons</option>
                    <option value="items">Items</option>
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price per unit"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newIngredient.pricePerUnit}
                    onChange={(e) =>
                      setNewIngredient((prev) => ({
                        ...prev,
                        pricePerUnit: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Current stock"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newIngredient.currentStock}
                    onChange={(e) =>
                      setNewIngredient((prev) => ({
                        ...prev,
                        currentStock: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Min stock"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newIngredient.minStock}
                    onChange={(e) =>
                      setNewIngredient((prev) => ({
                        ...prev,
                        minStock: e.target.value,
                      }))
                    }
                  />
                </div>
                <button
                  onClick={addIngredient}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Ingredient
                </button>
              </div>

              {/* Ingredients Table */}
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="text-xl font-semibold">
                    Ingredient Inventory
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Unit
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Price/Unit
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Current Stock
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Min Stock
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Total Used
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ingredients.map((ingredient) => {
                        const usage = getIngredientUsageStats(ingredient.id)
                        return (
                          <tr key={ingredient.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">
                              {ingredient.name}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {ingredient.unit}
                            </td>
                            <td className="px-4 py-3">
                              {editingId === ingredient.id ? (
                                <input
                                  type="number"
                                  step="0.01"
                                  className="w-20 border rounded px-2 py-1 text-sm"
                                  value={ingredient.pricePerUnit}
                                  onChange={(e) =>
                                    updateIngredient(
                                      ingredient.id,
                                      'pricePerUnit',
                                      e.target.value
                                    )
                                  }
                                />
                              ) : (
                                `$${ingredient.pricePerUnit.toFixed(2)}`
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {editingId === ingredient.id ? (
                                <input
                                  type="number"
                                  step="0.01"
                                  className="w-20 border rounded px-2 py-1 text-sm"
                                  value={ingredient.currentStock}
                                  onChange={(e) =>
                                    updateIngredient(
                                      ingredient.id,
                                      'currentStock',
                                      e.target.value
                                    )
                                  }
                                />
                              ) : (
                                ingredient.currentStock
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {editingId === ingredient.id ? (
                                <input
                                  type="number"
                                  step="0.01"
                                  className="w-20 border rounded px-2 py-1 text-sm"
                                  value={ingredient.minStock}
                                  onChange={(e) =>
                                    updateIngredient(
                                      ingredient.id,
                                      'minStock',
                                      e.target.value
                                    )
                                  }
                                />
                              ) : (
                                ingredient.minStock
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {usage.totalUsed.toFixed(2)} {ingredient.unit}
                            </td>
                            <td className="px-4 py-3">
                              {ingredient.currentStock <=
                              ingredient.minStock ? (
                                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                                  Low Stock
                                </span>
                              ) : (
                                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                  In Stock
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    setEditingId(
                                      editingId === ingredient.id
                                        ? null
                                        : ingredient.id
                                    )
                                  }
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    deleteIngredient(ingredient.id)
                                  }
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="space-y-6">
              {/* Add Recipe Form */}
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create New Recipe
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Recipe name"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newRecipe.name}
                    onChange={(e) =>
                      setNewRecipe((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="number"
                    placeholder="Number of servings"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newRecipe.servings}
                    onChange={(e) =>
                      setNewRecipe((prev) => ({
                        ...prev,
                        servings: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Ingredients</h3>
                    <button
                      onClick={addIngredientToRecipe}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Ingredient
                    </button>
                  </div>
                  {newRecipe.ingredients.map((recipeIng, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <select
                        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={recipeIng.ingredientId}
                        onChange={(e) =>
                          updateRecipeIngredient(
                            index,
                            'ingredientId',
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select ingredient</option>
                        {ingredients.map((ing) => (
                          <option key={ing.id} value={ing.id}>
                            {ing.name} ({ing.unit})
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Quantity"
                        className="w-24 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={recipeIng.quantity}
                        onChange={(e) =>
                          updateRecipeIngredient(
                            index,
                            'quantity',
                            e.target.value
                          )
                        }
                      />
                      <button
                        onClick={() => removeRecipeIngredient(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addRecipe}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Recipe
                </button>
              </div>

              {/* Recipes List */}
              <div className="space-y-4">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white p-6 rounded-lg border"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{recipe.name}</h3>
                        <p className="text-gray-600">
                          Serves {recipe.servings}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Cost</p>
                        <p className="text-2xl font-bold text-green-600">
                          ${calculateRecipeCost(recipe).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${calculateCostPerServing(recipe).toFixed(2)} per
                          serving
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Ingredients:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {recipe.ingredients.map((recipeIng, index) => {
                          const ingredient = ingredients.find(
                            (ing) => ing.id === parseInt(recipeIng.ingredientId)
                          )
                          return ingredient ? (
                            <div
                              key={index}
                              className="flex justify-between items-center bg-gray-50 p-2 rounded"
                            >
                              <span>{ingredient.name}</span>
                              <span className="text-gray-600">
                                {recipeIng.quantity} {ingredient.unit} - $
                                {(
                                  ingredient.pricePerUnit * recipeIng.quantity
                                ).toFixed(2)}
                              </span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteRecipe(recipe.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Recipe
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'production' && (
            <div className="space-y-6">
              {/* Record Production Form */}
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Record Production
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedRecipe}
                    onChange={(e) => setSelectedRecipe(e.target.value)}
                  >
                    <option value="">Select recipe</option>
                    {recipes.map((recipe) => (
                      <option key={recipe.id} value={recipe.id}>
                        {recipe.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Quantity to make"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={quantityToMake}
                    onChange={(e) => setQuantityToMake(e.target.value)}
                  />
                  <button
                    onClick={recordSale}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Record Production
                  </button>
                </div>
              </div>

              {/* Production History */}
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="text-xl font-semibold">Production History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Recipe
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Batches
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Total Servings
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Total Cost
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Cost/Serving
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sales
                        .sort(
                          (a, b) =>
                            new Date(b.timestamp) - new Date(a.timestamp)
                        )
                        .map((sale) => (
                          <tr key={sale.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">
                              {new Date(sale.timestamp).toLocaleDateString()}{' '}
                              {new Date(sale.timestamp).toLocaleTimeString()}
                            </td>
                            <td className="px-4 py-3 font-medium">
                              {sale.recipeName}
                            </td>
                            <td className="px-4 py-3">{sale.quantity}</td>
                            <td className="px-4 py-3">{sale.totalServings}</td>
                            <td className="px-4 py-3 text-green-600 font-medium">
                              ${sale.totalCost.toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              ${sale.costPerServing.toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => deleteSale(sale.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Delete and restore ingredients"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b bg-gray-50">
                  <h2 className="text-xl font-semibold">
                    Recent Usage History
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Ingredient
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Recipe
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Quantity Used
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {usageHistory
                        .sort(
                          (a, b) =>
                            new Date(b.timestamp) - new Date(a.timestamp)
                        )
                        .slice(0, 20)
                        .map((usage) => (
                          <tr key={usage.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">
                              {new Date(usage.timestamp).toLocaleDateString()}{' '}
                              {new Date(usage.timestamp).toLocaleTimeString()}
                            </td>
                            <td className="px-4 py-3 font-medium">
                              {usage.ingredientName}
                            </td>
                            <td className="px-4 py-3">{usage.recipeName}</td>
                            <td className="px-4 py-3">
                              {usage.quantityUsed} {usage.unit}
                            </td>
                            <td className="px-4 py-3 text-green-600">
                              ${usage.cost.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Low Stock Alert */}
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Low Stock Alert
                </h3>
                {getLowStockIngredients().length > 0 ? (
                  <div className="space-y-2">
                    {getLowStockIngredients().map((ing) => (
                      <div
                        key={ing.id}
                        className="flex justify-between items-center bg-white p-2 rounded"
                      >
                        <span className="font-medium">{ing.name}</span>
                        <span className="text-red-600">
                          {ing.currentStock} {ing.unit} (Min: {ing.minStock})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-600">
                    All ingredients are well-stocked!
                  </p>
                )}
              </div>

              {/* Recipe Cost Analysis */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">
                  Recipe Cost Analysis
                </h3>
                <div className="space-y-4">
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{recipe.name}</h4>
                        <p className="text-sm text-gray-600">
                          {recipe.servings} servings
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ${calculateRecipeCost(recipe).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          ${calculateCostPerServing(recipe).toFixed(2)}/serving
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory Summary */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">
                  Inventory Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600">
                      Total Inventory Value
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      ${getTotalInventoryValue().toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600">
                      Average Cost per Recipe
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      $
                      {recipes.length > 0
                        ? (
                            recipes.reduce(
                              (sum, recipe) =>
                                sum + calculateRecipeCost(recipe),
                              0
                            ) / recipes.length
                          ).toFixed(2)
                        : '0.00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            📖 How to Use This Tool
          </h2>
        </div>
        <div className="p-6 prose max-w-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Start */}
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                🚀 Quick Start Guide
              </h3>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800">
                    1. Add Ingredients First 📦
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Go to <strong>Ingredients</strong> tab → Fill out form →
                    Click "Add Ingredient"
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    <strong>Example:</strong> Flour, lbs, $3.50, stock: 10, min:
                    2
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">
                    2. Create Recipes 👨‍🍳
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Go to <strong>Recipes</strong> tab → Enter name & servings →
                    Add ingredients → Create
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    <strong>Example:</strong> "Pasta" (4 servings) + 1 lb pasta
                    + 2 cups sauce
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800">
                    3. Record Production 🍳
                  </h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Go to <strong>Production</strong> tab → Select recipe →
                    Enter quantity → Record
                  </p>
                  <p className="text-xs text-purple-600 mt-2">
                    <strong>Magic:</strong> Ingredients automatically removed
                    from inventory!
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800">
                    4. Monitor Kitchen 📊
                  </h4>
                  <p className="text-sm text-orange-700 mt-1">
                    Check <strong>Usage History</strong> &{' '}
                    <strong>Analytics</strong> for insights
                  </p>
                  <p className="text-xs text-orange-600 mt-2">
                    <strong>Benefits:</strong> Low stock alerts, cost tracking,
                    usage reports
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                ✨ Key Features
              </h3>

              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">
                    Automatic Inventory Tracking
                  </h4>
                  <p className="text-sm text-gray-600">
                    Ingredients are automatically deducted when you record
                    production
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Real-Time Cost Calculation</h4>
                  <p className="text-sm text-gray-600">
                    See recipe costs and cost-per-serving instantly
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold">Low Stock Alerts</h4>
                  <p className="text-sm text-gray-600">
                    Get notified when ingredients are running low
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold">Complete Usage History</h4>
                  <p className="text-sm text-gray-600">
                    Track exactly when and how much of each ingredient was used
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold">Production Reversal</h4>
                  <p className="text-sm text-gray-600">
                    Made a mistake? Delete production to restore ingredients
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Instructions */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              📋 Detailed Instructions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Ingredients */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-3">
                  Managing Ingredients
                </h4>
                <ul className="text-sm space-y-2">
                  <li>
                    • Click <strong>Ingredients</strong> tab
                  </li>
                  <li>• Fill all form fields</li>
                  <li>• Use pencil icon ✏️ to edit</li>
                  <li>• Red status = low stock</li>
                  <li>• "Total Used" shows consumption</li>
                </ul>
              </div>

              {/* Recipes */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-600 mb-3">
                  Creating Recipes
                </h4>
                <ul className="text-sm space-y-2">
                  <li>• Enter recipe name & servings</li>
                  <li>• Click "Add Ingredient" button</li>
                  <li>• Select from dropdown menu</li>
                  <li>• Enter quantity needed</li>
                  <li>• Costs calculated automatically</li>
                </ul>
              </div>

              {/* Production */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-600 mb-3">
                  Recording Production
                </h4>
                <ul className="text-sm space-y-2">
                  <li>• Select recipe from dropdown</li>
                  <li>• Enter number of batches</li>
                  <li>• System checks availability</li>
                  <li>• Ingredients auto-deducted</li>
                  <li>• Use trash icon to reverse</li>
                </ul>
              </div>

              {/* Analytics */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-600 mb-3">
                  Monitoring & Analytics
                </h4>
                <ul className="text-sm space-y-2">
                  <li>
                    • <strong>Usage History:</strong> Recent activity
                  </li>
                  <li>
                    • <strong>Analytics:</strong> Low stock alerts
                  </li>
                  <li>
                    • <strong>Dashboard:</strong> Key metrics
                  </li>
                  <li>• Recipe cost comparisons</li>
                  <li>• Inventory value tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips & Important Notes */}
          <div className="mt-8 pt-6 border-t">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-green-600 mb-4">
                  💡 Pro Tips
                </h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm">
                      <strong>Start Small:</strong> Add 5-10 common ingredients
                      first
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm">
                      <strong>Update Prices:</strong> Keep ingredient costs
                      current for accurate tracking
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-sm">
                      <strong>Set Realistic Minimums:</strong> Low stock alerts
                      help prevent running out
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="text-sm">
                      <strong>Record Immediately:</strong> Log production right
                      after cooking
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-red-600 mb-4">
                  ⚠️ Important Notes
                </h4>
                <div className="space-y-3">
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                    <p className="text-sm">
                      <strong>Data Storage:</strong> Saves automatically to your
                      browser (local only)
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                    <p className="text-sm">
                      <strong>Offline Ready:</strong> Works without internet
                      connection
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                    <p className="text-sm">
                      <strong>Device Specific:</strong> Data stays on this
                      computer/browser
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                    <p className="text-sm">
                      <strong>Backup Reminder:</strong> Consider screenshots of
                      important data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              🔧 Common Issues & Solutions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-red-700">
                    ❌ "Insufficient ingredients" error
                  </h5>
                  <ul className="text-sm text-red-600 mt-2 space-y-1">
                    <li>• Check current stock levels</li>
                    <li>• Update inventory after restocking</li>
                    <li>• Verify recipe quantities are correct</li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-700">
                    ❌ Data disappeared after closing browser
                  </h5>
                  <ul className="text-sm text-blue-600 mt-2 space-y-1">
                    <li>• Check browser privacy settings</li>
                    <li>• Ensure same browser is being used</li>
                    <li>• Avoid clearing browser data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Example Workflow */}
          <div className="mt-8 pt-6 border-t bg-gradient-to-r from-blue-50 to-purple-50 -mx-6 px-6 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              🎯 Example: Setting Up Pancake Recipe
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="font-semibold text-blue-600 text-sm">
                  1. Add Ingredients
                </h5>
                <ul className="text-xs mt-2 space-y-1">
                  <li>Flour: 5 lbs, $3.50/lb</li>
                  <li>Eggs: 12 items, $0.25/each</li>
                  <li>Milk: 8 cups, $0.30/cup</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="font-semibold text-green-600 text-sm">
                  2. Create Recipe
                </h5>
                <ul className="text-xs mt-2 space-y-1">
                  <li>Name: "Pancakes"</li>
                  <li>Servings: 4</li>
                  <li>Ingredients: 2 cups flour, 2 eggs, 1 cup milk</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="font-semibold text-purple-600 text-sm">
                  3. Record Production
                </h5>
                <ul className="text-xs mt-2 space-y-1">
                  <li>Select "Pancakes"</li>
                  <li>Enter "1" batch</li>
                  <li>Click "Record Production"</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="font-semibold text-orange-600 text-sm">
                  4. Results
                </h5>
                <ul className="text-xs mt-2 space-y-1">
                  <li>Flour: 5 → 3 lbs</li>
                  <li>Eggs: 12 → 10 items</li>
                  <li>Milk: 8 → 7 cups</li>
                  <li>Total cost: $8.35</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                🎉{' '}
                <strong>
                  You're now tracking ingredient costs and usage like a pro!
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
