import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50">
      {/* Minimal Checkout Header (checkout has its own minimal header) */}
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">HASUKU</Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-900">1. Kontakt</span>
            <span>→</span>
            <span>2. Versand</span>
            <span>→</span>
            <span>3. Zahlung</span>
          </div>
          <Link href="/cart" className="text-sm text-gray-500 hover:text-gray-900">
            ← Zurück zum Warenkorb
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-8">Kasse</h1>

            {/* Guest Checkout */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Als Gast bestellen</h2>
                <p className="text-sm text-gray-500">
                  oder <Link href="/account" className="text-red-500 hover:text-red-600">Konto erstellen</Link>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">E-Mail *</label>
                  <input type="email" className="w-full border rounded-lg px-4 py-3" placeholder="ihre@email.de" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefon</label>
                  <input type="tel" className="w-full border rounded-lg px-4 py-3" placeholder="+49 ..." />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Lieferadresse</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Vorname *</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nachname *</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Straße *</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PLZ *</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stadt *</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-3" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-bold mb-4">Zahlungsart</h2>
              <div className="space-y-3">
                {[
                  { id: "stripe", label: "Kreditkarte / Apple Pay / Google Pay", icon: "💳" },
                  { id: "paypal", label: "PayPal", icon: "🅿️" },
                  { id: "klarna", label: "Klarna — Kauf auf Rechnung", icon: "🏦" },
                ].map((method) => (
                  <label key={method.id} className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:border-gray-900 transition-colors">
                    <input type="radio" name="payment" value={method.id} className="w-4 h-4" />
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Bestellübersicht</h2>
              <div className="space-y-4 mb-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Produkt {i}</p>
                      <p className="text-xs text-gray-500">M / Schwarz</p>
                      <p className="text-sm font-medium mt-1">€0.00</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-sm border-t pt-4">
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
                Bestellung aufgeben
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                Mit der Bestellung akzeptieren Sie unsere{" "}
                <Link href="/terms" className="underline">AGB</Link> und{" "}
                <Link href="/privacy" className="underline">Datenschutzrichtlinie</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
