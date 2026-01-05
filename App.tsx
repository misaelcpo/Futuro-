
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { Marketplace } from './pages/Marketplace';
import { Verification } from './pages/Verification';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { Guide } from './pages/Guide';
import { Withdraw } from './pages/Withdraw';
import { History } from './pages/History';
import { Network } from './pages/Network';
import { Tasks } from './pages/Tasks';
import { Transfer } from './pages/Transfer';
import { LandingPage } from './pages/LandingPage';
import { AppData, UserRole, UserTier, VerificationStatus, TransactionType, ActivePackage, Transaction, Notification } from './types';
import { generateId, formatCurrency } from './utils';
import { Toast } from './components/Toast';

const STORAGE_KEY = 'mining_data_v2';
const AUTH_KEY = 'mining_auth_v2';

const INITIAL_STATE: AppData = {
  user: {
    id: 'u0',
    role: UserRole.CLIENT,
    tier: UserTier.BASIC,
    name: 'Operador Alpha',
    email: 'admin@miningprime.vc',
    phone: '(11) 98877-6655',
    city: 'Terminal Alpha',
    balance: 50.00,
    investedCashback: 100.00, 
    totalInvested: 1000,
    totalCashbackEarned: 15.20,
    verificationStatus: VerificationStatus.NOT_SUBMITTED,
    rating: 5.0,
    status: 'ACTIVE',
    pixKey: 'admin@miningprime.vc',
    adminRevenue: 250.00,
    sessionProfit: 0,
    protectionEnabled: true,
    referralCode: 'PRIME-X88',
    networkVolume: 5000,
    unlockedMilestones: ['m1'],
    guildMultiplier: 1.0,
    activePackages: [
      { id: 'p_init', name: 'Bronze Node', amount: 1000, hashrate: 100, dailyYield: 12.00, date: new Date().toISOString() }
    ],
    lastClaimDate: null,
    lastYieldSync: new Date().toISOString()
  },
  allUsers: [],
  notifications: [
    { id: 'n1', title: 'Mainframe Ativo', message: 'Sua RIG inicial está online e processando blocos.', date: new Date().toISOString(), read: false, type: 'success' }
  ],
  language: 'pt',
  transactions: [],
  systemConfig: {
    withdrawalsEnabled: true,
    minWithdraw: 10.00,
    globalYieldMultiplier: 1.0
  },
  platformStats: {
    totalVolume: 12540200.00,
    activeUsers: 3840,
    insuranceFund: 850200.00,
    reserveRatio: 2.1,
    livePayouts: []
  },
  referrals: []
};

