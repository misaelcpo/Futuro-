
import React, { useState } from 'react';
import { ShieldCheck, FileText, Camera, CheckCircle, AlertCircle, Loader2, Zap } from 'lucide-react';
import { AppData, VerificationStatus } from '../types';

export const Verification: React.FC<{ data: AppData, updateStatus: (s: VerificationStatus) => void }> = ({ data, updateStatus }) => {
  const [loading, setLoading] = useState(false);
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateStatus(VerificationStatus.PENDING);
      setStep(3);
    }, 2000);
  };

  const handleSimulateInstantVerify = () => {
    setSimulateLoading(true);
    setTimeout(() => {
      setSimulateLoading(false);
      updateStatus(VerificationStatus.VERIFIED);
      // O componente irá remontar automaticamente pois data.user.verificationStatus mudará
    }, 1500);
  };

  if (data.user.verificationStatus === VerificationStatus.VERIFIED) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-8 animate-slideIn">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-brand-500 blur-2xl opacity-20 animate-pulse"></div>
          <div className="w-24 h-24 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-brand-500/50 relative z-10">
            <ShieldCheck className="w-12 h-12 text-brand-500" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-white">Você é Verificado!</h1>
          <p className="text-slate-400 text-lg">Seu perfil possui o selo de confiança e seus serviços têm prioridade máxima no marketplace CityService.</p>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 inline-block">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 bg-brand-500 text-slate-950 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-brand-400 uppercase tracking-widest">Status da Conta</p>
              <p className="text-white font-bold">Verificação Vitalícia Ativa</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-slideIn">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-white">Segurança e Confiança</h1>
        <p className="text-slate-400 font-medium italic">Para trabalhar em nossa rede de elite, validamos sua identidade e histórico profissional.</p>
      </header>

      <div className="glass-panel p-8 rounded-[2.5rem] space-y-10 border-white/5">
        <div className="flex justify-between relative px-4">
          <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-800 -z-10"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all relative z-10 ${step >= i ? 'bg-brand-500 border-brand-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
              {i}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-slideIn">
            <div className="space-y-2">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FileText className="text-brand-400 w-5 h-5" /> Documento de Identidade
              </h2>
              <p className="text-sm text-slate-400 font-medium">Capture uma imagem nítida da frente e do verso do seu documento oficial (RG ou CNH).</p>
            </div>
            
            <div className="border-2 border-dashed border-slate-800 rounded-3xl h-56 flex flex-col items-center justify-center gap-4 hover:border-brand-500 transition-all cursor-pointer group bg-slate-950/30">
              <div className="p-4 bg-slate-900 rounded-2xl group-hover:bg-brand-500/10 transition-colors">
                <Camera className="w-10 h-10 text-slate-600 group-hover:text-brand-400" />
              </div>
              <span className="text-[10px] font-black text-slate-500 group-hover:text-brand-400 uppercase tracking-[0.2em]">Upload do Documento</span>
            </div>
            
            <button onClick={() => setStep(2)} className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-[0.98]">
              Próximo Passo
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-slideIn">
            <div className="space-y-2">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <ShieldCheck className="text-indigo-400 w-5 h-5" /> Antecedentes Criminais
              </h2>
              <p className="text-sm text-slate-400 font-medium">Anexe sua certidão negativa para garantir a integridade da nossa comunidade.</p>
            </div>

            <div className="bg-indigo-500/5 p-5 rounded-2xl border border-indigo-500/10 flex items-start gap-4">
               <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                 <AlertCircle className="w-5 h-5" />
               </div>
               <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                 Este processo é auditado e garante que você receba o selo <span className="text-indigo-400 font-bold">Premium Provider</span>. Seus dados são protegidos por criptografia de ponta.
               </p>
            </div>

            <div className="border-2 border-dashed border-slate-800 rounded-3xl h-56 flex flex-col items-center justify-center gap-4 hover:border-indigo-500 transition-all cursor-pointer bg-slate-950/30 group">
              <div className="p-4 bg-slate-900 rounded-2xl group-hover:bg-indigo-500/10 transition-colors">
                <FileText className="w-10 h-10 text-slate-600 group-hover:text-indigo-400" />
              </div>
              <span className="text-[10px] font-black text-slate-500 group-hover:text-indigo-400 uppercase tracking-[0.2em]">Anexar Certidão (PDF)</span>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-900 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-white border border-white/5 transition-all">Voltar</button>
                <button onClick={handleSubmit} className="flex-[2] py-4 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Finalizar e Enviar'}
                </button>
              </div>

              {/* Botão de Simulação Requisitado pelo Usuário */}
              <button 
                onClick={handleSimulateInstantVerify}
                disabled={simulateLoading}
                className="w-full py-4 bg-brand-500/10 text-brand-400 border border-brand-500/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2 group"
              >
                {simulateLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" /> Simular Aprovação Instantânea
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10 space-y-8 animate-slideIn">
            <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto border border-amber-500/20">
              <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-white">Análise em Andamento</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">Nossa equipe de segurança processará seus documentos em até 24 horas. Você receberá uma notificação via e-mail e app.</p>
            </div>
            <button onClick={() => window.location.hash = '#dashboard'} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest border border-white/5 hover:bg-slate-800 transition-all">Voltar ao Painel</button>
          </div>
        )}
      </div>
    </div>
  );
};
