import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/storefront/ProductCard";
import SortSelect from "@/components/storefront/SortSelect";

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {activeCategory ? activeCategory.name : "Alle Produkte"}
        </h1>
        <p className="text-gray-500 mt-1">
          {totalCount} {totalCount === 1 ? "Produkt" : "Produkte"} gefunden
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium mb-3 text-gray-900">Kategorien</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link
                    href="/catalog"
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      !category
                        ? "bg-gray-900 text-white font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    Alle Kategorien
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/catalog?category=${cat.slug}`}
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
                ))}
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-lg font-medium text-gray-500">
                Keine Produkte gefunden
              </p>
              <Link
                href="/catalog"
                className="mt-4 inline-block text-red-500 hover:text-red-600 font-medium"
              >
                Filter zurücksetzen
              </Link>
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
