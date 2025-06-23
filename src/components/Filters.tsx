import React from 'react';
import { Search, Filter, Calendar, Tag } from 'lucide-react';
import { FilterOptions, Category } from '../types/Transaction';

interface FiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: Category[];
}

const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange, categories }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <Tag className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <select
            value={filters.type || 'all'}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value as any })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={filters.category || ''}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="relative">
          <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="month"
            value={filters.dateRange?.start || ''}
            onChange={(e) => onFiltersChange({ 
              ...filters, 
              dateRange: { 
                start: e.target.value + '-01', 
                end: e.target.value + '-31' 
              } 
            })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.search || filters.type !== 'all' || filters.category || filters.dateRange) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => onFiltersChange({ type: 'all' })}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;