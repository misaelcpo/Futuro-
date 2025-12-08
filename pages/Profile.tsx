import React, { useState } from 'react';
import { UserCircle, CreditCard, Save, TrendingUp, ChevronRight } from 'lucide-react';
import { UserState } from '../types';

interface ProfileProps {
  user: UserState;
  updateUser: (updates: Partial<UserState>) => void;
  onNavigate: (view: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, updateUser, onNavigate }) => {
  const [pixKey, setPixKey] = useState(user.pixKey);
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, pixKey });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Perfil e Dados Bancários</h1>
          <p className="text-slate-400">Mantenha seus dados atualizados para receber saques.</p>
        </div>
      </div>

      {/* Call to Action Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl border border-brand-500/30 shadow-lg relative overflow-hidden group cursor-pointer" onClick={() => onNavigate('invest')}>
        <div className="absolute top-0 right-0 p-8 bg-brand-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-brand-500/20 p-3 rounded-lg text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Pronto para começar?</h3>
              <p className="text-slate-400 text-sm">Realize um aporte agora e comece a lucrar.</p>
            </div>
          </div>
          
          <button 
            type="button"
            className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-lg shadow-brand-500/20 flex items-center"
          >
            Investir Agora
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Info */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
          <div className="flex items-center mb-6">
            <UserCircle className="w-6 h-6 text-brand-500 mr-2" />
            <h3 className="text-lg font-semibold text-white">Dados Pessoais</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nome Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg py-3 px-4 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Bank Info */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm">
          <div className="flex items-center mb-6">
            <CreditCard className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-white">Chave PIX para Saque</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Chave PIX</label>
            <input
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              placeholder="CPF, Email, Telefone ou Chave Aleatória"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-slate-600"
            />
            <p className="text-xs text-slate-500 mt-2">Certifique-se que a chave está correta. Transferências enviadas para chaves erradas não podem ser estornadas.</p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition-all flex justify-center items-center border border-slate-600"
        >
          {saved ? (
             <span className="flex items-center text-green-400"><Save className="w-4 h-4 mr-2" /> Dados Salvos!</span>
          ) : (
             'Salvar Alterações'
          )}
        </button>
      </form>
    </div>
  );
};