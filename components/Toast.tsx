import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto close after 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-[60] animate-slideIn">
      <div className="bg-slate-800 border-l-4 border-brand-500 text-white px-4 py-4 rounded-r-lg shadow-2xl shadow-black/50 flex items-start gap-3 min-w-[320px] max-w-md pointer-events-auto">
        <div className="mt-0.5">
          <CheckCircle2 className="w-5 h-5 text-brand-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-white">{message}</h4>
          {subMessage && (
            <p className="text-sm text-slate-400 mt-1">{subMessage}</p>
          )}
        </div>
        <button 
          onClick={onClose} 
          className="text-slate-500 hover:text-white transition-colors p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};