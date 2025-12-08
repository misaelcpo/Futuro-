import React, { useState, useEffect } from 'react';
import { Activity, Globe, Server, Cpu, ArrowRight, TrendingUp } from 'lucide-react';
import { Language } from '../types';
import { t } from '../translations';
import { generateId } from '../utils';

interface OperationsProps {
  language: Language;
}

interface TradeLog {
  id: string;
  pair: string;
  buyEx: string;
  sellEx: string;
  buyPrice: number;
  profit: number;
  timestamp: string;
}

export const Operations: React.FC<OperationsProps> = ({ language }) => {
  const [logs, setLogs] = useState<TradeLog[]>([]);
  const [latency, setLatency] = useState(14);
  
  // Fake Data Generators
  const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/BUSD', 'XRP/USDT'];
  const exchanges = ['Binance', 'Coinbase', 'Kraken', 'KuCoin', 'Huobi', 'Bybit'];

  useEffect(() => {
    // Initial logs
    const initialLogs: TradeLog[] = Array.from({ length: 8 }).map(() => generateTrade());
    setLogs(initialLogs);

    // Live Feed Simulation
    const interval = setInterval(() => {
      const newTrade = generateTrade();
      setLogs(prev => [newTrade, ...prev.slice(0, 14)]); // Keep last 15
      setLatency(Math.floor(Math.random() * 20) + 10);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const generateTrade = (): TradeLog => {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const buyEx = exchanges[Math.floor(Math.random() * exchanges.length)];
    let sellEx = exchanges[Math.floor(Math.random() * exchanges.length)];
    while (sellEx === buyEx) sellEx = exchanges[Math.floor(Math.random() * exchanges.length)];
    
    const basePrice = pair.includes('BTC') ? 65000 : pair.includes('ETH') ? 3500 : 140;
    const variation = basePrice * 0.002;
    const buyPrice = basePrice + (Math.random() * variation - variation/2);
    const profit = buyPrice * (Math.random() * 0.008 + 0.001); // 0.1% to 0.9% profit per trade

    return {
      id: generateId(),
      pair,
      buyEx,
      sellEx,
      buyPrice,
      profit,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour12: false })
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Activity className="text-brand-500 animate-pulse" />
          {t(language, 'opsTitle')}
        </h1>
        <p className="text-slate-400">{t(language, 'opsSubtitle')}</p>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Globe className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-400 uppercase">{t(language, 'latency')}</p>
              <p className="text-lg font-mono font-bold text-white">{latency}ms <span className="text-xs text-green-500">● Stable</span></p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Server className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-400 uppercase">{t(language, 'activeBots')}</p>
              <p className="text-lg font-mono font-bold text-white">42/50 <span className="text-xs text-slate-500">Nodes</span></p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400"><Cpu className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-400 uppercase">{t(language, 'dailyVol')}</p>
              <p className="text-lg font-mono font-bold text-white">R$ 14.5M+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Terminal */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
           <Activity className="w-64 h-64 text-brand-500" />
        </div>
        
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs font-mono text-slate-500">user@investprime:~/hft_module/live_logs</span>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="text-xs uppercase text-slate-500 font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">{t(language, 'pair')}</th>
                <th className="py-3 px-4 text-center">{t(language, 'exchange')} (Buy)</th>
                <th className="py-3 px-4 text-center"></th>
                <th className="py-3 px-4 text-center">{t(language, 'exchange')} (Sell)</th>
                <th className="py-3 px-4 text-right">{t(language, 'profit')}</th>
                <th className="py-3 px-4 text-right">Hash</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-slate-800/50 hover:bg-white/5 transition-colors group animate-slideIn">
                  <td className="py-3 px-4 text-slate-300 font-bold">{log.pair}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs border border-red-500/20">{log.buyEx}</span>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600">
                    <ArrowRight className="w-4 h-4 mx-auto group-hover:text-brand-500 transition-colors" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs border border-green-500/20">{log.sellEx}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-brand-400 font-bold">
                    +R$ {log.profit.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-600 text-xs">
                    {log.id.toUpperCase()}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500 text-xs">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Graphic (Visual Only) */}
      <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
            <h3 className="text-white font-bold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-brand-500" />
                Arbitragem Triangular Detectada
            </h3>
            <p className="text-sm text-slate-400 max-w-md">
                O sistema detectou uma divergência de preço entre 3 pares de moedas (BTC-ETH-USDT) gerando uma oportunidade de lucro sem risco de exposição. Execução automática em 4ms.
            </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-white mb-2">BTC</div>
                <div className="h-8 w-px bg-slate-600"></div>
            </div>
            <div className="flex flex-col items-center">
                 <div className="h-px w-8 bg-brand-500 animate-pulse"></div>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-brand-500 flex items-center justify-center text-brand-400 mb-2 shadow-[0_0_10px_rgba(16,185,129,0.5)]">ETH</div>
                <div className="h-8 w-px bg-slate-600"></div>
            </div>
            <div className="flex flex-col items-center">
                 <div className="h-px w-8 bg-brand-500 animate-pulse"></div>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-white mb-2">USDT</div>
                <div className="h-8 w-px bg-slate-600"></div>
            </div>
        </div>
      </div>
    </div>
  );
};
