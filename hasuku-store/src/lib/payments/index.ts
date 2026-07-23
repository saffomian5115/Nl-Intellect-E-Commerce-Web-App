/**
 * Payment gateway integration helpers.
 *
 * This module will contain:
 * - Stripe checkout session creation
 * - PayPal payment creation
 * - Klarna order creation
 * - Webhook verification for each provider
 *
 * All payment gateway keys MUST be read from environment variables.
 * Never commit keys to source code.
 */

export type PaymentProvider = "stripe" | "paypal" | "klarna";

export interface PaymentResult {
  provider: PaymentProvider;
  paymentId: string;
  status: "pending" | "completed" | "failed";
  redirectUrl?: string;
}

/**
 * Create a checkout session for the given order.
 * Returns a PaymentResult with redirect URL for the customer.
 */
export async function createPayment(
  provider: PaymentProvider,
  orderId: number,
  amount: number
): Promise<PaymentResult> {
  // TODO: Implement actual payment gateway integrations
  throw new Error(`Payment provider ${provider} not yet implemented`);
}

/**
 * Verify and process a webhook from a payment provider.
 * Must be idempotent — avoid duplicate order confirmations.
 */
export async function handleWebhook(
  provider: PaymentProvider,
  body: unknown,
  headers: Record<string, string>
): Promise<{ orderId: number; status: "completed" | "failed" }> {
  // TODO: Implement webhook verification for each provider
  throw new Error(`Webhook handler for ${provider} not yet implemented`);
}
