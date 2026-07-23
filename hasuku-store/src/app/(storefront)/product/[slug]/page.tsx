import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/vat";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: {
      category: true,
      variants: { where: { active: true }, orderBy: { id: "asc" } },
    },
  });

  if (!product) {
    notFound();
  }

  // Get unique sizes and colors from variants
  const sizes = [...new Set(product.variants.map((v) => v.size).filter(Boolean))] as string[];
  const colors = product.variants
    .filter((v) => v.colorHex)
    .reduce(
      (acc, v) => {
        if (!acc.find((c) => c.hex === v.colorHex)) {
          acc.push({ name: v.color ?? "", hex: v.colorHex! });
        }
        return acc;
      },
      [] as { name: string; hex: string }[]
    );

  const totalStock = product.variants.reduce((sum, v) => sum + v.stockQty, 0);
  const isInStock = totalStock > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900">
          Startseite
        </Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-gray-900">
          Produkte
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/catalog?category=${product.category.slug}`}
          className="hover:text-gray-900"
        >
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xl">
            {product.imageUrl ? (
              <span>Bild: {product.name}</span>
            ) : (
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          {/* Thumbnail strip */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="aspect-square bg-gray-100 rounded cursor-pointer border-2 border-gray-900" />
            <div className="aspect-square bg-gray-100 rounded cursor-pointer border-2 border-transparent hover:border-gray-300 transition-colors" />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            {product.category.name}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Price */}
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">
              {formatPrice(product.basePrice)}
            </p>
            <p className="text-sm text-gray-500 mt-1">inkl. MwSt.</p>
          </div>

          {/* Color Selection */}
          {colors.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-3">
                Farbe auswählen
              </h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.hex}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Größe auswählen
              </h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded-lg hover:border-gray-900 transition-colors font-medium"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="mt-6">
            {isInStock ? (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Auf Lager ({totalStock} Stück)
              </p>
            ) : (
              <p className="text-sm text-red-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Nicht verfügbar
              </p>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors">
                −
              </button>
              <span className="px-4 py-3 font-medium min-w-[3rem] text-center">
                1
              </span>
              <button className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors">
                +
              </button>
            </div>
            <button
              className={`flex-1 font-semibold py-3 rounded-lg transition-colors ${
                isInStock
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isInStock}
            >
              {isInStock ? "In den Warenkorb" : "Nicht verfügbar"}
            </button>
          </div>

          {/* Shipping hint */}
          <p className="text-xs text-gray-500 mt-4">
            Kostenloser Versand ab 30 € · Versand: 4,99 €
          </p>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Beschreibung</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}

      {/* GPSR Info */}
      {(product.manufacturer || product.safetyWarnings) && (
        <div className="mt-8 border rounded-lg p-6 bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900 mb-3">
            Sicherheitsinformationen (GPSR)
          </h2>
          {product.manufacturer && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Hersteller:</span>{" "}
              {product.manufacturer}
            </p>
          )}
          {product.safetyWarnings && (
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Warnhinweise:</span>{" "}
              {product.safetyWarnings}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
