export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  YIELD = 'YIELD', // Daily profit
  COMMISSION = 'COMMISSION', // Referral bonus
  DAILY_TASK = 'DAILY_TASK', // Daily login bonus
  TRANSFER_SENT = 'TRANSFER_SENT', // P2P Sent
  TRANSFER_RECEIVED = 'TRANSFER_RECEIVED', // P2P Received
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export interface Referral {
  id: string;
  name: string;
  dateJoined: string;
  investedAmount: number;
  commissionEarned: number;
  level: number; // Level 1 to 10
}

export interface UserState {
  balance: number; // Available for withdrawal
  activeCapital: number; // Currently generating yield
  totalEarnings: number; // Total profit generated
  totalCommission: number; // Total from referrals
  pixKey: string;
  pixKeyType: 'CPF' | 'EMAIL' | 'PHONE' | 'RANDOM';
  name: string;
  email: string;
  isAdmin?: boolean; // New Admin Flag
}

export type Language = 'pt' | 'en' | 'es';

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'success' | 'info' | 'warning';
}

export interface AppData {
  user: UserState;
  transactions: Transaction[];
  referrals: Referral[];
  notifications: Notification[];
  lastYieldDate: string | null;
  lastDailyTaskDate: string | null; // Track last daily bonus claim
  language: Language;
}