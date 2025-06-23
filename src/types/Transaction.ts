export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
}

export interface FilterOptions {
  type?: 'all' | 'income' | 'expense';
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}