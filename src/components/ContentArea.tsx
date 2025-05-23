
import React from 'react';
import { Dashboard } from './Dashboard';
import { SickLeaveSection } from './sections/SickLeaveSection';
import { EducationSection } from './sections/EducationSection';
import { TravelSection } from './sections/TravelSection';
import { MaintenanceSection } from './sections/MaintenanceSection';
import { BookingSection } from './sections/BookingSection';
import { ExpenseSection } from './sections/ExpenseSection';
import { useNavigate, useLocation } from 'react-router-dom';

interface ContentAreaProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function ContentArea({ activeSection, onSectionChange }: ContentAreaProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Update URL when section changes, but avoid conflicts with direct navigation
  React.useEffect(() => {
    // Check if we're on a detail page - if so, don't interfere with navigation
    const isDetailPage = location.pathname.includes('/course/') || 
                         location.pathname.includes('/event/') || 
                         location.pathname.includes('/sick-leave/') || 
                         location.pathname.includes('/trip-booking/') ||
                         location.pathname.includes('/upcoming-trips');
    
    if (isDetailPage) {
      return;
    }

    // Only navigate if the current path doesn't match the expected path for the active section
    const expectedPath = activeSection === 'dashboard' ? '/' : `/${activeSection}`;
    
    if (location.pathname !== expectedPath) {
      navigate(expectedPath, { replace: true });
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
    <div className="flex-1 bg-gray-50 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}
