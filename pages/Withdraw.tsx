import React, { useState } from 'react';
import { Wallet, AlertTriangle, CheckCircle2 } from 'lucide-react';
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
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const val = parseFloat(amount);

    if (val < 1) {
      setError('O valor mínimo para saque é R$ 1,00');
      return;
    }
    if (val > user.balance) {
      setError('Saldo insuficiente.');
      return;
    }
    if (!user.pixKey) {
      setError('Cadastre sua chave PIX no perfil antes de sacar.');
      return;
    }

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      handleTransaction(TransactionType.WITHDRAWAL, val);
      setSuccess(true);
      setAmount('');
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Solicitar Saque</h1>
        <p className="text-slate-400">Transfira seus rendimentos para sua conta bancária via PIX.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <p className="text-slate-400 text-sm">Saldo Disponível</p>
           <p className="text-2xl font-bold text-white">{formatCurrency(user.balance)}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <p className="text-slate-400 text-sm">Chave PIX Cadastrada</p>
           <p className="text-lg font-medium text-white truncate">
             {user.pixKey ? user.pixKey : <span className="text-red-400">Não cadastrada</span>}
           </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Valor do Saque</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">R$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                required
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white text-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder="0,00"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Mínimo: R$ 1,00</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center text-red-400 text-sm">
              <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center text-green-400 text-sm">
              <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
              Saque solicitado com sucesso! O valor será creditado em breve.
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className={`
              w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex justify-center items-center transition-all
              ${loading || success
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-brand-600 hover:bg-brand-500 shadow-brand-500/25'}
            `}
          >
            {loading ? 'Processando...' : 'Confirmar Saque'}
          </button>
        </form>
      </div>
    </div>
  );
};