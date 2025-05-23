
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';

export function Dashboard() {
  const recentActivities = [
    { id: 1, type: 'sick-leave', title: 'Sick Leave Request', status: 'approved', date: '2 hours ago' },
    { id: 2, type: 'expense', title: 'Business Lunch Receipt', status: 'pending', date: '1 day ago' },
    { id: 3, type: 'booking', title: 'Conference Room A', status: 'confirmed', date: '2 days ago' },
    { id: 4, type: 'travel', title: 'Flight to NYC', status: 'pending', date: '3 days ago' },
  ];

  const quickStats = [
    { label: 'Pending Requests', value: '3', icon: Clock, color: 'text-orange-600' },
    { label: 'Approved Items', value: '12', icon: CheckCircle, color: 'text-green-600' },
    { label: 'This Month Expenses', value: '$1,240', icon: DollarSign, color: 'text-blue-600' },
    { label: 'Upcoming Bookings', value: '5', icon: Calendar, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
        <p className="text-blue-100 text-lg">
          Ready to optimize your workday? Everything you need is just a click away.
        </p>
        <div className="mt-6 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">98% automation rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
              <Badge 
                variant={activity.status === 'approved' ? 'default' : 
                        activity.status === 'confirmed' ? 'default' : 'secondary'}
                className={
                  activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                  activity.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <div className="text-red-500 mb-2">❤️</div>
            <p className="font-medium">Submit Sick Leave</p>
            <p className="text-sm text-gray-500">Quick sick day request</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <div className="text-blue-500 mb-2">📱</div>
            <p className="font-medium">Book Company Car</p>
            <p className="text-sm text-gray-500">Reserve for your trip</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
            <div className="text-green-500 mb-2">🧾</div>
            <p className="font-medium">Upload Receipt</p>
            <p className="text-sm text-gray-500">Get reimbursed quickly</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
