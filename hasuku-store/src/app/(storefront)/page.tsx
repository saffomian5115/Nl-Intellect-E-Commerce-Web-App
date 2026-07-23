import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/storefront/ProductCard";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { active: true, featured: true },
    include: {
      category: true,
      variants: { where: { active: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: { where: { active: true } } } } },
  });

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

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Empfohlene Produkte
            </h2>
            <Link
              href="/catalog"
              className="text-red-500 hover:text-red-600 font-medium text-sm"
            >
              Alle ansehen →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Nach Kategorie stöbern
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalog?category=${cat.slug}`}
                  className="group bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow border"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-50 transition-colors">
                    <svg
                      className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {cat._count.products}{" "}
                    {cat._count.products === 1 ? "Produkt" : "Produkte"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Kostenloser Versand</h3>
            <p className="text-sm text-gray-500">Ab 30 € Bestellwert</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">14 Tage Widerrufsrecht</h3>
            <p className="text-sm text-gray-500">Kostenlose Rückgabe</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Sichere Zahlung</h3>
            <p className="text-sm text-gray-500">Stripe, PayPal, Klarna</p>
          </div>
        </div>
      </section>
    </>
  );
}
