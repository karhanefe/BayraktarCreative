-- Insert default categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Real Estate', 'real-estate', 'Luxury homes, commercial properties, and architectural photography.', 10),
  ('Drone', 'drone', 'Aerial photography and videography for properties and events.', 20),
  ('Commercial', 'commercial', 'Brand campaigns, products, and commercial spaces.', 30),
  ('Automotive', 'automotive', 'Car photography, rolling shots, and dealership promotions.', 40),
  ('Food & Beverage', 'food-beverage', 'Restaurant menus, culinary experiences, and food products.', 50),
  ('Portrait', 'portrait', 'Professional headshots, lifestyle portraits, and corporate team photos.', 60),
  ('Social Media', 'social-media', 'Reels, TikToks, and social-first vertical content.', 70),
  ('Other', 'other', 'Assorted creative projects and visual storytelling.', 80);

-- Insert 4 demo projects
DO $$
DECLARE
  cat_real_estate UUID;
  cat_commercial UUID;
  cat_automotive UUID;
  p_urban UUID := gen_random_uuid();
  p_coastal UUID := gen_random_uuid();
  p_bmw UUID := gen_random_uuid();
  p_cafe UUID := gen_random_uuid();
BEGIN
  -- Get category IDs
  SELECT id INTO cat_real_estate FROM categories WHERE slug = 'real-estate';
  SELECT id INTO cat_commercial FROM categories WHERE slug = 'commercial';
  SELECT id INTO cat_automotive FROM categories WHERE slug = 'automotive';

  -- Urban Residence (Demo)
  INSERT INTO projects (id, title, slug, category_id, client, location, description, project_date, is_published, is_featured, featured_order, presentation_style)
  VALUES (
    p_urban, 'Urban Residence', 'urban-residence', cat_real_estate, 'Luxury Living Co.', 'Downtown Metro',
    '[DEMO] A modern high-rise apartment showcasing sleek interior design and panoramic city views.',
    '2023-10-15', true, true, 10, 'landscape'
  );

  -- Coastal Villa (Demo)
  INSERT INTO projects (id, title, slug, category_id, client, location, description, project_date, is_published, is_featured, featured_order, presentation_style)
  VALUES (
    p_coastal, 'Coastal Villa', 'coastal-villa', cat_real_estate, 'Seaside Properties', 'Azure Coast',
    '[DEMO] An exclusive look at a multi-million dollar beachfront property featuring expansive outdoor living spaces.',
    '2023-11-02', true, true, 20, 'full-bleed'
  );

  -- BMW G20 Visual (Demo)
  INSERT INTO projects (id, title, slug, category_id, client, location, description, project_date, is_published, is_featured, featured_order, presentation_style)
  VALUES (
    p_bmw, 'BMW G20 Visual', 'bmw-g20-visual', cat_automotive, 'Bavarian Auto Group', 'City Streets',
    '[DEMO] Dynamic rolling shots and detailed stationary photography of the latest BMW 3 Series.',
    '2024-01-20', true, true, 30, 'editorial'
  );

  -- Minimal Café (Demo)
  INSERT INTO projects (id, title, slug, category_id, client, location, description, project_date, is_published, is_featured, featured_order, presentation_style)
  VALUES (
    p_cafe, 'Minimal Café', 'minimal-cafe', cat_commercial, 'Brew & Bean', 'Westside District',
    '[DEMO] Architectural and lifestyle photography capturing the ambiance of a new minimalist coffee shop.',
    '2024-02-14', true, false, 0, 'square'
  );

  -- Insert Demo Project Media (Urban Residence)
  INSERT INTO project_media (project_id, media_type, storage_key, url, mime_type, width, height, sort_order, is_cover, presentation_override)
  VALUES 
    (p_urban, 'image', 'demo/urban-1.jpg', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80', 'image/jpeg', 1920, 1080, 10, true, 'landscape'),
    (p_urban, 'image', 'demo/urban-2.jpg', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1080&q=80', 'image/jpeg', 1080, 1350, 20, false, 'portrait'),
    (p_urban, 'image', 'demo/urban-3.jpg', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2560&q=80', 'image/jpeg', 2560, 1080, 30, false, 'ultrawide');

  -- Insert Demo Project Media (Coastal Villa)
  INSERT INTO project_media (project_id, media_type, storage_key, url, mime_type, width, height, sort_order, is_cover, presentation_override)
  VALUES 
    (p_coastal, 'image', 'demo/coastal-1.jpg', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80', 'image/jpeg', 1920, 1080, 10, true, 'landscape'),
    (p_coastal, 'image', 'demo/coastal-2.jpg', 'https://images.unsplash.com/photo-1613490908677-9df03bf59483?w=1080&q=80', 'image/jpeg', 1080, 1920, 20, false, 'portrait');

  -- Insert Demo Project Media (BMW)
  INSERT INTO project_media (project_id, media_type, storage_key, url, mime_type, width, height, sort_order, is_cover, presentation_override)
  VALUES 
    (p_bmw, 'image', 'demo/bmw-1.jpg', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=80', 'image/jpeg', 1920, 1080, 10, true, 'landscape'),
    (p_bmw, 'image', 'demo/bmw-2.jpg', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1080&q=80', 'image/jpeg', 1080, 1080, 20, false, 'square');

  -- Insert Demo Project Media (Cafe)
  INSERT INTO project_media (project_id, media_type, storage_key, url, mime_type, width, height, sort_order, is_cover, presentation_override)
  VALUES 
    (p_cafe, 'image', 'demo/cafe-1.jpg', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80', 'image/jpeg', 1920, 1080, 10, true, 'landscape');
END $$;
