import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

// Mock data
const mockData = {
  sick_leave_requests: [{
    id: '1',
    start_date: '2024-03-20',
    end_date: '2024-03-22',
    status: 'pending',
    leave_type: 'sick',
    reason: 'Flu',
    created_at: '2024-03-19T10:00:00Z',
    updated_at: '2024-03-19T10:00:00Z'
  }],
  travel_expenses: [],
  trip_bookings: []
};

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn((table) => {
      const createSelectResponse = (data: any) => ({
        data,
        error: null,
        count: data?.length || 0
      });

      const createSingleResponse = (data: any) => ({
        data: data?.[0] || null,
        error: data?.[0] ? null : { message: 'Not found' }
      });

      return {
        select: vi.fn((columns?: string, options?: { count?: string }) => {
          if (options?.count === 'exact') {
            return {
              eq: vi.fn(() => ({
                data: null,
                count: table === 'sick_leave_requests' ? 10 : 0,
                error: null
              })),
              gte: vi.fn(() => ({
                data: null,
                count: 0,
                error: null
              }))
            };
          }

          return {
            eq: vi.fn(() => ({
              single: vi.fn(() => createSingleResponse(mockData[table as keyof typeof mockData]))
            })),
            order: vi.fn(() => ({
              limit: vi.fn(() => createSelectResponse(mockData[table as keyof typeof mockData]))
            })),
            gte: vi.fn(() => createSelectResponse(mockData[table as keyof typeof mockData]))
          };
        }),
        order: vi.fn(() => ({
          limit: vi.fn(() => createSelectResponse(mockData[table as keyof typeof mockData]))
        }))
      };
    })
  }
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

interface RenderOptions {
  route?: string;
  queryClient?: QueryClient;
}

function render(
  ui: React.ReactElement,
  { route = '/', queryClient = createTestQueryClient() }: RenderOptions = {}
) {
  window.history.pushState({}, 'Test page', route);

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { render }; 