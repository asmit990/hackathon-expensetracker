import { Transaction, Category } from '../types/Transaction';

const TRANSACTIONS_KEY = 'expense-tracker-transactions';
const CATEGORIES_KEY = 'expense-tracker-categories';

export const getTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(TRANSACTIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const getCategories = (): Category[] => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (!stored) {
    // Initialize with default categories
    const defaultCategories: Category[] = [
      // Income categories
      { id: '1', name: 'Salary', type: 'income', color: '#10b981', icon: 'Briefcase' },
      { id: '2', name: 'Freelance', type: 'income', color: '#059669', icon: 'User' },
      { id: '3', name: 'Investment', type: 'income', color: '#047857', icon: 'TrendingUp' },
      { id: '4', name: 'Other Income', type: 'income', color: '#065f46', icon: 'Plus' },
      
      // Expense categories
      { id: '5', name: 'Food & Dining', type: 'expense', color: '#ef4444', icon: 'Utensils' },
      { id: '6', name: 'Transportation', type: 'expense', color: '#dc2626', icon: 'Car' },
      { id: '7', name: 'Shopping', type: 'expense', color: '#b91c1c', icon: 'ShoppingBag' },
      { id: '8', name: 'Entertainment', type: 'expense', color: '#991b1b', icon: 'Film' },
      { id: '9', name: 'Bills & Utilities', type: 'expense', color: '#7f1d1d', icon: 'Receipt' },
      { id: '10', name: 'Healthcare', type: 'expense', color: '#450a0a', icon: 'Heart' },
      { id: '11', name: 'Other Expense', type: 'expense', color: '#dc2626', icon: 'Minus' },
    ];
    saveCategories(defaultCategories);
    return defaultCategories;
  }
  return JSON.parse(stored);
};

export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};