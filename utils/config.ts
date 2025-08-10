/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

function readEnv(key: string, fallback: string | null = null): string | null {
  // Vite exposes env as import.meta.env; also tolerate process.env for dev
  // @ts-ignore
  const viteVal = typeof import.meta !== 'undefined' ? (import.meta as any).env?.[key] : undefined;
  // @ts-ignore
  const nodeVal = typeof process !== 'undefined' ? (process.env?.[key] as string | undefined) : undefined;
  return (viteVal ?? nodeVal ?? fallback) as string | null;
}

// Subscription and Stripe removed; keep placeholder exports if imported elsewhere
export const CHECKOUT_URL = null;
export const STATUS_URL = null;
export const VERIFY_URL = null;
export const RETURN_URL = typeof window !== 'undefined' ? window.location.origin : null;
export const DEMO_ACCESS_CODE = null;
export const CASHAPP_CASHTAG = null;
export const CODE_ISSUER_URL = null;
export const STRIPE_PUBLISHABLE_KEY = null;
export const STRIPE_PAYMENT_LINK = null;
export const STRIPE_CREATE_CHECKOUT_URL = null;
export const STRIPE_CUSTOMER_PORTAL_URL = null;


