import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './pages/Dashboard';
import { Invest } from './pages/Invest';
import { Withdraw } from './pages/Withdraw';
import { Network } from './pages/Network';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Tasks } from './pages/Tasks';
import { Operations } from './pages/Operations';
import { Transfer } from './pages/Transfer';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { AppData, TransactionType, Transaction, UserState, Notification, Language } from './types';
import { generateId, formatCurrency } from './utils';
import { Toast } from './components/Toast';
import { WelcomeModal } from './components/WelcomeModal';

const INITIAL_STATE: AppData = {
  user: {
    balance: 0,
    activeCapital: 0,
    totalEarnings: 0,
    totalCommission: 0,
    pixKey: '',
    pixKeyType: 'CPF',
    name: 'Investidor',
    email: 'user@exemplo.com'
  },
  transactions: [],
  referrals: [],
  notifications: [],
  lastYieldDate: null,
  lastDailyTaskDate: null,
  language: 'pt',
};

// Commission Levels Configuration
const COMMISSION_RATES: Record<number, number> = {
  1: 0.12, // 12%
  2: 0.05, // 5%
  3: 0.03, // 3%
  4: 0.02, // 2%
  5: 0.01, // 1%
  6: 0.005, // 0.5%
  7: 0.005,
  8: 0.005,
  9: 0.005,
  10: 0.005,
};

