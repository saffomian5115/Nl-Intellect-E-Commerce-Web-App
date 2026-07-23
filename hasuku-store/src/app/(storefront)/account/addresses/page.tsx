import Link from "next/link";

export default function AddressesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Adressen</h1>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
          + Neue Adresse
        </button>
      </div>

      <div className="border rounded-lg p-12 text-center text-gray-500">
        <p className="text-lg font-medium">Keine gespeicherten Adressen</p>
        <p className="mt-2">Fügen Sie eine Lieferadresse hinzu.</p>
      </div>
    </div>
  );
}
