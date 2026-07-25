import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/storefront/ProductCard";
import SortSelect from "@/components/storefront/SortSelect";
import SearchBar from "@/components/shared/SearchBar";
import { getTranslations } from "@/lib/i18n";

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
  const { t } = await getTranslations();
  const params = await searchParams;
  const { category, sort, q } = params;

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

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { basePrice: "asc" };
  if (sort === "price_desc") orderBy = { basePrice: "desc" };
  if (sort === "name") orderBy = { name: "asc" };

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

  let pageTitle = t("catalog.allProducts");
  if (q && activeCategory) {
    pageTitle = `${t("catalog.searchFor")}: "${q}" ${t("catalog.inCategory")} ${activeCategory.name}`;
  } else if (q) {
    pageTitle = `${t("catalog.searchFor")}: "${q}"`;
  } else if (activeCategory) {
    pageTitle = activeCategory.name;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="text-gray-500 mt-1">
          {totalCount} {totalCount === 1 ? t("home.product") : t("home.products")}
          {q && (
            <span>
              {" "}für &quot;<span className="font-medium text-gray-900">{q}</span>&quot;
            </span>
          )}
        </p>
        {(q || category) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {q && (
              <Link
                href={category ? `/catalog?category=${category}` : "/catalog"}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {t("catalog.searchFor")}: {q}
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
        <aside className="w-full md:w-64 shrink-0">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3 text-gray-900">{t("common.search")}</h3>
              <SearchBar initialQuery={q} currentCategory={category} />
            </div>
            <div>
              <h3 className="font-medium mb-3 text-gray-900">{t("catalog.allCategories")}</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link
                    href={q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog"}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      !category ? "bg-gray-900 text-white font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {t("catalog.allCategories")}
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
                          category === cat.slug ? "bg-gray-900 text-white font-medium" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {cat.name}
                        <span className="ml-1 text-xs opacity-60">({cat._count.products})</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-gray-900">{t("catalog.sortBy")}</h3>
              <SortSelect currentSort={sort} />
            </div>
          </div>
        </aside>

        <main className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <p className="text-lg font-medium text-gray-500">{t("catalog.noProducts")}</p>
              <p className="text-sm text-gray-400 mt-2">{q ? t("catalog.tryDifferent") : t("catalog.tryFilter")}</p>
              <div className="mt-6 flex gap-3 justify-center">
                <Link href="/catalog" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">{t("catalog.allProducts")}</Link>
                <Link href="/catalog" className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">{t("catalog.resetFilters")}</Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
