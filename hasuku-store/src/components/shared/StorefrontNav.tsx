"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";

export default function StorefrontNav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Link href="/" className="text-2xl font-bold text-gray-900">
              HASUKU
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/catalog"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Produkte
            </Link>
            <Link
              href="/catalog?category=kueche"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Küche
            </Link>
            <Link
              href="/catalog?category=buero"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Büro
            </Link>
            <Link
              href="/catalog?category=haushalt"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Haushalt
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Suchen"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              href="/cart"
              className="p-2 text-gray-600 hover:text-gray-900 relative"
              aria-label="Warenkorb"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
            </Link>
            <Link
              href="/account"
              className="p-2 text-gray-600 hover:text-gray-900"
              aria-label="Konto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
