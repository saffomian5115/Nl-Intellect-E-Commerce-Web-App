# Project Memory / Status Log — hausku E-Commerce Web Application

Purpose: running log of client info, key decisions, and current status — read this first when resuming work on this project (especially useful for AI coding assistant context continuity across sessions).

## Client Info
- Business: NI Intellect UG
- Brand: hausku
- Contact: Waqar Ali Anjam
- Market: Germany, general household/office/kitchen products (e.g. laptop stands)
- Sells on Amazon/eBay already; this is their first independent web store
- Reference site shown by client: blockhuette.net (note: that site is built on Shopify — client's expectations of polish may be shaped by this; our custom build should account for that)

## Key Decisions Made
- Tech stack: Next.js + MySQL, hosted entirely on client's existing Hostinger Business plan (Node.js supported — confirmed).
- Payment gateways: Stripe + PayPal + Klarna (all three).
- VAT: must be admin-configurable, not hardcoded (client currently at 19% but wants flexibility).
- Checkout: guest checkout + optional account creation, both supported.
- Shipping: free above €30, flat rate below.
- Legal scope: Privacy Policy (GDPR), Impressum, Widerrufsrecht, GPSR — dev builds pages/workflow, client owns final legal text accuracy.
- Source code handover: included unconditionally in the agreement.
- Admin: single user only, no roles/permissions system needed.
- Invoices & credit notes: auto-generated, downloadable PDFs.

## Pricing Agreement
- No fixed price — final amount mutually agreed after completion based on quality/quantity of work delivered.
- Minimum guaranteed amount: €100.
- 40% of minimum (€40) requested upfront to officially start work.
- Monthly maintenance after free 30-day support: €35-50/month (optional, client's choice).

## Status
- [x] Proposal drafted, revised, and accepted by client
- [x] Kickoff message sent requesting 40% upfront (€40) + product data
- [ ] Awaiting: upfront payment confirmation
- [ ] Awaiting: product categories, product data (images/descriptions/prices/variants), logo/brand colors, Impressum details, shipping destination confirmation
- [ ] Development not yet started (blocked on above, though per proposal these don't block Phase 1 planning)

## Open Questions / To Revisit Later
- design.md to be created once logo/brand colors are received from client
- Confirm exact upfront payment method (PayPal suggested to avoid wire transfer fees eating into the €40)
- Confirm final product count (10-12 discussed, not yet locked)
- Confirm shipping destinations: Germany-only, or wider EU
