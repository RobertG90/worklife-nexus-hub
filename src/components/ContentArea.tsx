
import React from 'react';
import { Dashboard } from './Dashboard';
import { SickLeaveSection } from './sections/SickLeaveSection';
import { EducationSection } from './sections/EducationSection';
import { TravelSection } from './sections/TravelSection';
import { MaintenanceSection } from './sections/MaintenanceSection';
import { BookingSection } from './sections/BookingSection';
import { ExpenseSection } from './sections/ExpenseSection';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentAreaProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMenuToggle?: () => void;
}

export function ContentArea({ activeSection, onSectionChange, onMenuToggle }: ContentAreaProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isInitialMount = React.useRef(true);

  // Update URL when section changes, but only after initial mount
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentPath = location.pathname.substring(1) || 'dashboard';
    if (currentPath !== activeSection) {
      const newPath = activeSection === 'dashboard' ? '/' : `/${activeSection}`;
      navigate(newPath, { replace: true });
    }
  }, [activeSection, navigate, location.pathname]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={onSectionChange} />;
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
      default:
        return <Dashboard onSectionChange={onSectionChange} />;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Mobile header with menu button */}
      {onMenuToggle && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="flex items-center space-x-2"
          >
            <Menu className="w-5 h-5" />
            <span>Menu</span>
          </Button>
        </div>
      )}
      
      {/* Main content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
