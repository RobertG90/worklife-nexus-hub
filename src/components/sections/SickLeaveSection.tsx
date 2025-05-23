
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SickLeaveForm } from '@/components/forms/SickLeaveForm';

export function SickLeaveSection() {
  const recentRequests = [
    { id: 1, date: '2024-01-15', days: 2, status: 'approved', reason: 'Flu symptoms' },
    { id: 2, date: '2024-01-08', days: 1, status: 'approved', reason: 'Medical appointment' },
    { id: 3, date: '2023-12-20', days: 3, status: 'approved', reason: 'Food poisoning' },
  ];

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
                <Badge variant="secondary">8 days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Used This Year</span>
                <span className="text-gray-900">4 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Allocation</span>
                <span className="text-gray-900">12 days</span>
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
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Sick Leave Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{request.date}</td>
                  <td className="py-3 px-4 text-gray-600">{request.days} day{request.days > 1 ? 's' : ''}</td>
                  <td className="py-3 px-4 text-gray-600">{request.reason}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800">{request.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
