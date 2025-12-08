import React, { useState } from 'react';
import { Copy, Users, UserPlus, Gift, Crown, Star, ChevronRight, Layers } from 'lucide-react';
import { Referral } from '../types';
import { formatCurrency, formatDate } from '../utils';

interface NetworkProps {
  referrals: Referral[];
  referralLink: string;
  simulateReferral: () => void;
}

export const Network: React.FC<NetworkProps> = ({ referrals, referralLink, simulateReferral }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Gamification Logic
  const nextLevelCount = 10;
  const currentCount = referrals.length;
  const progress = Math.min((currentCount / nextLevelCount) * 100, 100);

  const levels = [
    { level: 1, percent: '12%', label: 'Indicação Direta' },
    { level: 2, percent: '5%', label: 'Indireta' },
    { level: 3, percent: '3%', label: 'Indireta' },
    { level: 4, percent: '2%', label: 'Equipe' },
    { level: 5, percent: '1%', label: 'Equipe' },
    { level: '6-10', percent: '0.5%', label: 'Liderança Global' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            Programa de Embaixadores <Crown className="ml-3 w-6 h-6 text-yellow-500 animate-pulse" />
          </h1>
          <p className="text-slate-400">Construa sua renda passiva em até 10 níveis de profundidade.</p>
        </div>
        <button
          onClick={simulateReferral}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center shadow-lg shadow-purple-500/20 border border-purple-400/20"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Simular Indicação (Random Nível)
        </button>
      </div>

      {/* VIP Status Card */}
      <div className="bg-gradient-to-r from-purple-900 to-slate-900 p-8 rounded-2xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex flex-col md:flex-row gap-8 relative z-10">
          <div className="flex-1">
            <h3 className="text-purple-300 font-bold uppercase tracking-wider text-sm mb-2">Nível Atual</h3>
            <div className="flex items-baseline gap-2 mb-4">
               <h2 className="text-4xl font-extrabold text-white">Líder Expansion</h2>
               <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300 font-medium">
                <span>Meta para Royalties Globais</span>
                <span>{currentCount} / {nextLevelCount} ativos</span>
              </div>
              <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-purple-500/20">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="md:border-l md:border-purple-500/20 md:pl-8 flex flex-col justify-center">
             <p className="text-slate-400 text-sm mb-1">Ganhos de Rede Acumulados</p>
             <p className="text-4xl font-bold text-white tracking-tight">
               {formatCurrency(referrals.reduce((acc, curr) => acc + curr.commissionEarned, 0))}
             </p>
             <button className="text-purple-400 text-sm font-semibold mt-2 flex items-center hover:text-purple-300 transition-colors">
               Ver extrato detalhado <ChevronRight className="w-4 h-4 ml-1" />
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Referral Link Section */}
        <div className="lg:col-span-2 glass-card p-8 rounded-2xl border-t border-slate-700">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <Gift className="w-5 h-5 mr-2 text-brand-400" />
            Link de Indicação (Nível 1 - 12%)
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-slate-950 border-2 border-slate-800 rounded-xl px-4 py-4 flex items-center justify-between group hover:border-brand-500/50 transition-colors">
              <span className="text-slate-300 font-mono text-sm truncate">{referralLink}</span>
            </div>
            <button
              onClick={handleCopy}
              className={`
                w-full py-3 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg
                ${copied ? 'bg-green-600' : 'bg-brand-600 hover:bg-brand-500 hover:-translate-y-1'}
              `}
            >
              {copied ? 'Copiado!' : 'Copiar Link de Divulgação'}
            </button>
          </div>
        </div>

        {/* Levels Info */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-white font-bold text-sm mb-4 flex items-center uppercase tracking-wider">
            <Layers className="w-4 h-4 mr-2 text-purple-400" />
            Comissões Unilevel
          </h3>
          <div className="space-y-2">
            {levels.map((lvl, index) => (
              <div key={index} className="flex justify-between items-center p-2 rounded hover:bg-slate-700/30 transition-colors">
                <span className="text-slate-400 text-sm font-medium">Nível {lvl.level}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{lvl.label}</span>
                  <span className="text-brand-400 font-bold bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20 text-xs">
                    {lvl.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-slate-400" />
            <h3 className="font-semibold text-white">Últimas Comissões Recebidas</h3>
          </div>
          <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">{currentCount} Total</span>
        </div>
        
        {referrals.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
              <Users className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-slate-300 font-medium mb-1">Comece sua rede agora</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Copie seu link acima e envie para amigos. Você ganha até o 10º nível de profundidade.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Investidor</th>
                  <th className="px-6 py-4 font-semibold">Nível</th>
                  <th className="px-6 py-4 font-semibold">Aporte</th>
                  <th className="px-6 py-4 font-semibold text-right">Sua Comissão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {referrals.slice().reverse().map((ref) => (
                  <tr key={ref.id} className="hover:bg-slate-700/20 transition-colors group">
                    <td className="px-6 py-4 text-white font-medium flex items-center">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold mr-3">
                         {ref.name.charAt(0)}
                       </div>
                       {ref.name}
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${ref.level === 1 ? 'bg-brand-500/20 text-brand-400' : 'bg-slate-700 text-slate-400'}`}>
                        Nível {ref.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{formatCurrency(ref.investedAmount)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-brand-400 font-bold bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                        +{formatCurrency(ref.commissionEarned)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};