import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import { supabaseAdmin } from './supabase.js';
import { webhookRouter } from './webhook.js';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

app.use(cors());
app.use((_, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; media-src 'self' blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://*.supabase.co https://api.stripe.com; frame-src https://js.stripe.com; style-src 'self' 'unsafe-inline'"
  );
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(self)');
  next();
});
app.use('/api/stripe/webhook', webhookRouter);
app.use(bodyParser.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

async function getOrCreateCustomer(userId: string, email: string) {
  const { data } = await supabaseAdmin
    .from('stripe_customers')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single();
  if (data?.stripe_customer_id) return data.stripe_customer_id;
  const customer = await stripe.customers.create({ email, metadata: { userId } });
  await supabaseAdmin
    .from('stripe_customers')
    .insert({ user_id: userId, stripe_customer_id: customer.id });
  return customer.id;
}

app.post('/api/checkout', async (req, res) => {
  const { userId, email, success_url, cancel_url } = req.body as {
    userId: string; email: string; success_url?: string; cancel_url?: string;
  };
  const customer = await getOrCreateCustomer(userId, email);
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer,
    line_items: [{ price: process.env.STRIPE_PRICE_PRO!, quantity: 1 }],
    success_url: success_url || 'https://example.com/success',
    cancel_url: cancel_url || 'https://example.com/cancel',
    metadata: { userId },
  });
  res.json({ url: session.url });
});

app.post('/api/portal', async (req, res) => {
  const { userId, return_url } = req.body as { userId: string; return_url?: string };
  const { data } = await supabaseAdmin
    .from('stripe_customers')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single();
  if (!data) {
    return res.status(404).json({ error: 'customer not found' });
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: data.stripe_customer_id,
    return_url: return_url || 'https://example.com',
  });
  res.json({ url: session.url });
});

app.get('/api/plan', async (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) return res.json({ plan: 'free' });
  const { data } = await supabaseAdmin
    .from('user_plans')
    .select('plan,status,current_period_end')
    .eq('user_id', userId)
    .single();
  if (!data) return res.json({ plan: 'free' });
  res.json(data);
});

const port = Number(process.env.PORT) || 8787;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
