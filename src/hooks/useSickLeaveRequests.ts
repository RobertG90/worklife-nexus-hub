
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToastContext } from '@/components/ui/toast-provider';

export interface SickLeaveRequest {
  id: string;
  start_date: string;
  end_date: string;
  leave_type: string;
  reason: string;
  status: string;
  created_at: string;
  user_id: string;
}

export function useSickLeaveRequests() {
  const { toast } = useToastContext();
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['sick-leave-requests'],
    queryFn: async () => {
      // Use type assertion to handle the table access
      const { data, error } = await supabase
        .from('sick_leave_requests' as any)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      // Add a double type assertion to safely convert the data
      return (data as unknown) as SickLeaveRequest[];
    },
  });

  const createRequest = useMutation({
    mutationFn: async (requestData: {
      startDate: string;
      endDate: string;
      leaveType: string;
      reason: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('sick_leave_requests' as any)
        .insert({
          start_date: requestData.startDate,
          end_date: requestData.endDate,
          leave_type: requestData.leaveType,
          reason: requestData.reason,
          status: 'pending',
          user_id: user.id,
        } as any)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sick-leave-requests'] });
      toast({
        title: 'Success!',
        description: 'Your sick leave request has been submitted and saved to the database.',
        variant: 'success'
      });
    },
    onError: (error) => {
      console.error('Error creating sick leave request:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit sick leave request. Please try again.',
        variant: 'destructive'
      });
    },
  });

  return {
    requests: requests || [],
    isLoading,
    createRequest: createRequest.mutate,
    isCreating: createRequest.isPending,
  };
}
