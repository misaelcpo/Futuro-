
import React from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Wallet,
  History,
  ArrowRightLeft,
  HelpCircle,
  Zap,
  LogOut,
  UserCircle,
  Users,
  Cpu,
  MessageCircle,
  X,
  ShieldAlert,
  Database,
  Lock,
  Settings
} from 'lucide-react';
import { UserRole } from '../types';
import { Logo } from './Logo';

interface SidebarProps {
  role: UserRole;
  currentView: string;
  setView: (v: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, currentView, setView, isMobileOpen, setIsMobileOpen, onLogout }) => {
  const isAdmin = role === UserRole.ADMIN;

  const adminMenu = [
    { section: 'Comando Central', items: [
      { id: 'dashboard', label: 'Dashboard Master', icon: ShieldAlert },
      { id: 'users', label: 'Gestão de Redes', icon: Users },
      { id: 'treasury', label: 'Tesouraria Global', icon: Database },
    ]},
    { section: 'Relatórios', items: [
      { id: 'history', label: 'Logs do Sistema', icon: History },
      { id: 'audit', label: 'Auditoria KYC', icon: Lock },
    ]},
    { section: 'Sistema', items: [
      { id: 'profile', label: 'Configurações', icon: Settings },
    ]}
  ];

  const clientMenu = [
    { section: 'Mainframe', items: [
      { id: 'dashboard', label: 'Console Miner', icon: LayoutDashboard },
      { id: 'marketplace', label: 'Hardware Shop', icon: Cpu },
      { id: 'network', label: 'Mining Guild', icon: Users },
    ]},
    { section: 'Tesouraria', items: [
      { id: 'withdraw', label: 'Saque BTC', icon: Wallet },
      { id: 'transfer', label: 'Mover Hashrate', icon: ArrowRightLeft },
      { id: 'history', label: 'Logs de Rede', icon: History },
    ]},
    { section: 'Operacional', items: [
      { id: 'profile', label: 'ID Minerador', icon: UserCircle },
      { id: 'verification', label: 'Selo de Confiança', icon: ShieldCheck },
      { id: 'guide', label: 'Protocolo Alpha', icon: HelpCircle },
    ]}
  ];

  const menuItems = isAdmin ? adminMenu : clientMenu;

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] lg:hidden animate-fadeIn" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}
      <aside className={`fixed top-0 left-0 z-[110] h-full w-[280px] md:w-64 bg-slate-900 border-r border-white/5 transition-all duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="h-28 flex items-center px-8 gap-3 group relative">
            <Logo className="w-10 h-10 relative z-10" />
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tighter">Mining<span className="text-orange-500">Prime</span></span>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{isAdmin ? 'Master Control' : 'Cloud Hashrate'}</span>
            </div>
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 py-4 px-4 space-y-8 overflow-y-auto scrollbar-hide">
            {menuItems.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">{section.section}</p>
                {section.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setView(item.id); setIsMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all group relative ${currentView === item.id 
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/10' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-slate-100'}`}
                  >
                    <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${currentView === item.id ? 'text-orange-400' : 'text-slate-500'}`} />
                    {item.label}
                    {currentView === item.id && (
                       <div className="absolute right-4 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]"></div>
                    )}
                  </button>
                ))}
              </div>
            ))}

            {!isAdmin && (
              <div className="space-y-1 pt-4">
                  <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Comunidade</p>
                  <a 
                    href="https://wa.me/5500000000000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold text-emerald-500 hover:bg-emerald-500/10 transition-all group"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                    Grupo VIP WhatsApp
                  </a>
              </div>
            )}
          </nav>

          <div className="p-4 border-t border-white/5 space-y-2">
             <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-4 text-[13px] font-bold text-red-500/80 hover:bg-red-500/10 rounded-2xl transition-all">
                <LogOut className="w-4 h-4" /> Desligar Sessão
             </button>
          </div>
        </div>
      </aside>
    </>
  );
};
