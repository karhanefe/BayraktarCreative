# BAYRAKTAR CREATIVE — FULL-STACK CINEMATIC STUDIO PLATFORM

> **Domain**: `bayraktarcreative.com`  
> **Aesthetic**: Minimal + Cinematic + Editorial + Mixed Aspect-Ratio Aware + High-Performance  
> **Tech Stack**: Next.js 15+ (App Router), React 19, TypeScript (Strict Mode), Tailwind CSS v4, GSAP 3 + ScrollTrigger, Lenis Smooth Scroll, Supabase (PostgreSQL + RLS Auth), Cloudflare R2 (Presigned Direct Uploads).

---

## 1. Executive Summary & Vision

**BAYRAKTAR CREATIVE** is a contemporary digital creative studio, film production house, and experiential visual brand platform. It was engineered from the ground up to feel like an art-directed visual exhibition rather than a generic template or standard portfolio.

### Core Architectural Pillars
- **Aspect-Ratio-Aware Media System**: Native support for **16:9** (cinematic film), **9:16** (vertical reels/stories), **21:9** (ultrawide anamorphic), **4:5 / 3:4** (editorial portraits), **1:1** (square), and arbitrary custom dimensions without container distortion or forced cropping.
- **Cinematic Parallax & Choreographed Motion**: Layered depth perception via GSAP 3 and ScrollTrigger. The hero section undergoes a continuous scroll transformation rather than simply sliding off-screen.
- **Performance-First Media Loading**: Staged intersection-based video playback, poster-first rendering, lazy loading, and viewport detachment ensuring 60fps scrolling and ultra-lightweight initial bundles (**103 kB First Load JS**).
- **Hardened Admin CMS & Authorization**: Supabase Auth with server-side profile verification (`is_admin()` SQL function) ensuring authenticated users cannot gain admin access without explicit database authorization.
- **Zero-Egress Direct Object Storage**: Cloudflare R2 presigned PUT upload architecture that bypasses Next.js server payload limits and prevents path traversal.

---

## 2. Technology Stack & Key Dependencies

| Domain | Technology / Library | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ (App Router) | Server Components, SSG, Route Handlers, Server Actions |
| **Language** | TypeScript 5 (Strict Mode) | Full type safety across public pages, CMS, and API routes |
| **Styling** | Tailwind CSS v4 + Design Tokens | CSS-first `@theme`, fluid clamp typography, centralized tokens |
| **Motion** | GSAP 3.12 + `@gsap/react` | Scoped lifecycle animations, ScrollTrigger, `matchMedia` |
| **Smooth Scroll** | Lenis (Synced to GSAP Ticker) | 60fps momentum scroll with touch and reduced-motion fallbacks |
| **Database** | Supabase (PostgreSQL) | Strongly typed tables with foreign keys, triggers & RLS |
| **Authentication** | Supabase SSR Auth | Cookie-based session management and middleware guards |
| **Storage** | Cloudflare R2 | S3-compatible zero-egress asset storage with presigned URLs |

---

## 3. Project Structure