function App() {
  const [showLanding, setShowLanding] = useState<boolean>(() => !localStorage.getItem(AUTH_KEY));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem(AUTH_KEY) === 'true');
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'dashboard';
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; subMessage?: string } | null>(null);
  const lastSyncRef = useRef<string>(data.user.lastYieldSync || new Date().toISOString());

  // Sincronização de Navegação
  useEffect(() => {
    window.location.hash = currentView;
  }, [currentView]);

  // Persistência
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // MOTOR DE CATCH-UP (Calcula lucro enquanto offline)
  useEffect(() => {
    if (!isAuthenticated || data.user.activePackages.length === 0) return;

    const now = new Date();
    const lastSync = new Date(lastSyncRef.current);
    const secondsDiff = Math.floor((now.getTime() - lastSync.getTime()) / 1000);

    if (secondsDiff > 5) { // Se passou mais de 5 segundos desde o último tick gravado
      const dailyTotal = data.user.activePackages.reduce((acc, p) => acc + p.dailyYield, 0);
      const yieldPerSecond = (dailyTotal / 86400) * data.systemConfig.globalYieldMultiplier;
      const offlineProfit = yieldPerSecond * secondsDiff;

      if (offlineProfit > 0.01) {
        setData(prev => ({
          ...prev,
          user: {
            ...prev.user,
            balance: prev.user.balance + offlineProfit,
            totalCashbackEarned: prev.user.totalCashbackEarned + offlineProfit,
            lastYieldSync: now.toISOString()
          }
        }));
        setToast({ 
          message: 'Rendimentos Acumulados!', 
          subMessage: `Você minerou ${formatCurrency(offlineProfit)} enquanto estava fora.` 
        });
      }
    }
  }, [isAuthenticated]);

  // Real-time Yield Tick (A cada 1 segundo)
  useEffect(() => {
    if (!isAuthenticated || data.user.role === UserRole.ADMIN) return;
    
    const interval = setInterval(() => {
      setData(prev => {
        if (prev.user.activePackages.length === 0) return prev;
        
        const totalYieldPerSecond = prev.user.activePackages.reduce((acc, pkg) => {
          return acc + (pkg.dailyYield / 86400);
        }, 0) * prev.systemConfig.globalYieldMultiplier;
        
        const now = new Date().toISOString();
        lastSyncRef.current = now; // Atualiza referência local para evitar loops

        return {
          ...prev,
          user: {
            ...prev.user,
            balance: prev.user.balance + totalYieldPerSecond,
            totalCashbackEarned: prev.user.totalCashbackEarned + totalYieldPerSecond,
            lastYieldSync: now
          }
        };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated, data.systemConfig.globalYieldMultiplier, data.user.activePackages.length]);

  const addTransaction = useCallback((type: TransactionType, amount: number, description: string) => {
    const newTx: Transaction = {
      id: 'TX-' + generateId().toUpperCase(),
      type,
      amount,
      description,
      date: new Date().toISOString(),
      status: 'COMPLETED'
    };
    setData(prev => ({
      ...prev,
      transactions: [newTx, ...prev.transactions].slice(0, 50)
    }));
  }, []);

  const handleLogin = (email: string, role: UserRole) => {
    setData(prev => ({ 
      ...prev, 
      user: { ...prev.user, email, role: email === 'admin@miningprime.vc' ? UserRole.ADMIN : UserRole.CLIENT, name: email.split('@')[0], lastYieldSync: new Date().toISOString() } 
    }));
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_KEY, 'true');
    setShowLanding(false);
    setCurrentView('dashboard');
  };

  const handleInvest = (amount: number, name: string) => {
    setData(prev => {
      const yieldRate = amount >= 15000 ? 0.032 : (amount >= 5000 ? 0.025 : 0.018);
      const newPackage: ActivePackage = {
        id: generateId(),
        name,
        amount,
        hashrate: amount / 10,
        dailyYield: amount * yieldRate,
        date: new Date().toISOString()
      };
      
      return {
        ...prev,
        user: { 
          ...prev.user, 
          balance: prev.user.balance - (prev.user.balance >= amount ? amount : 0),
          investedCashback: prev.user.investedCashback + (amount / 10),
          totalInvested: prev.user.totalInvested + amount,
          activePackages: [...prev.user.activePackages, newPackage]
        }
      };
    });
    addTransaction(TransactionType.DEPOSIT, amount, `Ativação de RIG: ${name}`);
    setToast({ message: 'Hardware Ativado!', subMessage: 'Sua RIG já está sincronizada com a pool.' });
  };

  const handleWithdraw = (type: TransactionType, amount: number) => {
    setData(prev => ({ ...prev, user: { ...prev.user, balance: prev.user.balance - amount } }));
    addTransaction(type, amount, 'Resgate PIX solicitado');
    setToast({ message: 'Saque Solicitado', subMessage: 'Aguarde a confirmação na blockchain.' });
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard data={data} setView={setCurrentView} />;
      case 'marketplace': return <Marketplace data={data} onInvest={handleInvest} />;
      case 'withdraw': return <Withdraw handleTransaction={handleWithdraw} user={data.user} />;
      case 'history': return <History transactions={data.transactions} />;
      case 'profile': return <Profile user={data.user} updateUser={(u) => setData(p => ({...p, user: {...p.user, ...u}}))} onNavigate={setCurrentView} />;
      case 'network': return <Network data={data} onClaimMilestone={() => {}} />;
      case 'tasks': return <Tasks lastClaimDate={data.user.lastClaimDate || null} onClaim={() => {}} />;
      case 'transfer': return <Transfer language={data.language} currentUser={data.user} onTransfer={() => {}} />;
      case 'verification': return <Verification data={data} updateStatus={(s) => setData(p => ({...p, user: {...p.user, verificationStatus: s}}))} />;
      case 'guide': return <Guide />;
      case 'admin': return (
        <Admin 
          language={data.language} 
          currentUser={data.user} 
          allUsers={data.allUsers} 
          systemConfig={data.systemConfig}
          onUpdateUser={(id, up) => setData(p => ({...p, allUsers: p.allUsers.map(u => u.id === id ? {...u, ...up} : u)}))}
          onDistributeYield={(p) => setToast({ message: `Yield Distribuído: ${p}%` })}
          onToggleWithdrawals={() => setData(p => ({...p, systemConfig: {...p.systemConfig, withdrawalsEnabled: !p.systemConfig.withdrawalsEnabled}}))}
        />
      );
      default: return <Dashboard data={data} setView={setCurrentView} />;
    }
  };

  if (showLanding && !isAuthenticated) return <LandingPage onEnter={() => setShowLanding(false)} />;
  if (!isAuthenticated) return <Auth onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30 overflow-hidden flex flex-col">
      <Sidebar 
        role={data.user.role} 
        currentView={currentView} 
        setView={setCurrentView} 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
        onLogout={() => { setIsAuthenticated(false); localStorage.removeItem(AUTH_KEY); setShowLanding(true); }} 
      />
      <div className="flex flex-col flex-1 lg:pl-64 overflow-hidden">
        <TopBar 
          currentView={currentView} 
          language={data.language} 
          setLanguage={(l) => setData(p => ({...p, language: l}))} 
          notifications={data.notifications} 
          markNotificationsAsRead={() => setData(p => ({...p, notifications: p.notifications.map(n => ({...n, read: true}))}))} 
          onOpenMobileMenu={() => setIsMobileOpen(true)} 
        />
        <main className="flex-1 overflow-y-auto pb-safe">
          <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            {renderView()}
          </div>
        </main>
      </div>
      {toast && <Toast message={toast.message} subMessage={toast.subMessage} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
