import { Transaction } from '../types/Transaction';

export const calculateBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((balance, transaction) => {
    return transaction.type === 'income' 
      ? balance + transaction.amount 
      : balance - transaction.amount;
  }, 0);
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
};

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
};

export const getCategoryTotals = (transactions: Transaction[]) => {
  const categoryTotals = new Map<string, number>();
  
  transactions.forEach(transaction => {
    const current = categoryTotals.get(transaction.category) || 0;
    categoryTotals.set(transaction.category, current + transaction.amount);
  });
  
  return Array.from(categoryTotals.entries()).map(([category, amount]) => ({
    category,
    amount
  }));
};

export const getMonthlyData = (transactions: Transaction[]) => {
  const monthlyData = new Map<string, { income: number; expense: number }>();
  
  transactions.forEach(transaction => {
    const month = transaction.date.substring(0, 7); // YYYY-MM
    const current = monthlyData.get(month) || { income: 0, expense: 0 };
    
    if (transaction.type === 'income') {
      current.income += transaction.amount;
    } else {
      current.expense += transaction.amount;
    }
    
    monthlyData.set(month, current);
  });
  
  return Array.from(monthlyData.entries()).map(([month, data]) => ({
    month,
    income: data.income,
    expense: data.expense,
    net: data.income - data.expense
  }));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};