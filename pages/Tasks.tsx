
import React from 'react';
import { CheckCircle2, Clock, CalendarDays, Coins, Info, Zap } from 'lucide-react';
import { formatCurrency } from '../utils';

interface TasksProps {
  lastClaimDate: string | null;
  onClaim: () => void;
}

export const Tasks: React.FC<TasksProps> = ({ lastClaimDate, onClaim }) => {
  const isClaimedToday = () => {
    if (!lastClaimDate) return false;
    const today = new Date().toDateString();
    return today === lastClaimDate;
  };

  const claimed = isClaimedToday();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Missões de Recompensa</h1>
        <p className="text-slate-400 font-medium">Potencialize seus rendimentos completando ações rápidas na rede.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Login Task Card */}
        <div className={`
          relative overflow-hidden rounded-[2.5rem] border transition-all duration-500 group
          ${claimed 
            ? 'bg-slate-900/40 border-slate-800' 
            : 'bg-gradient-to-br from-slate-900 to-slate-950 border-brand-500/20 shadow-2xl shadow-brand-500/5 hover:border-brand-500/40'}
        `}>
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl transition-colors duration-500 ${claimed ? 'bg-slate-800/50 text-slate-500' : 'bg-brand-500/10 text-brand-400'}`}>
                <CalendarDays className={`w-8 h-8 ${!claimed && 'animate-float'}`} />
              </div>
              <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2 shadow-inner">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-black text-white tracking-wider">
                  + R$ 1,00
                </span>
              </div>
            </div>

            <h3 className="text-xl font-black text-white mb-2 tracking-tight">Check-in Diário</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
              Sua presença fortalece a liquidez do sistema. Ative seu bônus de presença para somar ao seu saldo disponível.
            </p>

            <div className="space-y-4">
              <button
                onClick={onClaim}
                disabled={claimed}
                className={`
                  w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex justify-center items-center transition-all relative overflow-hidden
                  ${claimed 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
                    : 'bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-[0_15px_30px_-10px_rgba(16,185,129,0.3)] active:scale-[0.98] group'}
                `}
              >
                {!claimed && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {claimed ? (
                    <>
                      <Clock className="w-4 h-4" />
                      Ciclo Concluído
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Resgatar Recompensa
                    </>
                  )}
                </span>
              </button>

              {/* Lembrete Dinâmico Requisitado */}
              {claimed && (
                <div className="flex items-center gap-3 p-4 bg-brand-500/5 rounded-2xl border border-brand-500/10 animate-slide-up">
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-brand-400 fill-current" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Lembrete Ativado</p>
                    <p className="text-[11px] text-slate-400 font-bold">Volte em 24h para resgatar seu próximo bônus de rede.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Background decoration */}
          {!claimed && (
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-brand-500/20 transition-all duration-700"></div>
          )}
        </div>

        {/* Informational Widget */}
        <div className="glass-panel rounded-[2.5rem] p-10 flex flex-col justify-center border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-slate-900">
            <Coins className="w-32 h-32 opacity-10" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Info className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Potencialize seus ganhos</h3>
            </div>
            
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Sabia que o saldo de tarefas diárias pode ser usado para impulsionar seus contratos no Marketplace? 
              Quanto mais ativo você é, maior sua autoridade no sistema CityService.
            </p>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                <div className="w-1.5 h-1.5 bg-brand-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                Ganhos cumulativos sem limite
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                <div className="w-1.5 h-1.5 bg-brand-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                Prioridade em novos serviços
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
