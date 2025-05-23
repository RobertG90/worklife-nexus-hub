
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SickLeaveRequest } from '@/hooks/useSickLeaveRequests';
import { TravelExpense } from '@/hooks/useTravelExpenses';

export function useDashboardData() {
  // Fetch recent activities from both sick leave and travel expenses
  const { data: recentActivities, isLoading: isActivitiesLoading } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      // Fetch sick leave requests
      const { data: sickLeaveData, error: sickLeaveError } = await supabase
        .from('sick_leave_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (sickLeaveError) throw sickLeaveError;
      
      // Fetch travel expenses
      const { data: travelExpenseData, error: travelExpenseError } = await supabase
        .from('travel_expenses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (travelExpenseError) throw travelExpenseError;
      
      // Transform sick leave data
      const sickLeaveActivities = (sickLeaveData || []).map((request: SickLeaveRequest) => ({
        id: request.id,
        type: 'sick-leave',
        title: `${request.leave_type.charAt(0).toUpperCase() + request.leave_type.slice(1)} Leave Request`,
        status: request.status,
        date: formatRelativeTime(new Date(request.created_at)),
        section: 'sick-leave'
      }));

      // Transform travel expense data
      const travelExpenseActivities = (travelExpenseData || []).map((expense: TravelExpense) => ({
        id: expense.id,
        type: 'travel-expense',
        title: `${expense.expense_type.charAt(0).toUpperCase() + expense.expense_type.slice(1)} Expense - ${expense.trip_destination}`,
        status: expense.status,
        date: formatRelativeTime(new Date(expense.created_at)),
        section: 'travel'
      }));

      // Combine and sort by date
      const allActivities = [...sickLeaveActivities, ...travelExpenseActivities];
      allActivities.sort((a, b) => {
        const aData = sickLeaveData?.find(item => item.id === a.id) || travelExpenseData?.find(item => item.id === a.id);
        const bData = sickLeaveData?.find(item => item.id === b.id) || travelExpenseData?.find(item => item.id === b.id);
        return new Date(bData?.created_at || 0).getTime() - new Date(aData?.created_at || 0).getTime();
      });

      return allActivities.slice(0, 4); // Return top 4 most recent
    },
  });

  // Fetch stats for quick stats section
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch sick leave stats
      const { count: sickLeavePendingCount, error: sickLeavePendingError } = await supabase
        .from('sick_leave_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (sickLeavePendingError) throw sickLeavePendingError;
      
      const { count: sickLeaveApprovedCount, error: sickLeaveApprovedError } = await supabase
        .from('sick_leave_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');
      
      if (sickLeaveApprovedError) throw sickLeaveApprovedError;

      // Fetch travel expense stats
      const { count: travelExpensePendingCount, error: travelExpensePendingError } = await supabase
        .from('travel_expenses')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (travelExpensePendingError) throw travelExpensePendingError;

      // Calculate total expenses amount for this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      const { data: thisMonthExpenses, error: thisMonthExpensesError } = await supabase
        .from('travel_expenses')
        .select('amount, currency')
        .gte('created_at', startOfMonth.toISOString());
      
      if (thisMonthExpensesError) throw thisMonthExpensesError;

      // Sum up expenses (assuming USD for simplicity)
      const totalMonthlyExpenses = (thisMonthExpenses || []).reduce((sum, expense) => sum + expense.amount, 0);

      return {
        pendingRequests: (sickLeavePendingCount || 0) + (travelExpensePendingCount || 0),
        approvedItems: sickLeaveApprovedCount || 0,
        monthlyExpenses: totalMonthlyExpenses
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
