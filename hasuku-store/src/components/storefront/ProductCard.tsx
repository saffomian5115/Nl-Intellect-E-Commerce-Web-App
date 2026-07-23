import Link from "next/link";
import { formatPrice } from "@/lib/vat";

type ProductWithVariants = {
  id: number;
  name: string;
  slug: string;
  basePrice: number;
  imageUrl: string | null;
  category: { name: string; slug: string };
  variants: {
    id: number;
    color: string | null;
    colorHex: string | null;
    stockQty: number;
    size: string | null;
  }[];
};

export default function ProductCard({ product }: { product: ProductWithVariants }) {
  const totalStock = product.variants.reduce((sum, v) => sum + v.stockQty, 0);
  const colors = product.variants
    .filter((v) => v.colorHex !== null)
    .map((v) => v.colorHex as string)
    .filter((hex, i, arr) => arr.indexOf(hex) === i);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {product.imageUrl ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Bild: {product.name}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {totalStock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm px-3 py-1 bg-gray-900 rounded">
              Ausverkauft
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category.name}
        </p>
        <h3 className="font-medium text-gray-900 group-hover:text-red-500 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(product.basePrice)}
          </p>
          {colors.length > 0 && (
            <div className="flex gap-1">
              {colors.slice(0, 3).map((hex) => (
                <span
                  key={hex}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: hex }}
                />
              ))}
              {colors.length > 3 && (
                <span className="text-xs text-gray-400">+{colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
        {totalStock > 0 && totalStock <= 5 && (
          <p className="text-xs text-orange-500 mt-1">Nur noch {totalStock} verfügbar</p>
        )}
      </div>
    </Link>
  );
}
