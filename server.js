/*
 * DeepRabbit subscription server
 *
 * This file has been updated to address subscription gate issues and
 * strengthen security around Stripe integration. The original version
 * stored subscriptions in an in‑memory Map that was lost whenever the
 * process restarted and accepted unsigned webhooks if no secret was
 * configured. It also did not record which user initiated a checkout
 * session or persist any subscription state.
 *
 * Key improvements:
 *   – Persist subscription state across restarts using a JSON file on disk.
 *   – Require a valid STRIPE_WEBHOOK_SECRET to verify webhook signatures.
 *   – Attach customer email metadata to checkout sessions so webhook
 *     handlers can reliably identify the user.
 *   – Accept an email in the request body when creating a checkout
 *     session; return a 400 error if missing.
 *   – Provide success and cancel URLs that include the Stripe session ID.
 */

import express from 'express';
import session from 'express-session';
import Stripe from 'stripe';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
const sessionSecret = process.env.SESSION_SECRET || 'deeprabbit-session';
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const priceId = process.env.STRIPE_PRICE_ID || '';
const returnUrl = process.env.RETURN_URL || 'http://localhost:5173';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Initialise Stripe client only if secret key provided
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : null;

// Persist subscription state to disk. Subscriptions are stored as a set of
// emails that currently have an active subscription. On start, the file is
// read and used to populate the subscriptions map. Updates to the map are
// saved back to disk.
const subscriptions = new Map();
const SUB_DB_FILE = process.env.SUB_DB_FILE || path.join(__dirname, 'subscriptions.json');

function loadSubscriptions() {
  try {
    const data = fs.readFileSync(SUB_DB_FILE, 'utf-8');
    const emails = JSON.parse(data);
    emails.forEach((email) => {
      subscriptions.set(email, true);
    });
  } catch (err) {
    console.log('[Subscription] No existing subscription db found, starting fresh');
  }
}

function saveSubscriptions() {
  try {
    // Persist only emails with an active subscription
    const activeEmails = Array.from(subscriptions.entries())
      .filter(([, active]) => active)
      .map(([email]) => email);
    fs.writeFileSync(SUB_DB_FILE, JSON.stringify(activeEmails, null, 2));
  } catch (err) {
    console.error('[Subscription] Failed to save subscriptions db', err);
  }
}

// Load existing subscriptions on start
loadSubscriptions();

app.use(morgan('combined'));
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(session({
  name: 'drsid',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 3600 * 1000,
  }
}));

// Parse JSON bodies for API routes except for the webhook route which
// requires raw body for signature verification.
app.use((req, res, next) => {
  if (req.path === '/stripe/webhook') return next();
  express.json()(req, res, next);
});

/*
 * Stripe webhook to update subscription state.
 *
 * This route validates the webhook signature using the configured
 * STRIPE_WEBHOOK_SECRET. Without a secret, the server will not accept
 * webhook requests as parsing arbitrary payloads would be insecure.
 */
app.post('/stripe/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe || !webhookSecret) {
    return res.status(500).send('Stripe webhook not configured');
  }
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('[Webhook] Signature verification failed', err);
    return res.status(400).send(`Webhook signature error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session?.customer_details?.email || session?.metadata?.email;
        if (email) {
          subscriptions.set(email, true);
          saveSubscriptions();
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const email = sub?.customer_email || sub?.metadata?.email;
        if (email) {
          const active = ['active', 'trialing'].includes(sub.status);
          subscriptions.set(email, active);
          saveSubscriptions();
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error('[Webhook] Handler error', err);
  }
  res.json({ received: true });
});

// Return subscription status for a given email. This endpoint can be used
// anonymously by the frontend to determine whether a user should be
// allowed past the subscription gate. If no email is provided, false
// (not subscribed) is returned.
app.get('/subscription/status', (req, res) => {
  try {
    const email = typeof req.query.email === 'string' ? req.query.email : undefined;
    const subscribed = email ? !!subscriptions.get(email) : false;
    res.json({ subscribed });
  } catch (err) {
    console.error('[Status] error', err);
    res.status(500).json({ error: 'Failed to determine subscription status' });
  }
});

// Verify subscription explicitly. This endpoint returns an error if no email
// is provided and exposes the same subscribed flag as the status route.
app.get('/subscription/verify', (req, res) => {
  try {
    const email = typeof req.query.email === 'string' ? req.query.email : undefined;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    const subscribed = !!subscriptions.get(email);
    res.json({ subscribed });
  } catch (err) {
    console.error('[Verify] error', err);
    res.status(500).json({ error: 'Failed to verify subscription' });
  }
});

/*
 * Create a Stripe checkout session for subscriptions.
 *
 * The request body must include the user's email so the session can be
 * associated with them. The email is passed to Stripe's API both as
 * customer_email and as metadata on the session. This metadata is
 * forwarded back in the webhook event, allowing us to identify the
 * correct user when updating subscription state. Without an email, the
 * server responds with a 400 error.
 */
app.post('/stripe/create-checkout', async (req, res) => {
  try {
    if (!stripe || !priceId) {
      return res.status(500).json({ error: 'Stripe not configured' });
    }
    const { email } = req.body || {};
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Missing email in request body' });
    }
    const checkout = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: { trial_period_days: 7, metadata: { email } },
      customer_email: email,
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: returnUrl,
      metadata: { email },
    });
    req.session.checkoutSessionId = checkout.id;
    res.json({ id: checkout.id, url: checkout.url });
  } catch (err) {
    console.error('[Checkout] error', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.listen(port, () => {
  console.log(`deeprabbit subscription server running on port ${port}`);
});

export default app;