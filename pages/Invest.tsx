import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, AlertCircle, TrendingUp, Lock, Timer, Zap } from 'lucide-react';
import { TransactionType } from '../types';
import { formatCurrency } from '../utils';

interface InvestProps {
  handleTransaction: (type: TransactionType, amount: number) => void;
  balance: number;
}

export const Invest: React.FC<InvestProps> = ({ handleTransaction, balance }) => {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (val <= 0) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      handleTransaction(TransactionType.DEPOSIT, val);
      setAmount('');
      setLoading(false);
    }, 1500);
  };

  const val = parseFloat(amount) || 0;
  const minYield = val * 0.02;
  const maxYield = val * 0.05;
  const monthlyProjection = val * 1.5; // Aggressive projection logic

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header with Scarcity */}
      <div className="text-center mb-10 relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <h1 className="text-4xl font-extrabold text-white mb-2 relative inline-block bg-slate-900 px-6">
          Aporte de Capital <span className="text-brand-500">HFT</span>
        </h1>
        <p className="text-slate-400 mt-2 relative z-10">
          Invista no mesmo algoritmo que os grandes bancos utilizam.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Urgency & Status */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Pool Scarcity Card */}
          <div className="glass-card p-6 rounded-2xl neon-glow relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-bold flex items-center">
                <Lock className="w-5 h-5 mr-2 text-amber-500" />
                Pool do Dia
              </h3>
              <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded border border-red-500/20 animate-pulse">
                ENCERRANDO
              </span>
            </div>
            
            <p className="text-sm text-slate-400 mb-2">Capacidade do robô de arbitragem:</p>
            <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-700 mb-2">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-red-600 w-[87%] rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">87% Preenchido</span>
              <span className="text-red-400">Restam R$ 45.320,00</span>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 space-y-4">
             <div className="flex items-center space-x-4">
               <div className="bg-brand-500/20 p-3 rounded-lg">
                 <Zap className="w-6 h-6 text-brand-400" />
               </div>
               <div>
                 <h4 className="text-white font-bold">Retorno Imediato</h4>
                 <p className="text-xs text-slate-400">Rendimentos creditados a cada 24h.</p>
               </div>
             </div>
             <div className="flex items-center space-x-4">
               <div className="bg-blue-500/20 p-3 rounded-lg">
                 <ShieldCheck className="w-6 h-6 text-blue-400" />
               </div>
               <div>
                 <h4 className="text-white font-bold">Segurança Blockchain</h4>
                 <p className="text-xs text-slate-400">Auditoria em tempo real de todas as ordens.</p>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Investment Form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-8 border-t-4 border-t-brand-500 shadow-2xl relative">
            <div className="absolute top-0 right-0 -mt-3 mr-4">
              <span className="bg-brand-500 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-lg">
                RECOMENDADO
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Quanto você quer lucrar?</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500 font-bold text-xl">R$</span>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-5 pl-14 pr-4 text-white text-2xl font-bold focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all placeholder-slate-600"
                    placeholder="0,00"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">BRL</span>
                  </div>
                </div>
              </div>

              {val > 0 && (
                <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-700/50 animate-slideIn">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Simulação de Ganhos</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <p className="text-xs text-slate-400 mb-1">Lucro Diário (Médio)</p>
                      <span className="text-brand-400 font-bold text-lg">{formatCurrency((minYield + maxYield) / 2)}</span>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 relative overflow-hidden">
                       <div className="absolute inset-0 bg-brand-500/5"></div>
                      <p className="text-xs text-slate-400 mb-1">Lucro Mensal (Est.)</p>
                      <span className="text-green-400 font-bold text-lg">{formatCurrency(monthlyProjection)}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-3 text-center">
                    *Baseado na performance histórica dos últimos 30 dias.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || val <= 0}
                className={`
                  w-full py-5 rounded-xl font-extrabold text-lg shadow-xl flex justify-center items-center transition-all relative overflow-hidden group
                  ${loading || val <= 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                    : 'bg-gradient-to-r from-brand-600 to-brand-400 hover:from-brand-500 hover:to-brand-300 text-white shadow-brand-500/40 transform hover:-translate-y-1'}
                `}
              >
                {/* Button Shimmer Effect */}
                {!loading && val > 0 && <div className="absolute inset-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>}
                
                {loading ? (
                  <span className="animate-pulse">Sincronizando Blockchain...</span>
                ) : (
                  <>
                    Confirmar Investimento Agora <ArrowUpRight className="ml-2 w-6 h-6" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 flex justify-center items-center gap-6">
               <div className="flex items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                  {/* Fake Payment Logos can go here */}
                  <span className="text-slate-500 text-xs font-semibold">PIX 24h</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};