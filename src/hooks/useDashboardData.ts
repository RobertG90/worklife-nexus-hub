
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SickLeaveRequest } from '@/hooks/useSickLeaveRequests';

export function useDashboardData() {
  // Fetch recent sick leave requests
  const { data: recentActivities, isLoading: isActivitiesLoading } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      const { data: sickLeaveData, error: sickLeaveError } = await supabase
        .from('sick_leave_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (sickLeaveError) throw sickLeaveError;
      
      // Transform the data into the format needed for the Dashboard
      return (sickLeaveData || []).map((request: SickLeaveRequest) => {
        return {
          id: request.id,
          type: 'sick-leave',
          title: `${request.leave_type.charAt(0).toUpperCase() + request.leave_type.slice(1)} Leave Request`,
          status: request.status,
          date: formatRelativeTime(new Date(request.created_at)),
          section: 'sick-leave'
        };
      });
    },
  });

  // Fetch stats for quick stats section
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['sick-leave-stats'],
    queryFn: async () => {
      // Fetch pending requests count
      const { count: pendingCount, error: pendingError } = await supabase
        .from('sick_leave_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (pendingError) throw pendingError;
      
      // Fetch approved requests count
      const { count: approvedCount, error: approvedError } = await supabase
        .from('sick_leave_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');
      
      if (approvedError) throw approvedError;

      return {
        pendingRequests: pendingCount || 0,
        approvedItems: approvedCount || 0
      };
    }
  });

  return {
    recentActivities: recentActivities || [],
    isActivitiesLoading,
    stats,
    isStatsLoading
  };
}

// Helper function to format relative time (e.g., "2 hours ago")
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
}
