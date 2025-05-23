
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
    // Check if we're on a detail page
    const isDetailPage = location.pathname.includes('/course/') || 
                         location.pathname.includes('/event/') || 
                         location.pathname.includes('/sick-leave/') || 
                         location.pathname.includes('/trip-booking/');
    
    // If we're on a detail page, don't interfere with navigation
    if (isDetailPage) {
      return;
    }

    // Handle navigation for main sections only
    const currentPath = location.pathname;
    
    if (activeSection === 'dashboard' && currentPath !== '/') {
      navigate('/');
    } else if (activeSection !== 'dashboard' && currentPath !== `/${activeSection}`) {
      navigate(`/${activeSection}`);
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
