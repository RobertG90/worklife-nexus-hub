
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wrench, AlertTriangle, Camera } from 'lucide-react';

export function MaintenanceSection() {
  const [issueType, setIssueType] = useState('electrical');

  const recentReports = [
    { id: 1, issue: 'Flickering lights in Conference Room B', location: 'Floor 2', status: 'in-progress', priority: 'medium', date: '2024-01-20' },
    { id: 2, issue: 'Broken AC in Office 205', location: 'Floor 2', status: 'resolved', priority: 'high', date: '2024-01-18' },
    { id: 3, issue: 'Leaky faucet in Kitchen', location: 'Floor 1', status: 'pending', priority: 'low', date: '2024-01-19' },
  ];

  const issueTypes = [
    { id: 'electrical', label: 'Electrical', icon: '⚡', color: 'text-yellow-600' },
    { id: 'plumbing', label: 'Plumbing', icon: '🚿', color: 'text-blue-600' },
    { id: 'hvac', label: 'HVAC', icon: '❄️', color: 'text-cyan-600' },
    { id: 'security', label: 'Security', icon: '🔒', color: 'text-red-600' },
    { id: 'cleaning', label: 'Cleaning', icon: '🧹', color: 'text-green-600' },
    { id: 'other', label: 'Other', icon: '🔧', color: 'text-gray-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Wrench className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Issues</h1>
          <p className="text-gray-600">Report facility issues and let our team work their magic!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report New Issue */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Report Maintenance Issue</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Issue Category</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {issueTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setIssueType(type.id)}
                      className={
                        issueType === type.id
                          ? 'p-3 rounded-lg border border-orange-500 bg-orange-50 text-orange-700 text-center transition-colors'
                          : 'p-3 rounded-lg border border-gray-200 hover:border-gray-300 text-center transition-colors'
                      }
                    >
                      <div className="text-xl mb-1">{type.icon}</div>
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Floor 1 - Lobby</option>
                    <option>Floor 1 - Kitchen</option>
                    <option>Floor 1 - Bathroom</option>
                    <option>Floor 2 - Open Office</option>
                    <option>Floor 2 - Conference Rooms</option>
                    <option>Floor 2 - Break Room</option>
                    <option>Floor 3 - Executive Offices</option>
                    <option>Parking Garage</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="low">Low - Can wait</option>
                    <option value="medium">Medium - Should be fixed soon</option>
                    <option value="high">High - Urgent</option>
                    <option value="emergency">Emergency - Safety issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
                <Textarea 
                  placeholder="Please describe the issue in detail..."
                  className="h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo Evidence (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload photos or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-purple-500">🤖</div>
                  <div>
                    <h4 className="font-medium text-purple-900">Smart Routing</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Your report will be automatically assigned to the right maintenance team 
                      based on the issue type and priority level.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Submit Maintenance Request
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contacts */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Emergency Contacts
            </h3>
            <div className="space-y-3 text-sm">
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
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Expected Response Times</h3>
            <div className="space-y-3 text-sm">
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
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">My Recent Reports</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Open Reports</span>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Resolved This Month</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average Resolution</span>
                <span className="font-medium">2.3 days</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Reports */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Maintenance Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Issue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{report.issue}</td>
                  <td className="py-3 px-4 text-gray-600">{report.location}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      className={
                        report.priority === 'high' ? 'bg-red-100 text-red-800' :
                        report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }
                    >
                      {report.priority}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge 
                      className={
                        report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {report.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
