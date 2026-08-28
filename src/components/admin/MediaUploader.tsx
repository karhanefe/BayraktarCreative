'use client';

import { useState } from 'react';
import { UploadCloud, FileVideo, X, RotateCw } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { cn } from '@/lib/utils';
import { uploadMedia } from '@/lib/r2/client-upload';
import { MAX_IMAGE_SIZE, MAX_VIDEO_SIZE, formatUploadLimit } from '@/lib/upload-config';

interface MediaUploaderProps {
  projectId: string;
  onUploadComplete?: () => void;
}

interface QueueItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  preview: string | null;
  error?: string;
}

export default function MediaUploader({ projectId, onUploadComplete }: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const { error: toastError, success: toastSuccess } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const img = new window.Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve({ width: img.naturalWidth || 1920, height: img.naturalHeight || 1080 });
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve({ width: 1920, height: 1080 });
        };
        img.src = url;
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        const url = URL.createObjectURL(file);
        video.onloadedmetadata = () => {
          URL.revokeObjectURL(url);
          resolve({ width: video.videoWidth || 1920, height: video.videoHeight || 1080 });
        };
        video.onerror = () => {
          URL.revokeObjectURL(url);
          resolve({ width: 1920, height: 1080 });
        };
        video.src = url;
      } else {
        resolve({ width: 1920, height: 1080 });
      }
    });
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const newItems: QueueItem[] = [];

    Array.from(files).forEach((file) => {
      const isVideo = file.type.startsWith('video/');
      const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

      if (file.size > maxSize) {
        toastError(`File ${file.name} is too large. Max ${formatUploadLimit(maxSize)}`);
        return;
      }

      const item: QueueItem = {
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: 'pending',
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      };

      newItems.push(item);
    });

    if (newItems.length > 0) {
      setQueue((prev) => [...prev, ...newItems]);
      newItems.forEach(startUpload);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  const startUpload = async (item: QueueItem) => {
    setQueue((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: 'uploading', progress: 5 } : i)));

    try {
      const dimensions = await getImageDimensions(item.file);

      await uploadMedia(
        item.file,
        projectId,
        {
          width: dimensions.width,
          height: dimensions.height,
          sort_order: 0,
          is_cover: false,
          alt_text: item.file.name.replace(/\.[^/.]+$/, ''),
        },
        (progress) => {
          setQueue((prev) => prev.map((i) => (i.id === item.id ? { ...i, progress } : i)));
        }
      );

      setQueue((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: 'complete', progress: 100 } : i)));
      toastSuccess(`Uploaded ${item.file.name}`);
      if (onUploadComplete) onUploadComplete();
    } catch (err: any) {
      console.error('Upload error:', err);
      setQueue((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: 'error', error: err.message } : i)));
      toastError(err.message || `Failed to upload ${item.file.name}`);
    }
  };

  const removeFile = (id: string) => {
    setQueue((prev) => prev.filter((i) => i.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          'border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all bg-[#1a1a1a]',
          isDragging ? 'border-[#f5f5f0] bg-[#2a2a2a]' : 'border-[#2a2a2a] hover:border-neutral-500'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-12 h-12 text-neutral-500 mb-4" />
        <h3 className="text-lg font-bold tracking-wider mb-2">DRAG & DROP YOUR MEDIA HERE</h3>
        <p className="text-neutral-500 text-sm mb-6">
          Supports JPG, PNG, WEBP, GIF, AVIF, MP4, WEBM, MOV (Max {formatUploadLimit(MAX_VIDEO_SIZE)} Video / {formatUploadLimit(MAX_IMAGE_SIZE)} Image)
        </p>

        <label className="cursor-pointer px-6 py-2 bg-[#2a2a2a] hover:bg-[#333] transition-colors text-sm font-bold uppercase tracking-widest inline-block">
          Choose Files
          <input type="file" multiple className="hidden" onChange={handleFileSelect} accept="image/*,video/*" />
        </label>
      </div>

      {queue.length > 0 && (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] divide-y divide-[#2a2a2a]">
          {queue.map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden border border-[#2a2a2a]">
                {item.preview ? (
                  <img src={item.preview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <FileVideo className="w-5 h-5 text-neutral-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <span className="text-sm truncate text-[#f5f5f0] font-medium pr-4">{item.file.name}</span>
                  <span className="text-xs text-neutral-500 whitespace-nowrap">{formatSize(item.file.size)}</span>
                </div>

                <div className="h-1.5 w-full bg-[#0a0a0a] overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      item.status === 'error'
                        ? 'bg-red-500'
                        : item.status === 'complete'
                        ? 'bg-green-500'
                        : 'bg-[#f5f5f0]'
                    )}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="text-[10px] uppercase tracking-wider mt-1 text-neutral-500 flex justify-between">
                  <span>{item.status}</span>
                  <span>{Math.round(item.progress)}%</span>
                </div>
              </div>

              <div className="flex gap-2">
                {item.status === 'error' && (
                  <button onClick={() => startUpload(item)} className="p-2 text-neutral-400 hover:text-white" title="Retry">
                    <RotateCw className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => removeFile(item.id)} className="p-2 text-neutral-400 hover:text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
