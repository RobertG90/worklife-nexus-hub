
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToastContext } from '@/components/ui/toast-provider';
import { useState } from 'react';

export interface TravelExpense {
  id: string;
  user_id: string | null;
  trip_destination: string;
  trip_purpose: string;
  start_date: string;
  end_date: string;
  expense_type: string;
  amount: number;
  currency: string;
  description: string | null;
  receipt_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useTravelExpenses() {
  const { toast } = useToastContext();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: expenses, isLoading, isError, error } = useQuery({
    queryKey: ['travel-expenses', searchTerm, currentPage],
    queryFn: async () => {
      let query = supabase
        .from('travel_expenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`trip_destination.ilike.%${searchTerm}%,trip_purpose.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return (data as unknown) as TravelExpense[];
    },
  });

  const filteredExpenses = expenses || [];
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const createExpense = useMutation({
    mutationFn: async (expenseData: {
      tripDestination: string;
      tripPurpose: string;
      startDate: string;
      endDate: string;
      expenseType: string;
      amount: number;
      currency: string;
      description?: string;
    }) => {
      const { data, error } = await supabase
        .from('travel_expenses')
        .insert({
          trip_destination: expenseData.tripDestination,
          trip_purpose: expenseData.tripPurpose,
          start_date: expenseData.startDate,
          end_date: expenseData.endDate,
          expense_type: expenseData.expenseType,
          amount: expenseData.amount,
          currency: expenseData.currency,
          description: expenseData.description,
          status: 'pending',
          user_id: null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['recent-activities'] });
      queryClient.invalidateQueries({ queryKey: ['travel-expense-stats'] });
      toast({
        title: 'Success!',
        description: 'Your travel expense has been submitted successfully.',
        variant: 'success'
      });
    },
    onError: (error) => {
      console.error('Error creating travel expense:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit travel expense. Please try again.',
        variant: 'destructive'
      });
    },
  });

  const updateExpense = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TravelExpense> }) => {
      const { error } = await supabase
        .from('travel_expenses')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-expenses'] });
      toast({
        title: 'Success!',
        description: 'Expense updated successfully.',
        variant: 'success'
      });
    },
    onError: (error) => {
      console.error('Error updating expense:', error);
      toast({
        title: 'Error',
        description: 'Failed to update expense.',
        variant: 'destructive'
      });
    },
  });

  const deleteExpense = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('travel_expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-expenses'] });
      toast({
        title: 'Success!',
        description: 'Expense deleted successfully.',
        variant: 'success'
      });
    },
    onError: (error) => {
      console.error('Error deleting expense:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete expense.',
        variant: 'destructive'
      });
    },
  });

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    expenses: paginatedExpenses,
    isLoading,
    isError,
    error,
    createExpense: createExpense.mutate,
    updateExpense: (id: string, data: Partial<TravelExpense>) => updateExpense.mutate({ id, data }),
    deleteExpense: deleteExpense.mutate,
    setSearchTerm,
    currentPage,
    totalPages,
    goToPage,
    isCreating: createExpense.isPending,
  };
}
