import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { Sidebar } from '@/components/Sidebar';

describe('Sidebar Component', () => {
  const mockOnSectionChange = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSidebar = (activeSection = 'dashboard') => {
    return render(
      <Sidebar
        activeSection={activeSection}
        onSectionChange={mockOnSectionChange}
        onClose={mockOnClose}
      />
    );
  };

  it('renders the logo and app name', () => {
    renderSidebar();
    expect(screen.getByText('WorkLife Nexus')).toBeInTheDocument();
    expect(screen.getByText('Workplace Management')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('renders user information', () => {
    renderSidebar();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    renderSidebar();
    const menuItems = [
      'Dashboard',
      'Sick Leave',
      'Education & Social',
      'Corporate Travel',
      'Maintenance',
      'Asset Booking',
      'Expense Reports'
    ];

    menuItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('highlights active section', () => {
    const sections = [
      { id: 'dashboard', text: 'Dashboard' },
      { id: 'sick-leave', text: 'Sick Leave' },
      { id: 'education', text: 'Education & Social' },
      { id: 'travel', text: 'Corporate Travel' },
      { id: 'maintenance', text: 'Maintenance' },
      { id: 'asset-booking', text: 'Asset Booking' },
      { id: 'expenses', text: 'Expense Reports' }
    ];

    sections.forEach(section => {
      const { rerender } = renderSidebar(section.id);
      const button = screen.getByRole('button', { name: new RegExp(`${section.text}.*`, 'i') });
      expect(button).toHaveClass('bg-white/10');
      rerender(
        <Sidebar
          activeSection="different-section"
          onSectionChange={mockOnSectionChange}
          onClose={mockOnClose}
        />
      );
    });
  });

  it('shows/hides mobile menu button', () => {
    renderSidebar();
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('md:hidden');
  });

  it('calls onSectionChange with correct section for each menu item', async () => {
    const { user } = renderSidebar();
    const sections = [
      { text: 'Dashboard', value: 'dashboard' },
      { text: 'Sick Leave', value: 'sick-leave' },
      { text: 'Education & Social', value: 'education' },
      { text: 'Corporate Travel', value: 'travel' },
      { text: 'Maintenance', value: 'maintenance' },
      { text: 'Asset Booking', value: 'asset-booking' },
      { text: 'Expense Reports', value: 'expenses' }
    ];

    for (const section of sections) {
      const button = screen.getByRole('button', { name: new RegExp(`${section.text}.*`, 'i') });
      await user.click(button);
      expect(mockOnSectionChange).toHaveBeenCalledWith(section.value);
    }
  });

  it('handles footer button clicks', async () => {
    const { user } = renderSidebar();
    const footerButtons = [
      { name: /notifications/i, testId: 'notifications-btn' },
      { name: /settings/i, testId: 'settings-btn' },
      { name: /logout/i, testId: 'logout-btn' }
    ];

    for (const button of footerButtons) {
      const element = screen.getByTestId(button.testId);
      await user.click(element);
      expect(element).toHaveClass('text-white');
    }
  });

  it('has proper ARIA attributes', () => {
    renderSidebar();
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName();
    });
  });

  it('applies correct theme classes', () => {
    renderSidebar();
    const sidebar = screen.getByTestId('sidebar-container');
    expect(sidebar).toHaveClass('bg-[#2D3695]', 'text-white');
  });

  it('renders error boundary fallback', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };
    
    const { container } = render(
      <Sidebar
        activeSection="dashboard"
        onSectionChange={mockOnSectionChange}
        onClose={mockOnClose}
        errorBoundaryTestComponent={<ErrorComponent />}
      />
    );
    
    expect(container).toHaveTextContent('Something went wrong');
  });

  it('supports keyboard navigation', async () => {
    const { user } = renderSidebar();
    const firstButton = screen.getAllByRole('button')[0];
    firstButton.focus();
    
    await user.keyboard('[Tab]');
    expect(document.activeElement).not.toBe(firstButton);
  });
}); 