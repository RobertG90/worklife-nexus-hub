
import React from 'react';
import { BookingSection } from '@/components/sections/BookingSection';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';

const BookingPage: React.FC = () => {
  return (
    <ToastProvider>
      <div className="h-screen w-full overflow-hidden flex">
        <div className="w-64">
          <Sidebar 
            activeSection="booking" 
            onSectionChange={() => {}}
          />
        </div>
        <div className="flex-1 w-full overflow-y-auto">
          <ContentArea 
            activeSection="booking" 
            onSectionChange={() => {}}
            onMenuToggle={() => {}}
          />
        </div>
      </div>
    </ToastProvider>
  );
};

export default BookingPage;
