import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mein Konto</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <nav className="space-y-1">
            <Link href="/account" className="block px-4 py-3 bg-gray-900 text-white rounded-lg font-medium">
              Übersicht
            </Link>
            <Link href="/account/orders" className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              Meine Bestellungen
            </Link>
            <Link href="/account/addresses" className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              Adressen
            </Link>
            <button className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
              Abmelden
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Anmelden</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">E-Mail</label>
                  <input type="email" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Passwort</label>
                  <input type="password" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors">
                  Anmelden
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Registrieren</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-Mail</label>
                  <input type="email" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Passwort</label>
                  <input type="password" className="w-full border rounded-lg px-4 py-3" />
                </div>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors">
                  Konto erstellen
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
