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

  // Update URL when section changes
  React.useEffect(() => {
    if (location.pathname !== `/${activeSection}` && activeSection !== 'dashboard') {
      navigate(`/${activeSection}`);
    } else if (activeSection === 'dashboard' && location.pathname !== '/') {
      navigate('/');
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
    <div className="flex-1 bg-[#f8fafc] min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
}
