
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <ContentArea activeSection={activeSection} />
      </div>
    </ToastProvider>
  );
};

export default Index;
