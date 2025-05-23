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
import { VibeButton } from './VibeButton';
import { useVibe } from '@/contexts/VibeContext';

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
  const { isVibeMode, currentEmoji } = useVibe();

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
    <div className={`w-full h-full flex flex-col ${isVibeMode ? 'vibe-bg' : ''}`}>
      {/* Mobile header */}
      <header className={`flex items-center justify-between p-4 border-b md:hidden ${isVibeMode ? 'vibe-card' : ''}`}>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onMenuToggle}
          aria-label="Menu"
          className={isVibeMode ? 'vibe-icon' : ''}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className={`text-lg font-medium ${isVibeMode ? 'vibe-heading' : ''}`}>
          WorkLife Nexus {isVibeMode && currentEmoji}
        </h1>
        <VibeButton />
      </header>
      
      {/* Desktop header */}
      <header className={`hidden md:flex items-center justify-between p-4 border-b ${isVibeMode ? 'vibe-card' : ''}`}>
        <h1 className={`text-lg font-medium ${isVibeMode ? 'vibe-heading' : ''}`}>
          WorkLife Nexus {isVibeMode && currentEmoji}
        </h1>
        <VibeButton />
      </header>
      
      {/* Content */}
      <main className={`flex-1 overflow-y-auto p-6 ${isVibeMode ? 'vibe-text' : ''}`}>
        <div className={`max-w-7xl mx-auto ${isVibeMode ? 'vibe-card p-6 rounded-lg' : ''}`}>
          {renderSection()}
        </div>
      </main>
    </div>
  );
};
