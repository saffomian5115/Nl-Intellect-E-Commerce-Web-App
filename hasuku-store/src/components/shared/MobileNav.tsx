"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
        aria-label="Menü öffnen"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold">HASUKU</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="Menü schließen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-100">
            Startseite
          </Link>
          <Link href="/catalog" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-100">
            Produkte
          </Link>
          <Link href="/catalog?category=kueche" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-100">
            Küche
          </Link>
          <Link href="/catalog?category=buero" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-100">
            Büro
          </Link>
          <Link href="/catalog?category=haushalt" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-100">
            Haushalt
          </Link>
        </nav>
        <div className="p-4 border-t space-y-1">
          <Link href="/cart" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-100">
            🛒 Warenkorb
          </Link>
          <Link href="/account" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-100">
            👤 Mein Konto
          </Link>
        </div>
      </div>
    </>
  );
}
