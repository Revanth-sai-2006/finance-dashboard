export type UserRole = 'viewer' | 'admin';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  spendingByCategory: Record<string, number>;
}

export interface FilterOptions {
  category?: string;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}
