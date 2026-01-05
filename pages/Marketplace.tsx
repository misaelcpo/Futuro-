
import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Zap, 
  ArrowUpRight, 
  Calculator, 
  Bitcoin, 
  Database,
  Layers,
  ChevronRight,
  X,
  QrCode,
  Copy,
  CheckCircle2,
  Loader2,
  ArrowRight,
  TrendingUp,
  Star,
  ZapOff
} from 'lucide-react';
import { AppData } from '../types';
import { formatCurrency } from '../utils';

export const Marketplace: React.FC<{ data: AppData, onInvest: (amount: number, name: string) => void }> = ({ data, onInvest }) => {
  const [amount, setAmount] = useState<string>('1000');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'BTC' | 'BALANCE'>('PIX');
  const [checkoutStep, setCheckoutStep] = useState<'SELECT' | 'PAYING' | 'SUCCESS'>('SELECT');
  const [isConfirming, setIsConfirming] = useState(false);
  
  const tiers = [
    { name: 'Bronze Node', min: 0, max: 999, yield: 0.012, icon: '🥉', color: 'text-orange-400', borderColor: 'border-orange-500/20' },
    { name: 'Silver Rig', min: 1000, max: 4999, yield: 0.018, icon: '🥈', color: 'text-slate-300', borderColor: 'border-slate-400/20' },
    { name: 'Gold Cluster', min: 5000, max: 14999, yield: 0.025, icon: '🥇', color: 'text-yellow-400', borderColor: 'border-yellow-500/20' },
    { name: 'Platinum Whale', min: 15000, max: 49999, yield: 0.032, icon: '💎', color: 'text-blue-400', borderColor: 'border-blue-500/20' },
    { name: 'Black Enterprise', min: 50000, max: Infinity, yield: 0.040, icon: '🌑', color: 'text-indigo-400', borderColor: 'border-indigo-500/20' },
  ];

  const simulation = useMemo(() => {
    const val = parseFloat(amount) || 0;
    const currentTier = tiers.find(t => val >= t.min && val <= t.max) || tiers[0];
    const daily = val * currentTier.yield;
    return { 
      daily, 
      weekly: daily * 7, 
      monthly: daily * 30, 
      yearly: daily * 365, 
      hashrate: val / 10, 
      yield: (currentTier.yield * 100).toFixed(1),
      tierName: currentTier.name,
      tierIcon: currentTier.icon,
      tierColor: currentTier.color,
      tierBorder: currentTier.borderColor
    };
  }, [amount]);

  const handleStartPayment = () => {
    if (parseFloat(amount) < 10) return;
    setCheckoutStep('SELECT');
    setIsCheckoutOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onInvest(parseFloat(amount), simulation.tierName);
      setCheckoutStep('SUCCESS');
      setIsConfirming(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-slide-up pb-32 max-w-full overflow-x-hidden">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/50 p-8 md:p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-64 h-full bg-orange-500/5 blur-[100px] -mr-32"></div>
        <div className="space-y-2 relative z-10 w-full">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Layers className="w-5 h-5 text-orange-500" />
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Hashrate Network Allocation</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter">
            Hardware <span className="text-orange-500">Shop</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg font-medium">Contratos SHA-256 com escalonamento de lucro.</p>
        </div>
      </header>

      {/* Tiers Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {tiers.map(t => (
          <div key={t.name} className={`glass-panel p-6 rounded-3xl border ${t.borderColor} bg-slate-950/20 text-center space-y-3`}>
            <span className="text-3xl">{t.icon}</span>
            <div className="space-y-0.5">
              <p className={`text-[9px] font-black uppercase tracking-widest ${t.color}`}>{t.name}</p>
              <p className="text-sm font-black text-white">{(t.yield * 100).toFixed(1)}% /dia</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-5">
           <div className={`glass-panel p-8 md:p-12 rounded-[3.5rem] border-2 ${simulation.tierBorder} bg-slate-950/40 space-y-10`}>
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                   <Calculator className="w-7 h-7 text-orange-500" /> Ativar Rig
                 </h3>
                 <div className={`flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10`}>
                    <span className="text-lg">{simulation.tierIcon}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${simulation.tierColor}`}>{simulation.tierName}</span>
                 </div>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 font-black text-3xl font-mono">R$</span>
                  <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-[2rem] py-8 pl-20 pr-8 text-4xl font-black text-white font-mono outline-none focus:border-orange-500 transition-all shadow-2xl"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[500, 1000, 5000, 15000, 50000].map(val => (
                    <button key={val} onClick={() => setAmount(val.toString())} className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-slate-400 hover:bg-orange-500 hover:text-slate-950 transition-all uppercase tracking-widest">+ {val}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 text-center">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Hashrate</p>
                    <p className="text-2xl font-black text-white font-mono">{simulation.hashrate.toFixed(1)} <span className="text-[10px] text-slate-600">TH/s</span></p>
                 </div>
                 <div className="bg-orange-500/10 p-6 rounded-3xl border border-orange-500/20 text-center">
                    <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1">Taxa</p>
                    <p className="text-2xl font-black text-orange-500 font-mono">{simulation.yield}%</p>
                 </div>
              </div>

              <button 
                onClick={handleStartPayment}
                disabled={!amount || parseFloat(amount) < 10}
                className="w-full py-7 bg-orange-500 text-slate-950 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                ATIVAR HARDWARE <ArrowUpRight className="w-6 h-6" />
              </button>
           </div>
        </div>

        <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Lucro Diário', val: simulation.daily, desc: 'Liquidação a cada 24h', icon: TrendingUp, c: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              { label: 'Ciclo Semanal', val: simulation.weekly, desc: 'Projeção de rede', icon: Star, c: 'text-blue-400', bg: 'bg-blue-400/10' },
              { label: 'Lucro Mensal', val: simulation.monthly, desc: 'Retorno 30 dias', icon: Database, c: 'text-indigo-400', bg: 'bg-indigo-400/10' },
              { label: 'Expectativa Anual', val: simulation.yearly, desc: 'Compound interest', icon: Bitcoin, c: 'text-orange-400', bg: 'bg-orange-400/10' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-10 rounded-[3rem] border-white/5 bg-slate-900/30 flex flex-col justify-between group hover:bg-slate-900/50 transition-all">
                 <div className="flex justify-between items-start">
                    <div className={`p-4 rounded-2xl ${stat.bg} ${stat.c}`}><stat.icon className="w-6 h-6" /></div>
                    <div className="text-right">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                       <p className="text-[8px] text-slate-700 font-bold uppercase">{stat.desc}</p>
                    </div>
                 </div>
                 <h4 className={`text-4xl font-black ${stat.c} font-mono mt-6`}>{formatCurrency(stat.val)}</h4>
              </div>
            ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => !isConfirming && setIsCheckoutOpen(false)}></div>
          
          <div className="relative glass-panel w-full max-w-lg rounded-[3.5rem] border-white/10 overflow-hidden animate-slide-up bg-slate-900">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-slate-950/50">
               <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Checkout Seguro</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ativação instantânea via gateway</p>
               </div>
               <button disabled={isConfirming} onClick={() => setIsCheckoutOpen(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition-all">
                 <X className="w-6 h-6" />
               </button>
            </div>

            <div className="p-10 space-y-8">
               {checkoutStep === 'SELECT' && (
                 <div className="space-y-8 animate-fadeIn">
                    <div className="bg-slate-950 p-8 rounded-3xl border border-white/5 flex items-center justify-between">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total</p>
                          <p className="text-4xl font-black text-white font-mono">{formatCurrency(parseFloat(amount))}</p>
                       </div>
                       <div className={`p-5 bg-orange-500/10 ${simulation.tierColor} rounded-3xl`}>{simulation.tierIcon}</div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                       {data.user.balance >= parseFloat(amount) && (
                          <button onClick={() => {setPaymentMethod('BALANCE'); handleConfirmPayment();}} className="p-6 bg-emerald-500 text-slate-950 rounded-3xl flex items-center justify-between font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all">
                             USAR SALDO INTERNO <Database className="w-5 h-5" />
                          </button>
                       )}
                       <button onClick={() => {setPaymentMethod('PIX'); setCheckoutStep('PAYING');}} className="p-6 bg-slate-950 border border-white/5 rounded-3xl flex items-center justify-between font-black uppercase text-xs tracking-widest hover:border-orange-500 transition-all group">
                          PAGAR VIA PIX <QrCode className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                       </button>
                    </div>
                 </div>
               )}

               {checkoutStep === 'PAYING' && (
                 <div className="space-y-8 animate-fadeIn text-center py-4">
                    <div className="space-y-2">
                       <h4 className="text-sm font-black text-white uppercase tracking-widest">Escaneie para Ativar</h4>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sua rig será liberada após confirmação</p>
                    </div>

                    <div className="relative mx-auto w-64 h-64 bg-white p-4 rounded-3xl shadow-2xl">
                       <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MP-${amount}`} alt="Payment QR" className="w-full h-full" />
                    </div>

                    <button 
                      onClick={handleConfirmPayment}
                      disabled={isConfirming}
                      className="w-full py-6 bg-orange-500 text-slate-950 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl"
                    >
                       {isConfirming ? <><Loader2 className="w-6 h-6 animate-spin" /> VALIDANDO...</> : 'JÁ FIZ O PAGAMENTO'}
                    </button>
                 </div>
               )}

               {checkoutStep === 'SUCCESS' && (
                 <div className="py-12 space-y-10 animate-slide-up text-center">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                       <CheckCircle2 className="w-12 h-12 text-slate-950" />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Sucesso!</h3>
                       <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Hardware sincronizado. Iniciando mineração...</p>
                    </div>
                    <button 
                      onClick={() => setIsCheckoutOpen(false)}
                      className="w-full py-6 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest"
                    >
                       IR PARA O DASHBOARD
                    </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
