import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, UserRole, FilterOptions } from '../types';
import { mockTransactions } from '../utils/mockData';

interface FinanceContextType {
  transactions: Transaction[];
  role: UserRole;
  filteredTransactions: Transaction[];
  filters: FilterOptions;
  isDarkMode: boolean;
  
  setRole: (role: UserRole) => void;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setFilters: (filters: FilterOptions) => void;
  toggleDarkMode: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [role, setRole] = useState<UserRole>('viewer');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedRole = localStorage.getItem('role');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(mockTransactions);
      localStorage.setItem('transactions', JSON.stringify(mockTransactions));
    }

    if (savedRole) {
      setRole(savedRole as UserRole);
    }

    if (savedDarkMode) {
      const dark = JSON.parse(savedDarkMode);
      setIsDarkMode(dark);
      if (dark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Filter transactions based on current filters
  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.category && transaction.category !== filters.category) {
      return false;
    }
    if (filters.type && transaction.type !== filters.type) {
      return false;
    }
    if (filters.startDate && transaction.date < filters.startDate) {
      return false;
    }
    if (filters.endDate && transaction.date > filters.endDate) {
      return false;
    }
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        transaction.description.toLowerCase().includes(searchLower) ||
        transaction.category.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleSetTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    const updated = [newTransaction, ...transactions];
    handleSetTransactions(updated);
  };

  const handleUpdateTransaction = (id: string, updated: Partial<Transaction>) => {
    const newTransactions = transactions.map((t) =>
      t.id === id ? { ...t, ...updated } : t
    );
    handleSetTransactions(newTransactions);
  };

  const handleDeleteTransaction = (id: string) => {
    const newTransactions = transactions.filter((t) => t.id !== id);
    handleSetTransactions(newTransactions);
  };

  const handleSetFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        filteredTransactions,
        filters,
        isDarkMode,
        setRole: handleSetRole,
        setTransactions: handleSetTransactions,
        addTransaction: handleAddTransaction,
        updateTransaction: handleUpdateTransaction,
        deleteTransaction: handleDeleteTransaction,
        setFilters: handleSetFilters,
        toggleDarkMode: handleToggleDarkMode,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}
