
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Receipt, Camera, DollarSign, Upload, Calendar, TrendingUp } from 'lucide-react';

export function ExpenseSection() {
  const [expenseCategory, setExpenseCategory] = useState('meals');

  const recentExpenses = [
    { id: 1, description: 'Client Lunch at Restaurant ABC', amount: 85.50, category: 'meals', date: '2024-01-20', status: 'approved' },
    { id: 2, description: 'Taxi to Airport', amount: 45.00, category: 'transportation', date: '2024-01-18', status: 'pending' },
    { id: 3, description: 'Office Supplies', amount: 120.75, category: 'office', date: '2024-01-15', status: 'approved' },
    { id: 4, description: 'Hotel Stay - Business Trip', amount: 250.00, category: 'accommodation', date: '2024-01-12', status: 'approved' },
  ];

  const categories = [
    { id: 'meals', label: 'Meals & Entertainment', icon: '🍽️', limit: '$500/month' },
    { id: 'transportation', label: 'Transportation', icon: '🚗', limit: '$300/month' },
    { id: 'accommodation', label: 'Accommodation', icon: '🏨', limit: '$200/night' },
    { id: 'office', label: 'Office Supplies', icon: '📝', limit: '$150/month' },
    { id: 'equipment', label: 'Equipment', icon: '💻', limit: 'Pre-approval required' },
    { id: 'other', label: 'Other', icon: '📋', limit: 'Case by case' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Receipt className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Reports</h1>
          <p className="text-gray-600">Snap, upload, and get reimbursed in no time!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submit New Expense */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit New Expense</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Expense Category</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setExpenseCategory(category.id)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        expenseCategory === category.id
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{category.label}</div>
                          <div className="text-xs text-gray-500">{category.limit}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input type="number" placeholder="0.00" className="pl-10" step="0.01" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea 
                  placeholder="Brief description of the expense..."
                  className="h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Upload</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="flex space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Camera className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Upload className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Take a photo or upload receipt</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-cyan-500">🧠</div>
                  <div>
                    <h4 className="font-medium text-cyan-900">Smart Receipt Processing</h4>
                    <p className="text-sm text-cyan-700 mt-1">
                      Our AI will automatically extract amount, date, and vendor details from your receipt. 
                      Just review and submit!
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Submit Expense Report
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Monthly Summary */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">This Month Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Submitted</span>
                <span className="font-semibold text-green-600">$501.25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved</span>
                <span className="text-gray-900">$456.25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <Badge className="bg-orange-100 text-orange-800">$45.00</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '91%' }}></div>
              </div>
              <p className="text-xs text-gray-500 text-center">91% approved rate</p>
            </div>
          </Card>

          {/* Spending Limits */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Spending Limits</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Meals</span>
                  <span className="text-gray-900">$245 / $500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '49%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Transportation</span>
                  <span className="text-gray-900">$120 / $300</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Tips</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <Receipt className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Always keep original receipts</span>
              </div>
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Submit within 30 days</span>
              </div>
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Business purpose required</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Expenses */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Expense Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900">{expense.description}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">${expense.amount.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-600 capitalize">{expense.category}</td>
                  <td className="py-3 px-4 text-gray-600">{expense.date}</td>
                  <td className="py-3 px-4">
                    <Badge 
                      className={expense.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                    >
                      {expense.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
