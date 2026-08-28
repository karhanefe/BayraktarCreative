import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/supabase/admin-queries';
import { generatePresignedUploadUrl, validateUploadRequest, sanitizeFilename, getPublicUrl, isR2Configured } from '@/lib/r2/upload';

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

    if (!isR2Configured()) {
      return NextResponse.json(
        { error: 'Media storage is not configured. Add the Cloudflare R2 environment variables in Vercel.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { filename, contentType, fileSize, projectId } = body;

    if (!filename || !contentType || !fileSize || !projectId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const validation = validateUploadRequest(filename, contentType, fileSize);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Generate unique storage key
    const uniqueId = crypto.randomUUID();
    const sanitizedName = sanitizeFilename(filename);
    const storageKey = `projects/${projectId}/${uniqueId}-${sanitizedName}`;

    // Generate presigned URL
    const presignedUrl = await generatePresignedUploadUrl(storageKey, contentType);
    const publicUrl = getPublicUrl(storageKey);

    return NextResponse.json({
      presignedUrl,
      storageKey,
      publicUrl,
    });
  } catch (error) {
    console.error('Presign URL generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
