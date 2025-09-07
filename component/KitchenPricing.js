'use client'

import { DollarSign, Clock, Calendar, Shield } from 'lucide-react'

const KitchenPricing = ({ kitchen = {}, pricing }) => {
  // Extract or generate pricing data with safe fallbacks
  const pricingInfo = pricing || {
    hourly: kitchen?.hourlyRate || 'Contact for pricing',
    daily: kitchen?.dailyRate || 'Available',
    monthly: kitchen?.monthlyRate || 'Available',
    deposit: kitchen?.deposit || 'Required',
    cleaningFee: kitchen?.cleaningFee || 'Included'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
        <h3 className="text-lg font-semibold">Pricing & Rates</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="w-4 h-4 text-green-600 mr-1" />
              <span className="font-medium text-sm">Hourly Rate</span>
            </div>
            <p className="text-lg font-bold text-green-700">{pricingInfo.hourly}</p>
            <p className="text-xs text-gray-600">Minimum 4 hours</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-blue-600 mr-1" />
              <span className="font-medium text-sm">Daily Rate</span>
            </div>
            <p className="text-lg font-bold text-blue-700">{pricingInfo.daily}</p>
            <p className="text-xs text-gray-600">8-12 hour blocks</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium mb-3">Additional Fees</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Security Deposit</span>
              <span className="font-medium">{pricingInfo.deposit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cleaning Fee</span>
              <span className="font-medium">{pricingInfo.cleaningFee}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="flex items-start">
            <Shield className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Pricing Notice</p>
              <p className="text-yellow-700">Rates may vary by season and availability. Contact directly for current pricing and special packages.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KitchenPricing