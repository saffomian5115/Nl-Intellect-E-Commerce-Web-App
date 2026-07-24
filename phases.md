# Development Phases — hausku E-Commerce Web Application

Estimated total duration: ~5-6 weeks.

## Phase 1 — Planning & Design (5-6 days) ✅
- [x] Set up Next.js project skeleton + folder structure per architecture.md
- [x] Prisma schema with all database tables (SQLite for dev, MySQL for production)
- [x] Locale files (German default + English)
- [x] Storefront page shells (home, catalog, product, cart, checkout, account)
- [x] Admin panel shell (dashboard, products, orders, customers, settings)
- [x] Shared components (StorefrontNav, StorefrontFooter, CookieConsent, LanguageSwitcher, MobileNav)
- [x] API route structure (products, orders, auth, payments, invoices)
- [x] VAT calculation helper (reads from DB, not hardcoded)
- [x] Payment & invoice placeholders
- [x] Legal page stubs (privacy, imprint, terms, returns)
- [x] Environment config (.env, .env.example)
- [x] Build verified — 25+ routes, no errors
- [ ] Pending from client: product data, logo/brand colors, Impressum details

## Phase 2 — Core Development (2.5-3.5 weeks)
- [x] Product catalog + category pages (Prisma-powered with filtering, sorting, categories)
- [x] Product detail pages with size/color variant selection (Prisma-powered)
- [x] Homepage with featured products from Prisma
- [x] Database seed script with 8 sample products, 3 categories, settings
- [x] Reusable ProductCard component
- [x] Shopping cart (add to cart, quantity management, localStorage persistence, free shipping progress)
- [x] Search functionality (SearchBar component with Cmd+K shortcut, catalog filtering, filter chips)
- [x] Guest checkout flow (form validation, order creation API with stock check, success page)
- [x] Customer account system (signup/login with bcryptjs, session cookies, order history, address CRUD)
- [x] Admin panel: product CRUD (create/edit/delete, variant management, image upload, in-place variant updates)
- [x] Admin panel: orders management (status updates, order detail view)
- [x] Admin panel: customers management, dashboard stats
- [x] Admin authentication middleware (protected routes, login page, session cookies)

## Phase 3 — Payment & Integrations (5-7 days)
- [x] Stripe integration (checkout sessions, webhook handler, idempotent order processing, lazy SDK init)
- [ ] PayPal integration
- [ ] Klarna integration
- [ ] Flexible VAT settings (admin-configurable rate, applied at checkout)
- [ ] Shipping rule: free above €30 / flat rate below

## Phase 4 — Legal & Compliance (4-5 days)
- [ ] Privacy Policy page (GDPR)
- [ ] Impressum page (pending client details)
- [ ] Widerrufsrecht / returns flow (14-day right of withdrawal)
- [ ] GPSR-related product fields
- [ ] Cookie consent banner
- [ ] Invoice + credit note PDF generation

## Phase 5 — Testing & QA (4-5 days)
- [ ] Functional testing (cart, checkout, payments in sandbox mode)
- [ ] Responsiveness testing (mobile/tablet/desktop)
- [ ] German/English language switch testing
- [ ] Bug fixing

## Phase 6 — Deployment & Handover (2-3 days)
- [ ] Deploy to client's Hostinger Business account
- [ ] SSL setup
- [ ] Admin panel walkthrough/training for client
- [ ] Full source code handover
- [ ] Start of 30-day free support window

## Post-Launch (Optional)
- [ ] Monthly maintenance package (€35-50/month) if client opts in after free support period
