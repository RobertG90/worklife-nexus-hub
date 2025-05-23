
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
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
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

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">EP</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Employee Portal</h1>
            <p className="text-sm text-gray-500">All-in-one workplace solution</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Software Engineer</p>
          </div>
          <Bell className="w-4 h-4 text-gray-400 ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-all duration-200 group",
                  activeSection === item.id
                    ? "bg-blue-50 border border-blue-200 text-blue-900"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 mt-0.5 flex-shrink-0",
                  activeSection === item.id ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                )} />
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-medium",
                    activeSection === item.id ? "text-blue-900" : "text-gray-900"
                  )}>
                    {item.label}
                  </p>
                  <p className={cn(
                    "text-xs mt-1",
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
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 text-gray-700">
          <Settings className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium">Settings</p>
            <p className="text-xs text-gray-500">Preferences & account</p>
          </div>
        </button>
      </div>
    </div>
  );
}
