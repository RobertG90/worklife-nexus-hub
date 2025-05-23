
import React from 'react';
import { SickLeaveForm } from '@/components/forms/SickLeaveForm';
import { NavigationButtons } from '@/components/NavigationButtons';

export function SickLeaveSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sick Leave Request</h1>
          <p className="text-gray-600 mt-1">Submit your sick leave request</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>
      <SickLeaveForm />
    </div>
  );
}
