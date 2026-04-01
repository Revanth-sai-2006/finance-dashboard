import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { SummaryCard } from '../SummaryCard/SummaryCard';
import { BalanceTrendChart } from '../Charts/BalanceTrendChart';
import { SpendingBreakdownChart } from '../Charts/SpendingBreakdownChart';
import { Insights } from '../Insights/Insights';
import { TransactionsList } from '../TransactionsList/TransactionsList';
import { useFinance } from '../../context/FinanceContext';
import { calculateSummary } from '../../utils/helpers';
import { categories } from '../../utils/mockData';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export function Dashboard() {
  const { transactions, role, addTransaction } = useFinance();
  const summary = calculateSummary(transactions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: categories[0],
    type: 'expense' as 'income' | 'expense',
    description: '',
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.description) {
      addTransaction({
        date: formData.date,
        amount: formData.type === 'income' ? parseFloat(formData.amount) : -parseFloat(formData.amount),
        category: formData.category,
        type: formData.type,
        description: formData.description,
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: categories[0],
        type: 'expense' as 'income' | 'expense',
        description: '',
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">Track and manage your financial activities in real-time</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Total Balance"
          amount={summary.totalBalance}
          icon={DollarSign}
          color="blue"
        />
        <SummaryCard
          title="Total Income"
          amount={summary.totalIncome}
          icon={TrendingUp}
          color="green"
        />
        <SummaryCard
          title="Total Expenses"
          amount={summary.totalExpenses}
          icon={TrendingDown}
          color="red"
        />
        <div className="group p-6 rounded-2xl border bg-gradient-to-br from-purple-500/10 to-purple-500/5 dark:from-purple-500/20 dark:to-purple-500/5 border-purple-200/50 dark:border-purple-500/20 backdrop-blur-lg hover:border-purple-300/70 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Transaction Count</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{transactions.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total transactions</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100/40 dark:bg-purple-500/10 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart transactions={transactions} />
        <SpendingBreakdownChart transactions={transactions} />
      </div>

      {/* Insights */}
      <Insights transactions={transactions} />

      {/* Action Bar */}
      {role === 'admin' && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 border border-blue-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Transaction Management</h3>
              <p className="text-blue-100 text-sm">Add new transactions to your financial record</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddModal && role === 'admin' && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Transaction</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-5">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="e.g., Monthly salary"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transactions Section */}
      <TransactionsList transactions={transactions} />
    </div>
  );
}
