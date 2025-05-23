
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const location = useLocation();

  // Sync the active section with the URL path
  useEffect(() => {
    const path = location.pathname.substring(1); // Remove leading slash
    if (path) {
      // Check if path is one of our valid sections
      const validSections = ['sick-leave', 'education', 'travel', 'maintenance', 'booking', 'expenses'];
      if (validSections.includes(path)) {
        setActiveSection(path);
      }
    } else {
      setActiveSection('dashboard');
    }
  }, [location.pathname]);

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
