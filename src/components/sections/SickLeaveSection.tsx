
import React from 'react';
import { SickLeaveForm } from '@/components/forms/SickLeaveForm';
import { NavigationButtons } from '@/components/NavigationButtons';
import { useSickLeaveRequests } from '@/hooks/useSickLeaveRequests';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export function SickLeaveSection() {
  const { requests, isLoading } = useSickLeaveRequests();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sick Leave Request</h1>
          <p className="text-gray-600 mt-1">Submit your sick leave request</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>
      
      <SickLeaveForm />
      
      {/* Recent Sick Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sick Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-6">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="text-center py-6 text-gray-500">No sick leave requests found</div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <Link
                  key={request.id}
                  to={`/sick-leave/${request.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium capitalize">{request.leave_type} Leave</h3>
                    <Badge variant={request.status === 'approved' ? 'default' : 'secondary'}>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{format(new Date(request.start_date), 'PPP')} - {format(new Date(request.end_date), 'PPP')}</p>
                    {request.reason && <p className="mt-1">{request.reason}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
