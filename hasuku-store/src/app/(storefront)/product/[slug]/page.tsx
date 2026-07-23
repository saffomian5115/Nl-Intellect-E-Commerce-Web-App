import Link from "next/link";

export default function ProductDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900">Startseite</Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-gray-900">Produkte</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Produktname</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xl">
            Produktbild
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded cursor-pointer border-2 border-transparent hover:border-gray-300 transition-colors" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produktname</h1>
          <p className="text-gray-500 mt-2">Kategorie</p>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex text-yellow-400">
              {"★★★★★".split("").map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-sm text-gray-500">(0 Bewertungen)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mt-6">€0.00</p>
          <p className="text-sm text-green-600 mt-1">inkl. MwSt.</p>

          {/* Size Selection */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-900 mb-3">Größe auswählen</h3>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-lg hover:border-gray-900 transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-3">Farbe auswählen</h3>
            <div className="flex flex-wrap gap-3">
              {["#1a1a2e", "#e94560", "#ffffff", "#28a745"].map((color) => (
                <button
                  key={color}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-colors"
                  style={{ backgroundColor: color }}
                  aria-label={`Farbe ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button className="px-4 py-3 text-gray-600 hover:text-gray-900">−</button>
              <span className="px-4 py-3 font-medium">1</span>
              <button className="px-4 py-3 text-gray-600 hover:text-gray-900">+</button>
            </div>
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors">
              In den Warenkorb
            </button>
          </div>

          <p className="text-sm text-green-600 mt-3">✓ Auf Lager</p>
        </div>
      </div>

      {/* Description Tabs */}
      <div className="mt-16">
        <div className="border-b">
          <div className="flex gap-8">
            <button className="border-b-2 border-gray-900 font-medium py-3">Beschreibung</button>
            <button className="text-gray-500 hover:text-gray-900 py-3">Spezifikationen</button>
            <button className="text-gray-500 hover:text-gray-900 py-3">Bewertungen (0)</button>
          </div>
        </div>
        <div className="py-8">
          <p className="text-gray-600">Produktbeschreibung wird hier angezeigt.</p>
        </div>
      </div>
    </div>
  );
}
