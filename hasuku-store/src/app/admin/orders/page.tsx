export default function AdminOrdersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bestellungen</h1>
        <div className="flex gap-2">
          <select className="border rounded-lg px-4 py-2 text-sm">
            <option>Alle Status</option>
            <option>Ausstehend</option>
            <option>Bestätigt</option>
            <option>In Bearbeitung</option>
            <option>Versendet</option>
            <option>Geliefert</option>
            <option>Storniert</option>
            <option>Rückerstattet</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Bestellnr.</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Kunde</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Datum</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Betrag</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                Noch keine Bestellungen vorhanden.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
