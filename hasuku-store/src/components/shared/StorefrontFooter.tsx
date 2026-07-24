"use client";

import Link from "next/link";

export default function StorefrontFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="text-white font-bold text-2xl mb-4">hausku</h3>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Qualitätsprodukte für Haus, Büro und Küche. Nachhaltiges Design trifft auf
              smarte Funktionalität — entwickelt für Ihren Alltag.
            </p>
            {/* Payment Icons Placeholder */}
            <div>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-medium">
                Sichere Zahlungsarten
              </p>
              <div className="flex items-center gap-2">
                {[
                  { name: "Visa", bg: "bg-blue-900/50" },
                  { name: "MC", bg: "bg-red-900/50" },
                  { name: "PayPal", bg: "bg-blue-800/50" },
                  { name: "Klarna", bg: "bg-pink-900/50" },
                  { name: "Apple Pay", bg: "bg-gray-700/50" },
                ].map((p) => (
                  <span
                    key={p.name}
                    className={`${p.bg} text-gray-300 text-xs font-medium px-2.5 py-1.5 rounded border border-white/10`}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Alle Produkte
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=kueche" className="hover:text-white transition-colors">
                  Küche
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=buero" className="hover:text-white transition-colors">
                  Büro
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=haushalt" className="hover:text-white transition-colors">
                  Haushalt
                </Link>
              </li>
            </ul>
          </div>

          {/* Kundenservice Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Kundenservice
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Mein Konto
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Bestellungen
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Widerrufsrecht
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Versand & Zahlung
                </Link>
              </li>
            </ul>
          </div>

          {/* Rechtliches Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Rechtliches
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/imprint" className="hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              © 2026 NI Intellect UG · Alle Rechte vorbehalten.
            </p>
            <p className="text-xs">
              Angaben gemäß § 5 TMG · NICHT EU
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
