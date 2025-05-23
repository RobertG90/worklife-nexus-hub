
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

export type ExpenseFilter = {
  dateRange: 'week' | 'month' | 'quarter' | 'year' | 'all';
  expenseType?: string;
  minAmount?: number;
  maxAmount?: number;
};

export type ExpenseSummary = {
  totalSpent: number;
  totalBudget: number;
  remainingBudget: number;
  expensesByCategory: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  expensesByMonth: {
    month: string;
    amount: number;
  }[];
};

const DEFAULT_BUDGET = 10000; // Default budget for demo purposes

export function useExpenseDashboard() {
  const [filters, setFilters] = useState<ExpenseFilter>({
    dateRange: 'month',
  });

  // Query to get travel expenses with filters
  const { data: expenses, isLoading } = useQuery({
    queryKey: ['expenses', filters],
    queryFn: async () => {
      let query = supabase
        .from('travel_expenses')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply date filter
      const now = new Date();
      let startDate: Date | undefined;
      
      switch (filters.dateRange) {
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'quarter':
          startDate = new Date(now.setMonth(now.getMonth() - 3));
          break;
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        case 'all':
          // No date filtering
          break;
      }

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }

      // Apply expense type filter
      if (filters.expenseType) {
        query = query.eq('expense_type', filters.expenseType);
      }

      // Apply amount filters
      if (filters.minAmount !== undefined) {
        query = query.gte('amount', filters.minAmount);
      }
      
      if (filters.maxAmount !== undefined) {
        query = query.lte('amount', filters.maxAmount);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  // Calculate expense summary
  const expenseSummary: ExpenseSummary = {
    totalSpent: 0,
    totalBudget: DEFAULT_BUDGET,
    remainingBudget: DEFAULT_BUDGET,
    expensesByCategory: [],
    expensesByMonth: [],
  };

  if (expenses && expenses.length > 0) {
    // Calculate total spent
    expenseSummary.totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    expenseSummary.remainingBudget = DEFAULT_BUDGET - expenseSummary.totalSpent;

    // Group expenses by category
    const categoryMap = new Map<string, number>();
    expenses.forEach(expense => {
      const currentAmount = categoryMap.get(expense.expense_type) || 0;
      categoryMap.set(expense.expense_type, currentAmount + Number(expense.amount));
    });

    expenseSummary.expensesByCategory = Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / expenseSummary.totalSpent) * 100
    }));

    // Group expenses by month
    const monthMap = new Map<string, number>();
    expenses.forEach(expense => {
      const date = new Date(expense.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const currentAmount = monthMap.get(monthKey) || 0;
      monthMap.set(monthKey, currentAmount + Number(expense.amount));
    });

    expenseSummary.expensesByMonth = Array.from(monthMap.entries())
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  const expenseTypes = expenses ? [...new Set(expenses.map(expense => expense.expense_type))] : [];

  return {
    expenses,
    isLoading,
    filters,
    setFilters,
    expenseSummary,
    expenseTypes,
  };
}
