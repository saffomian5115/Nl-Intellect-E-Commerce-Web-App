export default function AdminCustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Kunden</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Kunden suchen..."
            className="border rounded-lg px-4 py-2 pl-10 text-sm w-64"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">E-Mail</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Bestellungen</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Umsatz</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Typ</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                Noch keine Kunden vorhanden.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
