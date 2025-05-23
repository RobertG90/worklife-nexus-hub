import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SickLeaveDetails from '../SickLeaveDetails';
import { server } from '../../tests/setup';
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
    notes: 'Will work remotely if needed',
    timeline: [
      {
        id: 1,
        date: '2024-03-19',
        status: 'submitted',
        description: 'Request Submitted'
      }
    ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
    server.use(
      http.get('/api/sick-leave/:id', () => {
        return HttpResponse.json(mockSickLeave);
      })
    );
  });

  it('displays loading state initially', () => {
    server.use(
      http.get('/api/sick-leave/:id', async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return HttpResponse.json(mockSickLeave);
      })
    );

    render(<SickLeaveDetails />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows sick leave details after loading', async () => {
    render(<SickLeaveDetails />);

    await waitFor(() => {
      // Check basic information
      expect(screen.getByRole('heading', { name: /Sick Leave Request/i })).toBeInTheDocument();
      expect(screen.getByText(mockSickLeave.reason)).toBeInTheDocument();
      expect(screen.getByText(mockSickLeave.notes)).toBeInTheDocument();
    });

    // Check dates
    expect(screen.getByText(new RegExp(mockSickLeave.startDate))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockSickLeave.endDate))).toBeInTheDocument();

    // Check status
    expect(screen.getByText(new RegExp(mockSickLeave.status, 'i'))).toBeInTheDocument();
  });

  it('displays timeline information', async () => {
    render(<SickLeaveDetails />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Timeline/i })).toBeInTheDocument();
      expect(screen.getByText('Request Submitted')).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockSickLeave.timeline[0].date))).toBeInTheDocument();
    });
  });

  it('shows edit button for pending requests', async () => {
    render(<SickLeaveDetails />);

    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /Edit Request/i });
      expect(editButton).toBeInTheDocument();
      expect(editButton).not.toBeDisabled();
    });
  });

  it('handles API errors gracefully', async () => {
    server.use(
      http.get('/api/sick-leave/:id', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<SickLeaveDetails />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Error loading sick leave details/i);
    });
  });

  it('handles not found errors', async () => {
    server.use(
      http.get('/api/sick-leave/:id', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    render(<SickLeaveDetails />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Sick Leave Not Found/i })).toBeInTheDocument();
      expect(screen.getByText(/The sick leave request you're looking for doesn't exist/i)).toBeInTheDocument();
    });
  });

  it('navigates back on button click', async () => {
    const user = userEvent.setup();
    render(<SickLeaveDetails />);

    await waitFor(() => {
      const backButton = screen.getByRole('button', { name: /Back to Sick Leave/i });
      expect(backButton).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /Back to Sick Leave/i });
    await user.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/sick-leave');
  });

  it('shows document list', async () => {
    render(<SickLeaveDetails />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Documents/i })).toBeInTheDocument();
      expect(screen.getByText('medical-cert.pdf')).toBeInTheDocument();
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<SickLeaveDetails />);

    await waitFor(() => {
      const editButton = screen.getByRole('button', { name: /Edit Request/i });
      editButton.focus();
    });

    await user.keyboard('[Tab]');
    expect(document.activeElement).not.toBe(screen.getByRole('button', { name: /Edit Request/i }));
  });
}); 