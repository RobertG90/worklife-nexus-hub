
import React from 'react';
import { TravelSection } from '@/components/sections/TravelSection';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';

const TravelPage: React.FC = () => {
  return (
    <ToastProvider>
      <div className="h-screen w-full overflow-hidden flex">
        <div className="w-64">
          <Sidebar 
            activeSection="travel" 
            onSectionChange={() => {}}
          />
        </div>
        <div className="flex-1 w-full overflow-y-auto">
          <ContentArea 
            activeSection="travel" 
            onSectionChange={() => {}}
            onMenuToggle={() => {}}
          />
        </div>
      </div>
    </ToastProvider>
  );
};

export default TravelPage;
