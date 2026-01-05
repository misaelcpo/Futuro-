
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Bitcoin, 
  MessageCircle, 
  CheckCircle2,
  TrendingUp,
  Lock,
  Layers,
  Database,
  Trophy,
  Activity,
  ArrowUpRight,
  Server,
  Network as NetworkIcon,
  Sparkles,
  Users,
  BarChart3,
  Timer,
  Info,
  ShieldAlert
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { formatCurrency } from '../utils';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [calcAmount, setCalcAmount] = useState(5000);
  const [nodesLeft, setNodesLeft] = useState({ bronze: 42, silver: 12, gold: 4, black: 2 });
  const [livePayouts, setLivePayouts] = useState<{name: string, val: string}[]>([]);

  // Simulação de Prova Social Dinâmica
  useEffect(() => {
    const names = ["Marcos S.", "Julia C.", "Roberto J.", "Fernanda L.", "João P.", "Mariana G.", "Ricardo W.", "Beatriz H."];
    const updatePayouts = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const val = (Math.random() * 0.05 + 0.0001).toFixed(4);
      setLivePayouts(prev => [{name, val}, ...prev].slice(0, 3));
    };
    const interval = setInterval(updatePayouts, 5000);
    updatePayouts();
    return () => clearInterval(interval);
  }, []);

  const getYield = (amt: number) => {
    if (amt >= 50000) return 0.040;
    if (amt >= 15000) return 0.032;
    if (amt >= 5000) return 0.025;
    if (amt >= 1000) return 0.018;
    return 0.012;
  };

  const dailyReturn = calcAmount * getYield(calcAmount);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30 overflow-x-hidden">
      {/* Feed de Pagamentos Flutuante (Prova Social Extrema) */}
      <div className="fixed bottom-10 left-6 z-[100] space-y-3 hidden md:block">
        {livePayouts.map((p, i) => (
          <div key={i} className="glass-panel p-4 rounded-2xl border-emerald-500/20 bg-emerald-500/5 flex items-center gap-4 animate-slide-up shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest">
              {p.name} <span className="text-emerald-400">recebeu {p.val} BTC</span>
            </p>
          </div>
        ))}
      </div>

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-500/10 blur-[150px] rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Premium Nav */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-slate-950/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-orange-500 transition-all">
              <Logo className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                Mining<span className="text-orange-500">Prime</span>
              </span>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">Institutional</span>
            </div>
          </div>
          
          <button 
            onClick={onEnter} 
            className="group relative px-8 py-3.5 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
          >
            Acessar Terminal <ArrowUpRight className="inline w-4 h-4 ml-2" />
          </button>
        </div>
      </nav>

      {/* Hero Section + ROI Calculator */}
      <section className="relative pt-44 pb-32 px-6 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-7 space-y-12 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl px-6 py-2.5 rounded-full border border-emerald-500/20 shadow-2xl">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Pool de Mineração Sincronizada</span>
            </div>
            
            <h1 className="text-5xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85]">
              CULTIVE SEUS <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 italic">SATOSHIS.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto lg:mx-0 text-slate-400 text-lg md:text-2xl font-medium leading-tight opacity-80">
              A maior infraestrutura de cloud mining SHA-256 da América Latina. Alugue hashrate real e receba dividendos em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button onClick={onEnter} className="w-full sm:w-auto px-12 py-8 bg-orange-500 text-slate-950 font-black rounded-[2rem] text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_-10px_rgba(247,147,26,0.4)] hover:scale-105 transition-all">
                COMEÇAR AGORA
              </button>
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center font-black text-[10px]">{i}K</div>)}
                <div className="pl-6 flex flex-col justify-center">
                   <p className="text-[10px] font-black text-white uppercase">+3.800 Mineradores</p>
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-3 h-3 text-yellow-500 fill-current" />)}
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Calculator Component (CONVERSION ENGINE) */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-10 rounded-[4rem] border-white/10 bg-slate-900/50 shadow-2xl relative group overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full"></div>
               
               <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-white uppercase tracking-tight italic">Simulador de Lucro</h3>
                    <TrendingUp className="text-orange-500 w-6 h-6" />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aporte de Hardware (BRL)</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xl">R$</span>
                      <input 
                        type="number" 
                        value={calcAmount}
                        onChange={(e) => setCalcAmount(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-white/5 rounded-[1.5rem] py-6 pl-16 pr-6 text-3xl font-black text-white font-mono outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950/80 p-6 rounded-3xl border border-white/5">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Lucro Dia</p>
                      <p className="text-2xl font-black text-emerald-400 font-mono">{formatCurrency(dailyReturn)}</p>
                    </div>
                    <div className="bg-slate-950/80 p-6 rounded-3xl border border-white/5">
                      <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Lucro Mês</p>
                      <p className="text-2xl font-black text-white font-mono">{formatCurrency(dailyReturn * 30)}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-center gap-3">
                    <Info className="w-4 h-4 text-orange-500" />
                    <p className="text-[10px] text-slate-400 font-medium">Sua taxa de hashrate será de <span className="text-white">{(getYield(calcAmount)*100).toFixed(1)}% ao dia</span>.</p>
                  </div>

                  <button onClick={onEnter} className="w-full py-6 bg-white text-slate-950 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl hover:bg-orange-500 transition-all">
                    ATIVAR ESSE RENDIMENTO
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Comparison Section */}
      <section className="py-32 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h3 className="text-xs font-black text-orange-500 uppercase tracking-[0.4em]">Comparison Engine</h3>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">POR QUE SOMOS <br/> <span className="text-slate-500 italic">IMBATÍVEIS.</span></h2>
            <div className="space-y-4">
              {[
                "Saque instantâneo via PIX (Sem carência)",
                "Transparência total na pool via Blockchain",
                "Hardware real localizado no Paraguai (Energia Barata)",
                "Seguro de custódia contra volatilidade extrema"
              ].map((txt, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-300 font-bold">
                  <div className="w-6 h-6 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  {txt}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[3.5rem] overflow-hidden border-white/5 bg-slate-950">
             <table className="w-full text-left">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase">Recurso</th>
                    <th className="px-8 py-6 text-[10px] font-black text-orange-500 uppercase">MiningPrime</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase">Outros</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { f: "Rendimento", p: "Até 4.0%", o: "0.5% - 1%" },
                    { f: "Tempo de Saque", p: "Instantâneo", o: "7-15 dias" },
                    { f: "Taxa de Rede", p: "0%", o: "Até 15%" },
                    { f: "Hardware", p: "Próprio (ASIC)", o: "Terceirizado" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.01]">
                      <td className="px-8 py-6 text-sm font-bold text-slate-400">{row.f}</td>
                      <td className="px-8 py-6 text-sm font-black text-white">{row.p}</td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-600">{row.o}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>
      </section>

      {/* Nodes Availability (Urgency Section) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-xs font-black text-orange-500 uppercase tracking-[0.4em]">Pool Availability</h2>
            <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter">Níveis de <span className="text-orange-500">Hashrate.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Bronze Node', yield: '1.2%', icon: '🥉', nodes: nodesLeft.bronze, color: 'orange' },
              { name: 'Silver Rig', yield: '1.8%', icon: '🥈', nodes: nodesLeft.silver, color: 'slate' },
              { name: 'Gold Cluster', yield: '2.5%', icon: '🥇', nodes: nodesLeft.gold, color: 'yellow' },
              { name: 'Black Enterprise', yield: '4.0%', icon: '🌑', nodes: nodesLeft.black, color: 'indigo' },
            ].map((tier, i) => (
              <div key={i} className="glass-panel p-10 rounded-[3.5rem] border-white/5 bg-slate-900/40 relative overflow-hidden group hover:border-orange-500 transition-all">
                <div className="flex justify-between items-start mb-10">
                   <div className="text-5xl">{tier.icon}</div>
                   <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full border border-red-500/20">
                      <Timer className="w-3 h-3" />
                      <span className="text-[10px] font-black uppercase">Últimos {tier.nodes}</span>
                   </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-white tracking-tight">{tier.name}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Até {tier.yield} / Dia</p>
                </div>
                <button onClick={onEnter} className="w-full mt-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-orange-500 group-hover:text-slate-950 transition-all">
                   ATIVAR CONTRATO
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guild Section (Network Power) */}
      <section className="py-40 px-6 bg-orange-500 relative overflow-hidden group">
        <div className="absolute inset-0 bg-slate-950 translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-in-out"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <div className="inline-flex items-center gap-3 bg-slate-950/20 px-6 py-2 rounded-full border border-black/10 group-hover:bg-orange-500/10 group-hover:border-orange-500/20">
                <NetworkIcon className="w-4 h-4 text-slate-950 group-hover:text-orange-500" />
                <span className="text-[10px] font-black text-slate-950 group-hover:text-orange-500 uppercase tracking-[0.3em]">Guild Master Protocol</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-slate-950 group-hover:text-white tracking-tighter leading-none">LIDERE SUA <br/> <span className="italic">GUILDA.</span></h2>
              <p className="text-xl md:text-2xl font-bold text-slate-800 group-hover:text-slate-500 leading-tight">Ganhe comissões sobre cada TH/s alugado pelos membros da sua rede em até 3 níveis.</p>
              
              <div className="grid grid-cols-3 gap-6">
                {[
                  {l: 'L1', p: '12%'}, {l: 'L2', p: '5%'}, {l: 'L3', p: '3%'}
                ].map((lv, i) => (
                  <div key={i} className="bg-slate-950 p-6 rounded-3xl border border-white/5">
                     <p className="text-[10px] font-black text-slate-600 uppercase mb-2">{lv.l}</p>
                     <p className="text-3xl font-black text-orange-500 font-mono">{lv.p}</p>
                  </div>
                ))}
              </div>

              <button onClick={onEnter} className="px-16 py-8 bg-slate-950 text-white group-hover:bg-orange-500 group-hover:text-slate-950 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl transition-all">
                 CRIAR MINHA REDE
              </button>
           </div>
           
           <div className="relative lg:block hidden">
              <div className="glass-panel p-10 rounded-[4rem] border-white/10 bg-slate-900/50 shadow-2xl animate-float-slow">
                 <div className="space-y-10">
                    <div className="flex justify-between items-center">
                       <h4 className="text-sm font-black text-white uppercase tracking-widest">Network Live Pulse</h4>
                       <Sparkles className="text-orange-500 w-6 h-6" />
                    </div>
                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl"></div>
                          <div className="flex-1 space-y-2">
                             <div className="w-1/2 h-2 bg-slate-800 rounded-full"></div>
                             <div className="w-3/4 h-2 bg-slate-800/50 rounded-full"></div>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl"></div>
                          <div className="flex-1 space-y-2">
                             <div className="w-2/3 h-2 bg-slate-800 rounded-full"></div>
                             <div className="w-1/2 h-2 bg-slate-800/50 rounded-full"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 blur-[80px] rounded-full"></div>
           </div>
        </div>
      </section>

      {/* Security & Footer */}
      <footer className="py-40 px-8 bg-slate-950 border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          <Logo className="w-20 h-20 mx-auto" />
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">O ALGORITMO <br/> <span className="text-orange-500">NÃO ESPERA.</span></h2>
          <p className="text-slate-500 text-lg md:text-2xl font-medium italic">Sua vaga no mainframe institucional está aberta. Ative seu hardware hoje.</p>
          
          <button onClick={onEnter} className="px-16 py-10 bg-white text-slate-950 rounded-[3rem] font-black text-sm md:text-lg uppercase tracking-[0.4em] shadow-2xl hover:bg-orange-500 transition-all">
            ENTRAR NO TERMINAL
          </button>

          <div className="pt-20 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-white uppercase tracking-widest">Segurança</p>
              <p className="text-[9px] font-bold text-slate-500">SSL 256-BIT C.A.</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-white uppercase tracking-widest">Blockchain</p>
              <p className="text-[9px] font-bold text-slate-500">P2P ENCRYPTED</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-white uppercase tracking-widest">Uptime</p>
              <p className="text-[9px] font-bold text-slate-500">99.9% MONITORING</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-white uppercase tracking-widest">Legal</p>
              <p className="text-[9px] font-bold text-slate-500">EST. 2024</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
