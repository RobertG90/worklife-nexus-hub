
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SickLeaveForm } from '@/components/forms/SickLeaveForm';
import { useSickLeaveRequests } from '@/hooks/useSickLeaveRequests';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export function SickLeaveSection() {
  const { requests, isLoading } = useSickLeaveRequests();
  const navigate = useNavigate();

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const totalUsedDays = requests.reduce((total, request) => {
    return total + calculateDays(request.start_date, request.end_date);
  }, 0);

  const totalAllocation = 12;
  const remainingDays = totalAllocation - totalUsedDays;

  const handleRowClick = (requestId: string) => {
    navigate(`/sick-leave/${requestId}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <Heart className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sick Leave</h1>
          <p className="text-gray-600">Feeling under the weather? Submit your request and get some rest!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submit New Request */}
        <div className="lg:col-span-2">
          <SickLeaveForm />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Leave Balance */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Leave Balance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sick Days Remaining</span>
                <Badge variant="secondary">{remainingDays} days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Used This Year</span>
                <span className="text-gray-900">{totalUsedDays} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Allocation</span>
                <span className="text-gray-900">{totalAllocation} days</span>
              </div>
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Tips</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Submit requests as early as possible</span>
              </div>
              <div className="flex items-start space-x-2">
                <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Medical certificates required for 3+ days</span>
              </div>
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Automatic calendar blocking</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Requests */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Sick Leave Requests</h2>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading your requests...</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No sick leave requests yet. Submit your first request above!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date Range</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => {
                  const days = calculateDays(request.start_date, request.end_date);
                  return (
                    <tr 
                      key={request.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleRowClick(request.id)}
                    >
                      <td className="py-3 px-4 text-gray-900">
                        {format(new Date(request.start_date), 'MMM dd')} - {format(new Date(request.end_date), 'MMM dd, yyyy')}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{days} day{days > 1 ? 's' : ''}</td>
                      <td className="py-3 px-4 text-gray-600 capitalize">{request.leave_type}</td>
                      <td className="py-3 px-4 text-gray-600">{request.reason || 'No reason provided'}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {request.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
