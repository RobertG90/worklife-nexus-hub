
import React from 'react';
import { 
  Heart, 
  GraduationCap, 
  Plane, 
  Wrench, 
  Calendar, 
  Receipt,
  Home,
  Settings,
  User,
  Bell,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onClose?: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview of all services' },
  { id: 'sick-leave', label: 'Sick Leave', icon: Heart, description: 'Submit sick leave requests' },
  { id: 'education', label: 'Education & Social', icon: GraduationCap, description: 'Learning and team events' },
  { id: 'travel', label: 'Corporate Travel', icon: Plane, description: 'Business trip arrangements' },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, description: 'Report facility issues' },
  { id: 'booking', label: 'Asset Booking', icon: Calendar, description: 'Reserve company resources' },
  { id: 'expenses', label: 'Expense Reports', icon: Receipt, description: 'Submit reimbursements' },
];

export function Sidebar({ activeSection, onSectionChange, onClose }: SidebarProps) {
  return (
    <div className="w-80 sm:w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">EP</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Employee Portal</h1>
              <p className="text-xs sm:text-sm text-gray-500">All-in-one workplace solution</p>
            </div>
          </div>
          {/* Close button for mobile */}
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">Software Engineer</p>
          </div>
          <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <div className="space-y-1 sm:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg text-left transition-all duration-200 group",
                  activeSection === item.id
                    ? "bg-blue-50 border border-blue-200 text-blue-900"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0",
                  activeSection === item.id ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                )} />
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-xs sm:text-sm font-medium truncate",
                    activeSection === item.id ? "text-blue-900" : "text-gray-900"
                  )}>
                    {item.label}
                  </p>
                  <p className={cn(
                    "text-xs mt-0.5 sm:mt-1 truncate",
                    activeSection === item.id ? "text-blue-700" : "text-gray-500"
                  )}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg text-left hover:bg-gray-50 text-gray-700">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate">Settings</p>
            <p className="text-xs text-gray-500 truncate">Preferences & account</p>
          </div>
        </button>
      </div>
    </div>
  );
}
