import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Willkommen bei <span className="text-red-500">HASUKU</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Qualitätsprodukte für Haus, Büro und Küche
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Jetzt entdecken
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-8">Empfohlene Produkte</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-gray-400"
            >
              Produktbild
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
