
import React from 'react';
import { MaintenanceSection } from '@/components/sections/MaintenanceSection';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';

const MaintenancePage: React.FC = () => {
  return (
    <ToastProvider>
      <div className="h-screen w-full overflow-hidden flex">
        <div className="w-64">
          <Sidebar 
            activeSection="maintenance" 
            onSectionChange={() => {}}
          />
        </div>
        <div className="flex-1 w-full overflow-y-auto">
          <ContentArea 
            activeSection="maintenance" 
            onSectionChange={() => {}}
            onMenuToggle={() => {}}
          />
        </div>
      </div>
    </ToastProvider>
  );
};

export default MaintenancePage;
