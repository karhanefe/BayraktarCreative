import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/supabase/admin-queries';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Unauthorized: Supabase credentials not configured' },
        { status: 401 }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await isUserAdmin(user.id);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin privilege required' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      projectId, 
      storageKey,
      url, 
      mediaType, 
      type,
      mimeType,
      fileSize,
      duration,
      width, 
      height, 
      aspect_ratio,
      sort_order, 
      is_hero,
      is_cover, 
      caption_tr,
      caption_en,
      alt_text,
      poster_url,
    } = body;

    const actualType = mediaType || type || 'image';

    if (!projectId || !storageKey || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (actualType !== 'image' && actualType !== 'video') {
      return NextResponse.json({ error: 'Invalid media type' }, { status: 400 });
    }

    // Verify project exists
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const w = width || (actualType === 'video' ? 1920 : 1920);
    const h = height || (actualType === 'video' ? 1080 : 1080);
    const calculatedAspect = `${w}:${h}`;
    const { count: currentMediaCount, error: countError } = await supabase
      .from('media')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', projectId);

    if (countError) throw countError;
    const shouldBeHero = is_hero ?? is_cover ?? (currentMediaCount === 0);

    // Create media record in live "media" table
    const { data: media, error: mediaError } = await supabase
      .from('media')
      .insert({
        project_id: projectId,
        type: actualType,
        url,
        aspect_ratio: aspect_ratio || calculatedAspect,
        width: w,
        height: h,
        sort_order: sort_order || 0,
        caption_tr: caption_tr || alt_text || null,
        caption_en: caption_en || alt_text || null,
        poster_url: poster_url || null,
        storage_key: storageKey,
        mime_type: mimeType || null,
        file_size: fileSize || null,
        duration: duration || null,
        is_hero: shouldBeHero,
      })
      .select()
      .single();

    if (mediaError) {
      throw mediaError;
    }

    return NextResponse.json({ media });
  } catch (error) {
    console.error('Upload complete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
