import React from 'react';
import { 
  Heart, 
  GraduationCap, 
  Plane, 
  Wrench, 
  Receipt,
  Home,
  Settings,
  User,
  Bell,
  LogOut,
  X,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
    <div className="w-64 sm:w-72 md:w-80 bg-gradient-to-b from-[#1e4db7] to-[#4c1d95] text-white h-screen overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <div>
              <h1 className="font-bold text-lg sm:text-xl">WorkLife Nexus</h1>
              <p className="text-xs sm:text-sm text-blue-200">Workplace Management</p>
            </div>
          </div>
          {/* Close button for mobile */}
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden p-2 hover:bg-white/10 rounded-md"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white/80" />
            </button>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-blue-200 truncate">Software Engineer</p>
          </div>
          <Bell className="w-4 h-4 text-blue-200" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-all duration-200 group",
                  activeSection === item.id
                    ? "bg-white/10 text-white"
                    : "text-blue-100 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  activeSection === item.id ? "text-white" : "text-blue-200 group-hover:text-white"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.label}
                  </p>
                  <p className="text-xs mt-0.5 truncate text-blue-200">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" className="text-blue-100 hover:text-white hover:bg-white/5">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-100 hover:text-white hover:bg-white/5">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-100 hover:text-white hover:bg-white/5">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
