
import React from 'react';
import { TrendingUp, Users, DollarSign, Activity, Target, PieChart as PieChartIcon } from 'lucide-react';
import { AppData } from '../types';
import { formatCurrency } from '../utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AdminInvestor: React.FC<{ data: AppData }> = ({ data }) => {
  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Fev', value: 700 },
    { name: 'Mar', value: 1200 },
    { name: 'Abr', value: 2100 },
    { name: 'Mai', value: 3800 },
    { name: 'Jun', value: 5423 },
  ];

  const categoryData = [
    { name: 'Limpeza', value: 40, color: '#10b981' },
    { name: 'Elétrica', value: 30, color: '#3b82f6' },
    { name: 'Manutenção', value: 20, color: '#f59e0b' },
    { name: 'Outros', value: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-brand-400">
            <Target className="w-6 h-6" /> Investor Relations Center
          </h1>
          <p className="text-slate-400">Métricas de crescimento e saúde do ecossistema local.</p>
        </div>
        <div className="bg-brand-500/10 px-4 py-2 rounded-lg border border-brand-500/20">
          <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Valuation Estimado</p>
          <p className="text-xl font-black text-white">R$ 4.250.000,00</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase">CAC (Custo de Aquisição)</p>
          <h4 className="text-xl font-bold mt-1 text-white">R$ 14,20</h4>
          <span className="text-[10px] text-green-500 font-bold">-12% este mês</span>
        </div>
        <div className="glass-card p-5 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase">LTV (Lifetime Value)</p>
          <h4 className="text-xl font-bold mt-1 text-white">R$ 840,00</h4>
          <span className="text-[10px] text-brand-500 font-bold">+5% retenção</span>
        </div>
        <div className="glass-card p-5 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase">GMV Mensal</p>
          <h4 className="text-xl font-bold mt-1 text-white">R$ 142.000</h4>
          <span className="text-[10px] text-blue-500 font-bold">Meta: R$ 200k</span>
        </div>
        <div className="glass-card p-5 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase">Net Promoter Score</p>
          <h4 className="text-xl font-bold mt-1 text-white">88/100</h4>
          <span className="text-[10px] text-brand-500 font-bold">Excelente</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-500" /> Crescimento de Transações
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-blue-500" /> Categorias Quentes
          </h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
             {categoryData.map(c => (
               <div key={c.name} className="flex items-center gap-2 text-[10px]">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }}></div>
                  <span className="text-slate-400 font-bold uppercase">{c.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
