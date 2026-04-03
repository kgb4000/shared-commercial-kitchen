import Link from 'next/link'

export const metadata = {
  title: 'Cocinas Comerciales en Renta — Encuentra Cocinas Compartidas Cerca de Ti',
  description:
    'Encuentra cocinas comerciales en renta, cocinas compartidas y cocinas comisarias en 43 ciudades de Estados Unidos. Alquiler por hora, dia o mes.',
  keywords: 'cocinas comerciales cerca de mi, cocinas comerciales en renta, cocina compartida, renta de cocina comercial, cocina comisaria, cocina industrial en renta',
  alternates: {
    canonical: 'https://sharedkitchenlocator.com/cocinas-comerciales',
  },
  openGraph: {
    title: 'Cocinas Comerciales en Renta — 43 Ciudades, 950+ Cocinas',
    description: 'Encuentra cocinas comerciales en renta en Estados Unidos.',
    type: 'website',
    images: [{ url: 'https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cocinas Comerciales en Renta — 43 Ciudades, 950+ Cocinas',
    description: 'Encuentra cocinas comerciales en renta en Estados Unidos.',
    images: ['https://sharedkitchenlocator.com/images/commercial-kitchen-for-rent.jpg'],
  },
}

const ciudades = [
  { nombre: 'Chicago', estado: 'IL', slug: 'chicago/il' },
  { nombre: 'Los Angeles', estado: 'CA', slug: 'los-angeles/ca' },
  { nombre: 'Nueva York', estado: 'NY', slug: 'new-york/ny' },
  { nombre: 'Houston', estado: 'TX', slug: 'houston/tx' },
  { nombre: 'Miami', estado: 'FL', slug: 'miami/fl' },
  { nombre: 'Dallas', estado: 'TX', slug: 'dallas/tx' },
  { nombre: 'San Antonio', estado: 'TX', slug: 'san-antonio/tx' },
  { nombre: 'Phoenix', estado: 'AZ', slug: 'phoenix/az' },
  { nombre: 'San Diego', estado: 'CA', slug: 'san-diego/ca' },
  { nombre: 'Denver', estado: 'CO', slug: 'denver/co' },
  { nombre: 'Atlanta', estado: 'GA', slug: 'atlanta/ga' },
  { nombre: 'Filadelfia', estado: 'PA', slug: 'philadelphia/pa' },
  { nombre: 'Seattle', estado: 'WA', slug: 'seattle/wa' },
  { nombre: 'San Francisco', estado: 'CA', slug: 'san-francisco/ca' },
  { nombre: 'El Paso', estado: 'TX', slug: 'el-paso/tx' },
  { nombre: 'Fort Worth', estado: 'TX', slug: 'fort-worth/tx' },
]

export default function CocinasComerciales() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cocinas Comerciales en Renta
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Encuentra cocinas compartidas, cocinas comisarias y cocinas fantasma en 43 ciudades de Estados Unidos. Mas de 380 cocinas verificadas.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-600 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">950+</div>
              <div className="text-sm">Cocinas Verificadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">43</div>
              <div className="text-sm">Ciudades</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">Gratis</div>
              <div className="text-sm">Para Buscar</div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Los listados de cocinas estan disponibles en ingles.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Cities Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Buscar Cocinas por Ciudad
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ciudades.map((ciudad) => (
              <Link
                key={ciudad.slug}
                href={`/commercial-kitchen-for-rent/${ciudad.slug}`}
                className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-blue-400 hover:shadow-md transition-all bg-white"
              >
                <div className="font-bold text-gray-900">{ciudad.nombre}</div>
                <div className="text-sm text-gray-500">{ciudad.estado}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/browse-kitchens"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Ver las 43 ciudades &rarr;
            </Link>
          </div>
        </section>

        {/* Content */}
        <section className="mb-16 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Que es una Cocina Comercial Compartida?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Una cocina comercial compartida (tambien llamada cocina comisaria o cocina de uso compartido) es una instalacion profesional con licencia donde multiples negocios de alimentos pueden preparar, cocinar y empaquetar sus productos. Estas cocinas comerciales proporcionan todo el equipo, almacenamiento y espacio de trabajo necesarios para operar un negocio de alimentos legalmente.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
            Quien Usa Cocinas Comerciales en Renta?
          </h3>
          <ul className="space-y-2 text-gray-700 mb-8">
            <li><strong>Negocios de catering</strong> — preparacion de eventos y comidas corporativas</li>
            <li><strong>Camiones de comida (food trucks)</strong> — preparacion y almacenamiento de alimentos</li>
            <li><strong>Panaderos y reposteros</strong> — creacion de panes, pasteles y postres especiales</li>
            <li><strong>Productores de alimentos</strong> — fabricacion de salsas, botanas y productos empaquetados</li>
            <li><strong>Cocinas fantasma (ghost kitchens)</strong> — restaurantes solo de entrega a domicilio</li>
            <li><strong>Servicios de preparacion de comidas</strong> — meal prep y chefs personales</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Cuanto Cuesta Rentar una Cocina Comercial?
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Los precios varian segun la ciudad y las instalaciones. En general, las cocinas comerciales se rentan de $15 a $50 por hora, o de $500 a $3,000 por mes. La mayoria incluye equipo profesional, refrigeracion, almacenamiento y servicios de limpieza.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-blue-50 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Encuentra Tu Cocina Comercial
          </h2>
          <p className="text-gray-600 mb-6">
            Busca entre mas de 380 cocinas verificadas en 43 ciudades.
          </p>
          <Link
            href="/browse-kitchens"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
          >
            Buscar Cocinas
          </Link>
        </section>
      </div>
    </div>
  )
}
