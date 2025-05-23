
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTravelExpenses } from '@/hooks/useTravelExpenses';
import { Plane, MapPin, Calendar, DollarSign, FileText, Users } from 'lucide-react';

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
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <Plane className="w-6 h-6" />
          <span>Submit Travel Expense</span>
        </CardTitle>
        <p className="text-green-100 mt-2">Create a new travel expense report for your business trip</p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                Trip Destination *
              </label>
              <Input
                type="text"
                name="tripDestination"
                value={formData.tripDestination}
                onChange={handleChange}
                placeholder="e.g., New York, NY"
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 py-3"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Users className="w-4 h-4 mr-2 text-green-600" />
                Trip Purpose *
              </label>
              <Input
                type="text"
                name="tripPurpose"
                value={formData.tripPurpose}
                onChange={handleChange}
                placeholder="e.g., Client Meeting, Conference"
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 py-3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Calendar className="w-4 h-4 mr-2 text-green-600" />
                Trip Start Date *
              </label>
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 py-3"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <Calendar className="w-4 h-4 mr-2 text-green-600" />
                Trip End Date *
              </label>
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 py-3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <FileText className="w-4 h-4 mr-2 text-green-600" />
                Expense Type *
              </label>
              <select
                name="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
                required
              >
                <option value="accommodation">🏨 Accommodation</option>
                <option value="transportation">🚗 Transportation</option>
                <option value="meals">🍽️ Meals</option>
                <option value="other">📋 Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <DollarSign className="w-4 h-4 mr-2 text-green-600" />
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
                className="border-gray-300 focus:border-green-500 focus:ring-green-500 py-3"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
              >
                <option value="USD">💵 USD</option>
                <option value="EUR">💶 EUR</option>
                <option value="GBP">💷 GBP</option>
                <option value="CAD">🍁 CAD</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <FileText className="w-4 h-4 mr-2 text-green-600" />
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional details about the expense..."
              className="h-32 border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isCreating}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-lg font-medium text-lg shadow-lg"
            >
              {isCreating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Plane className="w-5 h-5" />
                  <span>Submit Travel Expense</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
