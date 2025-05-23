
import React from 'react';
import { EducationSection } from '@/components/sections/EducationSection';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';

const EducationPage: React.FC = () => {
  return (
    <ToastProvider>
      <div className="h-screen w-full overflow-hidden flex">
        <div className="w-64">
          <Sidebar 
            activeSection="education" 
            onSectionChange={() => {}}
          />
        </div>
        <div className="flex-1 w-full overflow-y-auto">
          <ContentArea 
            activeSection="education" 
            onSectionChange={() => {}}
            onMenuToggle={() => {}}
          />
        </div>
      </div>
    </ToastProvider>
  );
};

export default EducationPage;
