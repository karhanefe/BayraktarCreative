INSERT INTO categories (name_tr, name_en, slug, sort_order) VALUES
  ('Mimari & Gayrimenkul', 'Architecture & Real Estate', 'architecture', 0),
  ('Otomotiv & Ticari', 'Automotive & Commercial', 'automotive', 1),
  ('Sinematik & Havadan', 'Cinematic & Aerial', 'cinematic', 2),
  ('Etkinlik & Prodüksiyon', 'Events & Production', 'events', 3)
ON CONFLICT (slug) DO UPDATE SET
  name_tr = EXCLUDED.name_tr,
  name_en = EXCLUDED.name_en,
  sort_order = EXCLUDED.sort_order;

INSERT INTO site_settings (key, value) VALUES
  ('site_title', '{"tr":"BAYRAKTAR CREATIVE — Premium Görsel Prodüksiyon","en":"BAYRAKTAR CREATIVE — Premium Visual Production"}'::jsonb),
  ('tagline', '"Visual Stories for Brands, Spaces and People"'::jsonb),
  ('contact_email', '"hello@bayraktarcreative.com"'::jsonb),
  ('contact_phone', '"+90 5XX XXX XX XX"'::jsonb),
  ('social_links', '{"instagram":"https://instagram.com/bayraktarcreative","youtube":"","whatsapp":"+905551234567"}'::jsonb),
  ('about_text', '"A creative production studio focused on cinematic imagery, architectural storytelling, and brand experiences."'::jsonb),
  ('contact_text', '"Let us create something worth watching."'::jsonb),
  ('footer_text', '"Independent visual production studio — Istanbul & Worldwide."'::jsonb),
  ('seo_title', '"BAYRAKTAR CREATIVE | Visual Production Studio"'::jsonb),
  ('seo_description', '"Premium visual production studio specializing in architecture, commercial, automotive, and cinematic content."'::jsonb),
  ('og_image', '""'::jsonb)
ON CONFLICT (key) DO NOTHING;
