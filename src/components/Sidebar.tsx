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
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Dashboard', section: 'dashboard' },
    { icon: Heart, label: 'Sick Leave', section: 'sick-leave' },
    { icon: GraduationCap, label: 'Education', section: 'education' },
    { icon: Plane, label: 'Travel', section: 'travel' },
    { icon: Wrench, label: 'Maintenance', section: 'maintenance' },
    { icon: Receipt, label: 'Expenses', section: 'expenses' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-[#1e4db7] to-[#4c1d95] text-white flex flex-col min-h-screen">
      {/* Logo Area */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <div>
            <h1 className="font-bold text-lg">WorkLife Nexus</h1>
            <p className="text-xs text-blue-200">Workplace Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.section}
                onClick={() => onSectionChange(item.section)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150',
                  activeSection === item.section
                    ? 'bg-white/10 text-white'
                    : 'text-blue-100 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Area */}
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
        <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-blue-200">john.doe@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
