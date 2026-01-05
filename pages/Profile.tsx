
import React, { useState } from 'react';
import { 
  UserCircle, 
  CreditCard, 
  Save, 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  ExternalLink,
  Zap,
  Lock,
  BadgeCheck,
  Cpu,
  History,
  Terminal,
  Bitcoin
} from 'lucide-react';
import { UserState, VerificationStatus } from '../types';
import { formatCurrency } from '../utils';

interface ProfileProps {
  user: UserState;
  updateUser: (updates: Partial<UserState>) => void;
  onNavigate: (view: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, updateUser, onNavigate }) => {
  const [pixKey, setPixKey] = useState(user.pixKey || '');
  const [name, setName] = useState(user.name);
  const [city, setCity] = useState(user.city);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, pixKey, city });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const isVerified = user.verificationStatus === VerificationStatus.VERIFIED;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-slide-up pb-32">
      {/* Dynamic Profile Hero */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[3.5rem] border border-white/5 p-10 md:p-14 group">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full group-hover:bg-orange-500/10 transition-all duration-1000"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <div className="w-40 h-40 rounded-[3rem] bg-slate-950 flex items-center justify-center border-2 border-orange-500/20 shadow-2xl overflow-hidden group-hover:border-orange-500/40 transition-all">
              <UserCircle className="w-24 h-24 text-slate-800 group-hover:text-orange-500 transition-colors" />
            </div>
            {isVerified && (
              <div className="absolute -bottom-3 -right-3 bg-orange-500 text-slate-950 p-3 rounded-2xl shadow-xl shadow-orange-500/20 border-4 border-slate-900 animate-bounce-slow">
                <BadgeCheck className="w-6 h-6" />
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left flex-1 space-y-4">
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-4xl font-black text-white tracking-tighter">{name}</h1>
                <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isVerified ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {isVerified ? 'Minerador Certificado' : 'Aguardando Validação'}
                </span>
              </div>
              <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Hash-ID: {user.id}-MP-2024</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                <div className="p-2 bg-slate-950 rounded-lg"><Mail className="w-4 h-4 text-orange-500/50" /></div>
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                <div className="p-2 bg-slate-950 rounded-lg"><MapPin className="w-4 h-4 text-orange-500/50" /></div>
                {city}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="bg-slate-950 p-6 rounded-[2rem] border border-white/5 text-center md:text-right space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Poder Ativo</p>
                <p className="text-2xl font-black text-white font-mono">{user.investedCashback} <span className="text-[10px] text-orange-500">TH/s</span></p>
             </div>
             <div className="bg-orange-500 p-6 rounded-[2rem] text-center md:text-right space-y-1 shadow-xl shadow-orange-500/10">
                <p className="text-[10px] font-black text-slate-950 uppercase tracking-widest">Saldo Livre</p>
                <p className="text-2xl font-black text-slate-950 font-mono">R$ {user.balance.toFixed(2)}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Console */}
        <div className="lg:col-span-7 space-y-8">
          <div className="glass-panel p-10 rounded-[3.5rem] border-white/5 bg-slate-900/40 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/30"></div>
             <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-black text-white uppercase tracking-tight">Console de Configurações</h3>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ajuste seus parâmetros de rede e recebimento.</p>
                </div>
             </div>

             <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome Público do Minerador</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:border-orange-500 transition-all font-bold tracking-tight shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Terminal de Operação (Cidade)</label>
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 px-6 text-white outline-none focus:border-orange-500 transition-all font-bold tracking-tight shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chave PIX de Liquidação (Saques)</label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500/40 group-focus-within:text-orange-500 transition-colors">
                       <Bitcoin className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      placeholder="CPF, Email ou Chave Aleatória"
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-white outline-none focus:border-orange-500 transition-all font-bold tracking-tight shadow-inner placeholder:text-slate-800"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={saved}
                  className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 ${saved ? 'bg-emerald-500 text-slate-950' : 'bg-orange-500 text-slate-950 hover:bg-orange-400'}`}
                >
                  {saved ? (
                    <>Sincronizado <ShieldCheck className="w-5 h-5" /></>
                  ) : (
                    <>Salvar Alterações <Save className="w-5 h-5" /></>
                  )}
                </button>
             </form>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/10 p-8 rounded-[2.5rem] flex items-start gap-6">
             <div className="p-4 bg-orange-500/10 text-orange-500 rounded-2xl shrink-0">
               <Lock className="w-6 h-6" />
             </div>
             <div className="space-y-1">
                <h4 className="text-white font-black uppercase text-sm tracking-tight">Segurança de Dados</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">
                  Suas chaves de liquidação são armazenadas em módulos HSM de alta segurança. Alterações de chaves PIX exigem confirmação via protocolo 2FA para sua proteção.
                </p>
             </div>
          </div>
        </div>

        {/* Career & Rewards */}
        <div className="lg:col-span-5 space-y-8">
          <div 
            onClick={() => onNavigate('network')}
            className="glass-panel p-10 rounded-[3.5rem] border-white/5 bg-gradient-to-br from-orange-500/5 to-transparent flex flex-col justify-between h-full min-h-[400px] cursor-pointer group hover:border-orange-500/20 transition-all"
          >
             <div className="space-y-6">
                <div className="flex justify-between items-start">
                   <div className="p-5 bg-orange-500 text-slate-950 rounded-3xl shadow-xl shadow-orange-500/20 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-7 h-7" />
                   </div>
                   <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-slate-600 group-hover:text-white transition-colors">
                      <ChevronRight className="w-6 h-6" />
                   </div>
                </div>
                <div className="space-y-2">
                   <h3 className="text-3xl font-black text-white tracking-tighter leading-tight">Expanda sua <br/><span className="text-orange-500">Mining Guild</span></h3>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed">
                     Não limite seus ganhos apenas ao seu hardware. Construa uma guilda e receba bônus de hashrate sobre o poder de processamento da sua rede.
                   </p>
                </div>
             </div>
             
             <div className="pt-8 border-t border-white/5 space-y-5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                   <span>Bônus de Liderança</span>
                   <span className="text-orange-500">+1.5% TH/s</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                   <span>Volume de Guilda</span>
                   <span className="text-white">R$ {user.networkVolume.toLocaleString('pt-BR')}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-widest">
                  Ver Dashboard de Rede <ExternalLink className="w-3.5 h-3.5" />
                </div>
             </div>
          </div>

          <div className="glass-panel p-10 rounded-[3.5rem] border-white/5 bg-slate-950/40 space-y-8">
             <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
               <History className="w-4 h-4 text-orange-500" /> Logs de Acesso
             </h4>
             <div className="space-y-6">
                {[
                  { label: 'Último Login', val: 'Curitiba, BR • Há 12 min' },
                  { label: 'Sessão IP', val: '189.124.***.***' },
                  { label: 'Protocolo', val: 'OAuth 2.1 • SECURE' }
                ].map((log, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{log.label}</span>
                    <span className="text-xs font-mono font-bold text-slate-300">{log.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
