
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, FileText, Heart, User } from 'lucide-react';
import { useSickLeaveRequest } from '@/hooks/useSickLeaveRequest';
import { format, differenceInDays } from 'date-fns';

const SickLeaveDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { request, isLoading, error } = useSickLeaveRequest(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sick leave details...</p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sick Leave Not Found</h1>
          <p className="text-gray-600 mb-6">The sick leave request you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/sick-leave')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sick Leave
          </Button>
        </div>
      </div>
    );
  }

  const startDate = new Date(request.start_date);
  const endDate = new Date(request.end_date);
  const duration = differenceInDays(endDate, startDate) + 1;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/sick-leave')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sick Leave
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sick Leave Details</h1>
              <p className="text-gray-600">Request #{request.id.slice(0, 8)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Overview */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <div className="flex items-center space-x-2 text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{format(startDate, 'EEEE, MMMM do, yyyy')}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <div className="flex items-center space-x-2 text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{format(endDate, 'EEEE, MMMM do, yyyy')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <div className="flex items-center space-x-2 text-gray-900">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{duration} day{duration > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <Badge variant="outline" className="capitalize">
                        {request.leave_type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Reason */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reason</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  {request.reason || 'No reason provided'}
                </p>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Request Submitted</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(request.created_at), 'MMM dd, yyyy at h:mm a')}
                    </p>
                  </div>
                </div>
                
                {request.status === 'approved' && (
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Request Approved</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(request.updated_at), 'MMM dd, yyyy at h:mm a')}
                      </p>
                    </div>
                  </div>
                )}
                
                {request.status === 'rejected' && (
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Request Rejected</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(request.updated_at), 'MMM dd, yyyy at h:mm a')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Current Status</h3>
              <Badge 
                className={`text-sm px-3 py-1 ${
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}
              >
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </Card>

            {/* Request Info */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Request Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Request ID</span>
                  <span className="text-gray-900 font-mono text-sm">
                    {request.id.slice(0, 8)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="text-gray-900">
                    {format(new Date(request.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="text-gray-900">
                    {format(new Date(request.updated_at), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/sick-leave">View All Requests</Link>
                </Button>
                {request.status === 'pending' && (
                  <Button variant="outline" className="w-full">
                    Edit Request
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SickLeaveDetails;
