import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SickLeaveRequest } from '@/hooks/useSickLeaveRequests';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { NavigationButtons } from '@/components/NavigationButtons';

export default function SickLeaveDetails() {
  const params = useParams<{ id: string }>();
  const { data: request, isLoading, isError } = useQuery({
    queryKey: ['sick-leave-request', params.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sick_leave_requests')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as SickLeaveRequest;
    },
    enabled: !!params.id,
  });

  if (isLoading) {
    return <div className="text-center py-6">Loading request details...</div>;
  }

  if (isError) {
    return <div className="text-center py-6">Error loading request details.</div>;
  }

  if (!request) {
    return <div className="text-center py-6">Request not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sick Leave Request Details</h1>
            <p className="text-gray-600 mt-1">Request #{params.id}</p>
          </div>
          <NavigationButtons />
        </div>
        
        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {request.leave_type.charAt(0).toUpperCase() + request.leave_type.slice(1)} Leave
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Status:</span>
              <Badge 
                variant={request.status === 'approved' ? 'default' : 'secondary'}
                className={
                  request.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                  request.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                  'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }
              >
                {request.status}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Start Date:</span>
              <p>{format(new Date(request.start_date), 'PPP')}</p>
            </div>
            <div>
              <span className="font-medium">End Date:</span>
              <p>{format(new Date(request.end_date), 'PPP')}</p>
            </div>
            <div>
              <span className="font-medium">Reason:</span>
              <p>{request.reason}</p>
            </div>
            {request.additional_notes && (
              <div>
                <span className="font-medium">Additional Notes:</span>
                <p>{request.additional_notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
