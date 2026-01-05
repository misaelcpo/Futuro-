
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { 
  Cpu, 
  Zap, 
  Activity, 
  ArrowUpRight, 
  Database, 
  Globe,
  Bitcoin,
  TrendingUp,
  BarChart3,
  Server,
  Layers,
  Box,
  BrainCircuit,
  Sparkles,
  Trophy,
  MessageCircle
} from 'lucide-react';
import { AppData } from '../types';
import { formatCurrency } from '../utils';
import { AreaChart, Area, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC<{ data: AppData, setView: (v: string) => void }> = ({ data, setView }) => {
  const [profitAnimate, setProfitAnimate] = useState(false);
  const [floatingEarnings, setFloatingEarnings] = useState<{ id: number; value: number }[]>([]);
  const lastBalanceRef = useRef(data.user.balance);
  const isActive = data.user.investedCashback > 0;

  useEffect(() => {
    if (data.user.balance > lastBalanceRef.current) {
      const diff = data.user.balance - lastBalanceRef.current;
      setProfitAnimate(true);
      const id = Date.now();
      setFloatingEarnings(prev => [...prev.slice(-5), { id, value: diff }]);
      setTimeout(() => setProfitAnimate(false), 300);
      setTimeout(() => setFloatingEarnings(prev => prev.filter(e => e.id !== id)), 2000);
    }
    lastBalanceRef.current = data.user.balance;
  }, [data.user.balance]);

  const performanceData = [
    { name: '00:00', v: 45.2 },
    { name: '04:00', v: 46.8 },
    { name: '08:00', v: 48.9 },
    { name: '12:00', v: 52.2 },
    { name: '16:00', v: 51.5 },
    { name: '20:00', v: 54.1 },
    { name: '23:59', v: 58.8 },
  ];

  const totalDailyYield = data.user.activePackages.reduce((acc, p) => acc + p.dailyYield, 0);

  const smartInsight = useMemo(() => {
    if (!isActive) return { icon: BrainCircuit, color: 'text-orange-500', msg: "Sua Rig está offline. Você está deixando de ganhar R$ 45,00/dia.", action: "Ativar Agora" };
    if (data.user.balance >= 100) return { icon: Sparkles, color: 'text-emerald-400', msg: `Seu saldo de ${formatCurrency(data.user.balance)} pode ser reinvestido para acelerar o ROI.`, action: "Escalar" };
    return { icon: TrendingUp, color: 'text-blue-400', msg: "Seu hashrate está estável. Convide amigos para subir de nível.", action: "Ver Guilda" };
  }, [isActive, data.user.balance]);

  return (
    <div className="space-y-6 animate-slide-up pb-24 relative max-w-full">
      {/* Botão de Suporte Flutuante Mobile-Friendly */}
      <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-emerald-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all">
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>

      {/* Status da Rede */}
      <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-red-500'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {isActive ? 'Rede SHA-256 Sincronizada' : 'Hardware Desconectado'}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
          <Trophy className="w-3 h-3 text-orange-500" />
          <span className="text-[9px] font-black text-orange-500 uppercase">{data.user.tier} RANK</span>
        </div>
      </div>

      {/* Main Balance Display */}
      <div className="glass-panel p-8 md:p-12 rounded-[3rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="space-y-1">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Capital em Liquidação (BRL)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-4xl font-black text-orange-500/50">R$</span>
              <h1 className={`text-5xl md:text-8xl font-black tracking-tighter font-mono transition-all duration-300 ${profitAnimate ? 'text-emerald-400 scale-[1.01]' : 'text-white'}`}>
                {data.user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <div className="bg-slate-950/50 p-4 md:p-6 rounded-3xl border border-white/5">
                <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Poder Ativo</p>
                <p className="text-xl md:text-2xl font-black text-white font-mono">{data.user.investedCashback.toFixed(1)} <span className="text-[10px] text-slate-500">TH/s</span></p>
             </div>
             <div className="bg-slate-950/50 p-4 md:p-6 rounded-3xl border border-white/5">
                <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Rendimento Dia</p>
                <p className="text-xl md:text-2xl font-black text-emerald-400 font-mono">+{formatCurrency(totalDailyYield)}</p>
             </div>
             <div className="hidden md:flex bg-orange-500/10 p-4 md:p-6 rounded-3xl border border-orange-500/20 items-center justify-center gap-3">
                <Bitcoin className="w-8 h-8 text-orange-500" />
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">ASIC ONLINE</span>
             </div>
          </div>
        </div>

        {/* Floating Particles (Lucros em tempo real) */}
        {floatingEarnings.map(e => (
          <div key={e.id} className="absolute left-1/2 top-1/2 -translate-x-1/2 text-emerald-400 font-black text-xl font-mono animate-float-up opacity-0">
            + R$ {e.value.toFixed(4)}
          </div>
        ))}
      </div>

      {/* IA Insights & Marketplace CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass-panel p-6 rounded-[2.5rem] flex items-center gap-6 bg-slate-900/40 hover:bg-slate-900/60 transition-all group">
          <div className={`p-4 rounded-2xl bg-slate-950 border border-white/10 ${smartInsight.color}`}>
            <smartInsight.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">IA Advisor Analysis</h3>
            <p className="text-sm md:text-lg font-bold text-white leading-tight">{smartInsight.msg}</p>
          </div>
          <button onClick={() => setView('marketplace')} className="hidden md:block px-6 py-3 bg-orange-500 text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
            {smartInsight.action}
          </button>
        </div>

        <div className="lg:col-span-4 glass-panel p-6 rounded-[2.5rem] bg-slate-950/40 flex flex-col justify-center gap-4">
           <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span>Escalabilidade</span>
              <span className="text-orange-500">85% Eficiência</span>
           </div>
           <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 shadow-[0_0_10px_#f97316] w-[85%]"></div>
           </div>
        </div>
      </div>

      {/* Gráfico de Hashrate e Rigs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-8 rounded-[3rem] bg-slate-950/20">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-500" /> Fluxo de Processamento
              </h3>
              <span className="text-[10px] font-black text-emerald-500 uppercase">Live Pool</span>
           </div>
           <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorDash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" hide />
                  <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={3} fill="url(#colorDash)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="glass-panel p-8 rounded-[3rem] space-y-6">
           <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-500" /> Ativos em Operação
              </h3>
              <button onClick={() => setView('marketplace')} className="text-[10px] font-black text-orange-500 uppercase hover:underline">Novo Hardware +</button>
           </div>
           <div className="space-y-4">
              {data.user.activePackages.length === 0 ? (
                <div className="text-center py-8 space-y-3 opacity-40">
                   <Box className="w-8 h-8 mx-auto" />
                   <p className="text-[10px] font-bold uppercase">Nenhuma RIG ativa no terminal</p>
                </div>
              ) : (
                data.user.activePackages.slice(0, 3).map(pkg => (
                  <div key={pkg.id} className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500"><Cpu className="w-5 h-5" /></div>
                       <div>
                          <p className="text-xs font-black text-white uppercase tracking-tight">{pkg.name}</p>
                          <p className="text-[9px] text-slate-500 font-mono">{pkg.hashrate} TH/s Power</p>
                       </div>
                    </div>
                    <p className="text-xs font-black text-emerald-400 font-mono">+{formatCurrency(pkg.dailyYield)}/d</p>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
