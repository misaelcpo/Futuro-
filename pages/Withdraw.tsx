
import React, { useState } from 'react';
import { Wallet, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { TransactionType, UserState } from '../types';
import { formatCurrency } from '../utils';

interface WithdrawProps {
  handleTransaction: (type: TransactionType, amount: number) => void;
  user: UserState;
}

export const Withdraw: React.FC<WithdrawProps> = ({ handleTransaction, user }) => {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const val = parseFloat(amount);

    if (val < 10) {
      setError('O resgate mínimo institucional é R$ 10,00.');
      return;
    }
    if (val > user.balance) {
      setError('Margem de liquidez insuficiente.');
      return;
    }
    if (!user.pixKey) {
      setError('Defina uma Chave de Liquidez (PIX) no seu terminal ID.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      handleTransaction(TransactionType.WITHDRAWAL, val);
      setAmount('');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-slide-up">
      <header className="text-center md:text-left space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tighter">Resgate de <span className="text-brand-400">Dividendos</span></h1>
        <p className="text-slate-500 font-medium italic">Converta sua liquidez em capital fiduciário via PIX.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Balances */}
        <div className="space-y-4">
           <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-[50px] rounded-full"></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Margem Disponível</p>
              <p className="text-4xl font-black text-white font-mono">{formatCurrency(user.balance)}</p>
           </div>
           
           <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 bg-slate-900/20">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Endereço de Resgate PIX</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-brand-400 border border-white/5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-lg font-bold text-white font-mono truncate">
                  {user.pixKey || <span className="text-red-500 font-sans italic opacity-50">Não configurado</span>}
                </p>
              </div>
           </div>
        </div>

        {/* Form */}
        <div className="glass-panel p-10 rounded-[2.5rem] border-brand-500/20 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Volume do Resgate</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-black text-xl font-mono">R$</span>
                <input
                  type="number"
                  min="10"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setError(null); }}
                  className="w-full bg-slate-950 border border-white/5 rounded-[1.5rem] py-6 pl-16 pr-8 text-white text-3xl font-black font-mono outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/5 transition-all"
                  placeholder="0.00"
                />
              </div>
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest ml-1">Taxa de Rede: 0.00% (Isento)</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 flex items-start gap-3 text-red-400 text-xs font-bold leading-relaxed">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !amount}
              className="w-full py-6 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-widest text-xs"
            >
              {loading ? 'Validando Bloco...' : <>Confirmar Resgate <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
          
          <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-500 opacity-20"></div>
        </div>
      </div>
    </div>
  );
};
