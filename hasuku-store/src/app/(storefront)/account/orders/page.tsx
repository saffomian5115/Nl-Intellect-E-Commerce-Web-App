import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Meine Bestellungen</h1>

      <div className="border rounded-lg">
        <div className="p-12 text-center text-gray-500">
          <p className="text-lg font-medium">Noch keine Bestellungen</p>
          <Link href="/catalog" className="mt-4 inline-block text-red-500 hover:text-red-600 font-medium">
            Jetzt einkaufen →
          </Link>
        </div>
      </div>
    </div>
  );
}
