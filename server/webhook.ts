import express from 'express';
import Stripe from 'stripe';
import { supabaseAdmin } from './supabase.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const webhookRouter = express.Router();

webhookRouter.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed', err);
      return res.status(400).send('Bad signature');
    }

    const data = event.data.object as any;

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = data as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        if (userId) {
          await supabaseAdmin.from('stripe_customers').upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
          });
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const priceId = subscription.items.data[0]?.price.id;
          const plan = priceId === process.env.STRIPE_PRICE_PRO ? 'pro' : 'unknown';
          await supabaseAdmin.from('user_plans').upsert({
            user_id: userId,
            plan,
            status: subscription.status,
            current_period_end: subscription.current_period_end,
          });
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = data as Stripe.Subscription;
        const customerId = sub.customer as string;
        const { data: record } = await supabaseAdmin
          .from('stripe_customers')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single();
        const userId = record?.user_id as string | undefined;
        if (userId) {
          await supabaseAdmin.from('stripe_customers').upsert({
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: sub.id,
          });
          const priceId = sub.items.data[0]?.price.id;
          const plan = priceId === process.env.STRIPE_PRICE_PRO ? 'pro' : 'unknown';
          await supabaseAdmin.from('user_plans').upsert({
            user_id: userId,
            plan,
            status: sub.status,
            current_period_end: sub.current_period_end,
          });
        }
        break;
      }
      default:
        break;
    }

    res.json({ received: true });
  }
);
