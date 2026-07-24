# Requirements — hausku E-Commerce Web Application

## Project Summary
Client: NI Intellect UG (Brand: **hausku**)
Contact: Waqar Ali Anjam
Market: Germany (household, office & kitchen products — e.g. laptop stands)
Existing sales channels: Amazon, eBay
Goal: Independent web store to sell directly to customers.

## Languages
- German — primary/default
- English — secondary (language switch option)

## Product Catalog
- ~10-12 products at launch (confirm exact count before catalog build)
- Products have **variants**: size and color
- Categories: TBD — pending from client
- Product data (images, titles, descriptions, prices, variants): pending from client

## Customer-Facing Features
- [ ] Home page with featured/best-selling products
- [ ] Product catalog with categories and filters
- [ ] Product detail pages (images, price, description, stock availability)
- [ ] Product variant selection (size, color)
- [ ] Search functionality
- [ ] Shopping cart
- [ ] Guest checkout (no account required)
- [ ] Customer accounts (signup/login, order history, saved addresses) — optional, alongside guest checkout
- [ ] Payment gateway integration: Stripe, PayPal, Klarna
- [ ] Shipping rule: free above €30, flat rate below
- [ ] Order confirmation + tracking, branded email templates
- [ ] Auto-generated downloadable PDF invoice per order
- [ ] Mobile-responsive design
- [ ] Return/refund request flow (14-day Widerrufsrecht compliant)
- [ ] Customer reviews & ratings (optional/nice-to-have, not core scope)

## Admin Panel Features
- [ ] Single admin login (no multi-user roles needed)
- [ ] Add/edit/delete products, incl. variants
- [ ] Inventory & stock management
- [ ] Order management (view, update status, process returns)
- [ ] Basic sales dashboard/reports
- [ ] Customer management
- [ ] Invoice & credit note generation (view/download)
- [ ] Flexible VAT configuration — admin sets/updates VAT rate(s), not hardcoded (client currently operates at 19%)
- [ ] Discount/coupon code management (optional/nice-to-have)

## Legal & Regulatory Compliance (Germany/EU)
Development scope = build the pages/workflows. Client is responsible for final legal text accuracy (recommend legal/tax advisor review).
- [ ] Privacy Policy page (GDPR-compliant)
- [ ] Impressum page (company details, commercial register, contact — pending client details)
- [ ] Widerrufsrecht (14-day right of withdrawal) — built into returns flow + stated in policy
- [ ] GPSR compliance — safety info fields on product listings (manufacturer/responsible person, warnings) as applicable
- [ ] Cookie consent banner (GDPR)

## Out of Scope (for now / optional add-ons)
- Multi-admin roles/permissions
- AI-based features (not requested)
- Real-time carrier shipping rate calculation
- Loyalty programs, subscriptions

## Pending Client Inputs (do not block dev start)
- Product categories list
- Logo + brand colors/guidelines (→ will become design.md once received)
- Impressum details (address, commercial register no.)
- Full product data set (images, descriptions, prices, variants)
- Confirmed total product count
- Shipping destinations (Germany-only vs. EU-wide)
- Final legal text for Privacy Policy / Returns Policy
