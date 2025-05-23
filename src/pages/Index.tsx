import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';
import { useLocation } from 'react-router-dom';

const validSections = ['sick-leave', 'education', 'travel', 'maintenance', 'booking', 'expenses'];

const Index = () => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  
  // Initialize state based on URL path
  const [activeSection, setActiveSection] = useState(() => {
    if (!path) return 'dashboard';
    return validSections.includes(path) ? path : 'dashboard';
  });

  // Handle section changes from URL updates
  useEffect(() => {
    const newSection = !path ? 'dashboard' : validSections.includes(path) ? path : activeSection;
    if (newSection !== activeSection) {
      setActiveSection(newSection);
    }
  }, [path]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <ContentArea activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>
    </ToastProvider>
  );
};

export default Index;
