
import React from 'react';
import { ExpenseSection } from '@/components/sections/ExpenseSection';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { ToastProvider } from '@/components/ui/toast-provider';

const ExpensesPage: React.FC = () => {
  return (
    <ToastProvider>
      <div className="h-screen w-full overflow-hidden flex">
        <div className="w-64">
          <Sidebar 
            activeSection="expenses" 
            onSectionChange={() => {}}
          />
        </div>
        <div className="flex-1 w-full overflow-y-auto">
          <ContentArea 
            activeSection="expenses" 
            onSectionChange={() => {}}
            onMenuToggle={() => {}}
          />
        </div>
      </div>
    </ToastProvider>
  );
};

export default ExpensesPage;
