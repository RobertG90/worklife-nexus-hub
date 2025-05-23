import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import { Dashboard } from '@/components/Dashboard';
import { server } from '../setup';
import { HttpResponse, http } from 'msw';

describe('Dashboard Component', () => {
  const mockOnSectionChange = vi.fn();

  // Mock data
  const mockStats = {
    pendingRequests: 5,
    approvedItems: 12,
    monthlyExpenses: 1500.50,
    upcomingBookings: 3
  };

  const mockActivities = [
    {
      id: 1,
      title: 'Sick Leave Request',
      date: '2024-03-20',
      status: 'pending',
      type: 'sick-leave'
    },
    {
      id: 2,
      title: 'Travel Expense',
      date: '2024-03-19',
      status: 'approved',
      type: 'expense'
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    server.use(
      http.get('/api/dashboard/stats', () => {
        return HttpResponse.json(mockStats);
      }),
      http.get('/api/dashboard/activities', () => {
        return HttpResponse.json(mockActivities);
      })
    );
  });

  // Basic rendering tests
  it('renders welcome message', () => {
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  it('displays quick stats correctly', async () => {
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('$1,500.50')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  // Error handling tests
  it('handles API error for stats', async () => {
    server.use(
      http.get('/api/dashboard/stats', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    await waitFor(() => {
      expect(screen.getByText(/Error loading stats/i)).toBeInTheDocument();
    });
  });

  it('handles API error for activities', async () => {
    server.use(
      http.get('/api/dashboard/activities', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    await waitFor(() => {
      expect(screen.getByText(/Error loading activities/i)).toBeInTheDocument();
    });
  });

  // Empty state tests
  it('handles empty activities list', async () => {
    server.use(
      http.get('/api/dashboard/activities', () => {
        return HttpResponse.json([]);
      })
    );
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    await waitFor(() => {
      expect(screen.getByText(/No recent activities/i)).toBeInTheDocument();
    });
  });

  it('handles null stats response', async () => {
    server.use(
      http.get('/api/dashboard/stats', () => {
        return HttpResponse.json(null);
      })
    );
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    await waitFor(() => {
      expect(screen.getByText(/No stats available/i)).toBeInTheDocument();
    });
  });

  // Interaction tests
  it('handles quick action clicks', async () => {
    const { user } = render(<Dashboard onSectionChange={mockOnSectionChange} />);
    const buttons = [
      { text: 'Submit Sick Leave', section: 'sick-leave' },
      { text: 'Book Travel', section: 'travel' },
      { text: 'Submit Expense', section: 'expenses' },
      { text: 'Book Asset', section: 'asset-booking' }
    ];

    for (const button of buttons) {
      const element = screen.getByRole('button', { name: button.text });
      await user.click(element);
      expect(mockOnSectionChange).toHaveBeenCalledWith(button.section);
    }
  });

  // Loading state tests
  it('shows loading states', () => {
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    expect(screen.getAllByRole('progressbar')).toHaveLength(4);
  });

  // Responsive layout tests
  it('applies responsive classes', () => {
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    const grid = screen.getByRole('grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4');
  });

  // Animation tests
  it('applies hover animations to cards', () => {
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    const cards = screen.getAllByRole('article');
    cards.forEach(card => {
      expect(card).toHaveClass('hover:scale-[1.02]', 'transition-all');
    });
  });

  // Accessibility tests
  it('has accessible buttons and links', () => {
    render(<Dashboard onSectionChange={mockOnSectionChange} />);
    const buttons = screen.getAllByRole('button');
    const links = screen.getAllByRole('link');
    
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href');
    });
  });
}); 