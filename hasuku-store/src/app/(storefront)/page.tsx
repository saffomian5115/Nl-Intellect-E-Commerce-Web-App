import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/storefront/ProductCard";

export default async function HomePage() {
  // Fetch data concurrently
  const [featuredProducts, bestsellers, newArrivals, categories] =
    await Promise.all([
      // Featured / Highlighted products
      prisma.product.findMany({
        where: { active: true, featured: true },
        include: {
          category: true,
          variants: { where: { active: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      // Bestsellers — use featured + most stock as proxy for "popular"
      prisma.product.findMany({
        where: { active: true },
        include: {
          category: true,
          variants: { where: { active: true } },
        },
        orderBy: { createdAt: "asc" },
        take: 6,
      }),
      // New arrivals — most recently added
      prisma.product.findMany({
        where: { active: true },
        include: {
          category: true,
          variants: { where: { active: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      // Categories with product counts
      prisma.category.findMany({
        orderBy: { sortOrder: "asc" },
        include: {
          _count: {
            select: { products: { where: { active: true } } },
          },
        },
      }),
    ]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          SECTION 1: Hero Section — Above the Fold
      ═══════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-400 text-sm font-medium rounded-full mb-6 border border-red-500/30">
                Neue Kollektion 2026
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Ergonomie für{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  Zuhause
                </span>
                .<br />
                Qualität fürs Büro.
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Nachhaltige Materialien, durchdachtes Design und 30 Tage
                Rückgaberecht. Entdecken Sie Produkte, die Ihren Alltag
                komfortabler machen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
                >
                  Jetzt entdecken
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/catalog?featured=true"
                  className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 hover:bg-white/5"
                >
                  Bestseller ansehen
                </Link>
              </div>
            </div>

            {/* Hero Image — Placeholder */}
            <div className="hidden lg:block relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 shadow-2xl">
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <svg
                    className="w-20 h-20 mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">Hero-Banner Platzhalter</span>
                  <span className="text-xs mt-1 opacity-60">
                    Lifestyle-Bild kommt hier hin
                  </span>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Kostenloser Versand</p>
                    <p className="text-xs text-gray-500">Ab 30 € Bestellwert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: Trust Badges — Immediately below Hero
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                ),
                title: "Kostenloser Versand",
                subtitle: "Ab 30 € Bestellwert",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                    />
                  </svg>
                ),
                title: "30 Tage Rückgabe",
                subtitle: "Kostenlose Retoure",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "Sichere Zahlung",
                subtitle: "Stripe · PayPal · Klarna",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Nachhaltig",
                subtitle: "Umweltfreundliche Materialien",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Schneller Versand",
                subtitle: "DHL · 1-2 Werktage",
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 ${badge.bg} rounded-full flex items-center justify-center ${badge.color}`}
                >
                  {badge.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    {badge.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: Category Showcase — Visual Grid
      ═══════════════════════════════════════════════════ */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Nach Kategorie stöbern
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Entdecken Sie unsere Sortimente — von der Küche bis zum Büro
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] hover:shadow-xl transition-all duration-300"
              >
                {/* Category image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-gray-300 group-hover:to-gray-400 transition-all duration-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <svg
                      className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {cat.name} Bild
                    </span>
                  </div>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    {cat._count.products}{" "}
                    {cat._count.products === 1 ? "Produkt" : "Produkte"}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                    Zur Kollektion
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SECTION 4: Bestseller / Beliebte Produkte
      ═══════════════════════════════════════════════════ */}
      {bestsellers.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Beliebte Produkte
                </h2>
                <p className="text-gray-500">
                  Unsere meistbestellten Artikel
                </p>
              </div>
              <Link
                href="/catalog"
                className="hidden sm:inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Alle ansehen
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/catalog"
                className="inline-flex items-center text-red-500 hover:text-red-600 font-medium"
              >
                Alle Produkte ansehen →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SECTION 5: Promo Banner — Dynamic CTA
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                🎉 Aktionsangebot
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Versandkostenfrei bestellen
              </h3>
              <p className="text-white/80 max-w-lg">
                Bei allen Bestellungen ab 30 € — sichern Sie sich jetzt
                kostenfreien Versand auf Ihre Lieblingsprodukte.
              </p>
            </div>
            <Link
              href="/catalog"
              className="flex-shrink-0 bg-white text-red-600 font-bold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Jetzt shoppen
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6: Neuheiten / New Arrivals
      ═══════════════════════════════════════════════════ */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Neuheiten
              </h2>
              <p className="text-gray-500">Die neuesten Produkte in unserem Shop</p>
            </div>
            <Link
              href="/catalog?sort=newest"
              className="hidden sm:inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Alle Neuheiten
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SECTION 7: Featured Products (Curated)
      ═══════════════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Empfohlene Produkte
                </h2>
                <p className="text-gray-500">
                  Von uns handverlesen für Sie
                </p>
              </div>
              <Link
                href="/catalog"
                className="hidden sm:inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Alle ansehen
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SECTION 8: Value Proposition — "Warum hausku?"
      ═══════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Warum <span className="text-red-500">hausku</span>?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Wir verbinden deutsches Design mit smarter Funktionalität für Ihren
            Alltag
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              ),
              title: "Durchdachtes Design",
              text: "Jedes Produkt wird mit Liebe zum Detail entwickelt. Funktionalität trifft auf Ästhetik — Produkte, die in Ihrem Zuhause glänzen.",
            },
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Nachhaltige Materialien",
              text: "Wir setzen auf hochwertige, umweltfreundliche Materialien wie Bambus und Edelstahl. Gute Produkte müssen nicht auf Kosten der Umwelt gehen.",
            },
            {
              icon: (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: "Faire Preise",
              text: "Qualität muss nicht teuer sein. Wir bieten Ihnen premium Produkte zu gerechten Preisen — ohne versteckte Kosten oder unnötige Margen.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/imprint"
            className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Mehr über uns erfahren
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 9: Newsletter / CTA Section
      ═══════════════════════════════════════════════════ */}
      <section className="bg-gray-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bleiben Sie auf dem Laufenden
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Erfahren Sie als Erster von neuen Produkten, exklusiven Angeboten
            und Tipps rund um Haus und Büro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <a
              href="#"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap text-center"
            >
              Anmelden
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Kein Spam. Abmeldung jederzeit möglich. Datenschutz gilt.
          </p>
        </div>
      </section>
    </>
  );
}
