"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useAuth } from "@/components/storefront/AuthContext";
import { useLocale } from "@/components/shared/LocaleContext";
import { CATEGORIES, getCategoryName } from "@/lib/categories";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { t, locale, switchLocale } = useLocale();

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
        aria-label="Menü öffnen"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
            <Image
              src="/mylogo.jpeg"
              alt="hausku"
              width={100}
              height={36}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
            aria-label="Menü schließen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <SearchBar />
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
          <span className="text-xs font-semibold text-gray-400 uppercase">{t("nav.language")}</span>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => switchLocale("de")}
              className={`px-3 py-1.5 text-xs font-bold transition-all ${
                locale === "de" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              DE
            </button>
            <div className="w-px bg-gray-200" />
            <button
              onClick={() => switchLocale("en")}
              className={`px-3 py-1.5 text-xs font-bold transition-all ${
                locale === "en" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold transition-all">
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">🏠</span>
            {t("nav.home")}
          </Link>

          <Link href="/catalog" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold transition-all">
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">🛒</span>
            {t("nav.allProducts")}
          </Link>

          <Link href="/catalog?sort=newest" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-lime-50 text-lime-600 font-semibold transition-all">
            <span className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center text-sm">🏷️</span>
            {t("nav.sales")}
          </Link>

          <div className="my-2 border-t border-gray-100" />

          <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t("nav.categories")}</p>

          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/catalog?category=${cat.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-medium transition-all">
              <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">{cat.icon}</span>
              {getCategoryName(cat, locale)}
            </Link>
          ))}

          <div className="my-2 border-t border-gray-100" />

          <Link href="/imprint" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold transition-all">
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">ℹ️</span>
            {t("nav.about")}
          </Link>

          <Link href="/imprint#contact" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold transition-all">
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">✉️</span>
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white space-y-1">
          <Link href="/wishlist" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold transition-all">
            <span className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center text-sm">❤️</span>
            {t("nav.wishlist")}
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold transition-all">
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">🛒</span>
            {t("nav.cart")}
          </Link>
          <Link href="/account" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-900 font-semibold transition-all">
            <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm">👤</span>
            {user ? t("nav.myAccount") : t("nav.signIn")}
          </Link>
        </div>
      </div>
    </>
  );
}
