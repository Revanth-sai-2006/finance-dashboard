import { TrendingUp, AlertCircle, Award } from 'lucide-react';
import { Transaction } from '../../types';
import { calculateSummary, getMonthlyBalance, formatCurrency } from '../../utils/helpers';

interface InsightsProps {
  transactions: Transaction[];
}

export function Insights({ transactions }: InsightsProps) {
  const summary = calculateSummary(transactions);
  const monthlyData = getMonthlyBalance(transactions);

  // Get top spending category
  const topSpendingCategory = Object.entries(summary.spendingByCategory)
    .sort(([, a], [, b]) => b - a)[0];

  // Calculate average monthly spending
  const avgMonthlySpending = monthlyData.length > 0
    ? monthlyData.reduce((sum, m) => sum + m.expenses, 0) / monthlyData.length
    : 0;

  // Calculate savings rate
  const savingsRate = summary.totalIncome > 0
    ? ((summary.totalIncome - summary.totalExpenses) / summary.totalIncome) * 100
    : 0;

  // Get last month vs previous month
  const lastMonthData = monthlyData[monthlyData.length - 1];
  const prevMonthData = monthlyData[monthlyData.length - 2];
  const monthlyTrend = prevMonthData
    ? ((lastMonthData?.balance || 0) - prevMonthData.balance) / Math.abs(prevMonthData.balance) * 100
    : 0;

  // Get highest spending month
  const highestSpendingMonth = monthlyData.length > 0
    ? monthlyData.reduce((max, m) => m.expenses > max.expenses ? m : max)
    : null;

  const insightCards = [
    {
      title: 'Top Spending Category',
      value: topSpendingCategory ? topSpendingCategory[0] : 'N/A',
      amount: topSpendingCategory ? formatCurrency(topSpendingCategory[1]) : '$0',
      icon: Award,
      color: 'purple',
    },
    {
      title: 'Average Monthly Spending',
      value: formatCurrency(avgMonthlySpending),
      icon: TrendingUp,
      color: 'blue',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      amount: `${savingsRate > 0 ? '+' : '-'}${Math.abs(savingsRate).toFixed(1)}%`,
      icon: AlertCircle,
      color: savingsRate > 20 ? 'green' : savingsRate > 0 ? 'yellow' : 'red',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Financial Insights</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Key observations from your financial data</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {insightCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`group p-6 rounded-2xl border bg-gradient-to-br from-${card.color}-500/10 to-${card.color}-500/5 dark:from-${card.color}-500/20 dark:to-${card.color}-500/5 border-${card.color}-200/50 dark:border-${card.color}-500/20 backdrop-blur-lg hover:border-${card.color}-300/70 transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-lg bg-${card.color}-100/40 dark:bg-${card.color}-500/10 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 text-${card.color}-600 dark:text-${card.color}-400`} />
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              {card.amount && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">{card.amount}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Insights */}
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-4 uppercase tracking-wider">Key Observations</h4>

        <div className="space-y-4">
          {/* Monthly Trend */}
          {monthlyData.length >= 2 && (
            <div className="p-5 bg-gradient-to-r from-blue-50/50 to-blue-50/25 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/30 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Monthly Balance Trend</p>
                  <p className={`mt-2 font-bold text-lg ${monthlyTrend > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {monthlyTrend > 0 ? '↗' : '↘'} {Math.abs(monthlyTrend).toFixed(1)}% from last month
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Highest Spending Month */}
          {highestSpendingMonth && (
            <div className="p-5 bg-gradient-to-r from-red-50/50 to-red-50/25 dark:from-red-950/30 dark:to-red-900/20 rounded-xl border border-red-200/50 dark:border-red-700/30 hover:shadow-md transition-shadow">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Highest Spending Month</p>
              <p className="mt-2 font-bold text-lg text-gray-900 dark:text-white">
                {new Date(highestSpendingMonth.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {formatCurrency(highestSpendingMonth.expenses)} in expenses
              </p>
            </div>
          )}

          {/* Income vs Expense Ratio */}
          <div className="p-6 bg-gradient-to-r from-gray-50/80 to-gray-50/40 dark:from-gray-700/40 dark:to-gray-800/20 rounded-xl border border-gray-200/50 dark:border-gray-600/30">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Income vs Expenses</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Income</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(summary.totalIncome)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Expenses</span>
                <span className="font-bold text-red-600 dark:text-red-400">{formatCurrency(summary.totalExpenses)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-950/50 dark:to-blue-900/30 rounded-lg border border-blue-200/50 dark:border-blue-700/30">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Net Balance</span>
                <span className={`font-bold text-lg ${summary.totalBalance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(summary.totalBalance)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
