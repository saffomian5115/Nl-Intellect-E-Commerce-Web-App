import Link from "next/link";

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Warenkorb</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg divide-y">
            <div className="p-12 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="text-lg font-medium">Ihr Warenkorb ist leer</p>
              <Link href="/catalog" className="mt-4 inline-block text-red-500 hover:text-red-600 font-medium">
                Weiter einkaufen →
              </Link>
            </div>
          </div>

          <Link href="/catalog" className="mt-4 inline-block text-red-500 hover:text-red-600 font-medium text-sm">
            ← Weiter einkaufen
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Bestellübersicht</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Zwischensumme</span>
                <span>€0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Versand</span>
                <span className="text-green-600">Kostenlos</span>
              </div>
              <div className="flex justify-between">
                <span>MwSt. (19%)</span>
                <span>€0.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Gesamt</span>
                <span>€0.00</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors">
              Zur Kasse
            </button>
            <p className="text-xs text-center text-gray-500 mt-3">
              Kostenloser Versand ab 30 €
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
