import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Check, Globe, X, Menu, TrendingUp } from 'lucide-react';
import { Language, Notification } from '../types';
import { t } from '../translations';
import { formatDate } from '../utils';

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
  
  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Click outside to close dropdowns
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
      invest: t(language, 'invest'),
      withdraw: t(language, 'withdraw'),
      network: t(language, 'network'),
      history: t(language, 'history'),
      profile: t(language, 'profile'),
      tasks: t(language, 'tasks'),
    };
    return map[view] || view;
  };

  const languages = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  // Mock data for the ticker
  const tickerItems = [
    "Carlos S. acabou de sacar R$ 1.250,00",
    "Ana M. investiu R$ 5.000,00 no Pool HFT",
    "Roberto J. recebeu R$ 345,00 de comissão",
    "Fernanda L. sacou R$ 890,00 via PIX",
    "Pool de Arbitragem atingiu 13.5% de lucro hoje",
    "João P. ativou o plano VIP",
    "Mariana G. investiu R$ 2.500,00",
  ];

  return (
    <div className="flex flex-col z-20 relative">
      {/* Social Proof Ticker */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/50 h-8 overflow-hidden relative flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 hidden md:block"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 hidden md:block"></div>
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-4">
          {tickerItems.map((item, i) => (
            <span key={i} className="text-xs font-medium text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> {item}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {tickerItems.map((item, i) => (
            <span key={`dup-${i}`} className="text-xs font-medium text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> {item}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700/60 sticky top-0 px-4 md:px-6 py-4 flex justify-between items-center mb-6 rounded-b-xl lg:rounded-none lg:bg-transparent lg:border-b-0 lg:static">
        
        {/* Mobile Menu Trigger & Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 -ml-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <h2 className="text-xl font-bold text-white tracking-tight">
            {getPageTitle(currentView)}
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-slate-800/80 p-2 rounded-lg border border-slate-700/50"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium uppercase hidden md:inline">{language}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden animate-slideIn origin-top-right z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center hover:bg-slate-700 transition-colors ${language === lang.code ? 'text-brand-400 bg-slate-700/50' : 'text-slate-300'}`}
                  >
                    <span className="mr-3 text-lg">{lang.flag}</span>
                    {lang.label}
                    {language === lang.code && <Check className="w-3 h-3 ml-auto" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={handleNotifClick}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-pulse border-2 border-slate-900 shadow-lg shadow-red-500/50">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-slideIn origin-top-right z-50">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-semibold text-white">{t(language, 'notifications')}</h3>
                  <button 
                    onClick={() => setShowNotifMenu(false)}
                    className="text-slate-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">{t(language, 'noNotifications')}</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-700/50">
                      {[...notifications].reverse().map((notif) => (
                        <div key={notif.id} className={`p-4 hover:bg-slate-700/30 transition-colors ${!notif.read ? 'bg-slate-700/20' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`text-sm font-medium ${
                              notif.type === 'success' ? 'text-green-400' : 
                              notif.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                            }`}>
                              {notif.title}
                            </h4>
                            <span className="text-[10px] text-slate-500">{formatDate(notif.date)}</span>
                          </div>
                          <p className="text-sm text-slate-300 leading-snug">{notif.message}</p>
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