import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/storefront/ProductCard";
import SortSelect from "@/components/storefront/SortSelect";
import SearchBar from "@/components/shared/SearchBar";

type SearchParams = {
  category?: string;
  sort?: string;
  q?: string;
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { category, sort, q } = params;

  // Build Prisma where clause
  const where: Record<string, unknown> = { active: true };
  if (category) {
    where.category = { slug: category };
  }
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
    ];
  }

  // Build orderBy
  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { basePrice: "asc" };
  if (sort === "price_desc") orderBy = { basePrice: "desc" };
  if (sort === "name") orderBy = { name: "asc" };

  // Fetch products and categories in parallel
  const [products, categories, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: { where: { active: true } },
      },
      orderBy,
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: { where: { active: true } } } } },
    }),
    prisma.product.count({ where }),
  ]);

  const activeCategory = categories.find((c) => c.slug === category);

  // Build page title
  let pageTitle = "Alle Produkte";
  if (q && activeCategory) {
    pageTitle = `Suche: "${q}" in ${activeCategory.name}`;
  } else if (q) {
    pageTitle = `Suche: "${q}"`;
  } else if (activeCategory) {
    pageTitle = activeCategory.name;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="text-gray-500 mt-1">
          {totalCount} {totalCount === 1 ? "Produkt" : "Produkte"} gefunden
          {q && (
            <span>
              {" "}für &quot;<span className="font-medium text-gray-900">{q}</span>&quot;
            </span>
          )}
        </p>
        {/* Active filters */}
        {(q || category) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {q && (
              <Link
                href={category ? `/catalog?category=${category}` : "/catalog"}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Suche: {q}
                <span className="text-gray-400">✕</span>
              </Link>
            )}
            {activeCategory && (
              <Link
                href={q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog"}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {activeCategory.name}
                <span className="text-gray-400">✕</span>
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900">Suchen</h3>
              <SearchBar initialQuery={q} currentCategory={category} />
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900">Kategorien</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link
                    href={q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog"}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      !category
                        ? "bg-gray-900 text-white font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    Alle Kategorien
                  </Link>
                </li>
                {categories.map((cat) => {
                  const catParams = new URLSearchParams();
                  if (q) catParams.set("q", q);
                  catParams.set("category", cat.slug);
                  return (
                    <li key={cat.id}>
                      <Link
                        href={`/catalog?${catParams.toString()}`}
                        className={`block px-3 py-2 rounded-lg transition-colors ${
                          category === cat.slug
                            ? "bg-gray-900 text-white font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {cat.name}
                        <span className="ml-1 text-xs opacity-60">
                          ({cat._count.products})
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900">Sortieren nach</h3>
              <SortSelect currentSort={sort} />
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900">Preis</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-lg font-medium text-gray-500">
                {q
                  ? `Keine Produkte für "${q}" gefunden`
                  : "Keine Produkte gefunden"}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {q
                  ? "Versuchen Sie einen anderen Suchbegriff oder durchstöbern Sie unsere Kategorien."
                  : "Versuchen Sie, die Filter zu ändern."}
              </p>
              <div className="mt-6 flex gap-3 justify-center">
                {q && (
                  <Link
                    href="/catalog"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Alle Produkte
                  </Link>
                )}
                <Link
                  href="/catalog"
                  className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Filter zurücksetzen
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
