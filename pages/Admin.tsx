import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  DollarSign, 
  Activity, 
  Search, 
  Edit3, 
  Lock, 
  Unlock, 
  Save, 
  Zap, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language, UserState } from '../types';
import { t } from '../translations';
import { formatCurrency } from '../utils';

interface AdminProps {
  language: Language;
  currentUser: UserState; // Represents the "target" user for demo purposes in this single-user simulation
  onUpdateUser: (updates: Partial<UserState>) => void;
  onDistributeYield: (percentage: number) => void;
}

export const Admin: React.FC<AdminProps> = ({ language, currentUser, onUpdateUser, onDistributeYield }) => {
  // Stats
  const liquidity = 1450230.50 + currentUser.activeCapital;
  const totalUsers = 15420;
  
  // Yield Logic
  const [yieldPercent, setYieldPercent] = useState<string>('3.50');
  const [distributing, setDistributing] = useState(false);
  const [distributeSuccess, setDistributeSuccess] = useState(false);

  // User Management Logic
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for editing form
  const [editForm, setEditForm] = useState({
    balance: currentUser.balance,
    activeCapital: currentUser.activeCapital,
    isBlocked: false
  });

  const handleYieldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pct = parseFloat(yieldPercent);
    if (pct <= 0) return;
    
    setDistributing(true);
    setTimeout(() => {
      onDistributeYield(pct);
      setDistributing(false);
      setDistributeSuccess(true);
      setTimeout(() => setDistributeSuccess(false), 3000);
    }, 2000);
  };

  const handleSaveUser = () => {
    onUpdateUser({
      balance: editForm.balance,
      activeCapital: editForm.activeCapital
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-slate-900 p-8 rounded-2xl border border-red-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldAlert className="w-32 h-32 text-red-500" />
        </div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3 relative z-10">
          <ShieldAlert className="text-red-500" />
          {t(language, 'adminTitle')}
        </h1>
        <p className="text-red-200 mt-2 relative z-10">GOD MODE ACTIVE • Acesso Total Liberado</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">{t(language, 'systemLiquidity')}</p>
            <p className="text-2xl font-black text-white mt-1">{formatCurrency(liquidity)}</p>
          </div>
          <div className="p-3 bg-brand-500/20 rounded-lg text-brand-500">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">{t(language, 'activeUsers')}</p>
            <p className="text-2xl font-black text-white mt-1">{totalUsers.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase">{t(language, 'dailyPayouts')}</p>
            <p className="text-2xl font-black text-white mt-1">R$ 342.105,00</p>
          </div>
          <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Manual Yield Control */}
        <div className="glass-card p-8 rounded-2xl border-t-4 border-t-brand-500 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-brand-500 text-slate-900 rounded-lg">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-white">{t(language, 'manualYield')}</h3>
          </div>

          <form onSubmit={handleYieldSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">{t(language, 'yieldPercent')}</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01" 
                  min="0.01"
                  value={yieldPercent}
                  onChange={(e) => setYieldPercent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 px-4 text-white text-2xl font-bold outline-none focus:ring-2 focus:ring-brand-500"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
              </div>
            </div>

            {distributeSuccess && (
              <div className="bg-green-500/20 text-green-400 p-4 rounded-xl flex items-center border border-green-500/30">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {t(language, 'yieldSuccess')}
              </div>
            )}

            <button 
              type="submit"
              disabled={distributing}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center transition-all ${
                distributing 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-500 text-white'
              }`}
            >
              {distributing ? 'Processando Blockchain...' : t(language, 'distributeBtn')}
            </button>
          </form>
        </div>

        {/* User Management */}
        <div className="glass-card p-8 rounded-2xl border-t-4 border-t-blue-500 shadow-xl">
           <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <Edit3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">{t(language, 'userMgmt')}</h3>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="Buscar por email, CPF ou nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>

          {/* User Result (Simulated for current user) */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
             <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                    {currentUser.name.charAt(0)}
                 </div>
                 <div>
                   <p className="text-white font-bold">{currentUser.name} <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded ml-2">Online</span></p>
                   <p className="text-slate-400 text-xs">{currentUser.email}</p>
                 </div>
               </div>
               <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-400 hover:text-white p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
               >
                 <Edit3 className="w-5 h-5" />
               </button>
             </div>

             {isEditing ? (
               <div className="space-y-4 animate-slideIn">
                 <div>
                   <label className="block text-xs text-slate-400 uppercase font-bold mb-1">Saldo (BRL)</label>
                   <input 
                      type="number" 
                      value={editForm.balance}
                      onChange={(e) => setEditForm({...editForm, balance: parseFloat(e.target.value)})}
                      className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white"
                   />
                 </div>
                 <div>
                   <label className="block text-xs text-slate-400 uppercase font-bold mb-1">Capital Ativo (BRL)</label>
                   <input 
                      type="number" 
                      value={editForm.activeCapital}
                      onChange={(e) => setEditForm({...editForm, activeCapital: parseFloat(e.target.value)})}
                      className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white"
                   />
                 </div>
                 <div className="flex gap-2 pt-2">
                   <button 
                    onClick={handleSaveUser}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                   >
                     <Save className="w-4 h-4" /> Salvar
                   </button>
                   <button 
                    onClick={() => setEditForm({...editForm, isBlocked: !editForm.isBlocked})}
                    className={`flex-1 ${editForm.isBlocked ? 'bg-slate-600' : 'bg-red-600'} text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2`}
                   >
                     {editForm.isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                     {editForm.isBlocked ? 'Desbloquear' : 'Bloquear'}
                   </button>
                 </div>
               </div>
             ) : (
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-900 p-3 rounded-lg">
                   <p className="text-xs text-slate-500">Saldo</p>
                   <p className="text-white font-mono">{formatCurrency(currentUser.balance)}</p>
                 </div>
                 <div className="bg-slate-900 p-3 rounded-lg">
                   <p className="text-xs text-slate-500">Capital Ativo</p>
                   <p className="text-white font-mono">{formatCurrency(currentUser.activeCapital)}</p>
                 </div>
               </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};