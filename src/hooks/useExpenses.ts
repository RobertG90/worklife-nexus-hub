
import { useQuery } from '@tanstack/react-query';

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: string;
  category: string;
}

export function useExpenses() {
  const { data: expenses, isLoading, isError, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: async (): Promise<Expense[]> => {
      // Mock data for now since we don't have a real expenses table
      return [
        {
          id: '1',
          description: 'Office Supplies',
          amount: 125.50,
          date: '2024-01-15',
          status: 'pending',
          category: 'supplies'
        },
        {
          id: '2',
          description: 'Business Lunch',
          amount: 45.00,
          date: '2024-01-14',
          status: 'approved',
          category: 'meals'
        }
      ];
    },
  });

  return {
    expenses: expenses || [],
    isLoading,
    isError,
    error,
  };
}
