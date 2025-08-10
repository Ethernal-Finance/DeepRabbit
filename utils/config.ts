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

export const CHECKOUT_URL = readEnv('VITE_CHECKOUT_URL', null);
export const STATUS_URL = readEnv('VITE_SUBSCRIPTION_STATUS_URL', null);
export const VERIFY_URL = readEnv('VITE_SUBSCRIPTION_VERIFY_URL', null);
export const RETURN_URL = readEnv('VITE_RETURN_URL', typeof window !== 'undefined' ? window.location.origin : null);
export const DEMO_ACCESS_CODE = readEnv('VITE_DEMO_ACCESS_CODE', null);
export const CASHAPP_CASHTAG = readEnv('VITE_CASHAPP_CASHTAG', null);
export const CODE_ISSUER_URL = readEnv('VITE_CODE_ISSUER_URL', null);

// Stripe integration
export const STRIPE_PUBLISHABLE_KEY = readEnv('VITE_STRIPE_PUBLISHABLE_KEY', null);
export const STRIPE_PAYMENT_LINK = readEnv('VITE_STRIPE_PAYMENT_LINK', null);
export const STRIPE_CREATE_CHECKOUT_URL = readEnv('VITE_STRIPE_CREATE_CHECKOUT_URL', null);
export const STRIPE_CUSTOMER_PORTAL_URL = readEnv('VITE_STRIPE_CUSTOMER_PORTAL_URL', null);


