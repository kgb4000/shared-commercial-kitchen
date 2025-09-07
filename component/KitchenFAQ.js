'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const KitchenFAQ = ({ kitchen = {} }) => {
  const [openIndex, setOpenIndex] = useState(null)

  const kitchenName = kitchen?.title || kitchen?.name || 'this kitchen'
  const city = kitchen?.city || 'the city'
  const state = kitchen?.state || 'the state'

  const faqs = [
    {
      question: `What are the rental rates at ${kitchenName}?`,
      answer: `${kitchenName} offers flexible rental options including hourly, daily, and monthly rates. Contact them directly at ${kitchen.phone || 'their listed phone number'} for current pricing and availability. Rates typically range from $25-45/hour depending on the time of day and duration of rental.`
    },
    {
      question: `What equipment is included in the rental?`,
      answer: `The kitchen includes commercial-grade equipment such as gas ranges, convection ovens, refrigeration units, prep tables, and cleaning stations. All equipment meets health department standards and is regularly maintained. Contact ${kitchenName} for a complete equipment list.`
    },
    {
      question: `Do I need special permits to use this commercial kitchen?`,
      answer: `Yes, you'll need a business license, food handler's permit, and potentially other permits depending on your food business type. ${kitchenName} can provide guidance on local ${city}, ${state} requirements. The health department requires all users to have current certifications.`
    },
    {
      question: `Can I store ingredients and finished products here?`,
      answer: `Most commercial kitchens offer storage options including refrigerated and dry storage. ${kitchenName} has walk-in coolers and freezers available. Storage fees and policies vary, so check with them about overnight and extended storage options.`
    },
    {
      question: `What are the booking and cancellation policies?`,
      answer: `Advance booking is typically required (24-48 hours minimum). Cancellation policies vary but usually require 24-hour notice to avoid charges. ${kitchenName} may offer recurring bookings for regular users with preferred scheduling.`
    },
    {
      question: `Is the kitchen available for food photography and events?`,
      answer: `Many commercial kitchens accommodate photography sessions, cooking classes, and small events. ${kitchenName} may have special rates for non-production use. Contact them to discuss your specific needs and availability.`
    },
    {
      question: `What insurance do I need to rent this kitchen?`,
      answer: `You'll typically need general liability insurance and may need product liability coverage depending on your business type. Some kitchens require proof of insurance before rental. Check with ${kitchenName} about their specific insurance requirements.`
    },
    {
      question: `Are there restrictions on what types of food I can prepare?`,
      answer: `Commercial kitchens must follow local health department regulations. Certain high-risk foods or processes may have restrictions. ${kitchenName} can advise on what's permitted in their facility based on ${city} health department guidelines.`
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-4 pb-4 border-t border-gray-200">
                <p className="text-gray-700 text-sm leading-relaxed pt-3">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Have more questions?</strong> Contact {kitchenName} directly{' '}
          {kitchen?.phone && (
            <>
              at <a href={`tel:${kitchen.phone}`} className="font-medium hover:underline">
                {kitchen.phone}
              </a>
            </>
          )}
          {kitchen?.phone && kitchen?.website && ' or '}
          {kitchen?.website && (
            <a 
              href={kitchen.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              visit their website
            </a>
          )}
          {!kitchen?.phone && !kitchen?.website && 'through their contact information listed above'}
          .
        </p>
      </div>
    </div>
  )
}

export default KitchenFAQ