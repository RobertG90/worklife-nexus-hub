
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wrench, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MaintenanceForm } from '@/components/forms/MaintenanceForm';

export function MaintenanceSection() {
  const recentReports = [
    { id: 1, issue: 'Flickering lights in Conference Room B', location: 'Floor 2', status: 'in-progress', priority: 'medium', date: '2024-01-20' },
    { id: 2, issue: 'Broken AC in Office 205', location: 'Floor 2', status: 'resolved', priority: 'high', date: '2024-01-18' },
    { id: 3, issue: 'Leaky faucet in Kitchen', location: 'Floor 1', status: 'pending', priority: 'low', date: '2024-01-19' },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Wrench className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Maintenance Issues</h1>
          <p className="text-gray-600 text-sm md:text-base">Report facility issues and let our team work their magic!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
        {/* Report New Issue */}
        <div className="lg:col-span-2">
          <MaintenanceForm />
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Emergency Contacts */}
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 flex items-center text-sm md:text-base">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-500 mr-2" />
              Emergency Contacts
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <p className="font-medium text-gray-900">Security Emergency</p>
                <p className="text-red-600 font-bold">📞 911</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Building Emergency</p>
                <p className="text-blue-600 font-bold">📞 (555) 123-4567</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">IT Support</p>
                <p className="text-green-600 font-bold">📞 (555) 123-4568</p>
              </div>
            </div>
          </Card>

          {/* Response Times */}
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Expected Response Times</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-red-600">Emergency</span>
                <span className="font-medium">&lt; 1 hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-600">High Priority</span>
                <span className="font-medium">&lt; 4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-600">Medium Priority</span>
                <span className="font-medium">&lt; 24 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Low Priority</span>
                <span className="font-medium">&lt; 3 days</span>
              </div>
            </div>
          </Card>

          {/* My Reports */}
          <Card className="p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">My Recent Reports</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Open Reports</span>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Resolved This Month</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Average Resolution</span>
                <span className="font-medium">2.3 days</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Reports */}
      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Recent Maintenance Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Issue</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Location</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Priority</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Status</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100">
                  <td className="py-3 px-2 sm:px-4 text-gray-900 text-xs sm:text-sm">{report.issue}</td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{report.location}</td>
                  <td className="py-3 px-2 sm:px-4">
                    <Badge 
                      className={
                        report.priority === 'high' ? 'bg-red-100 text-red-800 text-xs' :
                        report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 text-xs' :
                        'bg-green-100 text-green-800 text-xs'
                      }
                    >
                      {report.priority}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <Badge 
                      className={
                        report.status === 'resolved' ? 'bg-green-100 text-green-800 text-xs' :
                        report.status === 'in-progress' ? 'bg-blue-100 text-blue-800 text-xs' :
                        'bg-gray-100 text-gray-800 text-xs'
                      }
                    >
                      {report.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
