
import React from 'react';
import { SickLeaveSection } from './sections/SickLeaveSection';
import { EducationSection } from './sections/EducationSection';
import { TravelSection } from './sections/TravelSection';
import { MaintenanceSection } from './sections/MaintenanceSection';
import { BookingSection } from './sections/BookingSection';
import { ExpenseSection } from './sections/ExpenseSection';
import { UserProfileSection } from './sections/UserProfileSection';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dashboard } from './Dashboard';

interface ContentAreaProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMenuToggle: () => void;
}

export const ContentArea: React.FC<ContentAreaProps> = ({
  activeSection,
  onSectionChange,
  onMenuToggle
}) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'sick-leave':
        return <SickLeaveSection />;
      case 'education':
        return <EducationSection />;
      case 'travel':
        return <TravelSection />;
      case 'maintenance':
        return <MaintenanceSection />;
      case 'booking':
        return <BookingSection />;
      case 'expenses':
        return <ExpenseSection />;
      case 'profile':
        return <UserProfileSection />;
      case 'dashboard':
      default:
        return <Dashboard onSectionChange={onSectionChange} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Mobile header */}
      <header className="flex items-center justify-between p-4 border-b md:hidden">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onMenuToggle}
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-medium">WorkLife Nexus</h1>
      </header>
      
      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};