function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // State Management with LocalStorage persistence
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('investPrimeData');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration for older data structure if needed
      if (!parsed.notifications) parsed.notifications = [];
      if (!parsed.language) parsed.language = 'pt';
      // Ensure referrals have level
      if (parsed.referrals) {
        parsed.referrals = parsed.referrals.map((r: any) => ({
          ...r,
          level: r.level || 1
        }));
      }
      return parsed;
    }
    return INITIAL_STATE;
  });

  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Toast State
  const [toast, setToast] = useState<{ message: string; subMessage?: string } | null>(null);

  // Welcome Modal State
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Check Authentication on Mount
  useEffect(() => {
    const authSession = localStorage.getItem('investPrimeAuth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Initial Load Effects for Modal
  useEffect(() => {
    if (!isAuthenticated) return;

    // Show welcome modal on first load of the session
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    
    // Logic: If user hasn't invested yet, we really want to push them.
    if (!hasSeenModal || data.user.activeCapital === 0) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
        sessionStorage.setItem('hasSeenWelcomeModal', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, data.user.activeCapital]);

  // Persist Data
  useEffect(() => {
    localStorage.setItem('investPrimeData', JSON.stringify(data));
  }, [data]);

  // Handle Login
  const handleLogin = (emailInput?: string, passwordInput?: string) => {
    localStorage.setItem('investPrimeAuth', 'true');
    setIsAuthenticated(true);

    // Check for Admin Credentials
    if (emailInput === 'admin@investprime.com' && passwordInput === 'admin') {
       setData(prev => ({
         ...prev,
         user: {
           ...prev.user,
           name: 'Administrador',
           email: 'admin@investprime.com',
           isAdmin: true
         }
       }));
       setToast({ message: 'Modo Administrador Ativado', subMessage: 'Acesso total ao sistema concedido.' });
       setCurrentView('admin');
    } else {
       setToast({ message: 'Login realizado com sucesso', subMessage: `Bem-vindo de volta, ${data.user.name}` });
    }
  };

  // Handle Register
  const handleRegister = (name: string, email: string) => {
    const updatedData = {
      ...data,
      user: {
        ...data.user,
        name,
        email,
        balance: 0,
        activeCapital: 0
      }
    };
    setData(updatedData);
    localStorage.setItem('investPrimeAuth', 'true');
    localStorage.setItem('investPrimeData', JSON.stringify(updatedData));
    setIsAuthenticated(true);
    setToast({ message: 'Conta criada com sucesso!', subMessage: 'Comece a investir agora.' });
  };

  const handleLogout = () => {
    localStorage.removeItem('investPrimeAuth');
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // Helper to add notification
  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const notif: Notification = {
      id: generateId(),
      title,
      message,
      date: new Date().toISOString(),
      read: false,
      type
    };
    return notif;
  };

  const markNotificationsAsRead = () => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true }))
    }));
  };

  const setLanguage = (lang: Language) => {
    setData(prev => ({ ...prev, language: lang }));
  };

  // Handle Transactions (Deposit, Withdraw)
  const handleTransaction = (type: TransactionType, amount: number) => {
    const newTx: Transaction = {
      id: generateId(),
      type,
      amount,
      date: new Date().toISOString(),
      description: type === TransactionType.DEPOSIT ? 'Investimento Realizado' : 'Solicitação de Saque',
      status: 'COMPLETED'
    };

    const notif = addNotification(
      type === TransactionType.DEPOSIT ? 'Depósito Confirmado' : 'Saque Solicitado',
      `O valor de ${formatCurrency(amount)} foi processado com sucesso.`,
      type === TransactionType.DEPOSIT ? 'success' : 'warning'
    );

    setData(prev => {
      const newUser = { ...prev.user };
      if (type === TransactionType.DEPOSIT) {
        newUser.activeCapital += amount;
      } else if (type === TransactionType.WITHDRAWAL) {
        newUser.balance -= amount;
      }

      return {
        ...prev,
        user: newUser,
        transactions: [...prev.transactions, newTx],
        notifications: [...prev.notifications, notif]
      };
    });
  };

  // Handle Daily Task Claim
  const handleClaimTask = () => {
    const today = new Date().toDateString();
    const lastClaim = data.lastDailyTaskDate ? new Date(data.lastDailyTaskDate).toDateString() : null;

    if (today === lastClaim) {
      setToast({ message: 'Tarefa já realizada!', subMessage: 'Volte amanhã para resgatar novamente.' });
      return;
    }

    const reward = 1.00;
    const newTx: Transaction = {
      id: generateId(),
      type: TransactionType.DAILY_TASK,
      amount: reward,
      date: new Date().toISOString(),
      description: 'Recompensa Diária: Check-in',
      status: 'COMPLETED'
    };

    const notif = addNotification(
      'Tarefa Diária',
      'Você resgatou R$ 1,00 pelo check-in diário.',
      'success'
    );

    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        balance: prev.user.balance + reward,
        totalEarnings: prev.user.totalEarnings + reward
      },
      transactions: [...prev.transactions, newTx],
      notifications: [...prev.notifications, notif],
      lastDailyTaskDate: new Date().toISOString()
    }));

    setToast({ 
      message: 'Recompensa Resgatada!', 
      subMessage: 'R$ 1,00 foi adicionado ao seu saldo disponível.' 
    });
  };

  // Simulate Daily Yield (2.0% to 5.0%)
  const triggerDailyYield = () => {
    if (data.user.activeCapital <= 0) {
      alert('Você precisa ter capital ativo para render.');
      return;
    }

    const percentage = (Math.random() * (0.05 - 0.02) + 0.02); 
    const yieldAmount = data.user.activeCapital * percentage;
    
    const newTx: Transaction = {
      id: generateId(),
      type: TransactionType.YIELD,
      amount: yieldAmount,
      date: new Date().toISOString(),
      description: `Rendimento Diário (${(percentage * 100).toFixed(2)}%)`,
      status: 'COMPLETED'
    };

    const notif = addNotification(
      'Rendimento Creditado',
      `Seu capital rendeu ${formatCurrency(yieldAmount)} hoje (${(percentage * 100).toFixed(2)}%).`,
      'success'
    );

    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        balance: prev.user.balance + yieldAmount,
        totalEarnings: prev.user.totalEarnings + yieldAmount
      },
      transactions: [...prev.transactions, newTx],
      notifications: [...prev.notifications, notif],
      lastYieldDate: new Date().toISOString()
    }));

    setToast({
      message: 'Rendimento Diário Recebido!',
      subMessage: `Você recebeu ${formatCurrency(yieldAmount)} referente a ${(percentage * 100).toFixed(2)}% de lucro.`
    });
  };

  // Handle P2P Transfer
  const handleTransfer = (recipientEmail: string, amount: number, recipientName: string) => {
    const newTx: Transaction = {
      id: generateId(),
      type: TransactionType.TRANSFER_SENT,
      amount: amount,
      date: new Date().toISOString(),
      description: `Envio para ${recipientName}`,
      status: 'COMPLETED'
    };

    const notif = addNotification(
      'Transferência Enviada',
      `Você enviou ${formatCurrency(amount)} para ${recipientName}.`,
      'info'
    );

    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        balance: prev.user.balance - amount
      },
      transactions: [...prev.transactions, newTx],
      notifications: [...prev.notifications, notif]
    }));

    setToast({
      message: 'Transferência Realizada',
      subMessage: `Enviado ${formatCurrency(amount)} para ${recipientName}`
    });
  };

  // Admin Actions
  const handleAdminUpdateUser = (updates: Partial<UserState>) => {
    setData(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }));
    setToast({ message: 'Dados do usuário atualizados', subMessage: 'As alterações foram salvas com sucesso.' });
  };

  const handleAdminDistributeYield = (percentage: number) => {
    const yieldAmount = data.user.activeCapital * (percentage / 100);
    
    const newTx: Transaction = {
      id: generateId(),
      type: TransactionType.YIELD,
      amount: yieldAmount,
      date: new Date().toISOString(),
      description: `Distribuição Admin (${percentage.toFixed(2)}%)`,
      status: 'COMPLETED'
    };

    const notif = addNotification(
      'Bonificação Admin Recebida',
      `Você recebeu um rendimento extra de ${formatCurrency(yieldAmount)}.`,
      'success'
    );

    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        balance: prev.user.balance + yieldAmount,
        totalEarnings: prev.user.totalEarnings + yieldAmount
      },
      transactions: [...prev.transactions, newTx],
      notifications: [...prev.notifications, notif]
    }));

    setToast({
      message: 'Distribuição Concluída',
      subMessage: `Rendimento de ${percentage}% aplicado a todos os usuários.`
    });
  };

  // Simulate Referral (10 Levels)
  const simulateReferral = () => {
    let level = 1;
    const rand = Math.random();
    if (rand > 0.6) level = 2;
    if (rand > 0.8) level = 3;
    if (rand > 0.9) level = Math.floor(Math.random() * 7) + 4; // 4 to 10

    const fakeInvestment = Math.floor(Math.random() * 500) + 100;
    const rate = COMMISSION_RATES[level] || 0.005;
    const commission = fakeInvestment * rate;
    
    const refName = `Usuário_${generateId().substring(0,4)}`;

    const newReferral = {
      id: generateId(),
      name: refName,
      dateJoined: new Date().toISOString(),
      investedAmount: fakeInvestment,
      commissionEarned: commission,
      level: level
    };

    const newTx: Transaction = {
      id: generateId(),
      type: TransactionType.COMMISSION,
      amount: commission,
      date: new Date().toISOString(),
      description: `Comissão Nível ${level}: ${refName}`,
      status: 'COMPLETED'
    };

    const notif = addNotification(
      `Nova Indicação (Nível ${level})`,
      `${refName} entrou na sua rede (Nível ${level}). Você ganhou ${formatCurrency(commission)}.`,
      'success'
    );

    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        balance: prev.user.balance + commission,
        totalCommission: prev.user.totalCommission + commission
      },
      referrals: [...prev.referrals, newReferral],
      transactions: [...prev.transactions, newTx],
      notifications: [...prev.notifications, notif]
    }));
    
    setToast({
      message: 'Nova Comissão Recebida!',
      subMessage: `+${formatCurrency(commission)} (Ref. Nível ${level})`
    });
  };

  const updateUser = (updates: Partial<UserState>) => {
    const notif = addNotification(
      'Perfil Atualizado',
      'Suas informações pessoais foram alteradas com sucesso.',
      'info'
    );

    setData(prev => ({
      ...prev,
      user: { ...prev.user, ...updates },
      notifications: [...prev.notifications, notif]
    }));
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard data={data} triggerYield={triggerDailyYield} />;
      case 'operations':
        return <Operations language={data.language} />;
      case 'tasks':
        return <Tasks lastClaimDate={data.lastDailyTaskDate} onClaim={handleClaimTask} />;
      case 'invest':
        return <Invest handleTransaction={handleTransaction} balance={data.user.balance} />;
      case 'withdraw':
        return <Withdraw handleTransaction={handleTransaction} user={data.user} />;
      case 'transfer':
        return <Transfer language={data.language} currentUser={data.user} onTransfer={handleTransfer} />;
      case 'network':
        return <Network referrals={data.referrals} referralLink={`https://investprime.com/r/${data.user.name.replace(/\s/g, '').toLowerCase()}`} simulateReferral={simulateReferral} />;
      case 'history':
        return <History transactions={data.transactions} />;
      case 'profile':
        return <Profile user={data.user} updateUser={updateUser} onNavigate={setCurrentView} />;
      case 'admin':
        // Only allow admin view if user is admin
        return data.user.isAdmin ? (
          <Admin 
            language={data.language} 
            currentUser={data.user} 
            onUpdateUser={handleAdminUpdateUser}
            onDistributeYield={handleAdminDistributeYield}
          /> 
        ) : <Dashboard data={data} triggerYield={triggerDailyYield} />;
      default:
        return <Dashboard data={data} triggerYield={triggerDailyYield} />;
    }
  };

  // If not authenticated, show Auth Screen
  if (!isAuthenticated) {
    return (
       <>
         <Auth 
            onLogin={handleLogin} 
            onRegister={handleRegister} 
            language={data.language} 
         />
         {toast && (
            <Toast 
               message={toast.message} 
               subMessage={toast.subMessage} 
               onClose={() => setToast(null)} 
            />
         )}
       </>
    );
  }

  // Authenticated Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-brand-500/30">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        language={data.language}
        onLogout={handleLogout}
        user={data.user}
      />
      
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          subMessage={toast.subMessage} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Welcome Modal - Only show for non-admin normal users */}
      {!data.user.isAdmin && (
        <WelcomeModal 
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          onInvest={() => {
            setShowWelcomeModal(false);
            setCurrentView('invest');
          }}
        />
      )}

      {/* Main Content Area */}
      <main className={`
        transition-all duration-300 ease-in-out
        lg:ml-64 min-h-screen
      `}>
        {/* TopBar with Language, Notifications and Mobile Menu Trigger */}
        <TopBar 
          currentView={currentView}
          language={data.language}
          setLanguage={setLanguage}
          notifications={data.notifications}
          markNotificationsAsRead={markNotificationsAsRead}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
        />

        {/* Content Wrapper with improved padding */}
        <div className="p-4 md:p-6 lg:p-8 pt-0 lg:pt-0 pb-20 lg:pb-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;