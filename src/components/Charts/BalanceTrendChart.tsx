import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../types';
import { getMonthlyBalance } from '../../utils/helpers';

interface BalanceTrendChartProps {
  transactions: Transaction[];
}

export function BalanceTrendChart({ transactions }: BalanceTrendChartProps) {
  const data = getMonthlyBalance(transactions).map((d) => ({
    month: new Date(d.month + '-01').toLocaleDateString('en-US', { month: 'short' }),
    balance: d.balance,
    income: d.income,
    expenses: d.expenses,
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Balance Trend</h3>
        <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Balance Trend</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last 12 months overview</p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '500' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px', fontWeight: '500' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '12px', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: '500' }} />
          <Bar dataKey="income" fill="#10B981" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expenses" fill="#EF4444" radius={[8, 8, 0, 0]} />
          <Bar dataKey="balance" fill="#0066CC" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
