"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";
import { useCart } from "@/components/storefront/CartContext";

const CATEGORIES = [
  { name: "Küche", slug: "kueche", icon: "🍳" },
  { name: "Büro", slug: "buero", icon: "💻" },
  { name: "Haushalt", slug: "haushalt", icon: "🏠" },
  { name: "Alle Produkte", slug: "", icon: "🛒" },
];

export default function StorefrontNav() {
  const { itemCount } = useCart();
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              hausku
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/catalog"
              className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              Alle Produkte
            </Link>
            {/* Category Dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium"
              >
                Kategorien
                <svg
                  className={`w-4 h-4 transition-transform ${catOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={cat.slug ? `/catalog?category=${cat.slug}` : "/catalog"}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{cat.name}</p>
                        <p className="text-xs text-gray-400">Alle ansehen →</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <SearchBar compact />
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
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
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
