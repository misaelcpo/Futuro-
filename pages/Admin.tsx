
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Search, 
  Activity,
  Database,
  TrendingUp,
  X,
  Filter,
  Lock,
  Zap,
  ArrowUpRight,
  Wallet,
  Globe,
  BarChart3,
  Server,
  ShieldCheck,
  ArrowRightLeft,
  UserCheck,
  Edit2,
  Trash2,
  Ban,
  DollarSign,
  Cpu
} from 'lucide-react';
import { Language, UserState, UserRole } from '../types';
import { formatCurrency } from '../utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminProps {
  language: Language;
  currentUser: UserState;
  allUsers: UserState[];
  systemConfig: { withdrawalsEnabled: boolean, globalYieldMultiplier: number };
  onUpdateUser: (userId: string, updates: Partial<UserState>) => void;
  onDistributeYield: (percentage: number) => void;
  onToggleWithdrawals: () => void;
}

export const Admin: React.FC<AdminProps> = ({ 
  currentUser, 
  allUsers, 
  onUpdateUser, 
  onDistributeYield, 
  onToggleWithdrawals,
  systemConfig 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<UserState | null>(null);
  const [yieldPercent, setYieldPercent] = useState('1.5');

  const platformData = [
    { name: 'Seg', v: 120000 },
    { name: 'Ter', v: 145000 },
    { name: 'Qua', v: 138000 },
    { name: 'Qui', v: 165000 },
    { name: 'Sex', v: 189000 },
    { name: 'Sab', v: 210000 },
    { name: 'Dom', v: 245000 },
  ];

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalLiquidity = allUsers.reduce((acc, curr) => acc + curr.balance, 0);
  const totalHashrate = allUsers.reduce((acc, curr) => acc + curr.investedCashback, 0);

  return (
    <div className="space-y-8 animate-slide-up pb-32">
      {/* Header Admin */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-950 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-orange-500/5 blur-[100px] -mr-32"></div>
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em]">Master Frame Control</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Comando <span className="text-orange-500">Mestre</span></h1>
        </div>
        <div className="flex flex-wrap gap-4 relative z-10 w-full lg:w-auto">
           <div className="flex-1 lg:flex-none px-6 py-3 bg-slate-900 rounded-2xl border border-white/5 text-center">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Usuários Online</p>
              <p className="text-xl font-black text-emerald-400">{allUsers.length}</p>
           </div>
           <div className="flex-1 lg:flex-none px-6 py-3 bg-slate-900 rounded-2xl border border-white/5 text-center">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Status Rede</p>
              <p className="text-xl font-black text-orange-500">OPTIMAL</p>
           </div>
        </div>
      </header>

      {/* Stats Administrativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 bg-slate-950/40 space-y-4">
           <div className="flex justify-between items-start">
              <div className="p-4 bg-orange-500/10 text-orange-500 rounded-2xl">
                 <Database className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Auditado</span>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Liquidez Total em Custódia</p>
              <h3 className="text-3xl font-black text-white font-mono">{formatCurrency(totalLiquidity)}</h3>
           </div>
        </div>
        <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 bg-slate-950/40 space-y-4">
           <div className="flex justify-between items-start">
              <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl">
                 <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Pool Ativa</span>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Poder de Hash Global</p>
              <h3 className="text-3xl font-black text-white font-mono">{totalHashrate.toFixed(2)} <span className="text-xs">TH/s</span></h3>
           </div>
        </div>
        <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 bg-slate-950/40 space-y-4">
           <div className="flex justify-between items-start">
              <div className="p-4 bg-purple-500/10 text-purple-500 rounded-2xl">
                 <Zap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Receita Admin</span>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Comissão de Plataforma (Taxas)</p>
              <h3 className="text-3xl font-black text-white font-mono">{formatCurrency(currentUser.adminRevenue || 0)}</h3>
           </div>
        </div>
      </div>

      {/* Controles Globais e Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 glass-panel p-10 rounded-[3.5rem] border-white/5 bg-slate-950/30">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                 <BarChart3 className="w-6 h-6 text-orange-500" /> Atividade Financeira
              </h3>
              <div className="flex gap-2">
                 <span className="px-4 py-1 bg-white/5 border border-white/5 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest">Timeframe: 7D</span>
              </div>
           </div>
           <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformData}>
                  <defs>
                    <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Area type="monotone" dataKey="v" stroke="#f97316" strokeWidth={3} fill="url(#colorAdmin)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="glass-panel p-8 rounded-[3rem] border-orange-500/20 bg-orange-500/5 space-y-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                 <Zap className="w-4 h-4 text-orange-500" /> Gatilhos de Controle
              </h3>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Taxa de Rendimento (%)</label>
                    <div className="flex gap-2">
                       <input 
                         type="number" 
                         value={yieldPercent}
                         onChange={(e) => setYieldPercent(e.target.value)}
                         className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm"
                       />
                       <button 
                         onClick={() => onDistributeYield(parseFloat(yieldPercent))}
                         className="px-4 py-2 bg-orange-500 text-slate-950 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-orange-500/10"
                       >
                          Rodar
                       </button>
                    </div>
                 </div>
                 <button 
                   onClick={onToggleWithdrawals}
                   className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${systemConfig.withdrawalsEnabled ? 'bg-white text-slate-950' : 'bg-red-500 text-white'}`}
                 >
                    {systemConfig.withdrawalsEnabled ? <><Lock className="w-4 h-4" /> Congelar Saques</> : <><ShieldCheck className="w-4 h-4" /> Liberar Saques</>}
                 </button>
              </div>
           </div>
           
           <div className="glass-panel p-8 rounded-[3rem] border-white/5 bg-slate-950/50 space-y-6">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                 <Server className="w-4 h-4 text-orange-500" /> Status do Core
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Database Engine</span>
                    <span className="text-emerald-400">OPTIMAL</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Pending Withdrawals</span>
                    <span className="text-white font-mono">0</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Active Sessions</span>
                    <span className="text-white font-mono">{allUsers.length}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Tabela de Gestão de Usuários */}
      <div className="glass-panel rounded-[3rem] border-white/5 overflow-hidden bg-slate-950/40">
         <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
               <Users className="w-6 h-6 text-orange-500" /> Gestão de Mineradores
            </h3>
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
               <input 
                 type="text" 
                 placeholder="Buscar por nome ou e-mail..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-slate-900 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-orange-500"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-900/50 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <tr>
                     <th className="px-8 py-6">Minerador</th>
                     <th className="px-8 py-6">Status</th>
                     <th className="px-8 py-6">Saldo (BRL)</th>
                     <th className="px-8 py-6">Poder (TH/s)</th>
                     <th className="px-8 py-6 text-right">Ações</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredUsers.map(user => (
                     <tr key={user.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-8 py-6">
                           <div>
                              <p className="text-sm font-bold text-white">{user.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono">{user.email}</p>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${user.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                              {user.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 font-mono text-sm text-white">
                           {formatCurrency(user.balance)}
                        </td>
                        <td className="px-8 py-6 font-mono text-sm text-orange-500">
                           {user.investedCashback.toFixed(2)}
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => setEditingUser(user)}
                                className="p-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-colors"
                              >
                                 <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => onUpdateUser(user.id, { status: user.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE' })}
                                className={`p-2 rounded-lg border border-white/5 transition-colors ${user.status === 'ACTIVE' ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'}`}
                              >
                                 <Ban className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal de Edição de Usuário */}
      {editingUser && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fadeIn">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setEditingUser(null)}></div>
          <div className="relative glass-panel w-full max-w-md p-8 rounded-[2.5rem] border-white/10 shadow-2xl animate-slide-up">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Editar Minerador</h3>
                <button onClick={() => setEditingUser(null)}><X className="w-6 h-6 text-slate-500 hover:text-white" /></button>
             </div>
             
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Saldo Atual (BRL)</label>
                   <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        type="number" 
                        defaultValue={editingUser.balance}
                        onBlur={(e) => onUpdateUser(editingUser.id, { balance: parseFloat(e.target.value) })}
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono"
                      />
                   </div>
                </div>
                
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Poder de Hash (TH/s)</label>
                   <div className="relative">
                      <Cpu className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                      <input 
                        type="number" 
                        defaultValue={editingUser.investedCashback}
                        onBlur={(e) => onUpdateUser(editingUser.id, { investedCashback: parseFloat(e.target.value) })}
                        className="w-full bg-slate-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-mono"
                      />
                   </div>
                </div>

                <div className="pt-4">
                   <button 
                     onClick={() => setEditingUser(null)}
                     className="w-full py-4 bg-orange-500 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20"
                   >
                      Salvar Alterações
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
