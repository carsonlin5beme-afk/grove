create table if not exists farms (
  id text primary key,
  user_id text not null,
  name text not null,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists farms_user_idx on farms (user_id);
