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
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : null;
const subscriptions = new Map();

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

// Stripe webhook to flip subscription state in our "DB"
app.post('/stripe/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe) return res.status(500).send('Stripe not configured');
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = webhookSecret
      ? stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
      : JSON.parse(req.body.toString());
  } catch (err) {
    console.error('Webhook error', err);
    return res.status(400).send('Webhook error');
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session?.customer_details?.email || session?.metadata?.email;
        if (email) subscriptions.set(email, true);
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const email = sub?.customer_email || sub?.metadata?.email;
        if (email) {
          const active = ['active', 'trialing'].includes(sub.status);
          subscriptions.set(email, active);
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error('Webhook handler error', err);
  }

  res.json({ received: true });
});

// JSON parser for remaining routes
app.use(express.json());

app.get('/subscription/status', (req, res) => {
  try {
    const email = typeof req.query.email === 'string' ? req.query.email : undefined;
    const subscribed = email ? !!subscriptions.get(email) : false;
    res.json({ subscribed });
  } catch (err) {
    console.error('Status error', err);
    res.status(500).json({ error: 'Failed to determine subscription status' });
  }
});

app.get('/subscription/verify', (req, res) => {
  try {
    const email = typeof req.query.email === 'string' ? req.query.email : undefined;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    const subscribed = !!subscriptions.get(email);
    res.json({ subscribed });
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
