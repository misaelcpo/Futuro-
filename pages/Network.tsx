
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  MessageCircle, 
  Trophy, 
  CheckCircle2,
  Copy,
  Zap,
  Award,
  Layers,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  UserCheck,
  ChevronRight,
  Network as NetworkIcon,
  Crown,
  Percent,
  Wallet,
  ArrowUpRight
} from 'lucide-react';
import { AppData, Milestone, Referral } from '../types';
import { formatCurrency } from '../utils';

interface NetworkProps {
  data: AppData;
  onClaimMilestone: (id: string, reward: number) => void;
}

export const Network: React.FC<NetworkProps> = ({ data, onClaimMilestone }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<number | 'all'>(1);
  const [searchTerm, setSearchTerm] = useState('');

  const MILESTONES: Milestone[] = [
    { id: 'm1', name: 'Elite Bronze', requiredVolume: 10000, reward: 250, icon: '🥉' },
    { id: 'm2', name: 'Elite Prata', requiredVolume: 50000, reward: 1250, icon: '🥈' },
    { id: 'm3', name: 'Elite Ouro', requiredVolume: 150000, reward: 5000, icon: '🥇' },
    { id: 'm4', name: 'Embaixador Prime', requiredVolume: 500000, reward: 20000, icon: '💎' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://miningprime.vc/join?ref=${data.user.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredReferrals = useMemo(() => {
    let list = data.referrals;
    if (activeTab !== 'all') list = list.filter(r => r.level === activeTab);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(term) || r.phone.includes(term));
    }
    return list;
  }, [data.referrals, activeTab, searchTerm]);

  const nextMilestone = MILESTONES.find(m => !data.user.unlockedMilestones.includes(m.id)) || MILESTONES[MILESTONES.length - 1];
  const progressPercent = Math.min((data.user.networkVolume / nextMilestone.requiredVolume) * 100, 100);

  return (
    <div className="space-y-10 animate-slide-up pb-32">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-slate-900 border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-80 h-full bg-orange-500/5 blur-[100px] -mr-40"></div>
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <NetworkIcon className="w-5 h-5 text-orange-500" />
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Guild Master Hub</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter">Mining <span className="text-orange-500">Guild</span> Center</h1>
              <p className="text-slate-500 text-sm font-medium max-w-lg">
                Construa sua rede e receba bônus agressivos sobre o volume de hardware da sua guilda.
              </p>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Link de Convite da Guilda</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-slate-950 border border-white/5 rounded-2xl px-6 h-16 flex items-center text-slate-300 font-mono text-sm overflow-hidden shadow-inner">
                  <span className="truncate">miningprime.vc/ref={data.user.referralCode}</span>
                </div>
                <button onClick={handleCopy} className={`px-8 h-16 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${copied ? 'bg-emerald-500 text-slate-950' : 'bg-white text-slate-950 hover:bg-orange-500 active:scale-95'}`}>
                  {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copiado' : 'Convidar'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[3.5rem] border-orange-500/20 bg-orange-500/[0.02] flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <div className="p-4 bg-orange-500 text-slate-950 rounded-2xl shadow-xl shadow-orange-500/20"><Crown className="w-6 h-6" /></div>
               <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest px-4 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20">{data.user.tier} RANK</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Próxima Patente: <br/>{nextMilestone.name}</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Recompensa: {formatCurrency(nextMilestone.reward)}</p>
            </div>
          </div>
          <div className="pt-8 space-y-3">
             <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                <span>Progresso Global</span>
                <span className="text-white">{progressPercent.toFixed(1)}%</span>
             </div>
             <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-orange-500 shadow-[0_0_15px_#f97316] transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { l: 1, p: '12%', d: 'Indicações Diretas', c: 'orange', desc: 'Sua linha de frente principal.' },
          { l: 2, p: '5%', d: 'Parceiros de Guilda', c: 'blue', desc: 'Indicações dos seus diretos.' },
          { l: 3, p: '3%', d: 'Rede Distribuída', c: 'emerald', desc: 'O poder da rede profunda.' },
        ].map(level => (
           <div key={level.l} className="glass-panel p-8 rounded-[3rem] border-white/5 bg-slate-900/40 relative overflow-hidden group hover:border-orange-500/30 transition-all">
              <div className="flex justify-between items-start mb-6 relative z-10">
                 <div className={`w-10 h-10 rounded-xl bg-${level.c}-500/10 border border-${level.c}-500/20 flex items-center justify-center text-${level.c}-500 font-black text-sm`}>L{level.l}</div>
                 <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Cashback Guilda</p>
                    <p className={`text-3xl font-black text-${level.c}-500 font-mono`}>{level.p}</p>
                 </div>
              </div>
              <h4 className="text-white font-black text-sm uppercase tracking-tight relative z-10">{level.d}</h4>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed relative z-10 mt-2">{level.desc}</p>
           </div>
        ))}
      </div>

      <div className="glass-panel rounded-[3.5rem] border-white/5 overflow-hidden bg-slate-900/20">
         <div className="p-8 md:p-10 border-b border-white/5 bg-slate-900/40 flex flex-col lg:flex-row justify-between items-center gap-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Membros da Guilda</h2>
            <div className="flex flex-wrap justify-center bg-slate-950 p-1.5 rounded-2xl border border-white/5 w-full md:w-auto shadow-inner">
               <button onClick={() => setActiveTab('all')} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'all' ? 'bg-white text-slate-950' : 'text-slate-500 hover:text-white'}`}>Global</button>
               <button onClick={() => setActiveTab(1)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 1 ? 'bg-orange-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}>Nível 1</button>
               <button onClick={() => setActiveTab(2)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 2 ? 'bg-blue-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}>Nível 2</button>
               <button onClick={() => setActiveTab(3)} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 3 ? 'bg-emerald-500 text-slate-950' : 'text-slate-500 hover:text-white'}`}>Nível 3</button>
            </div>
         </div>

         <div className="overflow-x-auto max-h-[600px] scrollbar-hide">
            <table className="w-full text-left">
               <thead className="sticky top-0 bg-slate-950 text-[10px] font-black text-slate-600 uppercase tracking-widest z-20">
                  <tr>
                     <th className="px-10 py-6">Operador</th>
                     <th className="px-10 py-6">Contato</th>
                     <th className="px-10 py-6">Aporte Hardware</th>
                     <th className="px-10 py-6 text-right">Royalty</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredReferrals.map(ref => (
                     <tr key={ref.id} className="hover:bg-white/[0.01] transition-colors group">
                        <td className="px-10 py-6">
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${ref.level === 1 ? 'bg-orange-500/10 text-orange-400' : 'bg-slate-800 text-slate-500'}`}>{ref.name.charAt(0)}</div>
                              <div>
                                 <p className="text-sm font-black text-white">{ref.name}</p>
                                 <span className="text-[9px] text-slate-600 font-bold uppercase tracking-tighter">Nv {ref.level} Miner</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <a href={`https://wa.me/${ref.phone.replace(/\D/g,'')}`} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all text-[10px] font-black uppercase tracking-widest">
                              Suporte Guilda
                           </a>
                        </td>
                        <td className="px-10 py-6">
                           <span className="text-xs text-slate-300 font-black font-mono">{formatCurrency(ref.investedAmount)}</span>
                        </td>
                        <td className="px-10 py-6 text-right">
                           <span className="text-emerald-400 font-black text-sm">+{formatCurrency(ref.commissionEarned)}</span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
