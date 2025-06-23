import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, List, Wallet } from 'lucide-react';
import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Filters from './components/Filters';
import Charts from './components/Charts';
import { Transaction, Category, FilterOptions } from './types/Transaction';
import { getTransactions, saveTransactions, getCategories } from './utils/storage';
import { calculateBalance, calculateTotalIncome, calculateTotalExpenses } from './utils/calculations';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'transactions' | 'charts'>('transactions');
  const [filters, setFilters] = useState<FilterOptions>({ type: 'all' });

  useEffect(() => {
    setTransactions(getTransactions());
    setCategories(getCategories());
  }, []);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const handleDeleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    // For now, we'll just show the form - in a real app, you'd pre-populate it
    setIsFormOpen(true);
  };

  const filterTransactions = (transactions: Transaction[]): Transaction[] => {
    return transactions.filter(transaction => {
      // Type filter
      if (filters.type && filters.type !== 'all' && transaction.type !== filters.type) {
        return false;
      }

      // Category filter
      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesDescription = transaction.description.toLowerCase().includes(searchLower);
        const matchesCategory = transaction.category.toLowerCase().includes(searchLower);
        if (!matchesDescription && !matchesCategory) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange) {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        if (transactionDate < startDate || transactionDate > endDate) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredTransactions = filterTransactions(transactions);
  const balance = calculateBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
                <p className="text-sm text-gray-600">Manage your finances with ease</p>
              </div>
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              Add Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Cards */}
        <Balance 
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-xl mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'transactions'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="h-5 w-5" />
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'charts'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            Analytics
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'transactions' ? (
          <div className="space-y-6">
            <Filters 
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
            />
            <TransactionList 
              transactions={filteredTransactions}
              categories={categories}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </div>
        ) : (
          <Charts 
            transactions={filteredTransactions}
            categories={categories}
          />
        )}
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAdd={handleAddTransaction}
        categories={categories}
      />
    </div>
  );
}

export default App;