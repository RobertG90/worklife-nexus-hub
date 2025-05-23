import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock sick leave requests
  http.get('/api/sick-leave', () => {
    return HttpResponse.json([
      {
        id: '1',
        start_date: '2024-03-20',
        end_date: '2024-03-22',
        status: 'pending',
        leave_type: 'sick',
        reason: 'Flu',
        created_at: '2024-03-19T10:00:00Z',
        updated_at: '2024-03-19T10:00:00Z'
      }
    ]);
  }),

  http.get('/api/sick-leave/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      start_date: '2024-03-20',
      end_date: '2024-03-22',
      status: 'pending',
      leave_type: 'sick',
      reason: 'Flu',
      created_at: '2024-03-19T10:00:00Z',
      updated_at: '2024-03-19T10:00:00Z'
    });
  }),

  // Mock dashboard stats
  http.get('/api/dashboard/stats', () => {
    return HttpResponse.json({
      pendingRequests: 2,
      approvedItems: 5,
      monthlyExpenses: 1250.50,
      upcomingBookings: 3
    });
  }),

  // Mock recent activities
  http.get('/api/dashboard/activities', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'Sick Leave Request',
        date: '2024-03-19T10:00:00Z',
        status: 'pending',
        type: 'sick-leave',
        section: 'sick-leave'
      }
    ]);
  })
]; 