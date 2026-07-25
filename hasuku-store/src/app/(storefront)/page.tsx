import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/storefront/ProductCard";
import { getTranslations } from "@/lib/i18n";

export default async function HomePage() {
  const { t } = await getTranslations();

  const [featuredProducts, bestsellers, newArrivals, categories] =
    await Promise.all([
      prisma.product.findMany({
        where: { active: true, featured: true },
        include: {
          category: true,
          variants: { where: { active: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.product.findMany({
        where: { active: true },
        include: {
          category: true,
          variants: { where: { active: true } },
        },
        orderBy: { createdAt: "asc" },
        take: 6,
      }),
      prisma.product.findMany({
        where: { active: true },
        include: {
          category: true,
          variants: { where: { active: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
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
      {/* ═══ SECTION 1: Top Utility Bar ═══ */}
      <div className="bg-red-500 text-white text-center py-2 text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4">
          <span className="hidden sm:inline">🚚 {t("home.freeShipping")}</span>
          <span className="hidden sm:inline mx-3 opacity-50">|</span>
          <span className="hidden md:inline">🔄 {t("home.trialPeriod")}</span>
          <span className="hidden md:inline mx-3 opacity-50">|</span>
          <span className="hidden lg:inline">🇩🇪 {t("home.deliveryTime")}</span>
          <span className="sm:hidden">🚚 {t("home.freeShippingShort")}</span>
        </div>
      </div>

      {/* ═══ SECTION 2: Hero ═══ */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <span className="inline-block px-4 py-1.5 bg-red-500/20 text-red-400 text-sm font-medium rounded-full mb-6 border border-red-500/30">
                {t("home.heroTagline")}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t("home.heroTitle1")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  {t("home.heroTitleHighlight")}
                </span>
                {t("home.heroTitle2")}<br />
                {t("home.heroSubtitle")}
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {t("home.heroDescription")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/catalog" className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40">
                  {t("home.heroCTA")}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 shadow-2xl">
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <svg className="w-20 h-20 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: Social Proof ═══ */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400 font-medium mb-6 uppercase tracking-wider">{t("home.trusted")}</p>
          <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
            {[
              { icon: "🛡️", label: t("home.warranty") },
              { icon: "⭐", label: t("home.rating") },
              { icon: "🚚", label: t("home.fastShipping") },
              { icon: "🔄", label: t("home.returnPolicy") },
              { icon: "🌍", label: t("home.carbonNeutral") },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-gray-500">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: Trust Badges ═══ */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: "🛡️", title: t("home.warranty"), subtitle: t("home.warrantyAll") },
              { icon: "🚚", title: t("home.freeShippingShort"), subtitle: t("home.freeShipBadge") },
              { icon: "🔄", title: t("home.trialPeriod"), subtitle: t("home.trialBadge") },
              { icon: "💳", title: t("home.securePayment"), subtitle: t("home.securePaymentDesc") },
              { icon: "🌍", title: t("home.climateTitle"), subtitle: t("home.climateBadge") },
              { icon: "📦", title: t("home.dhlTitle"), subtitle: t("home.dhlGreenDesc") },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2">{badge.icon}</span>
                <p className="font-semibold text-gray-900 text-sm">{badge.title}</p>
                <p className="text-xs text-gray-500">{badge.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: Categories ═══ */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("home.browseCategories")}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t("home.browseCategoriesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/catalog?category=${cat.slug}`} className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3] hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-gray-300 group-hover:to-gray-400 transition-all duration-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-16 h-16 mb-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-300 mb-3">{cat._count.products} {cat._count.products === 1 ? t("home.product") : t("home.products")}</p>
                  <span className="inline-flex items-center text-sm font-medium text-white group-hover:text-red-400 transition-colors">
                    {t("home.toCollection")}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══ SECTION 6: Bestsellers ═══ */}
      {bestsellers.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("home.popularProducts")}</h2>
                <p className="text-gray-500">{t("home.popularProductsDesc")}</p>
              </div>
              <Link href="/catalog" className="hidden sm:inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors">
                {t("home.viewAll")}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestsellers.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SECTION 7: Promo Banner ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">{t("home.promoTitle")}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t("home.promoHeadline")}</h3>
              <p className="text-white/80 max-w-lg">{t("home.promoDescription")}</p>
            </div>
            <Link href="/catalog" className="flex-shrink-0 bg-white text-red-600 font-bold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">{t("home.shopNow")}</Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: New Arrivals ═══ */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("home.newArrivals")}</h2>
              <p className="text-gray-500">{t("home.newArrivalsDesc")}</p>
            </div>
            <Link href="/catalog?sort=newest" className="hidden sm:inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors">
              {t("home.viewAllNew")}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
        </section>
      )}

      {/* ═══ SECTION 9: Featured Products ═══ */}
      {featuredProducts.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("home.featuredProducts")}</h2>
                <p className="text-gray-500">{t("home.featuredDesc")}</p>
              </div>
              <Link href="/catalog" className="hidden sm:inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors">
                {t("home.viewAll")}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SECTION 10: Personalization ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-red-50 text-red-500 text-sm font-medium rounded-full mb-4">{t("home.personalization")}</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("home.personalizationTitle")}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t("home.personalizationDesc")}</p>
            <Link href="/catalog" className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-red-500/25">
              {t("home.personalizeNow")}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 11: Why hausku ═══ */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("home.whyTitle")} <span className="text-red-500">hausku</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">{t("home.whySubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🛡️", title: t("home.warrantyTitle"), text: t("home.warrantyText") },
              { icon: "🌍", title: t("home.climateTitle"), text: t("home.climateText") },
              { icon: "🔄", title: t("home.trialTitle"), text: t("home.trialText") },
              { icon: "📦", title: t("home.dhlTitle"), text: t("home.dhlText") },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 12: Reviews ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t("home.reviewsTitle")}</h2>
          <div className="flex items-center justify-center gap-1 text-yellow-400 text-lg">{"★★★★★".split("").map((star, i) => (<span key={i}>{star}</span>))}</div>
          <p className="text-gray-500 mt-2">{t("home.reviewsAvg")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Ludolph C.", rating: 5, title: "Super Qualität", text: "Super hochwertig. Sogar eine Ersatzdichtung dabei.", date: "Mai 2026" },
            { name: "Shakeel H.", rating: 5, title: "Sehr zufrieden!", text: "Mein Kind benutzt diese Edelstahl-Brotdose täglich.", date: "Mai 2025" },
            { name: "danescu a.", rating: 5, title: "Tip top", text: "Die Box hat einen einfachen und praktischen Deckelverschluss.", date: "Dez 2025" },
          ].map((review, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 text-yellow-400 mb-3">{"★".repeat(review.rating)}</div>
              <h4 className="font-bold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.text}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-medium text-gray-600">{review.name}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 13: Newsletter ═══ */}
      <section className="bg-gray-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("home.newsletterTitle")}</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">{t("home.newsletterDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder={t("home.newsletterPlaceholder")} className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            <a href="#" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap text-center">{t("home.newsletterCTA")}</a>
          </div>
          <p className="text-xs text-gray-500 mt-4">{t("home.newsletterDisclaimer")}</p>
        </div>
      </section>
    </>
  );
}
