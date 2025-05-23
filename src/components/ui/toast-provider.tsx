
import React, { createContext, useContext } from 'react';
import { useToast } from '@/hooks/useToast';

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastAPI = useToast();

  return (
    <ToastContext.Provider value={toastAPI}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toastAPI.toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg max-w-sm animate-fade-in ${
              toast.variant === 'success' ? 'bg-green-500 text-white' :
              toast.variant === 'destructive' ? 'bg-red-500 text-white' :
              'bg-white border border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{toast.title}</h4>
                {toast.description && (
                  <p className="text-sm mt-1 opacity-90">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => toastAPI.dismiss(toast.id)}
                className="ml-4 text-lg opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
}
