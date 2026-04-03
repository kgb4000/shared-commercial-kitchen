export const affiliateLinks = {
  certifications: [
    {
      name: 'ServSafe Food Handler',
      description: 'Get certified to handle food safely',
      url: 'https://www.servsafe.com/ServSafe-Food-Handler',
      category: 'certifications',
    },
    {
      name: 'ServSafe Manager',
      description: 'Management-level food safety certification',
      url: 'https://www.servsafe.com/ServSafe-Manager',
      category: 'certifications',
    },
  ],
  'business-formation': [
    {
      name: 'LegalZoom LLC',
      description: 'Form your food business LLC',
      url: 'https://www.legalzoom.com/business/business-formation/llc-overview.html',
      category: 'business-formation',
    },
    {
      name: 'Incfile',
      description: 'Free LLC formation for your food business',
      url: 'https://www.incfile.com/form-an-llc/',
      category: 'business-formation',
    },
  ],
  insurance: [
    {
      name: 'Next Insurance',
      description: 'Affordable business insurance for food entrepreneurs',
      url: 'https://www.nextinsurance.com/',
      category: 'insurance',
    },
    {
      name: 'FLIP Event Insurance',
      description: 'Event and pop-up food insurance',
      url: 'https://www.fliprogram.com/',
      category: 'insurance',
    },
  ],
  equipment: [
    {
      name: 'WebstaurantStore',
      description: 'Commercial kitchen equipment and supplies',
      url: 'https://www.webstaurantstore.com/',
      category: 'equipment',
    },
    {
      name: 'Amazon Commercial Kitchen',
      description: 'Kitchen equipment with fast shipping',
      url: 'https://www.amazon.com/commercial-kitchen-equipment/b?node=12900641',
      category: 'equipment',
    },
  ],
  software: [
    {
      name: 'Square POS',
      description: 'Free point-of-sale for food businesses',
      url: 'https://squareup.com/us/en/point-of-sale/restaurants',
      category: 'software',
    },
    {
      name: 'Toast POS',
      description: 'Restaurant-grade POS system',
      url: 'https://pos.toasttab.com/',
      category: 'software',
    },
    {
      name: 'QuickBooks',
      description: 'Accounting for small food businesses',
      url: 'https://quickbooks.intuit.com/',
      category: 'software',
    },
  ],
  delivery: [
    {
      name: 'DoorDash for Merchants',
      description: 'Reach more customers with delivery',
      url: 'https://get.doordash.com/',
      category: 'delivery',
    },
    {
      name: 'UberEats for Restaurants',
      description: 'Grow your delivery business',
      url: 'https://merchants.ubereats.com/',
      category: 'delivery',
    },
  ],
}

export function getAffiliateLinks(categories) {
  const links = []
  for (const category of categories) {
    if (affiliateLinks[category]) {
      links.push(...affiliateLinks[category])
    }
  }
  return links
}
