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
      mimeType, 
      fileSize, 
      width, 
      height, 
      duration, 
      sort_order, 
      is_cover, 
      alt_text 
    } = body;

    if (!projectId || !storageKey || !url || !mediaType || !mimeType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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

    // Create media record
    const { data: media, error: mediaError } = await supabase
      .from('project_media')
      .insert({
        project_id: projectId,
        storage_key: storageKey,
        url,
        media_type: mediaType,
        mime_type: mimeType,
        file_size: fileSize,
        width,
        height,
        duration,
        sort_order: sort_order || 0,
        is_cover: is_cover || false,
        alt_text,
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
