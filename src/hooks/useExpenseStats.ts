
import { useState, useEffect } from 'react';

export interface ExpenseStats {
  totalSpent: number;
  monthlyBudget: number;
  remainingBudget: number;
  categoryBreakdown: {
    category: string;
    spent: number;
    budget: number;
  }[];
  recentExpenses: {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    status: string;
  }[];
}

export function useExpenseStats() {
  const [stats, setStats] = useState<ExpenseStats>({
    totalSpent: 0,
    monthlyBudget: 2000,
    remainingBudget: 2000,
    categoryBreakdown: [
      { category: 'meals', spent: 0, budget: 500 },
      { category: 'transportation', spent: 0, budget: 300 },
      { category: 'accommodation', spent: 0, budget: 400 },
      { category: 'office', spent: 0, budget: 150 },
      { category: 'equipment', spent: 0, budget: 500 },
      { category: 'other', spent: 0, budget: 150 },
    ],
    recentExpenses: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExpenseData = () => {
      const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      
      // Calculate total spent this month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyExpenses = expenses.filter((expense: any) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
      });

      const totalSpent = monthlyExpenses.reduce((sum: number, expense: any) => 
        sum + Number(expense.amount), 0);

      // Calculate category breakdown
      const categoryBreakdown = stats.categoryBreakdown.map(category => {
        const categoryExpenses = monthlyExpenses.filter((expense: any) => 
          expense.category === category.category);
        const spent = categoryExpenses.reduce((sum: number, expense: any) => 
          sum + Number(expense.amount), 0);
        
        return {
          ...category,
          spent
        };
      });

      setStats(prev => ({
        ...prev,
        totalSpent,
        remainingBudget: prev.monthlyBudget - totalSpent,
        categoryBreakdown,
        recentExpenses: expenses.slice(-5).reverse()
      }));
      
      setIsLoading(false);
    };

    loadExpenseData();
    
    // Listen for storage changes to update stats in real-time
    const handleStorageChange = () => loadExpenseData();
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when expenses are added
    window.addEventListener('expenseAdded', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('expenseAdded', handleStorageChange);
    };
  }, []);

  return { stats, isLoading };
}
