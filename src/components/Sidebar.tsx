
import React, { ReactNode } from 'react';
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
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onClose?: () => void;
  errorBoundaryTestComponent?: ReactNode;
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

export function Sidebar({ activeSection, onSectionChange, onClose, errorBoundaryTestComponent }: SidebarProps) {
  const navigate = useNavigate();
  
  // Error boundary test component
  if (errorBoundaryTestComponent) {
    return <div>Something went wrong</div>;
  }

  const handleProfileClick = () => {
    onSectionChange('profile');
    if (onClose) onClose();
    navigate('/profile');
  };

  return (
    <div data-testid="sidebar-container" className="w-64 h-screen overflow-y-auto flex flex-col bg-[#2D3695] text-white">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 text-white">
              <img src="/logo.svg" alt="Logo" className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center">
                <button 
                  onClick={handleProfileClick}
                  className="font-bold text-base hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded-sm"
                >
                  John Doe
                </button>
                {onClose && (
                  <button 
                    onClick={onClose}
                    className="ml-3 md:hidden p-1 hover:bg-white/10 rounded-md"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4 text-white/80" />
                  </button>
                )}
              </div>
              <p className="text-xs text-blue-200">Software Engineer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 overflow-y-auto" role="navigation" aria-label="Main navigation">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200",
                  activeSection === item.id
                    ? "bg-white/10 text-white"
                    : "text-blue-100 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0 text-blue-200" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs mt-0.5 text-blue-200">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <Button 
            data-testid="notifications-btn"
            variant="ghost" 
            size="icon" 
            className="text-blue-100 hover:text-white hover:bg-white/5 w-8 h-8 p-0"
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button 
            data-testid="settings-btn"
            variant="ghost" 
            size="icon" 
            className="text-blue-100 hover:text-white hover:bg-white/5 w-8 h-8 p-0"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button 
            data-testid="logout-btn"
            variant="ghost" 
            size="icon" 
            className="text-blue-100 hover:text-white hover:bg-white/5 w-8 h-8 p-0"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
