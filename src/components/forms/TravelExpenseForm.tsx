
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTravelExpenses } from '@/hooks/useTravelExpenses';

export function TravelExpenseForm() {
  const [formData, setFormData] = useState({
    tripDestination: '',
    tripPurpose: '',
    startDate: '',
    endDate: '',
    expenseType: 'accommodation',
    amount: '',
    currency: 'USD',
    description: '',
  });

  const { createExpense, isCreating } = useTravelExpenses();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tripDestination || !formData.tripPurpose || !formData.startDate || 
        !formData.endDate || !formData.amount) {
      return;
    }

    createExpense({
      tripDestination: formData.tripDestination,
      tripPurpose: formData.tripPurpose,
      startDate: formData.startDate,
      endDate: formData.endDate,
      expenseType: formData.expenseType,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      description: formData.description || undefined,
    });

    // Reset form
    setFormData({
      tripDestination: '',
      tripPurpose: '',
      startDate: '',
      endDate: '',
      expenseType: 'accommodation',
      amount: '',
      currency: 'USD',
      description: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Travel Expense</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Destination *
            </label>
            <Input
              type="text"
              name="tripDestination"
              value={formData.tripDestination}
              onChange={handleChange}
              placeholder="e.g., New York, NY"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Purpose *
            </label>
            <Input
              type="text"
              name="tripPurpose"
              value={formData.tripPurpose}
              onChange={handleChange}
              placeholder="e.g., Client Meeting, Conference"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Start Date *
            </label>
            <Input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip End Date *
            </label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Type *
            </label>
            <select
              name="expenseType"
              value={formData.expenseType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="accommodation">Accommodation</option>
              <option value="transportation">Transportation</option>
              <option value="meals">Meals</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional details about the expense..."
            className="h-24"
          />
        </div>

        <Button
          type="submit"
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? 'Submitting...' : 'Submit Expense'}
        </Button>
      </form>
    </Card>
  );
}
