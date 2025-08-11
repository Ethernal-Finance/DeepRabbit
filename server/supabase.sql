create table if not exists stripe_customers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text
);

create table if not exists user_plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'free',
  status text,
  current_period_end bigint
);

alter table stripe_customers enable row level security;
alter table user_plans enable row level security;

create policy "user_reads_own_plan"
  on user_plans for select
  using ( auth.uid() = user_id );
