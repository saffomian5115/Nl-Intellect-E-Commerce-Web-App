"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { formatPrice } from "@/lib/vat";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "Unbekannt";
  const total = parseFloat(searchParams.get("total") || "0") || 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Vielen Dank für Ihre Bestellung!
      </h1>
      <p className="text-gray-600 mb-2">
        Ihre Bestellung wurde erfolgreich aufgegeben.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 my-8 text-left">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Bestellnummer</p>
            <p className="font-bold text-gray-900">{orderNumber}</p>
          </div>
          <div>
            <p className="text-gray-500">Gesamtbetrag</p>
            <p className="font-bold text-gray-900">
              {total > 0 ? formatPrice(total) : "—"}
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-8">
        Sie erhalten in Kürze eine Bestätigungs-E-Mail mit den Details Ihrer
        Bestellung.
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          href="/catalog"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Weiter einkaufen
        </Link>
        <Link
          href="/"
          className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Minimal Header */}
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            HASUKU
          </Link>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}
