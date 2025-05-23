
import React from 'react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { ExpenseDashboardWidget } from '@/components/ExpenseDashboardWidget';

export function ExpenseSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expense Reports</h1>
          <p className="text-gray-600 mt-1">Submit and track your expense reports</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>
      
      <ExpenseDashboardWidget />
    </div>
  );
}
