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
import { useDashboardData } from '@/hooks/useDashboardData';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

export function Dashboard({ onSectionChange }: DashboardProps) {
  const { recentActivities, isActivitiesLoading, stats, isStatsLoading } = useDashboardData();
  const navigate = useNavigate();
  
  // Define quick stats with real data where available
  const quickStats = [
    { 
      label: 'Pending Requests', 
      value: isStatsLoading ? '...' : String(stats?.pendingRequests || 0), 
      icon: Clock, 
      color: 'text-orange-600', 
      section: 'sick-leave' 
    },
    { 
      label: 'Approved Items', 
      value: isStatsLoading ? '...' : String(stats?.approvedItems || 0), 
      icon: CheckCircle, 
      color: 'text-green-600', 
      section: 'sick-leave' 
    },
    { 
      label: 'This Month Expenses', 
      value: isStatsLoading ? '...' : `$${stats?.monthlyExpenses?.toFixed(2) || '0.00'}`, 
      icon: DollarSign, 
      color: 'text-blue-600', 
      section: 'travel' 
    },
    { 
      label: 'Upcoming Trips', 
      value: isStatsLoading ? '...' : String(stats?.upcomingBookings || 0), 
      icon: Calendar, 
      color: 'text-purple-600', 
      section: 'travel' 
    },
  ];

  const quickActions = [
    { 
      emoji: '❤️', 
      title: 'Submit Sick Leave', 
      description: 'Quick sick day request',
      section: 'sick-leave',
      color: 'text-red-500'
    },
    { 
      emoji: '📱', 
      title: 'Book Company Car', 
      description: 'Reserve for your trip',
      section: 'booking',
      color: 'text-blue-500'
    },
    { 
      emoji: '🧾', 
      title: 'Upload Receipt', 
      description: 'Get reimbursed quickly',
      section: 'expenses',
      color: 'text-green-500'
    },
  ];

  const handleActivityClick = (activity: any) => {
    if (activity.type === 'sick-leave') {
      navigate(`/sick-leave/${activity.id}`);
    } else {
      onSectionChange(activity.section);
    }
  };

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
            <Link 
              to={`/${stat.section}`}
              key={index} 
              className="block"
              onClick={(e) => {
                e.preventDefault();
                onSectionChange(stat.section);
              }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        {isActivitiesLoading ? (
          <div className="text-center py-8 text-gray-500">Loading activities...</div>
        ) : recentActivities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No recent activities found. Submit your first request!</div>
        ) : (
          <div className="space-y-4">
            {recentActivities.map((activity: any) => (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
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
        )}
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              to={`/${action.section}`}
              key={index}
              onClick={(e) => {
                e.preventDefault();
                onSectionChange(action.section);
              }}
            >
              <button 
                className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
              >
                <div className={`${action.color} mb-2`}>{action.emoji}</div>
                <p className="font-medium">{action.title}</p>
                <p className="text-sm text-gray-500">{action.description}</p>
              </button>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
