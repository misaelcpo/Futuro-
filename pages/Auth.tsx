import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  User, 
  Mail, 
  Lock, 
  Users, 
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Language } from '../types';
import { t } from '../translations';

interface AuthProps {
  onLogin: (email?: string, password?: string) => void;
  onRegister: (name: string, email: string) => void;
  language: Language;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [sponsorValid, setSponsorValid] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        onLogin(email, password);
      } else {
        onRegister(name, email);
      }
    }, 1500);
  };

  const handleSponsorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSponsor(val);
    // Fake validation logic
    if (val.length > 3) {
      setSponsorValid(true);
    } else {
      setSponsorValid(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto flex items-center justify-center p-4 relative z-10">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden min-h-[600px]">
          
          {/* Left Side (Marketing) - Hidden on Mobile */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             
             <div>
                <div className="flex items-center space-x-2 mb-8">
                   <div className="bg-brand-500/20 p-2 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-brand-500" />
                   </div>
                   <span className="text-2xl font-bold text-white tracking-wide">Invest<span className="text-brand-500">Prime</span></span>
                </div>

                <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
                   O Futuro do seu <br/> 
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-600">
                      Patrimônio Digital
                   </span>
                </h2>

                <div className="space-y-6">
                   <div className="flex items-start space-x-4">
                      <div className="bg-slate-700/50 p-2 rounded-lg mt-1">
                         <ShieldCheck className="w-5 h-5 text-brand-400" />
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-lg">Segurança Institucional</h4>
                         <p className="text-slate-400 text-sm">Seus ativos protegidos por custódia qualificada e criptografia militar.</p>
                      </div>
                   </div>

                   <div className="flex items-start space-x-4">
                      <div className="bg-slate-700/50 p-2 rounded-lg mt-1">
                         <TrendingUp className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-lg">Rendimentos HFT</h4>
                         <p className="text-slate-400 text-sm">Algoritmos que operam 24/7 buscando as melhores oportunidades de arbitragem.</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-12 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                   <div className="flex -space-x-2">
                      <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-800" />
                      <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-800" />
                      <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-800" />
                      <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-[10px] text-white font-bold">+2k</div>
                   </div>
                   <div className="text-right">
                      <p className="text-brand-400 font-bold text-sm">R$ 4.2M+</p>
                      <p className="text-[10px] text-slate-500 uppercase">Pagos hoje</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Side (Form) */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-slate-900/40">
             <div className="lg:hidden flex items-center space-x-2 mb-8">
                <TrendingUp className="w-6 h-6 text-brand-500" />
                <span className="text-xl font-bold text-white">InvestPrime</span>
             </div>

             <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                   {isLogin ? t(language, 'loginTitle') : t(language, 'registerTitle')}
                </h1>
                <p className="text-slate-400 text-sm">
                   {isLogin ? t(language, 'loginSubtitle') : t(language, 'registerSubtitle')}
                </p>
             </div>

             <form onSubmit={handleSubmit} className="space-y-4">
                
                {!isLogin && (
                   <div className="space-y-2 animate-slideIn">
                      <label className="text-xs font-semibold text-slate-300 uppercase ml-1">{t(language, 'namePlaceholder')}</label>
                      <div className="relative group">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-500 transition-colors">
                            <User className="w-5 h-5" />
                         </div>
                         <input 
                            type="text" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: João Silva"
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
                         />
                      </div>
                   </div>
                )}

                <div className="space-y-2">
                   <label className="text-xs font-semibold text-slate-300 uppercase ml-1">Email</label>
                   <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-500 transition-colors">
                         <Mail className="w-5 h-5" />
                      </div>
                      <input 
                         type="email" 
                         required
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder={t(language, 'emailPlaceholder')}
                         className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-semibold text-slate-300 uppercase ml-1">Senha</label>
                   <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-500 transition-colors">
                         <Lock className="w-5 h-5" />
                      </div>
                      <input 
                         type="password" 
                         required
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         placeholder={t(language, 'passwordPlaceholder')}
                         className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
                      />
                   </div>
                </div>

                {/* Sponsor Field - Registration Only */}
                {!isLogin && (
                   <div className="space-y-2 animate-slideIn">
                      <label className="text-xs font-semibold text-slate-300 uppercase ml-1 flex justify-between">
                         {t(language, 'sponsorPlaceholder')}
                         {sponsorValid && <span className="text-green-500 flex items-center normal-case"><CheckCircle2 className="w-3 h-3 mr-1" /> Líder Verificado</span>}
                      </label>
                      <div className="relative group">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors">
                            <Users className="w-5 h-5" />
                         </div>
                         <input 
                            type="text" 
                            value={sponsor}
                            onChange={handleSponsorChange}
                            placeholder="Código do Patrocinador"
                            className={`w-full bg-slate-950/50 border rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 outline-none transition-all ${sponsorValid ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20' : 'border-slate-700 focus:ring-purple-500/50 focus:border-purple-500'}`}
                         />
                      </div>
                   </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transform hover:-translate-y-1 transition-all mt-6 relative overflow-hidden group"
                >
                  {loading ? (
                     <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processando...
                     </span>
                  ) : (
                     <span className="flex items-center justify-center gap-2 relative z-10">
                        {isLogin ? t(language, 'loginButton') : t(language, 'registerButton')}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </span>
                  )}
                  {/* Shimmer on button */}
                  {!loading && <div className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>}
                </button>

             </form>

             <div className="mt-8 text-center">
                <p className="text-slate-400 text-sm">
                   {isLogin ? t(language, 'noAccount') : t(language, 'haveAccount')}{' '}
                   <button 
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-brand-400 hover:text-brand-300 font-bold underline decoration-brand-500/30 underline-offset-4 transition-colors"
                   >
                      {t(language, 'clickHere')}
                   </button>
                </p>
             </div>
             
             <div className="mt-auto pt-8 flex items-center justify-center gap-2 text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
                <Lock className="w-3 h-3" />
                {t(language, 'securityBadge')}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};