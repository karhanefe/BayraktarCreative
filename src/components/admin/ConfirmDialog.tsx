'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = true
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={dialogRef}
        className="w-full max-w-md bg-[#1a1a1a] border border-[#2a2a2a] p-6 shadow-xl relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-neutral-400 hover:text-[#f5f5f0] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 id="dialog-title" className="text-xl font-bold text-[#f5f5f0] mb-2">{title}</h2>
        {description && <p className="text-neutral-400 mb-8">{description}</p>}
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[#f5f5f0] bg-transparent border border-[#2a2a2a] hover:bg-[#2a2a2a] transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              "px-4 py-2 text-sm font-medium text-white transition-colors",
              isDestructive ? "bg-red-600 hover:bg-red-700" : "bg-neutral-100 text-black hover:bg-neutral-300"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
