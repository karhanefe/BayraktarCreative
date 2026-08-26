-- Helper function: is_admin() that checks profiles table
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE auth_user_id = auth.uid()
    AND role = 'admin'
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Admins can do everything on profiles"
  ON profiles FOR ALL
  USING (is_admin());

-- Categories Policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (is_visible = true OR is_admin());

CREATE POLICY "Admins can do everything on categories"
  ON categories FOR ALL
  USING (is_admin());

-- Projects Policies
CREATE POLICY "Published projects are viewable by everyone"
  ON projects FOR SELECT
  USING (is_published = true OR is_admin());

CREATE POLICY "Admins can do everything on projects"
  ON projects FOR ALL
  USING (is_admin());

-- Project Media Policies
CREATE POLICY "Project media is viewable by everyone"
  ON project_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_media.project_id
      AND (projects.is_published = true OR is_admin())
    )
  );

CREATE POLICY "Admins can do everything on project media"
  ON project_media FOR ALL
  USING (is_admin());

-- Site Settings Policies
CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON site_settings FOR UPDATE
  USING (is_admin());
