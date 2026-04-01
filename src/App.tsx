import React from 'react';
import { Moon, Sun, LogOut, Download } from 'lucide-react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useFinance } from './context/FinanceContext';
import { exportToJSON, exportToCSV } from './utils/helpers';

function App() {
  const { role, setRole, isDarkMode, toggleDarkMode, transactions } = useFinance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">📊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Finance Dashboard</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">Professional Financial Management</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Export Buttons (visible only in admin mode) */}
              {role === 'admin' && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => exportToJSON(transactions)}
                    title="Export as JSON"
                    className="p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:shadow-md"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
                </div>
              )}

              {/* Role Switcher */}
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Role:</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'viewer' | 'admin')}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer"
                >
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                title="Toggle dark mode"
                className="p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all hover:shadow-md"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Role Badge */}
          <div className="mt-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 border border-blue-200/60 dark:border-blue-700/40 rounded-full shadow-sm">
              <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${role === 'admin' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide">
                {role === 'admin' ? '🔐 ADMIN MODE' : '👁️ VIEWER MODE'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">About</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Professional Finance Dashboard for tracking financial activity with beautiful visualizations and actionable insights.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Features</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li className="flex items-center gap-2">✓ <span>Real-time balance tracking</span></li>
                <li className="flex items-center gap-2">✓ <span>Spending breakdown analysis</span></li>
                <li className="flex items-center gap-2">✓ <span>Financial insights</span></li>
                <li className="flex items-center gap-2">✓ <span>Role-based access</span></li>
              </ul>
            </div>

            {/* Data */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                All data stored locally in your browser. No server uploads.
              </p>
              {role === 'admin' && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure? This will reset all data.')) {
                      localStorage.removeItem('transactions');
                      window.location.reload();
                    }
                  }}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors"
                >
                  Reset all data →
                </button>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
              © 2024 Finance Dashboard. Built with React, Tailwind CSS & Recharts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
