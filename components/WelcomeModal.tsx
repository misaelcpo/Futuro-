import React, { useState, useEffect } from 'react';
import { X, Trophy, Timer, ArrowRight, Zap, Star } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvest: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onInvest }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Confetti CSS Effect (Simulated with radial gradients) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-[ping_1s_infinite]"></div>
        <div className="absolute top-10 right-1/4 w-3 h-3 bg-brand-500 rounded-full animate-[bounce_2s_infinite]"></div>
        <div className="absolute bottom-1/3 left-10 w-2 h-2 bg-blue-500 rounded-full animate-[pulse_1.5s_infinite]"></div>
        <div className="absolute top-1/3 right-10 w-4 h-4 bg-purple-500 rounded-full animate-[ping_3s_infinite]"></div>
      </div>

      {/* Modal Content */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border border-brand-500/50 w-full max-w-md rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden transform transition-all scale-100 animate-slideIn">
        
        {/* Header Image / Graphic */}
        <div className="relative h-32 bg-gradient-to-r from-brand-600 to-emerald-800 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/90"></div>
          
          <div className="relative z-10 flex flex-col items-center animate-bounce-slow">
            <div className="bg-yellow-400 p-3 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] mb-2">
              <Trophy className="w-8 h-8 text-yellow-900" fill="currentColor" />
            </div>
            <h2 className="text-white font-black text-2xl tracking-tight text-center uppercase drop-shadow-lg">
              Acesso VIP Liberado
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-1 rounded-full transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 pt-2 text-center space-y-6">
          
          {/* Social Proof */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 inline-flex items-center gap-2 mx-auto">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-slate-800"></div>
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-slate-800"></div>
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-slate-800"></div>
            </div>
            <span className="text-xs text-slate-300 font-medium">+127 pessoas entraram hoje</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white leading-tight mb-2">
              Não deixe seu dinheiro parado.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              O algoritmo HFT identificou uma oportunidade de <span className="text-brand-400 font-bold">alta volatilidade</span> agora.
            </p>
          </div>

          {/* Value Anchor */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-500/5 group-hover:bg-brand-500/10 transition-colors"></div>
            <div className="flex justify-between items-center relative z-10">
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase font-bold">Lucro Estimado Hoje</p>
                <p className="text-2xl font-black text-white">R$ 1.450,00</p>
              </div>
              <div className="bg-brand-500/20 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-brand-400" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Urgency Timer */}
          <div className="flex items-center justify-center gap-2 text-red-400 font-mono text-sm bg-red-500/10 py-2 rounded-lg border border-red-500/20 animate-pulse">
            <Timer className="w-4 h-4" />
            <span>Bônus de entrada expira em: {formatTime(timeLeft)}</span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onInvest}
            className="w-full bg-gradient-to-r from-brand-600 to-brand-400 hover:from-brand-500 hover:to-brand-300 text-white font-extrabold text-lg py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            <span className="relative z-10">ATIVAR LUCROS AGORA</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
          </button>

          <button 
            onClick={onClose}
            className="text-slate-500 text-xs hover:text-slate-300 transition-colors underline decoration-slate-700 underline-offset-4"
          >
            Prefiro perder essa oportunidade e continuar olhando
          </button>
        </div>
      </div>
    </div>
  );
};