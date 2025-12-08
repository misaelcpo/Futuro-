import React, { useState } from 'react';
import { Search, ArrowRightLeft, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Language, UserState } from '../types';
import { t } from '../translations';
import { formatCurrency } from '../utils';

interface TransferProps {
  language: Language;
  currentUser: UserState;
  onTransfer: (recipientEmail: string, amount: number, recipientName: string) => void;
}

interface FoundUser {
  name: string;
  email: string;
  avatar: string;
}

export const Transfer: React.FC<TransferProps> = ({ language, currentUser, onTransfer }) => {
  const [step, setStep] = useState(1); // 1: Search, 2: Amount, 3: Success
  const [searchEmail, setSearchEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
  const [amount, setAmount] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFoundUser(null);

    if (!searchEmail.includes('@') || searchEmail.length < 5) {
      setError(t(language, 'errorNotFound'));
      return;
    }

    if (searchEmail.toLowerCase() === currentUser.email.toLowerCase()) {
      setError(t(language, 'errorSelf'));
      return;
    }

    setLoading(true);
    // Simulate DB Search
    setTimeout(() => {
      setLoading(false);
      // Simulate success for any valid email
      const name = "Investidor " + searchEmail.split('@')[0].charAt(0).toUpperCase() + searchEmail.split('@')[0].slice(1);
      setFoundUser({
        name: name,
        email: searchEmail,
        avatar: `https://i.pravatar.cc/150?u=${searchEmail}`
      });
    }, 1500);
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    
    if (val <= 0 || val > currentUser.balance) {
      setError(t(language, 'errorFunds'));
      return;
    }

    if (foundUser) {
      setLoading(true);
      setTimeout(() => {
        onTransfer(foundUser.email, val, foundUser.name);
        setLoading(false);
        setStep(3);
      }, 2000);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSearchEmail('');
    setAmount('');
    setFoundUser(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ArrowRightLeft className="text-brand-500" />
          {t(language, 'transferTitle')}
        </h1>
        <p className="text-slate-400">{t(language, 'transferSubtitle')}</p>
      </div>

      {step === 3 ? (
        // Success View
        <div className="bg-slate-800 rounded-2xl p-12 text-center border border-brand-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] animate-slideIn">
          <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-brand-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{t(language, 'successMsg')}</h2>
          <p className="text-slate-400 mb-8">
             Você enviou <span className="text-white font-bold">{formatCurrency(parseFloat(amount))}</span> para <span className="text-white">{foundUser?.name}</span>.
          </p>
          <button 
            onClick={resetForm}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-colors"
          >
            Nova Transferência
          </button>
        </div>
      ) : (
        // Form View
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Search & User */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border-slate-700">
              <form onSubmit={handleSearch}>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  {t(language, 'recipientLabel')}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={searchEmail}
                    onChange={(e) => {
                      setSearchEmail(e.target.value);
                      setError(null);
                      if (step === 2) setStep(1); // Reset to step 1 if email changes
                    }}
                    disabled={loading || step === 2}
                    placeholder="user@exemplo.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white outline-none focus:ring-2 focus:ring-brand-500/50 transition-all disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={loading || step === 2 || !searchEmail}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-lg text-brand-400 hover:text-white hover:bg-brand-500 transition-colors disabled:opacity-0"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                {loading && step === 1 && (
                  <p className="text-xs text-brand-400 mt-2 flex items-center animate-pulse">
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    {t(language, 'searching')}
                  </p>
                )}
                {error && (
                  <p className="text-xs text-red-400 mt-2 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {error}
                  </p>
                )}
              </form>
            </div>

            {foundUser && (
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-2xl border border-brand-500/30 flex items-center gap-4 animate-slideIn relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 bg-brand-500 text-slate-900 text-[10px] font-bold rounded-bl-xl">
                  {t(language, 'userFound')}
                </div>
                <img src={foundUser.avatar} alt="User" className="w-16 h-16 rounded-full border-2 border-brand-500 p-1" />
                <div>
                  <h3 className="text-white font-bold text-lg">{foundUser.name}</h3>
                  <p className="text-slate-400 text-sm">{foundUser.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Amount & Confirm */}
          <div className={`transition-all duration-500 ${foundUser ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-10 pointer-events-none blur-[2px]'}`}>
            <div className="glass-card p-8 rounded-2xl border-t-4 border-t-brand-500 shadow-xl">
              <form onSubmit={handleTransferSubmit} className="space-y-6">
                <div>
                   <div className="flex justify-between items-end mb-2">
                      <label className="block text-sm font-bold text-white">{t(language, 'amountLabel')}</label>
                      <span className="text-xs text-slate-400">
                        {t(language, 'balanceAvailable')}: <span className="text-white font-mono">{formatCurrency(currentUser.balance)}</span>
                      </span>
                   </div>
                   <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={loading || !foundUser}
                        placeholder="0.00"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white text-2xl font-bold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all placeholder-slate-700"
                      />
                   </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !amount || parseFloat(amount) > currentUser.balance}
                  className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t(language, 'processing')}
                    </>
                  ) : (
                    <>
                      {t(language, 'confirmBtn')} <ArrowRightLeft className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};