'use client';

import { useState } from 'react';
import { GripVertical, Trash2, Star, Image as ImageIcon, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  width: number;
  height: number;
  size: number;
  isCover: boolean;
}

interface MediaGridProps {
  items: MediaItem[];
  onUpdateOrder: (items: MediaItem[]) => void;
  onSetCover: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MediaGrid({ items, onUpdateOrder, onSetCover, onDelete }: MediaGridProps) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const formatSize = (bytes: number) => {
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIdx];
    newItems.splice(draggedIdx, 1);
    newItems.splice(idx, 0, draggedItem);
    
    setDraggedIdx(idx);
    onUpdateOrder(newItems);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  if (!items.length) {
    return <div className="text-center py-12 text-sm text-neutral-500 border border-[#2a2a2a] bg-[#1a1a1a]">No media uploaded yet.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div 
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={cn(
              "group relative bg-[#1a1a1a] border transition-all cursor-move",
              item.isCover ? "border-[#f5f5f0]" : "border-[#2a2a2a]",
              draggedIdx === idx ? "opacity-50" : "opacity-100"
            )}
          >
            {/* Aspect Ratio Box */}
            <div className="relative pt-[100%] bg-[#0a0a0a] overflow-hidden">
              {item.type === 'image' ? (
                <img src={item.url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="w-8 h-8 text-neutral-600" />
                </div>
              )}
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-between items-start">
                  <div className="bg-black/80 px-2 py-1 text-[10px] uppercase tracking-wider flex items-center gap-1">
                    {item.type === 'image' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                    {item.width}x{item.height}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDeleteId(item.id); }}
                    className="p-1.5 bg-red-900/80 text-white hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-center">
                  {!item.isCover && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSetCover(item.id); }}
                      className="px-3 py-1.5 bg-[#f5f5f0] text-black text-xs font-bold uppercase tracking-wider hover:bg-white"
                    >
                      Set Cover
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-2 flex items-center justify-between text-xs text-neutral-400 bg-[#1a1a1a]">
              <div className="flex items-center gap-1">
                <GripVertical className="w-3 h-3" />
                <span className="truncate max-w-[100px]">{formatSize(item.size)}</span>
              </div>
              {item.isCover && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Media?"
        description="This will permanently remove the file."
        onConfirm={() => {
          if (deleteId) onDelete(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
