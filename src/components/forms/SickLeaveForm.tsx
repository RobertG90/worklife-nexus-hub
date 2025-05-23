
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSickLeaveRequests } from '@/hooks/useSickLeaveRequests';

export function SickLeaveForm() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveType: 'sick',
    reason: ''
  });

  const { createRequest, isCreating } = useSickLeaveRequests();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.startDate || !formData.endDate) {
      return;
    }

    createRequest(formData);
    setFormData({ startDate: '', endDate: '', leaveType: 'sick', reason: '' });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit New Sick Leave Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <Input 
              type="date" 
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <Input 
              type="date" 
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
          <div className="grid grid-cols-3 gap-3">
            {['sick', 'medical', 'emergency'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({...formData, leaveType: type})}
                className={`p-3 rounded-lg border text-center capitalize transition-colors ${
                  formData.leaveType === type
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason (Optional)</label>
          <Textarea 
            placeholder="Brief description of your condition..."
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            className="h-24"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isCreating}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          {isCreating ? 'Submitting...' : 'Submit Sick Leave Request'}
        </Button>
      </form>
    </Card>
  );
}
