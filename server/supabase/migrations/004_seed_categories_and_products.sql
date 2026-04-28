insert into public.categories (name, slug)
values
  ('Electronics', 'electronics'),
  ('Home & Lifestyle', 'home-lifestyle'),
  ('Men''s Fashion', 'mens-fashion'),
  ('Groceries & Pets', 'groceries-pets'),
  ('Health & Beauty', 'health-beauty'),
  ('Baby''s & Toys', 'babys-toys'),
  ('Sports & Outdoor', 'sports-outdoor'),
  ('Women''s Fashion', 'womens-fashion')
on conflict (slug) do update
set name = excluded.name;

with product_seed (
  name,
  slug,
  description,
  price,
  compare_at_price,
  category_slug,
  stock,
  rating,
  review_count,
  is_flash_sale
) as (
  values
    ('HAVIT HV-G92 Gamepad', 'havit-hv-g92-gamepad', 'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install.', 120, 160, 'electronics', 120, 4.5, 150, true),
    ('AK-900 Wired Keyboard', 'ak-900-wired-keyboard', 'Mechanical keyboard with RGB lighting and durable switches for gaming and productivity.', 96, 116, 'electronics', 80, 4.2, 89, true),
    ('IPS LCD Gaming Monitor', 'ips-lcd-gaming-monitor', '27-inch IPS display with 165Hz refresh rate and low blue light for long sessions.', 370, 400, 'electronics', 40, 4.8, 210, true),
    ('S-Series Comfort Chair', 's-series-comfort-chair', 'Ergonomic office chair with lumbar support and breathable mesh back.', 375, 400, 'home-lifestyle', 25, 4.6, 99, true),
    ('The North Coat', 'the-north-coat', 'Warm winter coat with water-resistant shell and insulated lining.', 260, 360, 'mens-fashion', 60, 4.4, 65, false),
    ('Gucci duffle bag', 'gucci-duffle-bag', 'Premium travel duffle with leather trim and spacious compartments.', 960, 1160, 'mens-fashion', 12, 4.9, 77, false),
    ('RGB liquid CPU Cooler', 'rgb-liquid-cpu-cooler', '240mm radiator with quiet fans and addressable RGB.', 160, 170, 'electronics', 55, 4.3, 44, false),
    ('Small Bookshelf', 'small-bookshelf', 'Compact bookshelf in walnut finish for small spaces.', 360, null, 'home-lifestyle', 30, 4.1, 32, false),
    ('Breed Dry Dog Food', 'breed-dry-dog-food', 'Nutrition-rich dry food for adult dogs with omega fatty acids.', 100, 120, 'groceries-pets', 200, 4.7, 310, false),
    ('CANON EOS DSLR Camera', 'canon-eos-dslr-camera', '24MP APS-C sensor with dual pixel autofocus and 4K video.', 360, null, 'electronics', 18, 4.8, 120, false),
    ('ASUS FHD Gaming Laptop', 'asus-fhd-gaming-laptop', '15.6-inch FHD display, dedicated GPU, fast SSD storage.', 700, 950, 'electronics', 22, 4.6, 88, false),
    ('Curology Product Set', 'curology-product-set', 'Skincare set tailored for sensitive skin with gentle actives.', 500, null, 'health-beauty', 45, 4.5, 54, false),
    ('Kids Electric Car', 'kids-electric-car', 'Battery-powered ride-on car with parental remote control.', 960, null, 'babys-toys', 15, 4.2, 40, false),
    ('Jr. Zoom Soccer Cleats', 'jr-zoom-soccer-cleats', 'Lightweight cleats with molded studs for firm ground.', 116, 140, 'sports-outdoor', 70, 4.0, 28, false),
    ('GP11 Shooter USB Gamepad', 'gp11-shooter-usb-gamepad', 'Wired gamepad with dual vibration motors and precision sticks.', 660, null, 'electronics', 50, 4.4, 60, false),
    ('Quilted Satin Jacket', 'quilted-satin-jacket', 'Statement jacket with quilted satin finish and relaxed fit.', 660, null, 'womens-fashion', 34, 4.3, 41, false),
    ('Self-Empty Robot Vacuum', 'self-empty-robot-vacuum', 'Maps your home, avoids obstacles, and empties itself at the dock.', 520, 620, 'home-lifestyle', 28, 4.5, 150, false),
    ('Noise Cancelling Earbuds', 'noise-cancelling-earbuds', 'True wireless earbuds with hybrid ANC and long battery life.', 189, 229, 'electronics', 90, 4.6, 512, true),
    ('Ceramic Table Lamp', 'ceramic-table-lamp', 'Minimal ceramic base with linen shade for warm ambient light.', 72, null, 'home-lifestyle', 64, 4.1, 19, false),
    ('Vitamin C Serum', 'vitamin-c-serum', 'Brightening serum with stabilized vitamin C and hyaluronic acid.', 42, 55, 'health-beauty', 140, 4.4, 203, false),
    ('Yoga Mat Pro', 'yoga-mat-pro', 'Extra thick mat with non-slip texture and carrying strap.', 38, null, 'sports-outdoor', 110, 4.5, 77, false),
    ('Stainless Steel Cookware Set', 'stainless-steel-cookware-set', '10-piece set with even heat distribution and oven-safe handles.', 210, 260, 'home-lifestyle', 20, 4.7, 95, false),
    ('Wireless Charging Pad', 'wireless-charging-pad', '15W fast wireless charging with aluminum body and LED status.', 34, 44, 'electronics', 200, 4.0, 312, false),
    ('Organic Green Tea', 'organic-green-tea', 'Pack of 100 tea bags sourced from high-elevation gardens.', 18, null, 'groceries-pets', 300, 4.6, 890, false),
    ('Leather Crossbody Bag', 'leather-crossbody-bag', 'Compact crossbody with adjustable strap and gold-tone hardware.', 142, 180, 'womens-fashion', 48, 4.5, 66, false),
    ('Running Shoes Air', 'running-shoes-air', 'Cushioned midsole and breathable mesh upper for daily miles.', 189, 220, 'sports-outdoor', 75, 4.7, 401, false),
    ('4K Streaming Stick', '4k-streaming-stick', 'Stream apps in 4K HDR with voice remote and compact design.', 59, 79, 'electronics', 130, 4.3, 900, false),
    ('Aloe Vera Gel', 'aloe-vera-gel', 'Soothing gel for after-sun care and daily hydration.', 12, null, 'health-beauty', 500, 4.2, 1200, false),
    ('Building Blocks Set', 'building-blocks-set', 'Colorful blocks for creative play, ages 3+.', 28, 35, 'babys-toys', 88, 4.8, 56, false),
    ('Espresso Machine Compact', 'espresso-machine-compact', '15-bar pump, milk frother wand, and removable drip tray.', 320, 399, 'home-lifestyle', 14, 4.6, 72, false),
    ('Cotton Crew Socks (6-pack)', 'cotton-crew-socks-6-pack', 'Breathable cotton blend with reinforced heel and toe.', 22, null, 'mens-fashion', 400, 4.1, 340, false),
    ('Portable Bluetooth Speaker', 'portable-bluetooth-speaker', 'IPX7 waterproof speaker with 12h battery and deep bass.', 89, 110, 'electronics', 66, 4.5, 210, true)
)
insert into public.products (
  name,
  slug,
  description,
  price,
  compare_at_price,
  category_id,
  stock,
  rating,
  review_count,
  image_url,
  is_flash_sale
)
select
  seed.name,
  seed.slug,
  seed.description,
  seed.price,
  seed.compare_at_price,
  categories.id,
  seed.stock,
  seed.rating,
  seed.review_count,
  format('https://picsum.photos/seed/%s/270/350', replace(seed.slug, ' ', '%20')),
  seed.is_flash_sale
from product_seed seed
join public.categories categories on categories.slug = seed.category_slug
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  compare_at_price = excluded.compare_at_price,
  category_id = excluded.category_id,
  stock = excluded.stock,
  rating = excluded.rating,
  review_count = excluded.review_count,
  image_url = excluded.image_url,
  is_flash_sale = excluded.is_flash_sale,
  updated_at = now();
