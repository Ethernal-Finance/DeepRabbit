import express from 'express';
import session from 'express-session';
import Stripe from 'stripe';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
const sessionSecret = process.env.SESSION_SECRET || 'deeprabbit-session';
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const priceId = process.env.STRIPE_PRICE_ID || '';
const returnUrl = process.env.RETURN_URL || 'http://localhost:5173';

const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : null;

app.use(morgan('combined'));
app.use(express.json());
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

app.get('/subscription/status', async (req, res) => {
  try {
    const sess = req.session;
    if (sess.subscribed) {
      return res.json({ subscribed: true });
    }
    if (stripe && sess.stripeCustomerId) {
      try {
        const subs = await stripe.subscriptions.list({
          customer: sess.stripeCustomerId,
          status: 'all',
          limit: 1,
        });
        const active = subs.data.some(s => ['active', 'trialing'].includes(s.status));
        sess.subscribed = active;
        return res.json({ subscribed: active });
      } catch (err) {
        console.error('Stripe status check failed', err);
      }
    }
    return res.json({ subscribed: false });
  } catch (err) {
    console.error('Status error', err);
    res.status(500).json({ error: 'Failed to determine subscription status' });
  }
});

app.get('/subscription/verify', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ error: 'Stripe not configured' });
    const sess = req.session;
    const sessionId = sess.checkoutSessionId || req.query.session_id;
    if (!sessionId) {
      return res.status(400).json({ error: 'Missing session id' });
    }
    const checkout = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['subscription'] });
    if (checkout.customer) {
      sess.stripeCustomerId = checkout.customer as string;
    }
    let active = false;
    const sub = checkout.subscription;
    if (sub && typeof sub === 'object') {
      active = ['active', 'trialing'].includes(sub.status);
    } else if (typeof sub === 'string') {
      const fetched = await stripe.subscriptions.retrieve(sub);
      active = ['active', 'trialing'].includes(fetched.status);
    }
    sess.subscribed = active;
    res.json({ subscribed: active });
  } catch (err) {
    console.error('Verify error', err);
    res.status(500).json({ error: 'Failed to verify subscription' });
  }
});

app.post('/stripe/create-checkout', async (req, res) => {
  try {
    if (!stripe || !priceId) {
      return res.status(500).json({ error: 'Stripe not configured' });
    }
    const checkout = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
      success_url: returnUrl,
      cancel_url: returnUrl,
    });
    req.session.checkoutSessionId = checkout.id;
    res.json({ id: checkout.id, url: checkout.url });
  } catch (err) {
    console.error('Checkout error', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.listen(port, () => {
  console.log(`deeprabbit subscription server running on port ${port}`);
});

export default app;
