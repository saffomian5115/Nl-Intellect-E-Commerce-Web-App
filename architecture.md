# Architecture — hausku E-Commerce Web Application

## Tech Stack
- **Frontend + Backend:** Next.js (React-based) — chosen for SEO (SSR/SSG), performance, image optimization, and single-framework simplicity for a small-scope store.
- **Database:** SQL (MySQL, via Hostinger Business plan's included database) — sufficient for ~10-12 products, no need for MongoDB/NoSQL at this scale.
- **Hosting:** Client's existing Hostinger Business plan (confirmed Node.js support) — frontend, backend, and database all run on this single hosting plan. No separate hosting service required.
- **Payment Gateways:** Stripe, PayPal, Klarna (all three, per client request).
- **Email:** Transactional email service (e.g. Resend/Brevo free tier) for order confirmations and branded invoice emails.
- **PDF Generation:** For invoices/credit notes (e.g. a Node PDF library such as `pdf-lib` or `puppeteer`-based rendering).

## High-Level Folder Structure (suggested)
```
/app
  /(storefront)          → customer-facing routes (home, catalog, product, cart, checkout)
  /admin                 → admin panel routes (protected, single-login)
  /api                   → API routes (products, orders, invoices, payments webhook handlers)
/components
  /storefront
  /admin
  /shared
/lib
  /db                    → DB client + query helpers
  /payments              → Stripe/PayPal/Klarna integration logic
  /invoices              → invoice/credit note PDF generation
  /vat                   → VAT calculation (reads configurable rate from DB/settings, not hardcoded)
/locales                 → German (default) + English translations
/public
```

## Database Schema (starting point — refine once product data arrives)
- `products` (id, name, description, base_price, category_id, active)
- `product_variants` (id, product_id, size, color, sku, stock_qty, price_override)
- `categories` (id, name)
- `orders` (id, customer_id nullable [guest], status, total, currency, vat_rate_applied, created_at)
- `order_items` (id, order_id, product_variant_id, qty, unit_price)
- `customers` (id, email, name, address, is_guest)
- `invoices` (id, order_id, invoice_number, pdf_path, issued_at)
- `credit_notes` (id, order_id, credit_note_number, pdf_path, issued_at, reason)
- `settings` (key, value) → used for VAT rate(s) and other configurable store settings

## Coding Conventions / Rules
- Keep VAT rate and other legal-numeric values in `settings` table / admin-editable config — **never hardcode** (client requirement: flexible VAT).
- All customer-facing pages must support both `de` and `en` locale strings — no hardcoded UI text; use the `/locales` translation files.
- Guest checkout must not require account creation at any step — orders link to a nullable `customer_id` with guest contact info stored on the order.
- Every completed order must trigger: (1) confirmation email, (2) invoice generation. Refunds/returns must trigger credit note generation.
- Payment webhook handlers (Stripe/PayPal/Klarna) must be idempotent — avoid duplicate order confirmations on retried webhook calls.
- Mobile-first responsive CSS — test on phone viewport first.
- No AI/LLM integrations in this scope — do not add unless explicitly requested later.

## Environment / Deployment Notes
- Deploy via Hostinger's Node.js app manager (hPanel).
- Use environment variables for all payment gateway keys (Stripe/PayPal/Klarna) — never commit keys to source.
- SSL: use Hostinger's free SSL (Let's Encrypt).
