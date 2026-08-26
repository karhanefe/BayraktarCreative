-- Profiles table (for admin authorization - NOT just authenticated = admin)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  display_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  client TEXT,
  location TEXT,
  description TEXT,
  project_date DATE,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER DEFAULT 0,
  presentation_style TEXT DEFAULT 'auto' CHECK (presentation_style IN ('auto', 'portrait', 'landscape', 'square', 'wide', 'full-bleed', 'contained', 'editorial')),
  sort_order INTEGER DEFAULT 0,
  external_url TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Project Media (with aspect ratio awareness)
CREATE TABLE project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  storage_key TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  poster_url TEXT,
  mime_type TEXT NOT NULL,
  file_size BIGINT,
  width INTEGER,
  height INTEGER,
  duration REAL,
  sort_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  presentation_override TEXT DEFAULT 'auto' CHECK (presentation_override IN ('auto', 'portrait', 'landscape', 'square', 'wide', 'ultrawide', 'full-bleed', 'contained')),
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings (singleton)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT DEFAULT 'BAYRAKTAR CREATIVE',
  tagline TEXT DEFAULT 'Visual Stories for Brands, Spaces and People',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  about_text TEXT DEFAULT '',
  contact_text TEXT DEFAULT '',
  footer_text TEXT DEFAULT '',
  seo_title TEXT DEFAULT 'BAYRAKTAR CREATIVE | Visual Production Studio',
  seo_description TEXT DEFAULT 'Premium visual production studio specializing in real estate, commercial, automotive, and portrait photography and videography.',
  og_image TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Updated_at triggers for all tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- All necessary indexes
CREATE INDEX idx_profiles_auth_user_id ON profiles(auth_user_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category_id ON projects(category_id);
CREATE INDEX idx_projects_is_published ON projects(is_published);
CREATE INDEX idx_projects_is_featured ON projects(is_featured);
CREATE INDEX idx_projects_sort_order ON projects(sort_order);
CREATE INDEX idx_project_media_project_id ON project_media(project_id);
CREATE INDEX idx_project_media_sort_order ON project_media(sort_order);

-- Insert initial site_settings row
INSERT INTO site_settings (id) VALUES (gen_random_uuid());
