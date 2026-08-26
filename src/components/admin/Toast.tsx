'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const success = (message: string) => toast(message, 'success');
  const error = (message: string) => toast(message, 'error');

  return (
    <ToastContext.Provider value={{ toast, success, error }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-center gap-3 px-4 py-3 min-w-[300px] shadow-lg rounded-sm border border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f5f0] animate-in slide-in-from-bottom-4 fade-in-0 duration-300",
              t.type === 'success' && "border-l-4 border-l-green-500",
              t.type === 'error' && "border-l-4 border-l-red-500"
            )}
          >
            {t.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <p className="flex-1 text-sm font-medium">{t.message}</p>
            <button
              onClick={() => setToasts((prev) => prev.filter((i) => i.id !== t.id))}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
