import { prisma } from "@/lib/db/prisma";

/**
 * Get the current VAT rate from the settings table.
 * Falls back to 19% if no setting is found.
 * NEVER hardcode the VAT rate — always read from DB.
 */
export async function getVatRate(): Promise<number> {
  const setting = await prisma.setting.findUnique({
    where: { key: "vat_rate" },
  });
  return setting ? parseFloat(setting.value) : 19;
}

/**
 * Calculate VAT for a given subtotal.
 * Returns { vatRate, vatAmount, totalWithVat }
 */
export async function calculateVat(subtotal: number) {
  const vatRate = await getVatRate();
  const vatAmount = parseFloat(((subtotal * vatRate) / 100).toFixed(2));
  const totalWithVat = parseFloat((subtotal + vatAmount).toFixed(2));

  return { vatRate, vatAmount, totalWithVat };
}

/**
 * Format a price for display in EUR.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

/**
 * Format a price with the € symbol (simpler version).
 */
export function formatPriceSimple(amount: number): string {
  return `€${amount.toFixed(2)}`;
}
