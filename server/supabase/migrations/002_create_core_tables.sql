create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  price numeric(12, 2) not null check (price >= 0),
  compare_at_price numeric(12, 2) check (compare_at_price is null or compare_at_price >= 0),
  category_id uuid not null references public.categories(id) on delete restrict,
  stock integer not null default 0 check (stock >= 0),
  rating numeric(2, 1) not null default 0 check (rating >= 0 and rating <= 5),
  review_count integer not null default 0 check (review_count >= 0),
  image_url text not null,
  is_flash_sale boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cart_items_session_product_unique unique (session_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  user_id uuid references public.users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'cancelled')),
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  shipping_total numeric(12, 2) not null default 0 check (shipping_total >= 0),
  total numeric(12, 2) not null check (total >= 0),
  currency text not null default 'USD',
  payment_method text,
  payment_reference text,
  customer_first_name text not null,
  customer_company text,
  customer_street text not null,
  customer_apartment text,
  customer_city text not null,
  customer_phone text not null,
  customer_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  line_total numeric(12, 2) not null check (line_total >= 0),
  product_name text not null,
  product_image_url text,
  created_at timestamptz not null default now()
);
