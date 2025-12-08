import React from 'react';
import { CheckCircle2, Clock, CalendarDays, Coins } from 'lucide-react';
import { formatCurrency } from '../utils';

interface TasksProps {
  lastClaimDate: string | null;
  onClaim: () => void;
}

export const Tasks: React.FC<TasksProps> = ({ lastClaimDate, onClaim }) => {
  const isClaimedToday = () => {
    if (!lastClaimDate) return false;
    const today = new Date().toDateString();
    const last = new Date(lastClaimDate).toDateString();
    return today === last;
  };

  const claimed = isClaimedToday();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Tarefas Diárias</h1>
        <p className="text-slate-400">Complete missões simples e ganhe recompensas em saldo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Login Task Card */}
        <div className={`
          relative overflow-hidden rounded-2xl border transition-all duration-300
          ${claimed 
            ? 'bg-slate-800 border-slate-700 opacity-80' 
            : 'bg-gradient-to-br from-slate-800 to-slate-900 border-brand-500/30 shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20'}
        `}>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${claimed ? 'bg-slate-700' : 'bg-brand-500/20'}`}>
                <CalendarDays className={`w-8 h-8 ${claimed ? 'text-slate-400' : 'text-brand-400'}`} />
              </div>
              <div className="bg-slate-950/50 px-3 py-1 rounded-full border border-slate-700">
                <span className="text-xs font-medium text-slate-300 flex items-center">
                  <Coins className="w-3 h-3 mr-1 text-yellow-500" />
                  + R$ 1,00
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Check-in Diário</h3>
            <p className="text-slate-400 text-sm mb-6">
              Acesse a plataforma todos os dias para garantir sua recompensa. O valor é creditado instantaneamente no seu saldo disponível.
            </p>

            <button
              onClick={onClaim}
              disabled={claimed}
              className={`
                w-full py-3 rounded-xl font-bold text-sm flex justify-center items-center transition-all
                ${claimed 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/25 active:scale-[0.98]'}
              `}
            >
              {claimed ? (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Volte Amanhã
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Resgatar Recompensa
                </>
              )}
            </button>
          </div>
          
          {/* Background decoration */}
          {!claimed && (
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full pointer-events-none"></div>
          )}
        </div>

        {/* Placeholder for future tasks */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-center items-center text-center opacity-75">
          <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
            <Coins className="w-6 h-6 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300">Em Breve</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-xs">
            Novas tarefas como compartilhar nas redes sociais e assistir vídeos estarão disponíveis em breve.
          </p>
        </div>
      </div>
    </div>
  );
};