export async function fetchPlan(userId: string) {
  const r = await fetch(`/api/plan?userId=${encodeURIComponent(userId)}`);
  if (!r.ok) throw new Error('plan fetch failed');
  return (await r.json()) as {
    plan: 'free' | 'pro' | 'unknown';
    status?: string;
    current_period_end?: number;
  };
}
