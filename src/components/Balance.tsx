import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

interface BalanceProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

const Balance: React.FC<BalanceProps> = ({ balance, totalIncome, totalExpenses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Current Balance */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Current Balance</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(balance)}</p>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <Wallet className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Total Income */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-medium">Total Income</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <TrendingUp className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-100 text-sm font-medium">Total Expenses</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="bg-white/20 rounded-full p-3">
            <TrendingDown className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;