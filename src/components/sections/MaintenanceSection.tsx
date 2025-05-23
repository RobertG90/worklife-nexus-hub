
import React from 'react';
import { MaintenanceForm } from '@/components/forms/MaintenanceForm';
import { NavigationButtons } from '@/components/NavigationButtons';

export function MaintenanceSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Request</h1>
          <p className="text-gray-600 mt-1">Report facility issues and maintenance needs</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>
      <MaintenanceForm />
    </div>
  );
}
