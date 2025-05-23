import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowRight,
  Activity,
  Shield,
  ChartBar
} from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
      section: 'upcoming-trips-calendar',
      isLink: true
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
    { 
      emoji: '📊', 
      title: 'Expense Dashboard', 
      description: 'View expense analytics',
      section: 'expense-dashboard',
      isLink: true,
      color: 'text-purple-500'
    },
  ];

  const handleActivityClick = (activity: any) => {
    if (activity.type === 'sick-leave') {
      navigate(`/sick-leave/${activity.id}`);
    } else if (activity.type === 'trip-booking') {
      navigate(`/trip-booking/${activity.id}`);
    } else {
      onSectionChange(activity.section);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1e4db7] to-[#4c1d95] rounded-xl md:rounded-2xl p-5 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">Welcome back, John! 👋</h2>
          <p className="text-blue-100 text-sm md:text-lg mb-4 md:mb-8 max-w-2xl">
            Experience the next level in workplace management. We help you exceed expectations in every aspect of your work life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-2">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">98% automation rate</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-4 py-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link 
              to={stat.isLink ? `/${stat.section}` : '#'}
              key={index} 
              className="block"
              onClick={(e) => {
                if (!stat.isLink) {
                  e.preventDefault();
                  onSectionChange(stat.section);
                }
              }}
            >
              <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${stat.color} bg-opacity-10`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-4 md:p-6 bg-white">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Quick Actions</h3>
          <Button variant="ghost" className="text-sm text-primary hover:text-primary/80">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {quickActions.map((action, index) => (
            <Link
              to={action.isLink ? `/${action.section}` : '#'}
              key={index}
              onClick={(e) => {
                if (!action.isLink) {
                  e.preventDefault();
                  onSectionChange(action.section);
                }
              }}
            >
              <button 
                className="w-full p-4 md:p-6 rounded-xl hover:bg-gray-50 text-left transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:shadow-sm"
              >
                <div className={`${action.color} text-xl sm:text-2xl mb-2 md:mb-3`}>{action.emoji}</div>
                <p className="font-semibold text-gray-900 text-sm md:text-base mb-1">{action.title}</p>
                <p className="text-xs md:text-sm text-gray-500">{action.description}</p>
              </button>
            </Link>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4 md:p-6 bg-white">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Recent Activity</h3>
          <Button variant="ghost" className="text-sm text-primary hover:text-primary/80">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
        {isActivitiesLoading ? (
          <div className="text-center py-6 md:py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : recentActivities.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-gray-500">No recent activities found. Submit your first request!</div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {recentActivities.map((activity: any) => (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="flex items-center justify-between p-3 md:p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500 truncate">{activity.date}</p>
                  </div>
                </div>
                <Badge 
                  variant={activity.status === 'approved' ? 'default' : 'secondary'}
                  className={
                    activity.status === 'approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                    activity.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                    'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
