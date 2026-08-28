'use client';

import { useState } from 'react';
import MediaUploader from '@/components/admin/MediaUploader';
import MediaGrid, { MediaItem } from '@/components/admin/MediaGrid';
import { deleteMediaAction, setHeroMediaAction, updateMediaOrderAction } from '@/app/admin/actions';
import { useToast } from '@/components/admin/Toast';
import { useRouter } from 'next/navigation';
import type { Media } from '@/lib/supabase/types';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectMediaManagerProps {
  projectId: string;
  initialMedia: Media[];
}

export default function ProjectMediaManager({ projectId, initialMedia }: ProjectMediaManagerProps) {
  const { t, locale } = useLanguage();
  const [mediaList, setMediaList] = useState<MediaItem[]>(
    initialMedia.map((m) => ({
      id: m.id,
      url: m.url,
      type: m.type,
      width: m.width || 1920,
      height: m.height || 1080,
      size: 0,
      is_hero: m.is_hero || false,
      isCover: m.is_hero || false,
      sort_order: m.sort_order || 0,
    }))
  );
  const { success, error } = useToast();
  const router = useRouter();

  const handleUploadComplete = () => {
    router.refresh();
  };

  const handleUpdateOrder = async (reorderedItems: MediaItem[]) => {
    setMediaList(reorderedItems);
    try {
      const payload = reorderedItems.map((item, idx) => ({
        id: item.id,
        sort_order: idx + 1,
      }));
      const res = await updateMediaOrderAction(projectId, payload);
      if (res?.error) throw new Error(res.error);
      success(t.admin.projects.orderUpdated);
      router.refresh();
    } catch (err: any) {
      error(err.message || 'Failed to update order');
    }
  };

  const handleSetCover = async (mediaId: string) => {
    setMediaList((prev) =>
      prev.map((item) => ({
        ...item,
        is_hero: item.id === mediaId,
        isCover: item.id === mediaId,
      }))
    );
    try {
      const res = await setHeroMediaAction(projectId, mediaId);
      if (res?.error) throw new Error(res.error);
      success(locale === 'tr' ? 'Kapak medyası güncellendi' : 'Hero media updated');
      router.refresh();
    } catch (err: any) {
      error(err.message || 'Failed to set hero media');
    }
  };

  const handleDelete = async (mediaId: string) => {
    setMediaList((prev) => prev.filter((item) => item.id !== mediaId));
    try {
      const res = await deleteMediaAction(mediaId, projectId);
      if (res?.error) throw new Error(res.error);
      success(locale === 'tr' ? 'Medya silindi' : 'Media deleted');
      router.refresh();
    } catch (err: any) {
      error(err.message || 'Failed to delete media');
    }
  };

  return (
    <div className="space-y-6">
      <MediaUploader projectId={projectId} onUploadComplete={handleUploadComplete} />

      <div className="pt-6 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
            {t.admin.projectForm.mediaTab} ({mediaList.length})
          </h3>
          <span className="text-xs text-neutral-500 font-mono">
            {locale === 'tr' ? 'Sıralamak için sürükleyin • Yıldız kapak medyasını belirtir' : 'Drag to reorder • Star indicates hero cover'}
          </span>
        </div>

        {mediaList.length === 0 ? (
          <div className="p-8 text-center bg-[#1a1a1a] border border-[#2a2a2a] text-neutral-500 text-sm">
            {locale === 'tr' ? 'Bu proje için henüz medya yüklenmedi. Yukarıdan görsel veya video ekleyin.' : 'No media uploaded for this project yet. Upload images or videos above.'}
          </div>
        ) : (
          <MediaGrid
            items={mediaList}
            onUpdateOrder={handleUpdateOrder}
            onSetCover={handleSetCover}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
