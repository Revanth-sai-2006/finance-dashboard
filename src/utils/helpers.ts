import { Transaction, FilterOptions } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const calculateSummary = (transactions: Transaction[]) => {
  let totalIncome = 0;
  let totalExpenses = 0;
  const spendingByCategory: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === 'income') {
      totalIncome += Math.abs(t.amount);
    } else {
      totalExpenses += Math.abs(t.amount);
      const categoryAmount = Math.abs(t.amount);
      spendingByCategory[t.category] = (spendingByCategory[t.category] || 0) + categoryAmount;
    }
  });

  return {
    totalBalance: totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
    spendingByCategory,
  };
};

export const filterTransactions = (
  transactions: Transaction[],
  filters: FilterOptions
): Transaction[] => {
  return transactions.filter((transaction) => {
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
};

export const sortTransactions = (
  transactions: Transaction[],
  sortBy: 'date' | 'amount' = 'date',
  order: 'asc' | 'desc' = 'desc'
): Transaction[] => {
  const sorted = [...transactions];
  sorted.sort((a, b) => {
    let compareValue = 0;
    if (sortBy === 'date') {
      compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'amount') {
      compareValue = Math.abs(a.amount) - Math.abs(b.amount);
    }
    return order === 'asc' ? compareValue : -compareValue;
  });
  return sorted;
};

export const getMonthlyBalance = (transactions: Transaction[]) => {
  const monthlyData: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expenses: 0 };
    }

    if (t.type === 'income') {
      monthlyData[monthKey].income += Math.abs(t.amount);
    } else {
      monthlyData[monthKey].expenses += Math.abs(t.amount);
    }
  });

  return Object.entries(monthlyData)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([month, data]) => ({
      month,
      balance: data.income - data.expenses,
      income: data.income,
      expenses: data.expenses,
    }))
    .slice(-12); // Last 12 months
};

export const getTopSpendingCategories = (spendingByCategory: Record<string, number>) => {
  return Object.entries(spendingByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, amount]) => ({ category, amount }));
};

export const generateChartData = (transactions: Transaction[]) => {
  const monthlyBalance = getMonthlyBalance(transactions);
  return monthlyBalance.map((data) => ({
    month: data.month.split('-')[1], // Just the month number
    balance: data.balance,
    income: data.income,
    expenses: data.expenses,
  }));
};

export const exportToJSON = (transactions: Transaction[]) => {
  const dataStr = JSON.stringify(transactions, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (transactions: Transaction[]) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((t) => [
    t.date,
    t.description,
    t.category,
    t.type,
    t.amount,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
