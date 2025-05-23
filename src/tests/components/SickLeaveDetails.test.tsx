import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import { SickLeaveDetails } from '@/components/SickLeaveDetails';
import { server } from '../setup';
import { HttpResponse, http } from 'msw';

describe('SickLeaveDetails Component', () => {
  const mockNavigate = vi.fn();
  const mockParams = { id: '1' };

  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
      useParams: () => mockParams
    };
  });

  const mockSickLeave = {
    id: 1,
    employeeId: 'emp123',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    reason: 'Flu symptoms',
    status: 'pending',
    documents: ['medical-cert.pdf'],
    notes: 'Will work remotely if feeling better',
    createdAt: '2024-03-19T10:00:00Z',
    updatedAt: '2024-03-19T10:00:00Z'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    server.use(
      http.get('/api/sick-leave/:id', () => {
        return HttpResponse.json(mockSickLeave);
      })
    );
  });

  // Basic rendering
  it('renders sick leave details', async () => {
    render(<SickLeaveDetails />);
    await waitFor(() => {
      expect(screen.getByText(/Sick Leave Details/i)).toBeInTheDocument();
      expect(screen.getByText(mockSickLeave.reason)).toBeInTheDocument();
      expect(screen.getByText(/March 20, 2024/)).toBeInTheDocument();
    });
  });

  // Loading state
  it('shows loading state initially', () => {
    render(<SickLeaveDetails />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  // Error state
  it('handles API error', async () => {
    server.use(
      http.get('/api/sick-leave/:id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<SickLeaveDetails />);
    await waitFor(() => {
      expect(screen.getByText(/Error loading sick leave details/i)).toBeInTheDocument();
    });
  });

  // Not found state
  it('handles non-existent sick leave', async () => {
    server.use(
      http.get('/api/sick-leave/:id', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );
    render(<SickLeaveDetails />);
    await waitFor(() => {
      expect(screen.getByText(/Sick leave not found/i)).toBeInTheDocument();
    });
  });

  // Status display
  it('displays correct status badge', async () => {
    const statuses = ['pending', 'approved', 'rejected'];
    for (const status of statuses) {
      server.use(
        http.get('/api/sick-leave/:id', () => {
          return HttpResponse.json({ ...mockSickLeave, status });
        })
      );
      const { rerender } = render(<SickLeaveDetails />);
      await waitFor(() => {
        expect(screen.getByTestId(`status-badge-${status}`)).toBeInTheDocument();
      });
      rerender(<></>);
    }
  });

  // Document handling
  it('renders document list', async () => {
    render(<SickLeaveDetails />);
    await waitFor(() => {
      mockSickLeave.documents.forEach(doc => {
        expect(screen.getByText(doc)).toBeInTheDocument();
      });
    });
  });

  // Navigation
  it('navigates back on button click', async () => {
    const { user } = render(<SickLeaveDetails />);
    const backButton = screen.getByText(/Back to Sick Leave/i);
    await user.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/sick-leave');
  });

  // Edit functionality
  it('shows edit button for pending requests', async () => {
    render(<SickLeaveDetails />);
    await waitFor(() => {
      const editButton = screen.getByText(/Edit Request/i);
      expect(editButton).toBeInTheDocument();
    });
  });

  // Timeline
  it('displays timeline information', async () => {
    render(<SickLeaveDetails />);
    await waitFor(() => {
      expect(screen.getByText(/Timeline/i)).toBeInTheDocument();
      expect(screen.getByText('Request Submitted')).toBeInTheDocument();
    });
  });

  // Accessibility
  it('has proper ARIA attributes', async () => {
    render(<SickLeaveDetails />);
    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(main).toHaveAttribute('aria-label', 'Sick leave details');
    });
  });

  // Mobile responsiveness
  it('applies responsive classes', async () => {
    render(<SickLeaveDetails />);
    await waitFor(() => {
      const container = screen.getByTestId('sick-leave-details');
      expect(container).toHaveClass('p-4', 'md:p-6', 'lg:p-8');
    });
  });

  // Error boundary
  it('renders error boundary fallback', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    render(<SickLeaveDetails errorBoundaryTest={<ErrorComponent />} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
}); 