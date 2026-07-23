export default function ImprintPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
        <p className="text-gray-600">
          NI Intellect UG<br />
          [Straße Nr.]<br />
          [PLZ Ort]<br />
          Deutschland
        </p>
        <h2 className="text-xl font-bold mt-8 mb-4">Kontakt</h2>
        <p className="text-gray-600">
          Telefon: [pending]<br />
          E-Mail: [pending]
        </p>
        <h2 className="text-xl font-bold mt-8 mb-4">Registereintrag</h2>
        <p className="text-gray-600">
          Eintragung im Handelsregister.<br />
          Registergericht: [pending]<br />
          Registernummer: [pending]
        </p>
        <h2 className="text-xl font-bold mt-8 mb-4">Umsatzsteuer-ID</h2>
        <p className="text-gray-600">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
          [pending]
        </p>
      </div>
    </div>
  );
}
