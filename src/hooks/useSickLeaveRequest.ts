
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SickLeaveRequest } from '@/hooks/useSickLeaveRequests';

export function useSickLeaveRequest(id: string) {
  const { data: request, isLoading, error } = useQuery({
    queryKey: ['sick-leave-request', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID provided');
      
      const { data, error } = await supabase
        .from('sick_leave_requests')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as SickLeaveRequest;
    },
    enabled: !!id,
  });

  return {
    request,
    isLoading,
    error
  };
}
