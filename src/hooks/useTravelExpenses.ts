
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToastContext } from '@/components/ui/toast-provider';

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

  const { data: expenses, isLoading } = useQuery({
    queryKey: ['travel-expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('travel_expenses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data as unknown) as TravelExpense[];
    },
  });

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
          user_id: null, // No authentication required
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

  return {
    expenses: expenses || [],
    isLoading,
    createExpense: createExpense.mutate,
    isCreating: createExpense.isPending,
  };
}
