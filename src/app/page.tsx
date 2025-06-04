import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h2 className="text-5xl font-bold text-blue-900 mb-4">
          Aluguel de Pranchas e Aulas de Surf
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Encontre a prancha perfeita ou aprenda com os melhores instrutores
        </p>
        <div className="space-x-4">
          <Link
            href="/boards"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
          >
            Ver Pranchas
          </Link>
          <Link
            href="/schools"
            className="bg-white text-blue-600 px-6 py-3 rounded-full border border-blue-600 hover:bg-blue-50"
          >
            Encontrar Instrutores
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            Pranchas Próximas
          </h3>
          <p className="text-gray-600 mb-4">
            Encontre pranchas disponíveis para aluguel na sua região
          </p>
          <Link
            href="/boards"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Explorar Pranchas →
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            Escolas e Instrutores
          </h3>
          <p className="text-gray-600 mb-4">
            Aprenda com instrutores qualificados e escolas certificadas
          </p>
          <Link
            href="/schools"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Ver Instrutores →
          </Link>
        </div>
      </section>
    </div>
  )
}
