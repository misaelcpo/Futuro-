
import React from 'react';
import { ClipboardList, Clock, CheckCircle2, XCircle, MessageSquare, MapPin, Calendar } from 'lucide-react';
import { ServiceJob, UserRole, JobStatus } from '../types';
import { formatCurrency, formatDate } from '../utils';

interface MyJobsProps {
  jobs: ServiceJob[];
  role: UserRole;
}

export const MyJobs: React.FC<MyJobsProps> = ({ jobs, role }) => {
  const isProvider = role === UserRole.PROVIDER;

  const getStatusStyle = (status: JobStatus) => {
    switch (status) {
      case JobStatus.ACCEPTED: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case JobStatus.COMPLETED: return 'bg-brand-500/10 text-brand-400 border-brand-500/20';
      case JobStatus.PENDING: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case JobStatus.CANCELLED: return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getStatusLabel = (status: JobStatus) => {
    switch (status) {
      case JobStatus.ACCEPTED: return 'Em Andamento';
      case JobStatus.COMPLETED: return 'Concluído';
      case JobStatus.PENDING: return 'Aguardando';
      case JobStatus.CANCELLED: return 'Cancelado';
      case JobStatus.NEGOTIATING: return 'Negociando';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 animate-slideIn">
      <header>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="text-brand-500" />
          {isProvider ? 'Meus Trabalhos' : 'Meus Pedidos'}
        </h1>
        <p className="text-slate-400">
          Gerencie seus serviços {isProvider ? 'aceitos' : 'solicitados'} e acompanhe o status.
        </p>
      </header>

      {jobs.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border-dashed border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-700">
            <ClipboardList className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Nenhum serviço encontrado</h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">
              Você ainda não possui serviços ativos. {isProvider ? 'Explore o marketplace para encontrar oportunidades.' : 'Solicite um serviço para começar.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="glass-card p-6 rounded-2xl border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-500/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getStatusStyle(job.status)}`}>
                      {getStatusLabel(job.status)}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(job.date)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{job.category}</h3>
                  <p className="text-sm text-slate-400 line-clamp-1">{job.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="text-xs text-brand-400 font-bold">
                      {formatCurrency(job.budget)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                  <MessageSquare className="w-4 h-4" /> CHAT
                </button>
                <button className="flex-1 md:flex-none px-4 py-2 bg-brand-600/10 hover:bg-brand-600 text-brand-400 hover:text-white border border-brand-500/20 rounded-xl text-sm font-bold transition-all">
                  DETALHES
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dica de Segurança */}
      <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5" />
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong>Lembre-se:</strong> Para sua segurança, combine todos os detalhes através do chat oficial e realize pagamentos apenas após a conclusão do serviço. Prestadores verificados possuem maior garantia de segurança.
        </p>
      </div>
    </div>
  );
};
