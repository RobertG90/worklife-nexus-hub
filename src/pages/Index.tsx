
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
      <div className="h-screen w-full overflow-hidden flex">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:transform-none w-64
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 w-full overflow-y-auto">
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
