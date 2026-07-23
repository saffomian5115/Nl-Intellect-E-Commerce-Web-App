export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Produkte</h1>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
          + Neues Produkt
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Bild</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Kategorie</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Preis</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Lager</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                Noch keine Produkte vorhanden. Klicken Sie auf &quot;+ Neues Produkt&quot; um loszulegen.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
