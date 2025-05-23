import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from '../Dashboard';
import { render } from '@/test/utils';
import { supabase } from '@/integrations/supabase/client';

describe('Dashboard Component', () => {
  it('renders welcome message', () => {
    render(<Dashboard onSectionChange={() => {}} />);
    expect(screen.getByText(/Welcome back, John!/i)).toBeInTheDocument();
  });

  it('displays quick stats', async () => {
    render(<Dashboard onSectionChange={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText('Pending Requests')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('Approved Items')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  it('shows recent activities', async () => {
    // Mock recent activities
    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => ({
          limit: vi.fn(() => ({
            data: [{
              id: '1',
              start_date: '2024-03-20',
              end_date: '2024-03-22',
              status: 'pending',
              leave_type: 'sick',
              reason: 'Flu',
              created_at: '2024-03-19T10:00:00Z',
              updated_at: '2024-03-19T10:00:00Z'
            }],
            error: null
          }))
        }))
      }))
    }));

    render(<Dashboard onSectionChange={() => {}} />);
    
    await waitFor(() => {
      expect(screen.getByText(/Sick Leave Request/i)).toBeInTheDocument();
      expect(screen.getByText(/pending/i)).toBeInTheDocument();
    });
  });

  it('shows quick actions', async () => {
    const mockOnSectionChange = vi.fn();
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    
    const sickLeaveButton = screen.getByText('Submit Sick Leave');
    await userEvent.click(sickLeaveButton);
    
    expect(mockOnSectionChange).toHaveBeenCalledWith('sick-leave');
  });

  it('shows automation rate and system status', () => {
    render(<Dashboard onSectionChange={() => {}} />);
    
    expect(screen.getByText('98% automation rate')).toBeInTheDocument();
    expect(screen.getByText('All systems operational')).toBeInTheDocument();
  });
}); 