import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import { ContentArea } from '@/components/ContentArea';
import { server } from '../setup';
import { HttpResponse, http } from 'msw';

describe('ContentArea Component', () => {
  const mockOnSectionChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    server.use(
      http.get('/api/user/profile', () => {
        return HttpResponse.json({
          name: 'John Doe',
          role: 'Software Engineer',
          department: 'Engineering'
        });
      })
    );
  });

  // Section rendering tests
  const sections = [
    { id: 'dashboard', title: 'Welcome back' },
    { id: 'sick-leave', title: 'Sick Leave Management' },
    { id: 'education', title: 'Education & Social' },
    { id: 'travel', title: 'Corporate Travel' },
    { id: 'maintenance', title: 'Maintenance' },
    { id: 'asset-booking', title: 'Asset Booking' },
    { id: 'expenses', title: 'Expense Reports' }
  ];

  sections.forEach(section => {
    it(`renders ${section.id} section correctly`, () => {
      render(<ContentArea activeSection={section.id} onSectionChange={mockOnSectionChange} />);
      expect(screen.getByRole('heading', { name: new RegExp(section.title, 'i') })).toBeInTheDocument();
    });
  });

  // Loading states
  it('shows loading state when fetching data', async () => {
    server.use(
      http.get('/api/user/profile', async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return HttpResponse.json({});
      })
    );
    render(<ContentArea activeSection="dashboard" onSectionChange={mockOnSectionChange} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // Error states
  it('handles API errors gracefully', async () => {
    server.use(
      http.get('/api/user/profile', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<ContentArea activeSection="dashboard" onSectionChange={mockOnSectionChange} />);
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Something went wrong/i);
    });
  });

  // Section transitions
  it('handles section transitions', async () => {
    const { rerender } = render(
      <ContentArea activeSection="dashboard" onSectionChange={mockOnSectionChange} />
    );

    expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();

    rerender(<ContentArea activeSection="sick-leave" onSectionChange={mockOnSectionChange} />);
    expect(screen.getByRole('heading', { name: /Sick Leave Management/i })).toBeInTheDocument();
  });

  // Form submissions
  it('handles form submissions in different sections', async () => {
    const { user } = render(
      <ContentArea activeSection="sick-leave" onSectionChange={mockOnSectionChange} />
    );

    const submitButton = screen.getByRole('button', { name: /Submit Request/i });
    await user.click(submitButton);
    expect(mockOnSectionChange).toHaveBeenCalled();
  });

  // Mobile responsiveness
  it('applies mobile-responsive classes', () => {
    render(<ContentArea activeSection="dashboard" onSectionChange={mockOnSectionChange} />);
    const container = screen.getByRole('main');
    expect(container).toHaveClass('p-4', 'md:p-6', 'lg:p-8');
  });

  // Empty states
  it('shows empty states for each section', () => {
    sections.forEach(section => {
      const { rerender } = render(
        <ContentArea activeSection={section.id} onSectionChange={mockOnSectionChange} />
      );
      const content = screen.getByRole('region', { name: new RegExp(section.title, 'i') });
      expect(content).toBeInTheDocument();
      rerender(<ContentArea activeSection="dashboard" onSectionChange={mockOnSectionChange} />);
    });
  });

  // Accessibility
  it('has proper ARIA attributes', () => {
    render(<ContentArea activeSection="dashboard" onSectionChange={mockOnSectionChange} />);
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveAttribute('aria-label', 'Main content');
  });

  // Animation tests
  it('applies transition classes', () => {
    render(<ContentArea activeSection="dashboard" onSectionChange={mockOnSectionChange} />);
    const content = screen.getByRole('main');
    expect(content).toHaveClass('transition-all', 'duration-300');
  });

  // Error handling
  it('handles errors gracefully', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    const { container } = render(
      <ErrorComponent />
    );
    
    expect(container).toBeInTheDocument();
  });

  // Keyboard navigation
  it('supports keyboard navigation', async () => {
    const { user } = render(
      <ContentArea activeSection="dashboard" onSectionChange={mockOnSectionChange} />
    );
    
    const firstButton = screen.getAllByRole('button')[0];
    firstButton.focus();
    
    await user.keyboard('[Tab]');
    expect(document.activeElement).not.toBe(firstButton);
  });
}); 