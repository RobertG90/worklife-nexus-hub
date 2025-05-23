import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SickLeaveDetails from '../SickLeaveDetails';
import { render } from '@/test/utils';
import { supabase } from '@/integrations/supabase/client';

describe('SickLeaveDetails Component', () => {
  beforeEach(() => {
    // Reset history before each test
    window.history.pushState({}, '', '/');
  });

  it('displays loading state initially', async () => {
    // Mock loading state
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => new Promise(() => {})) // Never resolves to simulate loading
        }))
      }))
    }));

    render(<SickLeaveDetails />);
    expect(screen.getByText(/Loading sick leave details/i)).toBeInTheDocument();
  });

  it('shows error state for non-existent sick leave', async () => {
    // Mock error response
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: null,
            error: { message: 'Not found' }
          }))
        }))
      }))
    }));

    render(<SickLeaveDetails />, { route: '/sick-leave/999' });

    await waitFor(() => {
      expect(screen.getByText('Sick Leave Not Found')).toBeInTheDocument();
      expect(
        screen.getByText("The sick leave request you're looking for doesn't exist.")
      ).toBeInTheDocument();
    });
  });

  it('shows sick leave details after loading', async () => {
    // Mock successful response
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              id: '1',
              start_date: '2024-03-20',
              end_date: '2024-03-22',
              status: 'pending',
              leave_type: 'sick',
              reason: 'Flu',
              created_at: '2024-03-19T10:00:00Z',
              updated_at: '2024-03-19T10:00:00Z'
            },
            error: null
          }))
        }))
      }))
    }));

    render(<SickLeaveDetails />, { route: '/sick-leave/1' });

    await waitFor(() => {
      // Check basic information
      expect(screen.getByText(/Sick Leave Details/i)).toBeInTheDocument();
      expect(screen.getByText(/Request #1/i)).toBeInTheDocument();
      
      // Check dates
      expect(screen.getByText(/Wednesday, March 20th, 2024/i)).toBeInTheDocument();
      expect(screen.getByText(/Friday, March 22nd, 2024/i)).toBeInTheDocument();
      
      // Check status and type
      expect(screen.getByText(/pending/i)).toBeInTheDocument();
      expect(screen.getByText(/sick/i)).toBeInTheDocument();
      
      // Check reason
      expect(screen.getByText('Flu')).toBeInTheDocument();
    });
  });

  it('displays timeline information', async () => {
    // Mock successful response
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              id: '1',
              start_date: '2024-03-20',
              end_date: '2024-03-22',
              status: 'pending',
              leave_type: 'sick',
              reason: 'Flu',
              created_at: '2024-03-19T10:00:00Z',
              updated_at: '2024-03-19T10:00:00Z'
            },
            error: null
          }))
        }))
      }))
    }));

    render(<SickLeaveDetails />, { route: '/sick-leave/1' });

    await waitFor(() => {
      expect(screen.getByText(/Timeline/i)).toBeInTheDocument();
      expect(screen.getByText('Request Submitted')).toBeInTheDocument();
      expect(screen.getByText(/Mar 19, 2024 at/i)).toBeInTheDocument();
    });
  });

  it('shows edit button for pending requests', async () => {
    // Mock successful response
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              id: '1',
              start_date: '2024-03-20',
              end_date: '2024-03-22',
              status: 'pending',
              leave_type: 'sick',
              reason: 'Flu',
              created_at: '2024-03-19T10:00:00Z',
              updated_at: '2024-03-19T10:00:00Z'
            },
            error: null
          }))
        }))
      }))
    }));

    render(<SickLeaveDetails />, { route: '/sick-leave/1' });

    await waitFor(() => {
      const editButton = screen.getByText(/Edit Request/i);
      expect(editButton).toBeInTheDocument();
      expect(editButton).toBeEnabled();
    });
  });
}); 