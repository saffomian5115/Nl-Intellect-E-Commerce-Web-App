import Link from "next/link";

export default function CatalogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0">
          <h2 className="text-lg font-bold mb-4">Filter</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Kategorien</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/catalog" className="text-gray-900 font-medium">Alle Kategorien</Link></li>
                <li><Link href="/catalog?category=kueche" className="text-gray-600 hover:text-gray-900">Küche</Link></li>
                <li><Link href="/catalog?category=buero" className="text-gray-600 hover:text-gray-900">Büro</Link></li>
                <li><Link href="/catalog?category=haushalt" className="text-gray-600 hover:text-gray-900">Haushalt</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Preis</h3>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" className="w-full border rounded px-3 py-2 text-sm" />
                <input type="number" placeholder="Max" className="w-full border rounded px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Sortieren nach</h3>
              <select className="w-full border rounded px-3 py-2 text-sm">
                <option>Neueste</option>
                <option>Preis aufsteigend</option>
                <option>Preis absteigend</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <p className="text-gray-600 mb-6">0 Produkte gefunden</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Link
                key={i}
                href="/product/placeholder"
                className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
                  Produktbild
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-red-500 transition-colors">Produktname</h3>
                  <p className="text-sm text-gray-500 mt-1">Kategorie</p>
                  <p className="text-lg font-bold mt-2">€0.00</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
