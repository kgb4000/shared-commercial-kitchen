export default function GuideRenderer({ guide }) {
  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-md container max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{guide.title}</h1>
        <p className="text-lg text-blue-700 font-medium">{guide.subtitle}</p>
        <p className="mt-4 text-gray-600">{guide.intro}</p>
      </header>
      {/* Steps */}
      {guide.steps.map((step, stepIndex) => (
        <section key={stepIndex} className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 border-b pb-1">
            {step.title}
          </h2>

          {step.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="mb-6 pl-4 border-l-4 border-blue-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {section.title}
              </h3>
              <ul className="list-disc list-inside text-gray-700 ml-2 space-y-1">
                {section.actions.map((action, actionIndex) => (
                  <li key={actionIndex}>{action}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {/* City Breakouts */}
      {guide.cityBreakouts?.length > 0 && (
        <section className="pt-8 mt-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            City-Specific Licensing Info
          </h2>
          {guide.cityBreakouts.map((city, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold text-blue-800">
                {city.city}
              </h3>
              <p className="text-gray-700 mb-2">{city.notes}</p>
              <ul className="list-disc ml-6 space-y-1 text-blue-700">
                {city.healthDept && (
                  <li>
                    <strong>Health Department:</strong> {city.healthDept}
                  </li>
                )}
                {city.links?.foodLicensing && (
                  <li>
                    <a
                      href={city.links.foodLicensing}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Food Licensing Portal
                    </a>
                  </li>
                )}
                {city.links?.businessLicensing && (
                  <li>
                    <a
                      href={city.links.businessLicensing}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Business Licensing Center
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
