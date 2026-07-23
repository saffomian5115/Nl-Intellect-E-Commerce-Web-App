import type { Metadata } from "next";
import { CartProvider } from "@/components/storefront/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "HASUKU — Haus, Büro & Küche",
  description:
    "Qualitätsprodukte für Haus, Büro und Küche. Kostenloser Versand ab 30 €.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
