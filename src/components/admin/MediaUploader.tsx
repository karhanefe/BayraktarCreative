'use client';

import { useState, useCallback } from 'react';
import { UploadCloud, FileImage, FileVideo, X, RotateCw } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import { cn } from '@/lib/utils';
// Note: Assumes uploadMedia exists in r2/client-upload.ts as per instructions
// import { uploadMedia } from '@/lib/r2/client-upload';

interface MediaUploaderProps {
  projectId: string;
  onUploadComplete?: () => void;
}

export default function MediaUploader({ projectId, onUploadComplete }: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [queue, setQueue] = useState<any[]>([]);
  const { error } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;
    
    const newItems = Array.from(files).map((file) => {
      // Validate
      const isVideo = file.type.startsWith('video/');
      const maxSize = isVideo ? 100 * 1024 * 1024 : 20 * 1024 * 1024;
      
      if (file.size > maxSize) {
        error(`File ${file.name} is too large. Max ${isVideo ? '100MB' : '20MB'}`);
        return null;
      }

      return {
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: 'pending', // pending, uploading, complete, error
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      };
    }).filter(Boolean);

    if (newItems.length > 0) {
      setQueue((prev) => [...prev, ...newItems]);
      // Mocking upload start
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
  };

  const startUpload = async (item: any) => {
    setQueue((prev) => prev.map(i => i.id === item.id ? { ...i, status: 'uploading' } : i));
    
    try {
      // Mock upload process
      // In reality: await uploadMedia(item.file, projectId, (progress) => { ... })
      for (let p = 0; p <= 100; p += 10) {
        await new Promise(r => setTimeout(r, 200));
        setQueue((prev) => prev.map(i => i.id === item.id ? { ...i, progress: p } : i));
      }
      
      setQueue((prev) => prev.map(i => i.id === item.id ? { ...i, status: 'complete', progress: 100 } : i));
      if (onUploadComplete) onUploadComplete();
    } catch (err) {
      setQueue((prev) => prev.map(i => i.id === item.id ? { ...i, status: 'error' } : i));
    }
  };

  const removeFile = (id: string) => {
    setQueue((prev) => prev.filter(i => i.id !== id));
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
          "border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all bg-[#1a1a1a]",
          isDragging ? "border-[#f5f5f0] bg-[#2a2a2a]" : "border-[#2a2a2a] hover:border-neutral-500"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-12 h-12 text-neutral-500 mb-4" />
        <h3 className="text-lg font-bold tracking-wider mb-2">DRAG & DROP YOUR MEDIA HERE</h3>
        <p className="text-neutral-500 text-sm mb-6">Supports JPG, PNG, WEBP, MP4, WEBM (Max 100MB Video / 20MB Image)</p>
        
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
                      "h-full transition-all duration-300",
                      item.status === 'error' ? "bg-red-500" : 
                      item.status === 'complete' ? "bg-green-500" : "bg-[#f5f5f0]"
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
