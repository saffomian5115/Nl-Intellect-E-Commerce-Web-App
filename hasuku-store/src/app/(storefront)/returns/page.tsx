export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Widerrufsrecht</h1>
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-bold mb-4">Widerrufsbelehrung</h2>
        <p className="text-gray-600">
          Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
        </p>
        <p className="text-gray-600 mt-4">
          Die Widerrufsfrist beträgt 14 Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-4">Widerrufsformular</h2>
        <p className="text-gray-600">
          [Wird vom Klient ergänzt — Muster-Widerrufsformular gemäß Anlage 1 zu Art. 246a § 1 Abs. 2 EGBGB]
        </p>
        <h2 className="text-xl font-bold mt-8 mb-4">Rücksendung</h2>
        <p className="text-gray-600">
          [Rücksendeadresse und Prozess werden vom Klient ergänzt]
        </p>
      </div>
    </div>
  );
}
