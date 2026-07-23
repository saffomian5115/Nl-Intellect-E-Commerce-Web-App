"use client";

import Link from "next/link";

export default function StorefrontFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">HASUKU</h3>
            <p className="text-sm">
              Qualitätsprodukte für Haus, Büro und Küche.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
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
          <div>
            <h4 className="text-white font-semibold mb-4">Kundenservice</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Mein Konto
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Warenkorb
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Widerrufsrecht
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/imprint" className="hover:text-white transition-colors">
                  Impressum
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
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2026 NI Intellect UG. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
