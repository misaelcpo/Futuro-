import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ArrowUpRight,
  Cpu,
  Globe,
  Zap,
  Lock,
  Wallet,
  AlertCircle
} from 'lucide-react';
import { AppData, Language } from '../types';
import { formatCurrency } from '../utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { t } from '../translations';

interface DashboardProps {
  data: AppData;
  triggerYield: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, triggerYield }) => {
  const lang = data.language || 'pt';
  const [fakeProfit, setFakeProfit] = useState(1450.23);
  
  // Fake live profit ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setFakeProfit(prev => prev + (Math.random() * 0.05));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Prepare chart data (last 7 days simulation)
  const chartData = [
    { name: 'Seg', value: data.user.activeCapital * 0.022 },
    { name: 'Ter', value: data.user.activeCapital * 0.045 },
    { name: 'Qua', value: data.user.activeCapital * 0.031 },
    { name: 'Qui', value: data.user.activeCapital * 0.028 },
    { name: 'Sex', value: data.user.activeCapital * 0.049 },
    { name: 'Sab', value: data.user.activeCapital * 0.035 },
    { name: 'Dom', value: data.user.activeCapital * 0.025 },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white lg:hidden">{t(lang, 'dashboard')}</h1>
          <p className="text-slate-400">{t(lang, 'welcome')}, <span className="text-white font-semibold">{data.user.name}</span></p>
        </div>
        <button 
          onClick={triggerYield}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold rounded-full shadow-lg shadow-indigo-500/20 transition-all flex items-center border border-white/10"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          {t(lang, 'simulateYield')}
        </button>
      </div>

      {/* FOMO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Balance (Main) */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DollarSign className="w-20 h-20 text-brand-500" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{t(lang, 'availableBalance')}</p>
            <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{formatCurrency(data.user.balance)}</h3>
            <div className="mt-4 flex items-center text-xs text-brand-400 bg-brand-500/10 w-fit px-2 py-1 rounded-full border border-brand-500/20">
              <Check className="w-3 h-3 mr-1" />
              {t(lang, 'readyToWithdraw')}
            </div>
          </div>
        </div>

        {/* Card 2: Active Capital (The Engine) */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-brand-500/30">
          <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Cpu className="w-20 h-20 text-brand-400" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{t(lang, 'activeCapital')}</p>
            <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{formatCurrency(data.user.activeCapital)}</h3>
            <div className="mt-4 flex items-center">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <p className="text-xs text-brand-400 font-medium">{t(lang, 'yielding')}</p>
            </div>
          </div>
        </div>

        {/* Card 3: Network (Passive Income) */}
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-20 h-20 text-purple-500" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{t(lang, 'networkEarnings')}</p>
            <h3 className="text-3xl font-extrabold text-white mt-2 tracking-tight">{formatCurrency(data.user.totalCommission)}</h3>
            <div className="mt-4 text-xs text-purple-400 font-medium">
               {data.referrals.length} {t(lang, 'activeReferrals')}
            </div>
          </div>
        </div>

        {/* Card 4: Total Profit (The Result) */}
        <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 p-6 rounded-2xl border border-orange-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ArrowUpRight className="w-20 h-20 text-orange-500" />
          </div>
          <div className="relative z-10">
            <p className="text-orange-200/70 text-xs font-semibold uppercase tracking-wider">{t(lang, 'totalProfit')}</p>
            <h3 className="text-3xl font-extrabold text-orange-400 mt-2 tracking-tight">{formatCurrency(data.user.totalEarnings)}</h3>
            <p className="text-xs text-orange-300/80 mt-4 flex items-center">
               <TrendingUp className="w-3 h-3 mr-1" />
               Lucro constante
            </p>
          </div>
        </div>
      </div>

      {/* Psychology Section: Bank vs Us */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: The "Why you are losing money" card */}
        <div className="lg:col-span-1 glass-card p-6 rounded-2xl neon-glow">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
            Pare de Perder Dinheiro
          </h3>
          
          <div className="space-y-6">
            {/* Bank Comparison */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-400">Poupança / Banco</span>
                <span className="text-xs font-bold text-red-400">0.5% / mês</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500/50 w-[5%]"></div>
              </div>
            </div>

            {/* Us Comparison */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-white">InvestPrime HFT</span>
                <span className="text-sm font-bold text-brand-400">~150% / mês</span>
              </div>
              <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-500/20 animate-pulse"></div>
                <div className="h-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 w-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Enquanto seu dinheiro dorme no banco, nossa IA faz ele trabalhar 24/7.
              </p>
            </div>

            {/* Live Global Profit */}
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 uppercase tracking-wide">Volume Global Negociado</span>
                <span className="flex h-2 w-2 relative">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
              <div className="text-2xl font-mono font-bold text-white tracking-widest">
                R$ {fakeProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} M
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-brand-400" />
              {t(lang, 'chartTitle')}
            </h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-400">7 Dias</span>
              <span className="px-3 py-1 bg-brand-500/10 rounded-full text-xs font-medium text-brand-400 border border-brand-500/20">Tempo Real</span>
            </div>
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  tick={{fontSize: 12, fill: '#64748b'}} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#64748b" 
                  tick={{fontSize: 12, fill: '#64748b'}} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `R$${value}`} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#34d399', fontWeight: 'bold' }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Rendimento']}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

function Check(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}