```
bayraktar-creative/
├── src/
│   ├── app/
│   │   ├── (public routes)
│   │   │   ├── page.tsx                     # Homepage (Scenes 01–08)
│   │   │   ├── work/page.tsx                # Filterable Portfolio Grid
│   │   │   ├── work/[slug]/page.tsx         # Media-Aware Project Detail Page
│   │   │   ├── work/[slug]/ProjectDetailClient.tsx # Client-side MediaViewer hook
│   │   │   ├── about/page.tsx               # Editorial Philosophy Spread
│   │   │   ├── about/AboutClient.tsx        # About page scroll triggers
│   │   │   ├── contact/page.tsx             # Large-format Contact Experience
│   │   │   ├── not-found.tsx                # Branded 404 "Frame Doesn't Exist"
│   │   │   ├── sitemap.ts                   # Dynamic XML Sitemap generator
│   │   │   └── robots.ts                    # Search engine crawler policies
│   │   ├── admin/
│   │   │   ├── layout.tsx                   # Server-side auth guard & layout
│   │   │   ├── ClientLayout.tsx             # Responsive sidebar shell
│   │   │   ├── login/page.tsx               # Minimal admin authentication
│   │   │   ├── page.tsx                     # Studio dashboard metrics
│   │   │   ├── projects/page.tsx            # Project manager (search, filter, sort)
│   │   │   ├── projects/new/page.tsx        # Project creation workflow
│   │   │   ├── projects/[id]/page.tsx       # Project edit & media manager
│   │   │   ├── categories/page.tsx          # Category CRUD & ordering
│   │   │   ├── settings/page.tsx            # Studio metadata & contact settings
│   │   │   └── actions.ts                   # Hardened Server Actions
│   │   ├── api/
│   │   │   ├── upload/presign/route.ts      # Server-validated R2 presign handler
│   │   │   ├── upload/complete/route.ts     # Media metadata persistence handler
│   │   │   └── revalidate/route.ts          # On-demand ISR cache invalidation
│   │   ├── globals.css                      # Tailwind v4 theme & base layer
│   │   └── layout.tsx                       # Root Layout with SmoothScroll & Nav
│   ├── components/
│   │   ├── animation/
│   │   │   ├── Parallax.tsx                 # Aspect-ratio & device-aware parallax
│   │   │   ├── ScrollReveal.tsx             # Multi-variant scroll reveals
│   │   │   └── TextReveal.tsx               # Scroll-driven typography animator
│   │   ├── home/
│   │   │   ├── Hero.tsx                     # Scene 01: Hero & scroll transformation
│   │   │   ├── Statement.tsx                # Scene 02: Giant editorial statement
│   │   │   ├── FeaturedWork.tsx             # Scene 03: Asymmetric featured showcase
│   │   │   ├── HorizontalPortfolio.tsx      # Scene 04: Pinned horizontal storytelling
│   │   │   ├── CategoryShowcase.tsx         # Scene 05: Editorial disciplines
│   │   │   ├── AboutPreview.tsx             # Scene 06: Studio capabilities preview
│   │   │   └── ContactCTA.tsx               # Scene 07: Final interactive CTA
│   │   ├── media/
│   │   │   ├── AdaptiveMedia.tsx            # Universal aspect-ratio-aware component
│   │   │   ├── MediaViewer.tsx              # Fullscreen cinematic dialog viewer
│   │   │   └── VideoPlayer.tsx              # Intersection-based video controller
│   │   ├── portfolio/
│   │   │   ├── ProjectCard.tsx              # Ratio-adaptive card with glass overlay
│   │   │   └── ProjectGrid.tsx              # Mixed-aspect-ratio masonry layout
│   │   ├── ui/
│   │   │   ├── Header.tsx                   # Smart hide/show & contrast-aware header
│   │   │   ├── MobileNav.tsx                # Fullscreen cinematic mobile drawer
│   │   │   ├── Footer.tsx                   # Studio close
│   │   │   ├── Button.tsx                   # Polymorphic magnetic button
│   │   │   ├── MagneticElement.tsx          # Pointer-only magnetic interaction
│   │   │   ├── CustomCursor.tsx             # Subtle non-intrusive cursor follower
│   │   │   ├── PageTransition.tsx           # Route segment transition overlay
│   │   │   └── ScrollIndicator.tsx          # Hero pulsing scroll guide
│   │   ├── admin/
│   │   │   ├── ProjectForm.tsx              # Project editor with auto-slug
│   │   │   ├── MediaUploader.tsx            # Resilient multi-file drag-and-drop
│   │   │   ├── MediaGrid.tsx                # Drag-to-reorder media gallery
│   │   │   ├── AdminSidebar.tsx             # Admin navigation bar
│   │   │   ├── ConfirmDialog.tsx            # Destructive action modal
│   │   │   └── Toast.tsx                    # Feedback notification system
│   │   └── providers/
│   │       └── SmoothScrollProvider.tsx     # Lenis provider synced to GSAP ticker
│   ├── lib/
│   │   ├── animation.ts                     # Motion curves, durations, and easings
│   │   ├── design-tokens.ts                 # Centralized color, type, and z-index tokens
│   │   ├── fonts.ts                         # Inter body & display font variables
│   │   ├── gsap-config.ts                   # Client-side GSAP + ScrollTrigger singleton
│   │   ├── media.ts                         # Aspect-ratio math & layout classifier
│   │   ├── demo-data.ts                     # Realistic fallback projects for dev mode
│   │   ├── utils.ts                         # Tailwind merge & clsx utility
│   │   ├── r2/                              # Cloudflare R2 S3 client & direct upload
│   │   └── supabase/                        # Database queries, mutations & clients
│   └── proxy.ts                             # Route protection & cookie refresh
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql           # Tables, indexes, updated_at triggers
│       ├── 002_rls_policies.sql             # Admin security & public read policies
│       ├── 003_seed_data.sql                # Default categories and site settings
│       └── 004_media_storage_metadata.sql   # R2 object metadata for uploads
├── next.config.ts                           # Server packages & image optimization
├── tsconfig.json                            # Strict TypeScript compiler options
└── package.json                             # Dependencies and scripts
```

