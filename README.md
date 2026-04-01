# Finance Dashboard

A clean, interactive finance dashboard UI built with React, TypeScript, Tailwind CSS, and Recharts. Track your financial activity with beautiful visualizations, insights, and role-based access control.

## 🎯 Features

### Core Features
- **Dashboard Overview**: Summary cards showing:
  - Total Balance
  - Total Income
  - Total Expenses
  - Transaction Count

- **Real-time Visualizations**:
  - Balance Trend (last 12 months) - Bar chart showing income, expenses, and balance trends
  - Spending Breakdown - Pie chart with detailed category breakdown

- **Transactions Management**:
  - View all transactions with details (date, amount, category, type)
  - Filter by category, type (income/expense), search by description
  - Sort by date or amount
  - Role-based transaction management (Admin can delete)

- **Financial Insights**:
  - Top spending category
  - Average monthly spending
  - Savings rate
  - Monthly balance trends
  - Highest spending month
  - Income vs expense analysis

- **Role-Based UI (RBAC)**:
  - **Viewer**: Read-only access to all data
  - **Admin**: Full access including:
    - Add new transactions
    - Delete transactions
    - Access export features

### Optional Enhancements Included
- ✅ Dark mode with system preference support
- ✅ Local storage persistence (all data saved locally)
- ✅ Export data to JSON format
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Empty state handling

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts & Graphs**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API

## 📦 Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Main dashboard component
│   ├── SummaryCard/        # Summary cards component
│   ├── Charts/
│   │   ├── BalanceTrendChart.tsx
│   │   └── SpendingBreakdownChart.tsx
│   ├── TransactionsList/   # Transactions table with filtering
│   └── Insights/           # Financial insights component
├── context/
│   └── FinanceContext.tsx  # Global state management
├── types/
│   └── index.ts            # TypeScript types
├── utils/
│   ├── mockData.ts         # Mock transaction data
│   └── helpers.ts          # Utility functions
├── styles/
│   └── index.css           # Global styles
├── App.tsx                 # Main app component
└── main.tsx                # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd ZORVYN
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Usage Guide

### Viewing Data
1. Start in **Viewer Mode** (default) to see all financial data
2. Navigate through different sections:
   - Dashboard with summary cards and visualizations
   - Transactions table with full details
   - Financial insights section

### Adding Transactions (Admin Only)
1. Switch to **Admin Mode** using the role selector in the header
2. Click the "Add Transaction" button
3. Fill in the form:
   - Date: Transaction date
   - Description: Brief description
   - Amount: Transaction amount
   - Type: Income or Expense
   - Category: Select from predefined categories
4. Click "Add" to create the transaction

### Filtering & Searching
- **Search**: Find transactions by description or category name
- **Category Filter**: Filter by specific spending category
- **Type Filter**: Filter by income or expense
- **Sort**: Sort by date (newest first) or amount (highest first)
- **Clear Filters**: Reset all active filters at once

### Export Data
- In **Admin Mode**, click the download icon in the header
- Export transactions as JSON format for backup or external analysis

### Dark Mode
- Click the moon/sun icon in the header to toggle dark mode
- Preference is saved and persists across sessions

### Switch Roles
- Use the role dropdown in the header
- Switch between Viewer and Admin modes instantly
- Your role preference is saved

## 💾 Data Management

### Local Storage
- All data is stored in your browser's local storage
- No data is sent to any server
- Data persists across browser sessions
- **Warning**: Clearing browser data will remove all transactions

### Mock Data
- The app comes pre-loaded with 12 sample transactions
- Perfect for exploring features without adding your own data
- Add your own transactions in Admin mode

### Reset Data
- In Admin mode, scroll to the footer and click "Reset all data"
- This will restore the original mock data

## 🎨 Customization

### Modify Categories
Edit `src/utils/mockData.ts` and update the `categories` array:

```typescript
export const categories = [
  'Salary',
  'Freelance',
  // Add more categories here
];
```

### Customize Colors
Update Tailwind theme in `tailwind.config.js`:

```javascript
colors: {
  primary: '#3B82F6',
  secondary: '#10B981',
  // Add more colors
}
```

### Add More Visualizations
- Create new components in `src/components/Charts/`
- Recharts provides many chart types: LineChart, AreaChart, etc.
- Add to Dashboard component

## 📱 Responsive Design

- **Mobile**: Optimized for small screens with stacked layout
- **Tablet**: Two-column layout for medium screens
- **Desktop**: Full multi-column layout
- All charts and tables are fully responsive

## 🔒 Role-Based Access Control

### Viewer Mode
- ✓ View all dashboard data
- ✓ View transactions and their details
- ✓ Use filters and search
- ✗ Cannot add transactions
- ✗ Cannot delete transactions
- ✗ Cannot export data

### Admin Mode
- ✓ All Viewer capabilities
- ✓ Add new transactions
- ✓ Delete transactions
- ✓ Export data to JSON
- ✓ Reset all data

## 📈 Key Metrics Explained

- **Total Balance**: Total income minus total expenses
- **Savings Rate**: Percentage of income that's not spent
- **Average Monthly Spending**: Average expenses per month
- **Top Spending Category**: Category with highest expenses
- **Monthly Balance Trend**: Month-over-month balance change

## 🐛 Known Limitations

- This is a frontend-only implementation with mock data
- No backend API integration (use mock data only)
- Transaction editing is not implemented (delete and re-add instead)
- Limited to 12 months of historical data for trend charts
- Single-user interface (no authentication/multi-user support)

## 🎓 Learning Resources

### Component Architecture
- Dashboard uses composition pattern with reusable components
- Context API for centralized state management
- Custom hooks for cleaner component code

### Type Safety
- Full TypeScript support with proper types
- Interfaces for all data structures
- Type-safe context and hooks

### Styling
- Tailwind CSS utility-first approach
- Dark mode support with Tailwind's dark class
- Responsive design system

## 🚀 Future Enhancements

- Backend API integration
- User authentication
- Multi-currency support
- Budget planning and goals
- Recurring transactions
- Advanced analytics and reports
- Transaction categories customization
- Import data from CSV
- Spending predictions using ML

## 📝 Notes

- This is a portfolio project demonstrating frontend development skills
- Focus is on UI/UX quality, component structure, and state management
- All data stays in the browser - no external servers involved
- Perfect starting point for adding backend integration

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 About

Built as a practical demonstration of:
- Modern React development patterns
- TypeScript best practices
- Tailwind CSS styling
- Data visualization with Recharts
- State management with Context API
- Responsive and accessible UI design

---

**Enjoy tracking your finances! 💰**
