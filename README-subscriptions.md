# Subscriptions

This app uses Stripe Checkout and the Billing Portal with Supabase for auth and
plan storage.

## Setup

1. `cp .env.example .env.local` and fill in all values.
2. In the Supabase dashboard, open the SQL editor and run `server/supabase.sql`.
3. Start the dev servers:
   - `npm run dev` – frontend
   - `npm run dev:server` – backend on http://localhost:8787
4. Listen for webhooks locally:
   - `stripe listen --forward-to localhost:8787/api/stripe/webhook`
5. Create a test user, log in, and use any Pro-gated feature to trigger
   Checkout or open the Billing Portal.

## Deploy notes

- Only expose the Stripe publishable key client-side. Keep all secrets in the
  server environment.
- RLS policies ensure users can read only their own plan rows.
