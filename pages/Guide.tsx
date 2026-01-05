
import React from 'react';
import { HelpCircle, Zap, TrendingUp, Users, ShieldCheck, ArrowRight, DollarSign, Gem } from 'lucide-react';

export const Guide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-slideIn pb-20">
      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-brand-500/10 rounded-2xl text-brand-500 mb-2">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-white">Como eu ganho dinheiro?</h1>
        <p className="text-slate-400 text-lg">Entenda o ecossistema CityService em 4 pilares simples.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Pilar 1: Prestador */}
        <section className="glass-card p-8 rounded-3xl border-l-4 border-l-brand-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-4">1. Para quem Trabalha</h2>
              <div className="space-y-2">
                <span className="px-3 py-1 bg-brand-500/20 text-brand-400 text-[10px] font-black rounded-full uppercase">Ganho Imediato</span>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Como prestador, você define seu preço. Ao concluir um serviço, <strong>90% do valor</strong> cai no seu saldo na hora. Os outros 10% financiam a infraestrutura e segurança da CityService.
              </p>
            </div>
          </div>
        </section>

        {/* Pilar 2: Cliente */}
        <section className="glass-card p-8 rounded-3xl border-l-4 border-l-blue-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp className="w-32 h-32 text-blue-500" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-4">2. Para quem Contrata</h2>
              <div className="space-y-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded-full uppercase">Economia Circular</span>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Cada serviço gera um <strong>Cashback de 5% a 15%</strong>. Esse valor é acumulado no Fundo de Cashback, que gera bônus mensais para você usar como quiser.
              </p>
            </div>
          </div>
        </section>

        {/* Pilar 3: Investidor/Afiliado */}
        <section className="glass-card p-8 rounded-3xl border-l-4 border-l-purple-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Users className="w-32 h-32 text-purple-500" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-4">3. Para quem Indica</h2>
              <div className="space-y-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-black rounded-full uppercase">Renda Passiva</span>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Indique novos membros e ganhe <strong>2% de comissão</strong> sobre o volume de transações que eles gerarem. O dinheiro cai direto no saldo disponível.
              </p>
            </div>
          </div>
        </section>

        {/* Pilar 4: O Criador (Transparência) */}
        <section className="glass-card p-8 rounded-3xl border-l-4 border-l-emerald-500 bg-emerald-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Gem className="w-32 h-32 text-emerald-500" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-4">4. Sustentabilidade</h2>
              <div className="space-y-2">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-full uppercase">Plataforma</span>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-slate-300 leading-relaxed">
                A CityService retém uma <strong>taxa de administração de 10%</strong> em cada serviço. Esse lucro é reinvestido em marketing para trazer mais clientes para os prestadores e garantir a segurança das transações em custódia.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gradient-to-br from-brand-600 to-emerald-700 p-8 rounded-3xl text-center space-y-6">
        <h3 className="text-2xl font-black text-white italic">"Um sistema onde todos os participantes são remunerados pelo valor que geram."</h3>
        <button onClick={() => window.location.hash = '#dashboard'} className="px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
          ACESSAR MINHA CONTA <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
