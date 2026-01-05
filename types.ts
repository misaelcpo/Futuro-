
export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER'
}

export enum UserTier {
  BASIC = 'BASIC', 
  PRO = 'PRO',      
  WHALE = 'WHALE',  
  MASTER = 'MASTER'   
}

export enum VerificationStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export type Language = 'pt' | 'en' | 'es';

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  YIELD = 'YIELD',
  COMMISSION = 'COMMISSION',
  HARDWARE_PURCHASE = 'HARDWARE_PURCHASE',
  TRANSFER_SENT = 'TRANSFER_SENT',
  TRANSFER_RECEIVED = 'TRANSFER_RECEIVED',
  GUILD_BONUS = 'GUILD_BONUS',
  DAILY_TASK = 'DAILY_TASK'
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface ActivePackage {
  id: string;
  name: string;
  amount: number;
  hashrate: number;
  dailyYield: number;
  date: string;
}

export interface UserState {
  id: string;
  role: UserRole;
  tier: UserTier;
  name: string;
  email: string;
  phone: string;
  city: string;
  balance: number;
  investedCashback: number; 
  totalInvested: number; 
  totalCashbackEarned: number;
  verificationStatus: VerificationStatus;
  rating: number;
  pixKey?: string;
  status: 'ACTIVE' | 'BANNED';
  adminRevenue?: number;
  sessionProfit?: number;
  protectionEnabled: boolean;
  referralCode: string;
  networkVolume: number; 
  unlockedMilestones: string[]; 
  guildMultiplier: number;
  activePackages: ActivePackage[];
  lastClaimDate?: string | null;
  lastYieldSync?: string; // NOVO: Timestamp do último rendimento calculado
}

export interface AppData {
  user: UserState;
  allUsers: UserState[]; 
  notifications: Notification[];
  language: Language;
  transactions: Transaction[];
  systemConfig: {
    withdrawalsEnabled: boolean;
    minWithdraw: number;
    globalYieldMultiplier: number;
  };
  platformStats: {
    totalVolume: number;
    activeUsers: number;
    insuranceFund: number;
    reserveRatio: number;
    livePayouts: string[];
  };
  referrals: Referral[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'success' | 'warning' | 'info';
}

export interface Referral {
  id: string;
  name: string;
  phone: string;
  level: 1 | 2 | 3;
  investedAmount: number;
  commissionEarned: number;
  dateJoined: string;
  tier: UserTier;
}

export interface Milestone {
  id: string;
  name: string;
  requiredVolume: number;
  reward: number;
  icon: string;
}

export enum JobStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NEGOTIATING = 'NEGOTIATING'
}

export interface ServiceJob {
  id: string;
  status: JobStatus;
  date: string;
  category: string;
  description: string;
  location: string;
  budget: number;
}
