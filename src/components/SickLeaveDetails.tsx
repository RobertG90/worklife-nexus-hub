
import React, { ErrorInfo, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSickLeaveRequest } from '@/hooks/useSickLeaveRequest';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error boundary component for handling errors
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error in component:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

interface SickLeaveDetailsProps {
  errorBoundaryTest?: ReactNode;
}

export function SickLeaveDetails({ errorBoundaryTest }: SickLeaveDetailsProps) {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { request, isLoading, error } = useSickLeaveRequest(params.id || '');

  // Error boundary test
  if (errorBoundaryTest) {
    throw new Error('Test error');
  }

  const handleBack = () => {
    navigate('/sick-leave');
  };

  if (isLoading) {
    return (
      <div data-testid="loading-spinner" className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    // Check if it's a 404 error
    if ((error as any)?.status === 404) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Sick leave not found</AlertTitle>
          <AlertDescription>The sick leave request you're looking for doesn't exist.</AlertDescription>
        </Alert>
      );
    }
    
    return (
      <Alert variant="destructive">
        <AlertTitle>Error loading sick leave details</AlertTitle>
        <AlertDescription>Please try again later.</AlertDescription>
      </Alert>
    );
  }

  if (!request) {
    return (
      <Alert variant="destructive">
        <AlertTitle>No data available</AlertTitle>
        <AlertDescription>Unable to load sick leave details.</AlertDescription>
      </Alert>
    );
  }

  const startDate = new Date(request.start_date);
  const endDate = new Date(request.end_date);

  return (
    <main role="main" aria-label="Sick leave details">
      <div data-testid="sick-leave-details" className="p-4 md:p-6 lg:p-8">
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Sick Leave Details</h1>
              <p className="text-gray-500">Request #{request.id}</p>
            </div>
            <Button onClick={handleBack}>Back to Sick Leave</Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-medium">Status:</span>{' '}
                <Badge data-testid={`status-badge-${request.status}`} variant={request.status === 'approved' ? 'default' : 'secondary'}>
                  {request.status}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Leave Type:</span>{' '}
                <span className="capitalize">{request.leave_type}</span>
              </div>
              <div>
                <span className="font-medium">Start Date:</span>{' '}
                <span>{format(startDate, 'MMMM d, yyyy')}</span>
              </div>
              <div>
                <span className="font-medium">End Date:</span>{' '}
                <span>{format(endDate, 'MMMM d, yyyy')}</span>
              </div>
              <div>
                <span className="font-medium">Reason:</span>{' '}
                <p>{request.reason || 'No reason provided'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Request Submitted</p>
                    <p className="text-sm text-gray-500">{format(new Date(request.created_at), 'MMMM d, yyyy')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {request.status === 'pending' && (
            <div className="mt-6">
              <Button>Edit Request</Button>
            </div>
          )}
          
          {errorBoundaryTest}
        </ErrorBoundary>
      </div>
    </main>
  );
}
