"use client";

import Link from "next/link";
import { useCart } from "@/components/storefront/CartContext";
import CartItemRow from "@/components/storefront/CartItemRow";
import { formatPrice } from "@/lib/vat";

// TODO: Fetch these from settings API (Phase 3) — must be admin-configurable
const FREE_SHIPPING_THRESHOLD = 30;
const SHIPPING_FLAT_RATE = 4.99;
const VAT_RATE = 19;

export default function CartPage() {
  const { cart, total, itemCount } = useCart();

  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const vatAmount = parseFloat(((total * VAT_RATE) / 100).toFixed(2));
  const grandTotal = parseFloat((total + shipping + vatAmount).toFixed(2));
  const freeShippingDiff = FREE_SHIPPING_THRESHOLD - total;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Warenkorb
        {itemCount > 0 && (
          <span className="text-lg font-normal text-gray-500 ml-2">
            ({itemCount} {itemCount === 1 ? "Artikel" : "Artikel"})
          </span>
        )}
      </h1>

      {cart.items.length === 0 ? (
        /* Empty Cart */
        <div className="text-center py-16">
          <svg
            className="w-20 h-20 mx-auto text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <p className="text-xl font-medium text-gray-900 mb-2">
            Ihr Warenkorb ist leer
          </p>
          <p className="text-gray-500 mb-6">
            Fügen Sie Produkte hinzu, um loszulegen.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Weiter einkaufen
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Free Shipping Progress */}
            {freeShippingDiff > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  Noch{" "}
                  <span className="font-bold">
                    {formatPrice(freeShippingDiff)}
                  </span>{" "}
                  bis zum kostenlosen Versand!
                </p>
                <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="border rounded-lg divide-y">
              {cart.items.map((item) => (
                <CartItemRow key={item.variantId} item={item} />
              ))}
            </div>

            <Link
              href="/catalog"
              className="mt-4 inline-block text-red-500 hover:text-red-600 font-medium text-sm"
            >
              ← Weiter einkaufen
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Bestellübersicht</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>
                    Zwischensumme ({itemCount}{" "}
                    {itemCount === 1 ? "Artikel" : "Artikel"})
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Versand</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Kostenlos</span>
                  ) : (
                    <span>{formatPrice(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>MwSt. ({VAT_RATE}%)</span>
                  <span>{formatPrice(vatAmount)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Gesamt</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors text-center"
              >
                Zur Kasse
              </Link>

              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Kostenloser Versand ab 30 €
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  14 Tage Widerrufsrecht
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sichere Zahlung (Stripe, PayPal, Klarna)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
