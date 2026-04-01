import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../types';
import { getCategoryColor } from '../../utils/mockData';

interface SpendingBreakdownChartProps {
  transactions: Transaction[];
}

export function SpendingBreakdownChart({ transactions }: SpendingBreakdownChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const spendingByCategory: Record<string, number> = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      spendingByCategory[t.category] = (spendingByCategory[t.category] || 0) + Math.abs(t.amount);
    });

  const data = Object.entries(spendingByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
    }));

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Spending Breakdown</h3>
        <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
          No expense data available
        </div>
      </div>
    );
  }

  const totalSpending = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Spending Breakdown</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">By category analysis</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative flex items-center justify-center" style={{ perspective: '1200px' }}>
          {/* 3D Shadow layers */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="absolute rounded-full opacity-20 blur-3xl"
              style={{
                width: '280px',
                height: '140px',
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)',
                transform: 'translateY(140px) scaleX(1.2)',
              }}
            />
          </div>
          
          {/* Main pie chart with 3D effect */}
          <div 
            className="relative z-10 transition-transform duration-300 ease-out hover:scale-105"
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15)) drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1))',
            }}
          >
            <ResponsiveContainer width={300} height={320}>
              <PieChart>
                <defs>
                  {/* Define gradients for 3D effect */}
                  {data.map((item, index) => (
                    <defs key={`gradient-${index}`}>
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={getCategoryColor(item.name)} stopOpacity={1} />
                        <stop offset="100%" stopColor={getCategoryColor(item.name)} stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  ))}
                </defs>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={110}
                  innerRadius={0}
                  paddingAngle={2}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getCategoryColor(entry.name)}
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                      style={{
                        filter: activeIndex === index ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`} 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-8 pb-8 border-b border-gradient-to-r from-blue-200 via-purple-200 to-transparent dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest letter-spacing-2">💰 Total Spending</p>
            <p className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mt-3">
              ${totalSpending.toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            {data.map((item, index) => (
              <div 
                key={index} 
                className="group relative p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/40 dark:to-gray-700/20 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700/60 dark:hover:to-gray-700/40 transition-all duration-300 cursor-pointer overflow-hidden"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Animated background glow on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at -20% 50%, ${getCategoryColor(item.name)}15 0%, transparent 80%)`,
                  }}
                />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Enhanced color dot with glow effect */}
                    <div className="relative">
                      <div
                        className="absolute w-5 h-5 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: getCategoryColor(item.name) }}
                      />
                      <div
                        className="relative w-5 h-5 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300 ring-2 ring-white dark:ring-gray-700"
                        style={{ backgroundColor: getCategoryColor(item.name) }}
                      />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      ${item.value.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <div className="h-1.5 w-20 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${(item.value / totalSpending) * 100}%`,
                            backgroundColor: getCategoryColor(item.name),
                            boxShadow: `0 0 10px ${getCategoryColor(item.name)}40`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-10 text-right">
                        {((item.value / totalSpending) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
