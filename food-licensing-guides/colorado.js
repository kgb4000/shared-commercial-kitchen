const coloradoGuide = {
  title: 'Step-by-Step Guide: Licensing a Food Business in Colorado',
  subtitle: 'Shared-Use Commercial Kitchens',
  intro:
    'This guide outlines the typical process for obtaining the necessary licenses and permits for a food business operating from a shared-use commercial kitchen in Colorado. Always confirm the latest requirements with your local county health department and other relevant authorities.',

  steps: [
    {
      title: 'Step 1: Foundational Business Setup & Legalities',
      sections: [
        {
          title: '1.1 Define Your Business Concept',
          actions: [
            'Solidify your menu, target market, and operational plan within the shared kitchen environment.',
            'Develop a comprehensive business plan to guide strategy and funding.',
          ],
        },
        {
          title: '1.2 Choose Your Business Structure & Name',
          actions: [
            'Decide on a legal structure (e.g., LLC, Sole Proprietorship, Corporation).',
            'Verify business name availability with the Colorado Secretary of State.',
          ],
        },
        {
          title: '1.3 Register Your Business Entity',
          actions: [
            'File entity documents with the Colorado Secretary of State.',
            'Use online filing portal for faster processing.',
          ],
        },
        {
          title: '1.4 Obtain a Federal EIN',
          actions: [
            'Apply through the IRS even if you don’t yet have employees.',
          ],
        },
        {
          title: '1.5 Secure Business Insurance',
          actions: [
            'Obtain liability and product insurance appropriate for shared kitchen operations.',
          ],
        },
        {
          title: '1.6 Establish Banking & Accounting',
          actions: [
            'Open a business bank account using your EIN and formation docs.',
            'Set up accounting software for bookkeeping and taxes.',
          ],
        },
      ],
    },

    {
      title:
        'Step 2: Shared Kitchen Partnership & Initial Health Dept. Contact',
      sections: [
        {
          title: '2.1 Research & Select a Shared-Use Commercial Kitchen',
          actions: [
            'Identify and tour licensed commissary kitchens in your target area.',
          ],
        },
        {
          title: '2.2 Obtain a Shared Kitchen Lease/Agreement',
          actions: [
            'Sign a formal commissary agreement. You’ll need it for licensing.',
          ],
        },
        {
          title: '2.3 Contact Your County Health Department',
          actions: [
            'Reach out to discuss licensing requirements.',
            'Request the Plan Review Packet specific to commissary users.',
          ],
        },
      ],
    },

    {
      title: 'Step 3: Health Department Plan Review & Licensing Application',
      sections: [
        {
          title: '3.1 Prepare Your Plan Review Packet',
          actions: [
            'Include menu, sanitation, warewashing, separation protocols, etc.',
            'Include commissary agreement signed by the shared kitchen.',
          ],
        },
        {
          title: '3.2 Obtain Certified Food Protection Manager Certification',
          actions: [
            'At least one staff member must be CFPM certified (e.g. ServSafe Manager).',
          ],
        },
        {
          title: '3.3 Submit Plan Review + Fee',
          actions: [
            'Submit completed packet, certificate copies, agreement, and payment.',
          ],
        },
        {
          title: '3.4 Respond to Feedback',
          actions: [
            'Make corrections and revisions as requested by health officials.',
          ],
        },
      ],
    },

    {
      title: 'Step 4: Pre-Operational Inspection & Final Licensing',
      sections: [
        {
          title: '4.1 Prepare for Pre-Operational Inspection',
          actions: ['Schedule the inspection and prep your workspace.'],
        },
        {
          title: '4.2 Undergo Inspection',
          actions: [
            'Inspector visits and provides approval or notes deficiencies.',
          ],
        },
        {
          title: '4.3 Pay License Fees',
          actions: [
            'Pay annual Retail Food Establishment License fee to your county.',
          ],
        },
        {
          title: '4.4 Receive License',
          actions: [
            'Once approved, receive and display your license at all times.',
          ],
        },
      ],
    },

    {
      title: 'Step 5: Ongoing Compliance & Other Permits',
      sections: [
        {
          title: '5.1 Get Colorado State Sales Tax License',
          actions: ['Apply through the Colorado Department of Revenue.'],
        },
        {
          title: '5.2 Secure Local Business Licenses',
          actions: [
            'Check with your municipality for additional local licensing.',
          ],
        },
        {
          title: '5.3 Apply for Other Permits (If Needed)',
          actions: [
            'Temporary Event Permits (markets, festivals).',
            'Manufactured Food License (for wholesale).',
            'Liquor license (if serving alcohol).',
          ],
        },
        {
          title: '5.4 Maintain Health Compliance',
          actions: [
            'Be ready for surprise inspections. Keep records and logs updated.',
          ],
        },
      ],
    },
  ],

  cityBreakouts: [
    {
      city: 'Denver',
      notes:
        'Licensing handled by Denver Department of Public Health & Environment (DDPHE). Special guidance available for commissary-based retail food establishments.',
      healthDept: 'Denver Department of Public Health & Environment',
      links: {
        foodLicensing:
          'https://www.denvergov.org/Government/Departments/Public-Health-Environment/Food-Safety',
        businessLicensing:
          'https://www.denvergov.org/Government/Departments/Business-Licensing',
      },
    },
    {
      city: 'Colorado Springs',
      notes:
        'Licensing by El Paso County Public Health. Commissary agreement and detailed plan required.',
      healthDept: 'El Paso County Public Health',
      links: {
        foodLicensing:
          'https://www.elpasocountyhealth.org/service/retail-food-establishments',
        businessLicensing: 'https://coloradosprings.gov/businesslicensing',
      },
    },
    {
      city: 'Aurora',
      notes:
        'Health jurisdiction depends on county: Adams, Arapahoe, or Douglas.',
      healthDept: 'County-Based',
      links: {
        foodLicensing:
          'https://tchd.org/DocumentCenter/View/11630/Mobile-Food-Guide-TCHD',
        businessLicensing:
          'https://www.auroragov.org/cms/One.aspx?portalId=16242704&pageId=16543439',
      },
    },
    {
      city: 'Pueblo',
      notes:
        'Licensing handled by Pueblo City-County Public Health. Commissary agreement and plan review required.',
      healthDept: 'Pueblo City-County Public Health Department',
      links: {
        foodLicensing:
          'https://county.pueblo.org/public-health/retail-food-licensing',
        businessLicensing: 'https://www.pueblo.us/134/Business-Licenses',
      },
    },
  ],
}

export default coloradoGuide
