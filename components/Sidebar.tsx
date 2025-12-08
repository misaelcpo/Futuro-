import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  Users, 
  History, 
  UserCircle, 
  LogOut,
  MessageCircle,
  ClipboardCheck,
  MonitorPlay,
  ArrowRightLeft,
  ShieldAlert
} from 'lucide-react';
import { Language, UserState } from '../types';
import { t } from '../translations';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  language: Language;
  onLogout?: () => void;
  user?: UserState; // Need user to check isAdmin
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  isMobileOpen, 
  setIsMobileOpen, 
  language,
  onLogout,
  user
}) => {
  
  const menuItems = [
    { id: 'dashboard', label: t(language, 'dashboard'), icon: LayoutDashboard },
    { id: 'operations', label: t(language, 'operations'), icon: MonitorPlay },
    { id: 'tasks', label: t(language, 'tasks'), icon: ClipboardCheck },
    { id: 'transfer', label: t(language, 'transfer'), icon: ArrowRightLeft },
    { id: 'invest', label: t(language, 'invest'), icon: TrendingUp },
    { id: 'withdraw', label: t(language, 'withdraw'), icon: Wallet },
    { id: 'network', label: t(language, 'network'), icon: Users },
    { id: 'history', label: t(language, 'history'), icon: History },
    { id: 'profile', label: t(language, 'profile'), icon: UserCircle },
  ];

  if (user?.isAdmin) {
    menuItems.push({ id: 'admin', label: t(language, 'admin'), icon: ShieldAlert });
  }

  const handleNav = (viewId: string) => {
    setCurrentView(viewId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <TrendingUp className="w-8 h-8 text-brand-500 mr-2" />
            <span className="text-xl font-bold text-white tracking-wide">Invest<span className="text-brand-500">Prime</span></span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`
                  w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors
                  ${currentView === item.id 
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                    : item.id === 'admin' ? 'text-red-400 hover:bg-red-500/10' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <item.icon className={`w-5 h-5 mr-3 ${currentView === item.id ? 'text-brand-400' : item.id === 'admin' ? 'text-red-500' : 'text-slate-500'}`} />
                {item.label}
              </button>
            ))}
            
            {/* WhatsApp Group Link - External */}
            <a 
              href="https://chat.whatsapp.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium text-green-400 hover:bg-slate-800 transition-colors mt-4"
            >
              <MessageCircle className="w-5 h-5 mr-3 text-green-500" />
              {t(language, 'whatsapp')}
            </a>
          </nav>

          {/* User Footer */}
          <div className="p-4 border-t border-slate-800">
            <button 
              onClick={onLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              {t(language, 'logout')}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};