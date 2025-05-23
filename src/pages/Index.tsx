
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';
import { useLocation } from 'react-router-dom';

const validSections = ['sick-leave', 'education', 'travel', 'maintenance', 'booking', 'expenses'];

const Index = () => {
  const location = useLocation();
  const path = location.pathname.substring(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 flex relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:transform-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <ContentArea 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange}
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
      </div>
    </ToastProvider>
  );
};

export default Index;
