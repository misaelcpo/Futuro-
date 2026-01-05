
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ChevronRight, 
  Loader2, 
  Lock, 
  Mail, 
  Zap,
  Bitcoin,
  TrendingUp,
  User,
  Phone,
  Users
} from 'lucide-react';
import { UserRole } from '../types';
import { Logo } from '../components/Logo';

export const Auth: React.FC<{ onLogin: (email: string, role: UserRole) => void }> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '', sponsor: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin(formData.email, UserRole.CLIENT);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-orange-500 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-indigo-500 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full relative z-10 space-y-12">
        <div className="flex flex-col items-center gap-4 animate-slide-up">
          <div className="p-4 bg-white/5 rounded-[2rem] border border-white/10 shadow-2xl">
            <Logo className="w-16 h-16" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Mining<span className="text-orange-500">Prime</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Hardware Infrastructure</p>
          </div>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-[3rem] border-white/10 shadow-2xl space-y-8 animate-slide-up">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              {isLogin ? 'Bem-vindo de volta' : 'Novo Minerador'}
            </h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
              Inicie sua farm de processamento SHA-256 e receba dividendos em tempo real.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
                  <input type="text" required className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none focus:border-orange-500 transition-all font-bold" placeholder="Nome Completo" />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
                  <input type="tel" required className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none focus:border-orange-500 transition-all font-bold" placeholder="(00) 00000-0000" />
                </div>
                <div className="relative group">
                  <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 group-focus-within:text-orange-500 transition-colors" />
                  <input type="text" required className="w-full bg-slate-950 border border-orange-500/20 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none focus:border-orange-500 transition-all font-black uppercase" placeholder="Código Patrocinador" />
                </div>
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
              <input type="email" required className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none focus:border-orange-500 transition-all font-bold" placeholder="seu@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-orange-500 transition-colors" />
              <input type="password" required className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-sm outline-none focus:border-orange-500 transition-all font-bold" placeholder="Sua senha secreta" />
            </div>

            <button type="submit" disabled={loading} className="w-full py-6 bg-orange-500 hover:bg-orange-400 text-slate-950 font-black rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(247,147,26,0.4)] transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-xs disabled:opacity-50">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>{isLogin ? 'Entrar no Mainframe' : 'Montar Minha RIG'} <ChevronRight className="w-5 h-5" /></>}
            </button>
          </form>

          <div className="pt-6 border-t border-white/5 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-orange-500 transition-colors">
              {isLogin ? 'Ainda não é um minerador? Registre-se' : 'Já possui uma farm? Faça login'}
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-8 opacity-40 grayscale">
          <Bitcoin className="w-6 h-6 text-white" />
          <ShieldCheck className="w-6 h-6 text-white" />
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};
