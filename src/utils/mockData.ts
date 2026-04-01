import { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15',
    amount: 5000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary'
  },
  {
    id: '2',
    date: '2024-03-14',
    amount: -1200,
    category: 'Rent',
    type: 'expense',
    description: 'Monthly rent payment'
  },
  {
    id: '3',
    date: '2024-03-13',
    amount: -450,
    category: 'Groceries',
    type: 'expense',
    description: 'Weekly grocery shopping'
  },
  {
    id: '4',
    date: '2024-03-12',
    amount: -80,
    category: 'Dining',
    type: 'expense',
    description: 'Restaurant dinner'
  },
  {
    id: '5',
    date: '2024-03-11',
    amount: -120,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie tickets and popcorn'
  },
  {
    id: '6',
    date: '2024-03-10',
    amount: -65,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity bill'
  },
  {
    id: '7',
    date: '2024-03-09',
    amount: -200,
    category: 'Healthcare',
    type: 'expense',
    description: 'Doctor appointment'
  },
  {
    id: '8',
    date: '2024-03-08',
    amount: -150,
    category: 'Transportation',
    type: 'expense',
    description: 'Gas and maintenance'
  },
  {
    id: '9',
    date: '2024-03-07',
    amount: 800,
    category: 'Freelance',
    type: 'income',
    description: 'Freelance project payment'
  },
  {
    id: '10',
    date: '2024-03-06',
    amount: -320,
    category: 'Shopping',
    type: 'expense',
    description: 'Clothing purchase'
  },
  {
    id: '11',
    date: '2024-03-05',
    amount: -90,
    category: 'Dining',
    type: 'expense',
    description: 'Lunch with colleagues'
  },
  {
    id: '12',
    date: '2024-03-04',
    amount: -45,
    category: 'Subscriptions',
    type: 'expense',
    description: 'Streaming service'
  },
];

export const categories = [
  'Salary',
  'Freelance',
  'Bonus',
  'Rent',
  'Utilities',
  'Groceries',
  'Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Healthcare',
  'Subscriptions',
];

export const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'Salary': '#3B82F6',
    'Freelance': '#10B981',
    'Bonus': '#8B5CF6',
    'Rent': '#EF4444',
    'Utilities': '#F59E0B',
    'Groceries': '#EC4899',
    'Dining': '#F97316',
    'Transportation': '#06B6D4',
    'Entertainment': '#6366F1',
    'Shopping': '#A855F7',
    'Healthcare': '#D946EF',
    'Subscriptions': '#64748B',
  };
  return colorMap[category] || '#64748B';
};
