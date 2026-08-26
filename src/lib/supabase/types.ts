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
          name_tr: string;
          name_en: string;
          slug: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_tr: string;
          name_en: string;
          slug: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_tr?: string;
          name_en?: string;
          slug?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description_tr: string | null;
          description_en: string | null;
          category_id: string;
          client: string | null;
          location: string | null;
          year: number;
          hero_aspect_ratio: string;
          featured: boolean;
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description_tr?: string | null;
          description_en?: string | null;
          category_id: string;
          client?: string | null;
          location?: string | null;
          year?: number;
          hero_aspect_ratio?: string;
          featured?: boolean;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description_tr?: string | null;
          description_en?: string | null;
          category_id?: string;
          client?: string | null;
          location?: string | null;
          year?: number;
          hero_aspect_ratio?: string;
          featured?: boolean;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
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
      media: {
        Row: {
          id: string;
          project_id: string;
          type: 'image' | 'video';
          url: string;
          aspect_ratio: string;
          width: number;
          height: number;
          is_hero: boolean;
          sort_order: number;
          caption_tr: string | null;
          caption_en: string | null;
          poster_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          type: 'image' | 'video';
          url: string;
          aspect_ratio?: string;
          width?: number;
          height?: number;
          is_hero?: boolean;
          sort_order?: number;
          caption_tr?: string | null;
          caption_en?: string | null;
          poster_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          type?: 'image' | 'video';
          url?: string;
          aspect_ratio?: string;
          width?: number;
          height?: number;
          is_hero?: boolean;
          sort_order?: number;
          caption_tr?: string | null;
          caption_en?: string | null;
          poster_url?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "media_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          role: 'admin' | 'editor' | 'viewer';
          display_name: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          role?: 'admin' | 'editor' | 'viewer';
          display_name?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string;
          role?: 'admin' | 'editor' | 'viewer';
          display_name?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
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

// Base row types
export type Category = Database['public']['Tables']['categories']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Media = Database['public']['Tables']['media']['Row'];
export type SiteSettingRow = Database['public']['Tables']['site_settings']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

// Backward compatibility alias for Media
export type ProjectMedia = Media;

// Composite / Joined Types
export type ProjectWithCategory = Project & {
  category: Category | null;
};

export type ProjectWithMedia = Project & {
  media: Media[];
};

export type CompleteProject = Project & {
  category: Category | null;
  media: Media[];
};

// Parsed site settings model
export interface SiteSettings {
  id?: string;
  site_title?: {
    tr?: string;
    en?: string;
  } | string;
  tagline?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  whatsapp?: string;
  about_text?: string;
  contact_text?: string;
  footer_text?: string;
  seo_title?: string;
  seo_description?: string;
  og_image?: string;
  social_links?: {
    instagram?: string;
    vimeo?: string;
    youtube?: string;
    whatsapp?: string;
    [key: string]: string | undefined;
  };
  updated_at?: string;
}
