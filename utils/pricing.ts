/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PricingInfo = {
  priceMonthlyUsd: number; // e.g., 6.99
  label: string;           // e.g., 'Founders Price'
};

// Price schedule helper. Adjust these dates/tiers as needed.
const TIERS: Array<{ until: string; price: number; label: string }> = [
  { until: '2025-10-01', price: 3.99, label: 'Founders Price' },
  { until: '2026-01-01', price: 6.99, label: 'Launch Promo' },
];

const STANDARD_PRICE = 9.99;
const STANDARD_LABEL = 'Standard';

function parseDate(d: string): number { return new Date(d + 'T00:00:00Z').getTime(); }

/**
 * Returns the price tier for a user cohort determined by firstSeen timestamp.
 * - Users are permanently grandfathered into the price that was active when they first arrived.
 */
export function getPricingForFirstSeen(firstSeenMs: number): PricingInfo {
  for (const tier of TIERS) {
    if (firstSeenMs < parseDate(tier.until)) {
      return { priceMonthlyUsd: tier.price, label: tier.label };
    }
  }
  return { priceMonthlyUsd: STANDARD_PRICE, label: STANDARD_LABEL };
}


