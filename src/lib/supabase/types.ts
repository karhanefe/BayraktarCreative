export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          sort_order: number | null;
          is_visible: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          sort_order?: number | null;
          is_visible?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          sort_order?: number | null;
          is_visible?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          role: 'admin' | 'editor' | 'viewer';
          display_name: string | null;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          role?: 'admin' | 'editor' | 'viewer';
          display_name?: string | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          auth_user_id?: string;
          role?: 'admin' | 'editor' | 'viewer';
          display_name?: string | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      project_media: {
        Row: {
          id: string;
          project_id: string;
          media_type: 'image' | 'video';
          storage_key: string;
          url: string;
          thumbnail_url: string | null;
          poster_url: string | null;
          mime_type: string;
          file_size: number | null;
          width: number | null;
          height: number | null;
          duration: number | null;
          sort_order: number | null;
          is_cover: boolean | null;
          presentation_override: 'auto' | 'portrait' | 'landscape' | 'square' | 'wide' | 'ultrawide' | 'full-bleed' | 'contained' | null;
          alt_text: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          media_type: 'image' | 'video';
          storage_key: string;
          url: string;
          thumbnail_url?: string | null;
          poster_url?: string | null;
          mime_type: string;
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          duration?: number | null;
          sort_order?: number | null;
          is_cover?: boolean | null;
          presentation_override?: 'auto' | 'portrait' | 'landscape' | 'square' | 'wide' | 'ultrawide' | 'full-bleed' | 'contained' | null;
          alt_text?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          media_type?: 'image' | 'video';
          storage_key?: string;
          url?: string;
          thumbnail_url?: string | null;
          poster_url?: string | null;
          mime_type?: string;
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          duration?: number | null;
          sort_order?: number | null;
          is_cover?: boolean | null;
          presentation_override?: 'auto' | 'portrait' | 'landscape' | 'square' | 'wide' | 'ultrawide' | 'full-bleed' | 'contained' | null;
          alt_text?: string | null;
          created_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category_id: string | null;
          client: string | null;
          location: string | null;
          description: string | null;
          project_date: string | null;
          is_published: boolean | null;
          is_featured: boolean | null;
          featured_order: number | null;
          presentation_style: 'auto' | 'portrait' | 'landscape' | 'square' | 'wide' | 'full-bleed' | 'contained' | 'editorial' | null;
          sort_order: number | null;
          external_url: string | null;
          tags: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category_id?: string | null;
          client?: string | null;
          location?: string | null;
          description?: string | null;
          project_date?: string | null;
          is_published?: boolean | null;
          is_featured?: boolean | null;
          featured_order?: number | null;
          presentation_style?: 'auto' | 'portrait' | 'landscape' | 'square' | 'wide' | 'full-bleed' | 'contained' | 'editorial' | null;
          sort_order?: number | null;
          external_url?: string | null;
          tags?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          category_id?: string | null;
          client?: string | null;
          location?: string | null;
          description?: string | null;
          project_date?: string | null;
          is_published?: boolean | null;
          is_featured?: boolean | null;
          featured_order?: number | null;
          presentation_style?: 'auto' | 'portrait' | 'landscape' | 'square' | 'wide' | 'full-bleed' | 'contained' | 'editorial' | null;
          sort_order?: number | null;
          external_url?: string | null;
          tags?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      site_settings: {
        Row: {
          id: string;
          site_title: string | null;
          tagline: string | null;
          phone: string | null;
          email: string | null;
          instagram: string | null;
          whatsapp: string | null;
          about_text: string | null;
          contact_text: string | null;
          footer_text: string | null;
          seo_title: string | null;
          seo_description: string | null;
          og_image: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          site_title?: string | null;
          tagline?: string | null;
          phone?: string | null;
          email?: string | null;
          instagram?: string | null;
          whatsapp?: string | null;
          about_text?: string | null;
          contact_text?: string | null;
          footer_text?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          site_title?: string | null;
          tagline?: string | null;
          phone?: string | null;
          email?: string | null;
          instagram?: string | null;
          whatsapp?: string | null;
          about_text?: string | null;
          contact_text?: string | null;
          footer_text?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectMedia = Database['public']['Tables']['project_media']['Row'];
export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];

export type ProjectWithCategory = Project & {
  category: Category | null;
};

export type ProjectWithMedia = Project & {
  media: ProjectMedia[];
};

export type CompleteProject = ProjectWithCategory & {
  media: ProjectMedia[];
};
