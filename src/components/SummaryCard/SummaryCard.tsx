import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export function SummaryCard({ title, amount, icon: Icon, trend, color = 'blue' }: SummaryCardProps) {
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/5 border-blue-200/50 dark:border-blue-500/20 hover:border-blue-300/70',
    green: 'from-emerald-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/5 border-emerald-200/50 dark:border-emerald-500/20 hover:border-emerald-300/70',
    red: 'from-red-500/10 to-red-500/5 dark:from-red-500/20 dark:to-red-500/5 border-red-200/50 dark:border-red-500/20 hover:border-red-300/70',
    purple: 'from-purple-500/10 to-purple-500/5 dark:from-purple-500/20 dark:to-purple-500/5 border-purple-200/50 dark:border-purple-500/20 hover:border-purple-300/70',
  };

  const iconColorClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-emerald-600 dark:text-emerald-400',
    red: 'text-red-600 dark:text-red-400',
    purple: 'text-purple-600 dark:text-purple-400',
  };

  const bgClasses: Record<string, string> = {
    blue: 'bg-blue-100/40 dark:bg-blue-500/10',
    green: 'bg-emerald-100/40 dark:bg-emerald-500/10',
    red: 'bg-red-100/40 dark:bg-red-500/10',
    purple: 'bg-purple-100/40 dark:bg-purple-500/10',
  };

  return (
    <div className={`group relative p-6 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:shadow-lg bg-gradient-to-br ${colorClasses[color] || colorClasses.blue}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{formatCurrency(amount)}</p>
          {trend && (
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center text-sm font-semibold ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${bgClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${iconColorClasses[color]}`} />
        </div>
      </div>
    </div>
  );
}
