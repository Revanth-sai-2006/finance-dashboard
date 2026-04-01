import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { FinanceProvider } from './context/FinanceContext.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </React.StrictMode>,
)