---

## 4. Aspect-Ratio-Aware Media System

Unlike conventional portfolio templates that crop all imagery into uniform 9:16 or 16:9 boxes, Bayraktar Creative implements a **dynamic layout system**:

1. **Automatic Classification**:
   - `ratio < 0.6` $\rightarrow$ **Portrait / 9:16** (Vertical reels, stories)
   - `0.6 <= ratio < 0.9` $\rightarrow$ **Vertical / 4:5, 3:4** (Editorial photography)
   - `0.9 <= ratio <= 1.1` $\rightarrow$ **Square / 1:1** (Balanced detail shots)
   - `1.1 < ratio < 1.6` $\rightarrow$ **Landscape / 4:3** (Standard composition)
   - `1.6 <= ratio <= 2.0` $\rightarrow$ **Wide / 16:9** (Cinematic widescreen)
   - `ratio > 2.0` $\rightarrow$ **Ultrawide / 21:9** (Anamorphic scope)

2. **Context-Aware Presentation**:
   - **Card**: Maintains the natural aspect ratio with subtle scale transitions and liquid glass overlay on hover.
   - **Featured Work**: Uses an asymmetric 12-column grid allowing widescreen films (8 cols) and vertical reels (4 cols) to co-exist in harmony.
   - **Horizontal Portfolio**: Consistent height baseline with variable widths reflecting each project's native media ratio.
   - **Project Detail Hero**: Automatically detects whether the cover is landscape (full-bleed immersive banner) or portrait (split-column editorial layout).
   - **Media Viewer**: Fullscreen dialog using `object-contain` to preserve exact native dimensions without stretching or letterbox clipping.

---

## 5. Local Setup & Installation

### Prerequisites
- Node.js 20.x or 22.x+
- npm 10.x+

### Quick Start
```bash
# 1. Clone or navigate to the project directory
cd bayraktar-creative

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev

# 5. Open browser at:
# http://localhost:3000
```

---

## 6. Environment Variables Guide

Create a `.env.local` file in the root directory:

```env
# ==============================================================================
# SUPABASE CONFIGURATION
# ==============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-never-expose-to-client

# ==============================================================================
# CLOUDFLARE R2 OBJECT STORAGE (S3-Compatible)
# ==============================================================================
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=bayraktar-media
R2_PUBLIC_BASE_URL=https://media.bayraktarcreative.com

# ==============================================================================
# SITE & REVALIDATION SETTINGS
# ==============================================================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional local-only sample display. Keep false in production.
DEMO_MODE=false
```

---

## 7. Database Migration & Security Setup

1. In your **Supabase Dashboard**, open the **SQL Editor**.
2. Run the migration scripts in sequential order:
   - `supabase/migrations/001_initial_schema.sql` (Creates `profiles`, `categories`, `projects`, `media`, `site_settings` tables, constraints, indexes, and triggers)
   - `supabase/migrations/002_rls_policies.sql` (Implements Row Level Security and the `is_admin()` authorization function)
   - `supabase/migrations/003_seed_data.sql` (Seeds default categories and initial site settings)
   - `supabase/migrations/004_media_storage_metadata.sql` (Adds R2 metadata used by upload and delete operations)

Bundled example projects are not treated as live content. When the database is empty,
an administrator can import them once from the admin dashboard and edit them normally.

3. **To Grant Administrator Access**:
   After creating an account via Supabase Auth (or `/admin/login`), insert a record into the `profiles` table:
   ```sql
   INSERT INTO profiles (auth_user_id, role, display_name, is_active)
   VALUES ('YOUR_SUPABASE_AUTH_USER_UUID', 'admin', 'Studio Director', true)
   ON CONFLICT (auth_user_id) DO UPDATE SET role = 'admin', is_active = true;
   ```

---

## 8. Cloudflare R2 CORS Configuration

To allow direct browser uploads via presigned URLs without CORS errors, configure the CORS Policy in Cloudflare Dashboard -> **R2** -> **Bucket Settings** -> **CORS Policy**:

```json
[
  {
    "AllowedOrigins": [
      "https://bayraktarcreative.com",
      "https://www.bayraktarcreative.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "PUT", "HEAD"],
    "AllowedHeaders": ["Content-Type", "Content-Length"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

---

## 9. Verification & Build Commands

```bash
# Typecheck with TypeScript strict mode
npx tsc --noEmit

# Production build
npm run build

# Start production server
npm run start
```
