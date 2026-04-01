import { useState, useEffect } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import { Transaction, TransactionType } from '../../types';
import { formatCurrency, formatDate, sortTransactions } from '../../utils/helpers';
import { categories } from '../../utils/mockData';
import { useFinance } from '../../context/FinanceContext';

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  const { role, setFilters, deleteTransaction } = useFinance();
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<TransactionType | undefined>();

  // Update filters in context
  useEffect(() => {
    setFilters({
      searchTerm: searchTerm || undefined,
      category: selectedCategory,
      type: selectedType,
    });
  }, [searchTerm, selectedCategory, selectedType, setFilters]);

  const sortedTransactions = sortTransactions(transactions, sortBy, 'desc');

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(undefined);
    setSelectedType(undefined);
  };

  if (sortedTransactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Transactions</h3>
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {transactions.length === 0 ? 'No transactions yet' : 'No transactions match your filters'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-8 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Transactions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage and track all financial transactions</p>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="🔍 Search transactions by description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || undefined)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium cursor-pointer"
              >
                <option value="">✨ All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={selectedType || ''}
                onChange={(e) => setSelectedType((e.target.value as TransactionType) || undefined)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium cursor-pointer"
              >
                <option value="">📊 All Types</option>
                <option value="income">💰 Income</option>
                <option value="expense">💸 Expense</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium cursor-pointer"
              >
                <option value="date">📅 Sort by Date</option>
                <option value="amount">💵 Sort by Amount</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory || selectedType) && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
            >
              ✕ Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Amount</th>
              {role === 'admin' && <th className="px-6 py-4 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {sortedTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-blue-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{formatDate(transaction.date)}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{transaction.description}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-xs font-semibold">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === 'income'
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                        : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300'
                    }`}
                  >
                    {transaction.type === 'income' ? '📈' : '📉'} {transaction.type}
                  </span>
                </td>
                <td className={`px-6 py-4 text-sm font-bold text-right ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                </td>
                {role === 'admin' && (
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="inline-flex items-center justify-center w-8 h-8 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all hover:shadow-sm"
                      title="Delete transaction"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results count */}
      <div className="px-8 py-4 bg-gray-50/50 dark:bg-gray-700/30 border-t border-gray-200/50 dark:border-gray-700/50">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          📊 Showing <span className="font-bold text-gray-900 dark:text-white">{sortedTransactions.length}</span> of <span className="font-bold text-gray-900 dark:text-white">{transactions.length}</span> transactions
        </p>
      </div>
    </div>
  );
}
