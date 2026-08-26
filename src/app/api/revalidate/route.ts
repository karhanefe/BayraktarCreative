import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/supabase/admin-queries';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Unauthorized: Supabase not configured' }, { status: 401 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await isUserAdmin(user.id);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { path, type } = body;

    if (!path) {
      return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    if (type === 'layout') {
      revalidatePath(path, 'layout');
    } else {
      revalidatePath(path, 'page');
    }

    return NextResponse.json({ revalidated: true, now: Date.now(), path });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
