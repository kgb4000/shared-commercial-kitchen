import NutritionLabelMaker from '@/component/NutritionLabelMaker'
import AffiliateLinks from '@/component/AffiliateLinks'

export const metadata = {
  title: 'Free Nutrition Label Maker & Generator | FDA Compliant Nutrition Facts Creator',
  description:
    'Create FDA-compliant nutrition labels and nutrition facts panels for free. Our nutrition label generator creates professional food labels instantly. No signup required.',
  keywords: 'nutrition label maker, nutrition label generator, nutrition facts label maker, food label maker, nutrition facts creator, free nutrition label generator, FDA nutrition label, nutrition information label maker',
  alternates: {
    canonical:
      'https://sharedkitchenlocator.com/resources/nutrition-label-maker',
  },
  openGraph: {
    title: 'Free Nutrition Label Maker & Generator — FDA Compliant',
    description:
      'Create FDA-compliant nutrition labels and nutrition facts panels for free. Professional food label maker — no signup required.',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How do I make a nutrition label for free?',
    answer: 'Use our free nutrition label maker above. Enter your serving size, calories, and nutrient values, then download your FDA-compliant nutrition facts label instantly. No signup or payment required.',
  },
  {
    question: 'Is this nutrition facts label generator FDA compliant?',
    answer: 'Yes. Our nutrition label generator creates labels that follow current FDA guidelines for nutrition facts panels, including proper formatting, required nutrients, and daily value percentages.',
  },
  {
    question: 'Can I create a nutrition label from my recipe ingredients?',
    answer: 'Yes. Enter the nutritional values for your recipe per serving, and our nutrition label maker will generate a properly formatted FDA nutrition facts panel that you can download and print.',
  },
  {
    question: 'What formats can I download my nutrition label in?',
    answer: 'You can download your nutrition facts label as a high-resolution image suitable for product packaging, printing, or digital use.',
  },
  {
    question: 'Do I need a nutrition label for my food product?',
    answer: 'The FDA requires nutrition facts labels on most packaged foods sold in the United States. If you sell packaged food products, you need an FDA-compliant nutrition label. Our free nutrition label maker helps you create one in minutes.',
  },
  {
    question: 'Can I make nutrition labels in Spanish?',
    answer: 'Yes. Our nutrition label maker supports both English and Spanish nutrition facts panels, helping you comply with bilingual labeling requirements.',
  },
]

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <NutritionLabelMaker />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* SEO Content Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Free Nutrition Label Maker — Create FDA-Compliant Food Labels
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Professional Nutrition Facts Label Generator
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our free nutrition label maker helps food producers, small businesses, and entrepreneurs create professional, FDA-compliant nutrition facts labels in minutes. Whether you need a nutrition facts panel for packaged foods, a nutrition information label for your product line, or a food label for farmers market items, our generator has you covered.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Skip the expensive software and nutritional analysis services that charge $300-800 per product. Our nutrition label generator creates the same professional results instantly and for free.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Who Uses Our Food Label Maker?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Packaged food producers</strong> — create nutrition facts for retail products</li>
                <li><strong>Bakeries and cottage food businesses</strong> — generate labels for baked goods</li>
                <li><strong>Supplement manufacturers</strong> — make supplement facts panels</li>
                <li><strong>Food truck operators</strong> — comply with menu labeling requirements</li>
                <li><strong>Meal prep services</strong> — provide nutritional information to customers</li>
                <li><strong>Commercial kitchen renters</strong> — label products made in shared kitchens</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nutrition Label Maker FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AffiliateLinks
          categories={['equipment', 'software']}
          title="Tools for Food Producers"
        />
      </div>
    </>
  )
}
