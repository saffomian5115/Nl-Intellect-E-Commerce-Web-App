# 🔐 Auth Setup Requirements — HAUSKU Store

## 📋 Overview
Current system: Custom email/password auth with sessions (cookies).
Goal: Add **email verification** + **Google & Facebook login**.

---

## 🧩 Option 1: Clerk (Recommended — easiest, fastest)
Clerk handles everything: email verification, social login, session management, user dashboard.

### What you need to arrange:

| Item | Details | Where to Get |
|------|---------|-------------|
| **Clerk Account** | Free tier: 10,000 users, unlimited social logins | https://clerk.com → Sign up |
| **Clerk API Keys** | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys |
| **Google OAuth Credentials** | Client ID + Client Secret | https://console.cloud.google.com → APIs & Services → Credentials |
| **Facebook OAuth Credentials** | App ID + App Secret | https://developers.facebook.com → My Apps → Create App |

### Clerk Features:
- ✅ Email verification (auto sends verification email)
- ✅ Google login (one-click)
- ✅ Facebook login (one-click)
- ✅ Passwordless options
- ✅ Session management
- ✅ User dashboard
- ✅ Free tier: 10,000 users

### Setup cost: **Free** (Clerk free tier + Google/Facebook app registration)

---

## 🧩 Option 2: DIY (Custom — more control, more work)

### A. Email Verification

**Method: Send verification email on registration**

| What's Needed | Details | Where to Get |
|---------------|---------|-------------|
| **Transactional Email Service** | To send verification emails | **Resend** (free: 100 emails/day) or **SendGrid** (free: 100 emails/day) |
| **SMTP Credentials** | SMTP host, port, username, password | From email service provider |
| **Database Field** | Add `emailVerified` (boolean) + `verificationToken` (string) to customer table | Already have Prisma — just need migration |

**Flow:**
1. User registers → create account with `emailVerified: false`
2. Generate unique `verificationToken` → save to DB
3. Send email with link: `https://hausku.de/verify-email?token=xxx`
4. User clicks link → token matched → `emailVerified = true`
5. (Optional) Check email again before allowing login

### B. Google + Facebook Login (OAuth)

| What's Needed | Details | Where to Get |
|---------------|---------|-------------|
| **Google OAuth 2.0** | Client ID + Client Secret | https://console.cloud.google.com |
| **Facebook Login** | App ID + App Secret | https://developers.facebook.com |
| **NextAuth.js v5** | NPM package: `next-auth@beta` | `npm install next-auth@beta` |
| **Database adapter** | Prisma adapter for NextAuth | `npm install @auth/prisma-adapter` |

**Flow:**
1. User clicks "Sign in with Google"
2. Redirected to Google consent screen
3. User approves → Google sends back user info (name, email, avatar)
4. If email exists → log in
5. If new email → create account automatically
6. Session created → user is logged in

---

## 📦 APIs / Services Comparison

| Service | Email Verification | Google Login | Facebook Login | Free Tier |
|---------|-------------------|-------------|----------------|-----------|
| **Clerk** | ✅ Built-in | ✅ Built-in | ✅ Built-in | 10,000 users |
| **NextAuth** | ❌ Need separate email service | ✅ Built-in | ✅ Built-in | Free (open source) |
| **Supabase Auth** | ✅ Built-in | ✅ Built-in | ✅ Built-in | 50,000 users free |
| **Firebase Auth** | ✅ Built-in | ✅ Built-in | ✅ Built-in | Free (usage limits) |

---

## 🛠️ My Recommendation: **Clerk**

**Reason:**
- Sab se easy — ek package install karo, components drop karo, sab kaam ho jayega
- Email verification auto send karta hai
- Google + Facebook login built-in hai (bas API keys chahiye)
- Clerk ka UI already beautiful hai — hamare glassmorphism design se match karega
- Current custom auth (sessions, cookies) ko bhi handle kar sakta hai

### Steps after you arrange the credentials:

1. Install `@clerk/nextjs`
2. Add ClerkProvider in layout
3. Replace current login/register pages with Clerk components
4. Configure Google + Facebook in Clerk Dashboard
5. Test the flow

---

## 📝 Action Items for You

Please arrange these items:

1. **Clerk account**: Sign up at https://clerk.com → Get `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY`
2. **Google OAuth**: Go to https://console.cloud.google.com → Create OAuth 2.0 credentials → Get Client ID + Secret → Add to Clerk Dashboard
3. **Facebook Login**: Go to https://developers.facebook.com → Create app → Get App ID + Secret → Add to Clerk Dashboard

Once you have all these values, send them to me and I'll implement everything! 🚀
