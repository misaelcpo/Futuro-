
import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Check, Globe, X } from 'lucide-react';
import { Language, Notification } from '../types';
import { t } from '../translations';
import { formatDate } from '../utils';
import { Logo } from './Logo';

interface TopBarProps {
  currentView: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  notifications: Notification[];
  markNotificationsAsRead: () => void;
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  currentView, 
  language, 
  setLanguage, 
  notifications,
  markNotificationsAsRead,
  onOpenMobileMenu
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [tickerItems, setTickerItems] = useState<string[]>([]);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const names = ["Carlos S.", "Ana M.", "Roberto J.", "Fernanda L.", "João P.", "Mariana G.", "Ricardo W.", "Beatriz H.", "Marcos T.", "Luana K."];
    const actions = [
      "acabou de sacar",
      "recebeu bônus de",
      "ganhou comissão de",
      "resgatou cashback de",
      "recebeu pagamento de"
    ];

    const generateInitialItems = () => {
      return Array.from({ length: 15 }).map(() => {
        const name = names[Math.floor(Math.random() * names.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const amount = (Math.random() * 2500 + 50).toFixed(2);
        return `${name} ${action} R$ ${parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
      });
    };

    setTickerItems(generateInitialItems());

    const interval = setInterval(() => {
      setTickerItems(prev => {
        const next = [...prev];
        const indexToReplace = Math.floor(Math.random() * next.length);
        const name = names[Math.floor(Math.random() * names.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const amount = (Math.random() * 1500 + 20).toFixed(2);
        next[indexToReplace] = `${name} ${action} R$ ${parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifMenu(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotifClick = () => {
    setShowNotifMenu(!showNotifMenu);
    if (!showNotifMenu && unreadCount > 0) {
      markNotificationsAsRead();
    }
  };

  const getPageTitle = (view: string) => {
    const map: Record<string, string> = {
      dashboard: t(language, 'dashboard'),
      marketplace: t(language, 'invest'),
      withdraw: t(language, 'withdraw'),
      network: t(language, 'network'),
      history: t(language, 'history'),
      profile: t(language, 'profile'),
      tasks: t(language, 'tasks'),
      transfer: t(language, 'transfer'),
      admin: t(language, 'admin'),
      verification: 'Nível KYC',
      guide: 'Regulamento'
    };
    return map[view] || view;
  };

  const languages = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="flex flex-col z-30 sticky top-0">
      <div className="bg-emerald-950/90 backdrop-blur-md border-b border-emerald-900/40 h-8 overflow-hidden relative flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-emerald-950 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-emerald-950 to-transparent z-10"></div>
        
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
          {tickerItems.map((item, i) => (
            <span key={i} className="text-[9px] font-bold text-emerald-400/80 flex items-center gap-2 uppercase tracking-widest">
              <div className="w-1 h-1 bg-brand-500 rounded-full"></div>
              {item}
            </span>
          ))}
          {tickerItems.map((item, i) => (
            <span key={`dup-${i}`} className="text-[9px] font-bold text-emerald-400/80 flex items-center gap-2 uppercase tracking-widest">
              <div className="w-1 h-1 bg-brand-500 rounded-full"></div>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-3 flex justify-between items-center lg:bg-transparent lg:border-b-0 lg:backdrop-blur-none">
        
        <div className="flex items-center gap-3">
          {/* Logo principal como trigger do menu mobile */}
          <button 
            onClick={onOpenMobileMenu}
            className="lg:hidden relative p-1 border border-brand-500/20 rounded-xl bg-slate-950/50 shadow-lg active:scale-90 transition-transform group"
            aria-label="Menu"
          >
             <Logo className="w-9 h-9" />
             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brand-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
          </button>
          
          <h2 className="text-lg md:text-xl font-black text-white tracking-tighter truncate max-w-[150px] md:max-w-none">
            {getPageTitle(currentView)}
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-xl border border-white/5 active:scale-95"
            >
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase hidden md:inline">{language}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-xs font-bold flex items-center hover:bg-white/5 transition-colors ${language === lang.code ? 'text-brand-400 bg-white/5' : 'text-slate-400'}`}
                  >
                    <span className="mr-3 text-base">{lang.flag}</span>
                    {lang.label}
                    {language === lang.code && <Check className="w-3 h-3 ml-auto text-brand-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={notifRef}>
            <button 
              onClick={handleNotifClick}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-800/50 rounded-xl border border-white/5 active:scale-95 transition-all"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-slate-950 text-[9px] font-black flex items-center justify-center rounded-full border-2 border-slate-900">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-[85vw] md:w-96 bg-slate-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up z-50">
                <div className="p-5 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">{t(language, 'notifications')}</h3>
                  <button onClick={() => setShowNotifMenu(false)} className="text-slate-500 hover:text-white"><X className="w-4 h-4" /></button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-10 text-center text-slate-600">
                      <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      <p className="text-xs font-bold uppercase tracking-widest">{t(language, 'noNotifications')}</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {[...notifications].reverse().map((notif) => (
                        <div key={notif.id} className={`p-5 hover:bg-white/[0.02] transition-colors ${!notif.read ? 'bg-white/[0.01]' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`text-xs font-black uppercase tracking-tight ${
                              notif.type === 'success' ? 'text-brand-400' : 
                              notif.type === 'warning' ? 'text-amber-400' : 'text-indigo-400'
                            }`}>
                              {notif.title}
                            </h4>
                            <span className="text-[9px] text-slate-600 font-mono">{formatDate(notif.date)}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-snug">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
