import React from 'react';
import { Edit, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction, Category } from '../types/Transaction';
import { formatCurrency } from '../utils/calculations';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  categories, 
  onEdit, 
  onDelete 
}) => {
  const getCategoryColor = (categoryName: string, type: 'income' | 'expense') => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || (type === 'income' ? '#10b981' : '#ef4444');
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="text-gray-400 text-6xl mb-4">💰</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No transactions yet</h3>
        <p className="text-gray-600">Start tracking your expenses by adding your first transaction.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <p className="text-sm text-gray-600 mt-1">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className="p-6 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-full"
                  style={{ 
                    backgroundColor: getCategoryColor(transaction.category, transaction.type) + '20',
                    color: getCategoryColor(transaction.category, transaction.type)
                  }}
                >
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-5 w-5" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5" />
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">{transaction.description}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">{transaction.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div 
                    className={`text-lg font-bold ${
                      transaction.type === 'income' 
                        ? 'text-emerald-600' 
                        : 'text-rose-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;