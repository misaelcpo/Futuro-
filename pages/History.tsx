import React from 'react';
import { History as HistoryIcon, ArrowUpRight, ArrowDownLeft, RefreshCw, Gift, CheckSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { formatCurrency, formatDate } from '../utils';

interface HistoryProps {
  transactions: Transaction[];
}

export const History: React.FC<HistoryProps> = ({ transactions }) => {
  
  const getIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.DEPOSIT:
        return <ArrowUpRight className="w-5 h-5 text-blue-400" />;
      case TransactionType.WITHDRAWAL:
        return <ArrowDownLeft className="w-5 h-5 text-red-400" />;
      case TransactionType.YIELD:
        return <RefreshCw className="w-5 h-5 text-brand-400" />;
      case TransactionType.COMMISSION:
        return <Gift className="w-5 h-5 text-purple-400" />;
      case TransactionType.DAILY_TASK:
        return <CheckSquare className="w-5 h-5 text-yellow-400" />;
      case TransactionType.TRANSFER_SENT:
        return <ArrowRight className="w-5 h-5 text-orange-400" />;
      case TransactionType.TRANSFER_RECEIVED:
        return <ArrowLeft className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getTypeLabel = (type: TransactionType) => {
     switch (type) {
      case TransactionType.DEPOSIT: return 'Investimento';
      case TransactionType.WITHDRAWAL: return 'Saque';
      case TransactionType.YIELD: return 'Rendimento Diário';
      case TransactionType.COMMISSION: return 'Comissão de Rede';
      case TransactionType.DAILY_TASK: return 'Tarefa Diária';
      case TransactionType.TRANSFER_SENT: return 'Envio P2P';
      case TransactionType.TRANSFER_RECEIVED: return 'Recebimento P2P';
    }
  };

  const isNegative = (type: TransactionType) => {
    return type === TransactionType.WITHDRAWAL || type === TransactionType.TRANSFER_SENT;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Histórico de Transações</h1>
        <p className="text-slate-400">Acompanhe toda a movimentação da sua conta.</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-sm">
        {transactions.length === 0 ? (
          <div className="p-12 text-center">
             <HistoryIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
             <p className="text-slate-400">Nenhuma transação registrada ainda.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Tipo</th>
                  <th className="px-6 py-4 font-medium">Descrição</th>
                  <th className="px-6 py-4 font-medium">Data</th>
                  <th className="px-6 py-4 font-medium">Valor</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[...transactions].reverse().map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg bg-slate-800 border border-slate-700 mr-3`}>
                          {getIcon(tx.type)}
                        </div>
                        <span className="text-white font-medium">{getTypeLabel(tx.type)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm max-w-xs truncate">{tx.description}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{formatDate(tx.date)}</td>
                    <td className={`px-6 py-4 font-bold ${isNegative(tx.type) ? 'text-red-400' : 'text-brand-400'}`}>
                      {isNegative(tx.type) ? '-' : '+'}{formatCurrency(tx.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${tx.status === 'COMPLETED' ? 'bg-green-400/10 text-green-400' : 
                          tx.status === 'PENDING' ? 'bg-yellow-400/10 text-yellow-400' : 'bg-red-400/10 text-red-400'}
                      `}>
                        {tx.status === 'COMPLETED' ? 'Concluído' : tx.status === 'PENDING' ? 'Pendente' : 'Falhou'}
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