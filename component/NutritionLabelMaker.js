'use client'

import React, { useState } from 'react'

import { Download, RefreshCw, Info } from 'lucide-react'

const NutritionLabelMaker = () => {
  const [formData, setFormData] = useState({
    servings: 8,
    servingSize: '2/3 cup (55g)',
    calories: 230,
    totalFat: 8,
    saturatedFat: 1,
    transFat: 0,
    cholesterol: 0,
    sodium: 160,
    totalCarbs: 37,
    dietaryFiber: 4,
    totalSugars: 12,
    addedSugars: 10,
    protein: 3,
    vitaminD: 2,
    calcium: 260,
    iron: 8,
    potassium: 240,
  })

  const [selectedLayout, setSelectedLayout] = useState('standard-vertical')

  const layouts = [
    {
      id: 'standard-vertical',
      name: 'Standard Vertical',
      description: 'Most common format for regular products',
    },
    {
      id: 'standard-bilingual',
      name: 'Standard Vertical Bilingual',
      description: 'Standard format in English/Spanish',
    },
    {
      id: 'simplified-display',
      name: 'Simplified Display',
      description: 'For products with limited nutrients',
    },
    {
      id: 'simplified-bilingual',
      name: 'Simplified Display Bilingual',
      description: 'Simplified format in English/Spanish',
    },
    {
      id: 'dual-column',
      name: 'Dual Column Display',
      description: 'Per serving and per container',
    },
    {
      id: 'dual-column-bilingual',
      name: 'Dual Column Bilingual',
      description: 'Dual column in English/Spanish',
    },
    {
      id: 'tabular-display',
      name: 'Tabular Display',
      description: 'For small packages',
    },
    {
      id: 'tabular-bilingual',
      name: 'Tabular Display Bilingual',
      description: 'Table format in English/Spanish',
    },
    {
      id: 'linear-display',
      name: 'Linear Display',
      description: 'For very small packages',
    },
    {
      id: 'linear-bilingual',
      name: 'Linear Display Bilingual',
      description: 'Linear format in English/Spanish',
    },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculatePercent = (value, dailyValue) => {
    return Math.round((value / dailyValue) * 100)
  }

  const dailyValues = {
    totalFat: 65,
    saturatedFat: 20,
    cholesterol: 300,
    sodium: 2300,
    totalCarbs: 300,
    dietaryFiber: 25,
    addedSugars: 50,
    vitaminD: 20,
    calcium: 1300,
    iron: 18,
    potassium: 4700,
  }

  const resetForm = () => {
    setFormData({
      servings: 8,
      servingSize: '2/3 cup (55g)',
      calories: 230,
      totalFat: 8,
      saturatedFat: 1,
      transFat: 0,
      cholesterol: 0,
      sodium: 160,
      totalCarbs: 37,
      dietaryFiber: 4,
      totalSugars: 12,
      addedSugars: 10,
      protein: 3,
      vitaminD: 2,
      calcium: 260,
      iron: 8,
      potassium: 240,
    })
  }

  const downloadLabel = () => {
    alert('Download functionality would be implemented here')
  }

  const renderStandardVertical = () => (
    <div className="max-w-sm mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1 border-b-8 border-black">
        <div className="text-3xl font-bold text-center">Nutrition Facts</div>
        <div className="text-sm mt-1">
          {formData.servings} servings per container
        </div>
        <div className="text-sm font-bold">
          Serving size{' '}
          <span className="float-right">{formData.servingSize}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b-4 border-black">
        <div className="text-sm">Amount per serving</div>
        <div className="text-4xl font-bold">
          Calories <span className="float-right">{formData.calories}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b border-black">
        <div className="text-sm font-bold text-right">% Daily Value*</div>
      </div>

      <div className="px-2 text-sm">
        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Total Fat {formData.totalFat}g
            <span className="float-right font-bold">
              {calculatePercent(formData.totalFat, dailyValues.totalFat)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-4">
            Saturated Fat {formData.saturatedFat}g
            <span className="float-right font-bold">
              {calculatePercent(
                formData.saturatedFat,
                dailyValues.saturatedFat
              )}
              %
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-4 italic">Trans Fat {formData.transFat}g</div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Cholesterol {formData.cholesterol}mg
            <span className="float-right font-bold">
              {calculatePercent(formData.cholesterol, dailyValues.cholesterol)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Sodium {formData.sodium}mg
            <span className="float-right font-bold">
              {calculatePercent(formData.sodium, dailyValues.sodium)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Total Carbohydrate {formData.totalCarbs}g
            <span className="float-right font-bold">
              {calculatePercent(formData.totalCarbs, dailyValues.totalCarbs)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-4">
            Dietary Fiber {formData.dietaryFiber}g
            <span className="float-right font-bold">
              {calculatePercent(
                formData.dietaryFiber,
                dailyValues.dietaryFiber
              )}
              %
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-4">Total Sugars {formData.totalSugars}g</div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-8">
            Includes {formData.addedSugars}g Added Sugars
            <span className="float-right font-bold">
              {calculatePercent(formData.addedSugars, dailyValues.addedSugars)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b-4 border-black">
          <div className="font-bold">Protein {formData.protein}g</div>
        </div>

        <div className="py-1 border-b border-black">
          <div>
            Vitamin D {formData.vitaminD}mcg
            <span className="float-right">
              {calculatePercent(formData.vitaminD, dailyValues.vitaminD)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div>
            Calcium {formData.calcium}mg
            <span className="float-right">
              {calculatePercent(formData.calcium, dailyValues.calcium)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div>
            Iron {formData.iron}mg
            <span className="float-right">
              {calculatePercent(formData.iron, dailyValues.iron)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b-4 border-black">
          <div>
            Potassium {formData.potassium}mg
            <span className="float-right">
              {calculatePercent(formData.potassium, dailyValues.potassium)}%
            </span>
          </div>
        </div>

        <div className="py-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </div>
      </div>
    </div>
  )

  const renderStandardBilingual = () => (
    <div className="max-w-sm mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1 border-b-8 border-black">
        <div className="text-2xl font-bold text-center">
          Nutrition Facts / Datos de Nutrición
        </div>
        <div className="text-sm mt-1">
          {formData.servings} servings per container / {formData.servings}{' '}
          porciones por envase
        </div>
        <div className="text-sm font-bold">
          Serving size / Tamaño de porción{' '}
          <span className="float-right">{formData.servingSize}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b-4 border-black">
        <div className="text-sm">Amount per serving / Cantidad por porción</div>
        <div className="text-4xl font-bold">
          Calories / Calorías{' '}
          <span className="float-right">{formData.calories}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b border-black">
        <div className="text-sm font-bold text-right">
          % Daily Value* / % Valor Diario*
        </div>
      </div>

      <div className="px-2 text-sm">
        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Total Fat / Grasa Total {formData.totalFat}g
            <span className="float-right font-bold">
              {calculatePercent(formData.totalFat, dailyValues.totalFat)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-4">
            Saturated Fat / Grasa Saturada {formData.saturatedFat}g
            <span className="float-right font-bold">
              {calculatePercent(
                formData.saturatedFat,
                dailyValues.saturatedFat
              )}
              %
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-4 italic">
            Trans Fat / Grasa Trans {formData.transFat}g
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Cholesterol / Colesterol {formData.cholesterol}mg
            <span className="float-right font-bold">
              {calculatePercent(formData.cholesterol, dailyValues.cholesterol)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Sodium / Sodio {formData.sodium}mg
            <span className="float-right font-bold">
              {calculatePercent(formData.sodium, dailyValues.sodium)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Total Carbohydrate / Carbohidrato Total {formData.totalCarbs}g
            <span className="float-right font-bold">
              {calculatePercent(formData.totalCarbs, dailyValues.totalCarbs)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-4">
            Dietary Fiber / Fibra Dietética {formData.dietaryFiber}g
            <span className="float-right font-bold">
              {calculatePercent(
                formData.dietaryFiber,
                dailyValues.dietaryFiber
              )}
              %
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-4">
            Total Sugars / Azúcares Totales {formData.totalSugars}g
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="ml-8">
            Includes {formData.addedSugars}g Added Sugars / Incluye{' '}
            {formData.addedSugars}g Azúcares Añadidos
            <span className="float-right font-bold">
              {calculatePercent(formData.addedSugars, dailyValues.addedSugars)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b-4 border-black">
          <div className="font-bold">
            Protein / Proteína {formData.protein}g
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div>
            Vitamin D / Vitamina D {formData.vitaminD}mcg
            <span className="float-right">
              {calculatePercent(formData.vitaminD, dailyValues.vitaminD)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div>
            Calcium / Calcio {formData.calcium}mg
            <span className="float-right">
              {calculatePercent(formData.calcium, dailyValues.calcium)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div>
            Iron / Hierro {formData.iron}mg
            <span className="float-right">
              {calculatePercent(formData.iron, dailyValues.iron)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b-4 border-black">
          <div>
            Potassium / Potasio {formData.potassium}mg
            <span className="float-right">
              {calculatePercent(formData.potassium, dailyValues.potassium)}%
            </span>
          </div>
        </div>

        <div className="py-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice. / * El % Valor Diario (VD) le dice cuánto un
          nutriente contribuye a una dieta diaria. 2,000 calorías al día se usan
          para consejos generales.
        </div>
      </div>
    </div>
  )

  const renderSimplifiedDisplay = () => (
    <div className="max-w-sm mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1 border-b-8 border-black">
        <div className="text-3xl font-bold text-center">Nutrition Facts</div>
        <div className="text-sm mt-1">
          {formData.servings} servings per container
        </div>
        <div className="text-sm font-bold">
          Serving size{' '}
          <span className="float-right">{formData.servingSize}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b-4 border-black">
        <div className="text-sm">Amount per serving</div>
        <div className="text-4xl font-bold">
          Calories <span className="float-right">{formData.calories}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b border-black">
        <div className="text-sm font-bold text-right">% Daily Value*</div>
      </div>

      <div className="px-2 text-sm">
        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Total Fat {formData.totalFat}g
            <span className="float-right font-bold">
              {calculatePercent(formData.totalFat, dailyValues.totalFat)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Sodium {formData.sodium}mg
            <span className="float-right font-bold">
              {calculatePercent(formData.sodium, dailyValues.sodium)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Total Carbohydrate {formData.totalCarbs}g
            <span className="float-right font-bold">
              {calculatePercent(formData.totalCarbs, dailyValues.totalCarbs)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b-4 border-black">
          <div className="font-bold">Protein {formData.protein}g</div>
        </div>

        <div className="py-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </div>
      </div>
    </div>
  )

  const renderSimplifiedBilingual = () => (
    <div className="max-w-sm mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1 border-b-8 border-black">
        <div className="text-2xl font-bold text-center">
          Nutrition Facts / Datos de Nutrición
        </div>
        <div className="text-sm mt-1">
          {formData.servings} servings per container / {formData.servings}{' '}
          porciones por envase
        </div>
        <div className="text-sm font-bold">
          Serving size / Tamaño de porción{' '}
          <span className="float-right">{formData.servingSize}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b-4 border-black">
        <div className="text-sm">Amount per serving / Cantidad por porción</div>
        <div className="text-4xl font-bold">
          Calories / Calorías{' '}
          <span className="float-right">{formData.calories}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b border-black">
        <div className="text-sm font-bold text-right">
          % Daily Value* / % Valor Diario*
        </div>
      </div>

      <div className="px-2 text-sm">
        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Total Fat / Grasa Total {formData.totalFat}g
            <span className="float-right font-bold">
              {calculatePercent(formData.totalFat, dailyValues.totalFat)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Sodium / Sodio {formData.sodium}mg
            <span className="float-right font-bold">
              {calculatePercent(formData.sodium, dailyValues.sodium)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">
            Total Carbohydrate / Carbohidrato Total {formData.totalCarbs}g
            <span className="float-right font-bold">
              {calculatePercent(formData.totalCarbs, dailyValues.totalCarbs)}%
            </span>
          </div>
        </div>

        <div className="py-1 border-b-4 border-black">
          <div className="font-bold">
            Protein / Proteína {formData.protein}g
          </div>
        </div>

        <div className="py-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice. / * El % Valor Diario (VD) le dice cuánto un
          nutriente contribuye a una dieta diaria. 2,000 calorías al día se usan
          para consejos generales.
        </div>
      </div>
    </div>
  )

  const renderDualColumn = () => (
    <div className="max-w-lg mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1 border-b-8 border-black">
        <div className="text-3xl font-bold text-center">Nutrition Facts</div>
        <div className="text-sm mt-1">
          {formData.servings} servings per container
        </div>
        <div className="text-sm font-bold">
          Serving size{' '}
          <span className="float-right">{formData.servingSize}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b-4 border-black">
        <div className="text-sm">Amount per serving</div>
        <div className="grid grid-cols-2 gap-4 text-2xl font-bold">
          <div>Calories {formData.calories}</div>
          <div>Per Package {formData.calories * formData.servings}</div>
        </div>
      </div>

      <div className="px-2 py-1 border-b border-black">
        <div className="grid grid-cols-2 gap-4 text-sm font-bold">
          <div className="text-right">% Daily Value*</div>
          <div className="text-right">% Daily Value*</div>
        </div>
      </div>

      <div className="px-2 text-sm">
        <div className="py-1 border-b border-black">
          <div className="font-bold">Total Fat</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {formData.totalFat}g
              <span className="float-right font-bold">
                {calculatePercent(formData.totalFat, dailyValues.totalFat)}%
              </span>
            </div>
            <div>
              {formData.totalFat * formData.servings}g
              <span className="float-right font-bold">
                {calculatePercent(
                  formData.totalFat * formData.servings,
                  dailyValues.totalFat
                )}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">Sodium</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {formData.sodium}mg
              <span className="float-right font-bold">
                {calculatePercent(formData.sodium, dailyValues.sodium)}%
              </span>
            </div>
            <div>
              {formData.sodium * formData.servings}mg
              <span className="float-right font-bold">
                {calculatePercent(
                  formData.sodium * formData.servings,
                  dailyValues.sodium
                )}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">Total Carbohydrate</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {formData.totalCarbs}g
              <span className="float-right font-bold">
                {calculatePercent(formData.totalCarbs, dailyValues.totalCarbs)}%
              </span>
            </div>
            <div>
              {formData.totalCarbs * formData.servings}g
              <span className="float-right font-bold">
                {calculatePercent(
                  formData.totalCarbs * formData.servings,
                  dailyValues.totalCarbs
                )}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="py-1 border-b-4 border-black">
          <div className="font-bold">Protein</div>
          <div className="grid grid-cols-2 gap-4">
            <div>{formData.protein}g</div>
            <div>{formData.protein * formData.servings}g</div>
          </div>
        </div>

        <div className="py-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </div>
      </div>
    </div>
  )
  const renderDualColumnBilingual = () => (
    <div className="max-w-lg mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1 border-b-8 border-black">
        <div className="text-2xl font-bold text-center">
          Nutrition Facts / Datos de Nutrición
        </div>
        <div className="text-sm mt-1">
          {formData.servings} servings per container / {formData.servings}{' '}
          porciones por envase
        </div>
        <div className="text-sm font-bold">
          Serving size / Tamaño de porción{' '}
          <span className="float-right">{formData.servingSize}</span>
        </div>
      </div>

      <div className="px-2 py-1 border-b-4 border-black">
        <div className="text-sm">Amount per serving / Cantidad por porción</div>
        <div className="grid grid-cols-2 gap-4 text-xl font-bold">
          <div>Calories / Calorías {formData.calories}</div>
          <div>
            Per Package / Por Envase {formData.calories * formData.servings}
          </div>
        </div>
      </div>

      <div className="px-2 py-1 border-b border-black">
        <div className="grid grid-cols-2 gap-4 text-sm font-bold">
          <div className="text-right">% Daily Value* / % Valor Diario*</div>
          <div className="text-right">% Daily Value* / % Valor Diario*</div>
        </div>
      </div>

      <div className="px-2 text-sm">
        <div className="py-1 border-b border-black">
          <div className="font-bold">Total Fat / Grasa Total</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {formData.totalFat}g
              <span className="float-right font-bold">
                {calculatePercent(formData.totalFat, dailyValues.totalFat)}%
              </span>
            </div>
            <div>
              {formData.totalFat * formData.servings}g
              <span className="float-right font-bold">
                {calculatePercent(
                  formData.totalFat * formData.servings,
                  dailyValues.totalFat
                )}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="py-1 border-b border-black">
          <div className="font-bold">Sodium / Sodio</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {formData.sodium}mg
              <span className="float-right font-bold">
                {calculatePercent(formData.sodium, dailyValues.sodium)}%
              </span>
            </div>
            <div>
              {formData.sodium * formData.servings}mg
              <span className="float-right font-bold">
                {calculatePercent(
                  formData.sodium * formData.servings,
                  dailyValues.sodium
                )}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="py-1 border-b-4 border-black">
          <div className="font-bold">Protein / Proteína</div>
          <div className="grid grid-cols-2 gap-4">
            <div>{formData.protein}g</div>
            <div>{formData.protein * formData.servings}g</div>
          </div>
        </div>

        <div className="py-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient contributes to
          a daily diet. / * El % Valor Diario (VD) le dice cuánto un nutriente
          contribuye a una dieta diaria.
        </div>
      </div>
    </div>
  )

  const renderTabularBilingual = () => (
    <div className="max-w-2xl mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1 border-b-8 border-black">
        <div className="text-xl font-bold text-center">
          Nutrition Facts / Datos de Nutrición
        </div>
        <div className="text-sm">
          Serving size / Tamaño de porción {formData.servingSize} • Servings per
          container / Porciones por envase {formData.servings}
        </div>
      </div>

      <div className="px-2 py-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-1">
                Amount per serving / Cantidad por porción
              </th>
              <th className="text-right py-1">
                % Daily Value* / % Valor Diario*
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">
                Calories / Calorías {formData.calories}
              </td>
              <td></td>
            </tr>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">
                Total Fat / Grasa Total {formData.totalFat}g
              </td>
              <td className="text-right font-bold">
                {calculatePercent(formData.totalFat, dailyValues.totalFat)}%
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">
                Sodium / Sodio {formData.sodium}mg
              </td>
              <td className="text-right font-bold">
                {calculatePercent(formData.sodium, dailyValues.sodium)}%
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">
                Protein / Proteína {formData.protein}g
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="py-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient contributes to
          a daily diet. / * El % Valor Diario (VD) le dice cuánto un nutriente
          contribuye a una dieta diaria.
        </div>
      </div>
    </div>
  )

  const renderTabularDisplay = () => (
    <div className="max-w-2xl mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1 border-b-8 border-black">
        <div className="text-2xl font-bold text-center">Nutrition Facts</div>
        <div className="text-sm">
          Serving size {formData.servingSize} • Servings per container{' '}
          {formData.servings}
        </div>
      </div>

      <div className="px-2 py-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-1">Amount per serving</th>
              <th className="text-right py-1">% Daily Value*</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">Calories {formData.calories}</td>
              <td></td>
            </tr>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">Total Fat {formData.totalFat}g</td>
              <td className="text-right font-bold">
                {calculatePercent(formData.totalFat, dailyValues.totalFat)}%
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">Sodium {formData.sodium}mg</td>
              <td className="text-right font-bold">
                {calculatePercent(formData.sodium, dailyValues.sodium)}%
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">
                Total Carbohydrate {formData.totalCarbs}g
              </td>
              <td className="text-right font-bold">
                {calculatePercent(formData.totalCarbs, dailyValues.totalCarbs)}%
              </td>
            </tr>
            <tr className="border-b border-black">
              <td className="py-1 font-bold">Protein {formData.protein}g</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="py-1 text-xs">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </div>
      </div>
    </div>
  )

  const renderLinearBilingual = () => (
    <div className="max-w-4xl mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1">
        <div className="text-lg font-bold mb-2">
          Nutrition Facts / Datos de Nutrición
        </div>
        <div className="text-sm flex flex-wrap items-center gap-2">
          <span>Serving size / Tamaño de porción {formData.servingSize}</span>
          <span>•</span>
          <span>
            Servings per container / Porciones por envase {formData.servings}
          </span>
          <span>•</span>
          <span className="font-bold">
            Calories / Calorías {formData.calories}
          </span>
          <span>•</span>
          <span>
            Total Fat / Grasa Total {formData.totalFat}g (
            {calculatePercent(formData.totalFat, dailyValues.totalFat)}% DV /
            VD)
          </span>
          <span>•</span>
          <span>
            Sodium / Sodio {formData.sodium}mg (
            {calculatePercent(formData.sodium, dailyValues.sodium)}% DV / VD)
          </span>
          <span>•</span>
          <span>Protein / Proteína {formData.protein}g</span>
        </div>
        <div className="text-xs mt-2">
          * The % Daily Value (DV) tells you how much a nutrient contributes to
          a daily diet. / * El % Valor Diario (VD) le dice cuánto un nutriente
          contribuye a una dieta diaria.
        </div>
      </div>
    </div>
  )

  const renderLinearDisplay = () => (
    <div className="max-w-4xl mx-auto bg-white border-2 border-black font-mono text-black">
      <div className="px-2 py-1">
        <div className="text-lg font-bold mb-2">Nutrition Facts</div>
        <div className="text-sm flex flex-wrap items-center gap-2">
          <span>Serving size {formData.servingSize}</span>
          <span>•</span>
          <span>Servings per container {formData.servings}</span>
          <span>•</span>
          <span className="font-bold">Calories {formData.calories}</span>
          <span>•</span>
          <span>
            Total Fat {formData.totalFat}g (
            {calculatePercent(formData.totalFat, dailyValues.totalFat)}% DV)
          </span>
          <span>•</span>
          <span>
            Sodium {formData.sodium}mg (
            {calculatePercent(formData.sodium, dailyValues.sodium)}% DV)
          </span>
          <span>•</span>
          <span>
            Total Carb {formData.totalCarbs}g (
            {calculatePercent(formData.totalCarbs, dailyValues.totalCarbs)}% DV)
          </span>
          <span>•</span>
          <span>Protein {formData.protein}g</span>
        </div>
        <div className="text-xs mt-2">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </div>
      </div>
    </div>
  )

  const renderNutritionLabel = () => {
    switch (selectedLayout) {
      case 'standard-vertical':
        return renderStandardVertical()
      case 'standard-bilingual':
        return renderStandardBilingual()
      case 'simplified-display':
        return renderSimplifiedDisplay()
      case 'simplified-bilingual':
        return renderSimplifiedBilingual()
      case 'dual-column':
        return renderDualColumn()
      case 'dual-column-bilingual':
        return renderDualColumnBilingual()
      case 'tabular-display':
        return renderTabularDisplay()
      case 'tabular-bilingual':
        return renderTabularBilingual()
      case 'linear-display':
        return renderLinearDisplay()
      case 'linear-bilingual':
        return renderLinearBilingual()
      default:
        return renderStandardVertical()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Nutrition Label maker
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create FDA-compliant nutrition labels for your food products
            instantly. Save $300-800 per product with our professional-grade
            label generator.
          </p>
          <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Info className="w-4 h-4 mr-1" />
              FDA Compliant
            </span>
            <span>•</span>
            <span>Free Download</span>
            <span>•</span>
            <span>Instant Generation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Enter Nutrition Information
              </h2>
              <button
                onClick={resetForm}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Servings per container
                    </label>
                    <input
                      type="number"
                      value={formData.servings}
                      onChange={(e) =>
                        handleInputChange('servings', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Serving size
                    </label>
                    <input
                      type="text"
                      value={formData.servingSize}
                      onChange={(e) =>
                        handleInputChange('servingSize', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Calories</h3>
                <div className="w-full max-w-xs">
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) =>
                      handleInputChange('calories', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Macronutrients
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Fat (g)
                    </label>
                    <input
                      type="number"
                      value={formData.totalFat}
                      onChange={(e) =>
                        handleInputChange('totalFat', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Saturated Fat (g)
                    </label>
                    <input
                      type="number"
                      value={formData.saturatedFat}
                      onChange={(e) =>
                        handleInputChange('saturatedFat', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trans Fat (g)
                    </label>
                    <input
                      type="number"
                      value={formData.transFat}
                      onChange={(e) =>
                        handleInputChange('transFat', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cholesterol (mg)
                    </label>
                    <input
                      type="number"
                      value={formData.cholesterol}
                      onChange={(e) =>
                        handleInputChange('cholesterol', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sodium (mg)
                    </label>
                    <input
                      type="number"
                      value={formData.sodium}
                      onChange={(e) =>
                        handleInputChange('sodium', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Carbohydrates (g)
                    </label>
                    <input
                      type="number"
                      value={formData.totalCarbs}
                      onChange={(e) =>
                        handleInputChange('totalCarbs', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dietary Fiber (g)
                    </label>
                    <input
                      type="number"
                      value={formData.dietaryFiber}
                      onChange={(e) =>
                        handleInputChange('dietaryFiber', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Sugars (g)
                    </label>
                    <input
                      type="number"
                      value={formData.totalSugars}
                      onChange={(e) =>
                        handleInputChange('totalSugars', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Added Sugars (g)
                    </label>
                    <input
                      type="number"
                      value={formData.addedSugars}
                      onChange={(e) =>
                        handleInputChange('addedSugars', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      value={formData.protein}
                      onChange={(e) =>
                        handleInputChange('protein', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Vitamins & Minerals
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vitamin D (mcg)
                    </label>
                    <input
                      type="number"
                      value={formData.vitaminD}
                      onChange={(e) =>
                        handleInputChange('vitaminD', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calcium (mg)
                    </label>
                    <input
                      type="number"
                      value={formData.calcium}
                      onChange={(e) =>
                        handleInputChange('calcium', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Iron (mg)
                    </label>
                    <input
                      type="number"
                      value={formData.iron}
                      onChange={(e) =>
                        handleInputChange('iron', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Potassium (mg)
                    </label>
                    <input
                      type="number"
                      value={formData.potassium}
                      onChange={(e) =>
                        handleInputChange('potassium', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Label Preview
              </h2>
              <button
                onClick={downloadLabel}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Select Layout
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {layouts.map((layout) => (
                  <label
                    key={layout.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedLayout === layout.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="layout"
                      value={layout.id}
                      checked={selectedLayout === layout.id}
                      onChange={(e) => setSelectedLayout(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {layout.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {layout.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {renderNutritionLabel()}
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Use Our Nutrition Label Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">$0</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Completely Free
              </h3>
              <p className="text-gray-600">
                Save $300-800 per product that professional labs typically
                charge for nutrition label creation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                FDA Compliant
              </h3>
              <p className="text-gray-600">
                Generate labels that meet all FDA requirements for food labeling
                regulations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Instant Results
              </h3>
              <p className="text-gray-600">
                Create professional nutrition labels in seconds, not weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionLabelMaker
