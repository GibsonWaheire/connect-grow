# Connect-Grow Site Audit & Action Plan

> Generated: 2026-03-18

---

## 1. Forms — What's Working, What Isn't

### Quote Request Form (`/quote`) ✅ WORKING
- Uses EmailJS (`service_f2b2p85` / `template_uevit9n`)
- Sends to `help@mcgibsdigitalsolutions.com`
- Fields: name, email, phone, company, project type, budget, timeline, description
- **Status: Done. No action needed.**

---

### Contact Form (`/contact`) ⚠️ BROKEN
- Currently uses a `mailto:` link — opens the user's default email app
- This means submissions are NOT reliably received; mobile users often see nothing happen
- **Fix: Wire it up to EmailJS the same way as the quote form**

**Action steps:**
1. Create a second EmailJS template (e.g. `template_contact`) in your EmailJS dashboard
2. Replace the `mailto:` logic in `ContactPage.tsx` with `emailjs.send()`
3. Use the same service ID and public key — just a different template ID

Template variables to map:
```
{{from_name}}    → name field
{{from_email}}   → email field
{{phone}}        → phone field
{{subject}}      → subject field
{{message}}      → message field
```

---

### Newsletter / Marketing Popup ⚠️ NOT WIRED
- The popup collects an email address but does nothing with it
- The code has a comment: *"integrate with Mailchimp, ConvertKit, etc."*
- **Fix: Connect to a free email marketing service**

**Recommended: Mailchimp (free up to 500 contacts)**
1. Sign up at mailchimp.com
2. Create an audience list
3. Get your API key + Audience ID
4. Use their hosted signup form embed OR their API via a serverless function
5. Replace the popup's submit handler to POST to Mailchimp

**Alternative (simpler): Use EmailJS to forward signup to your inbox**
- Fastest fix: on popup submit, send an EmailJS email to yourself with the subscriber's address

---

### Academic Order Form ✅ WORKING
- Integrated with IntaSend payment gateway
- Creates a checkout session via `/api/create-intasend-checkout`
- Redirects to IntaSend hosted payment page
- **Status: Working. No action needed.**

---

## 2. Marketing — What Exists and What to Do

### What's Already There

| Component | Trigger | Purpose | Works? |
|-----------|---------|---------|--------|
| `MarketingPopup` | 5 seconds on page load | Newsletter / offer capture | Email not saved |
| `ExitIntentPopup` | Mouse leaves top of viewport | 10% discount offer | Sends to old Gmail |
| `WhatsAppChatbot` | Always visible (bottom-left) | Customer support & conversion | ✅ Working |
| `ServicesStickyPopup` | Homepage only, left sidebar | Service quick-links | ✅ Working |

### Issues

1. **ExitIntentPopup CTA** sends to `pwriter455@gmail.com` — needs to be updated to `help@mcgibsdigitalsolutions.com` or routed to the quote form
2. **MarketingPopup** collects emails into a void — see newsletter fix above
3. **No email sequence** — once someone signs up or submits a quote, there's no follow-up automation

### Recommended Marketing Stack (low cost)

| Tool | Purpose | Cost |
|------|---------|------|
| **Mailchimp** | Email list + automated sequences | Free up to 500 contacts |
| **Google Search Console** | SEO monitoring | Free |
| **Google Analytics 4** | Traffic & conversion tracking | Free |
| **Meta Pixel** | Facebook/Instagram retargeting | Free (ad spend separate) |

### Quick Win: Fix ExitIntentPopup
Change the CTA from `mailto:pwriter455@gmail.com` to route to `/quote` instead — captures intent in your quote form which now reliably delivers to your inbox.

---

## 3. Analytics — Current State and What to Set Up

### What's Active Now

- **Vercel Analytics** — automatically collects page views and Web Vitals (load speed, etc.). Viewable in your Vercel dashboard.
- A `trackEvent()` utility exists in `client/src/shared/utils/index.ts` — it checks for `window.gtag` but Google Analytics is not initialized, so it only logs to console.

### What's Missing

**Google Analytics 4 (GA4)** — not initialized. The helper is ready, just needs the script.

**How to add GA4:**

1. Go to [analytics.google.com](https://analytics.google.com), create a property
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `client/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
4. Set `VITE_ENABLE_ANALYTICS=true` in your `.env`

Once GA4 is active, the existing `trackEvent()` utility will automatically start sending events (quote form submissions, button clicks, etc.) to Google Analytics.

### Conversion Events Worth Tracking

These are already structured in the codebase — just need GA4 active:

| Event | Where | Value |
|-------|-------|-------|
| `quote_submitted` | QuoteRequestPage success | High intent lead |
| `contact_submitted` | ContactPage success | Lead |
| `payment_started` | AcademicOrderForm submit | Transaction |
| `payment_success` | PaymentSuccess page load | Revenue |
| `whatsapp_opened` | WhatsApp chatbot/button clicks | Engagement |

---

## 4. Backend — What It Does and What's Missing

### What the Backend Actually Does

The project has two backend layers:

#### A. Express Server (`server/server.js`) — Development Only
- Runs on port 3001
- Acts as a **proxy** for IntaSend payment API calls
- Keeps the IntaSend secret key server-side (correct — secret keys should never go to the browser)
- CORS restricted to localhost in development
- **This server does NOT run in production.** On Cloudflare Workers, there's no Node.js process.

#### B. Vercel Serverless Functions (`api/` folder) — These Don't Deploy Here
- The `api/` folder contains Vercel-style serverless functions
- **These are NOT deployed** — the project deploys to Cloudflare Workers, not Vercel
- These files are dead code in the current deployment setup

**Critical issue:** The IntaSend payment flow (`/api/create-intasend-checkout`) relies on a server-side proxy to protect the secret key. In production on Cloudflare, this endpoint doesn't exist — IntaSend payments will fail unless this is handled.

### Blog System — Placeholder Only

The blog pages (`/blog`, `/blog/:id`, `/admin/blog`) exist in the frontend but:
- The API endpoints in `api/blog/` return empty arrays
- No database is connected
- No CMS is connected
- The admin panel at `/admin/blog` has no authentication — **anyone can access it**

### Options to Activate the Blog

**Option A: Static blog posts (simplest)**
- Write posts as JSON or Markdown files in the repo
- Import them directly into BlogPage.tsx
- No backend needed, deploys with the site
- Con: Requires a code deploy to publish new posts

**Option B: Use a headless CMS (recommended)**
| CMS | Free Tier | Complexity |
|-----|-----------|------------|
| **Contentful** | 25,000 records | Medium |
| **Sanity** | Unlimited reads | Medium |
| **Notion + Notion API** | Free | Low |
| **Ghost** | Self-hosted | Medium |

**Option C: Use Cloudflare D1 (SQLite at the edge)**
- Free Cloudflare database
- Works natively with Cloudflare Workers
- Requires building CRUD API handlers in the Worker
- Most complex but fully integrated with current stack

### What the Backend Should Be Doing (Gaps to Fill)

| Need | Current State | Solution |
|------|--------------|---------|
| Contact form delivery | `mailto:` (unreliable) | EmailJS (same as quote form) |
| Newsletter capture | Nothing | Mailchimp API or EmailJS to inbox |
| Blog content | Empty placeholder | Static JSON or headless CMS |
| IntaSend payments (production) | Broken — no server | Cloudflare Worker handler with D1 or KV for secret |
| Blog admin auth | None — publicly accessible | Add password check or remove the route |
| Lead tracking | None | EmailJS + GA4 events |

---

## 5. Priority Action List

### High Priority (affects revenue/leads)

1. **[ ] Fix ContactPage** — replace `mailto:` with EmailJS (same as quote form)
2. **[ ] Fix ExitIntentPopup** — change CTA destination from old Gmail to `/quote`
3. **[ ] Secure `/admin/blog`** — add basic auth or remove the route until needed
4. **[ ] Fix IntaSend in production** — create a Cloudflare Worker handler for `/api/create-intasend-checkout` that reads the secret key from Worker secrets (not env vars)

### Medium Priority (growth)

5. **[ ] Add GA4** — add the script to `index.html` with your Measurement ID
6. **[ ] Wire newsletter popup** — connect to Mailchimp or forward to your inbox via EmailJS
7. **[ ] Choose blog strategy** — static JSON files (quick) or headless CMS (scalable)

### Low Priority (polish)

8. **[ ] Set up EmailJS Allowed Origins** — whitelist your domain in EmailJS dashboard for security
9. **[ ] Remove dead Vercel API files** — `api/` folder serves no purpose in current Cloudflare deployment
10. **[ ] Add meta description tags** — for SEO on key pages (services, pricing, quote)

---

## 6. Summary

```
Forms:       Quote ✅ | Contact ⚠️ | Newsletter ⚠️ | Payments ✅
Analytics:   Vercel ✅ | GA4 ❌ | Events ready but inactive
Marketing:   Popups exist but email not captured | Exit popup points to wrong email
Backend:     Dev proxy only | Vercel functions don't deploy | Blog is empty placeholder
Blog:        Frontend ready | No data source | Admin panel unprotected
```

The site is functional for its main purpose (quote requests + payments) but has several gaps that are losing leads and tracking data.
