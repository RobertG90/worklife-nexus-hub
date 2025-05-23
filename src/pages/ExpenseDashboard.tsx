import React from 'react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartBar } from "lucide-react"

export default function ExpenseDashboard() {
  // Mock data for demonstration
  const expenseData = [
    { category: 'Travel', amount: 1200, color: 'bg-blue-500' },
    { category: 'Food', amount: 800, color: 'bg-green-500' },
    { category: 'Accommodation', amount: 1500, color: 'bg-purple-500' },
    { category: 'Entertainment', amount: 500, color: 'bg-orange-500' },
  ];

  const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Expense Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your expenses and budget</p>
          </div>
          <NavigationButtons />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Expenses Card */}
          <Card className="bg-white shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Total Expenses</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">${totalExpenses}</div>
            </CardContent>
          </Card>

          {/* Expense Categories Card */}
          <Card className="bg-white shadow col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Expense Categories</CardTitle>
              <CardDescription> breakdown of expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {expenseData.map((expense, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${expense.color}`}></div>
                    <div>
                      <p className="font-medium text-gray-700">{expense.category}</p>
                      <p className="text-sm text-gray-500">${expense.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview Card */}
          <Card className="bg-white shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Budget Overview</CardTitle>
              <CardDescription>Monthly budget vs spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">Budget: $5000</div>
              <div className="text-xl font-bold text-red-600">Remaining: ${5000 - totalExpenses}</div>
            </CardContent>
          </Card>

          {/* Recent Transactions Card */}
          <Card className="bg-white shadow col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
              <CardDescription>Last 5 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Transaction 1 - $200 - Travel</li>
                <li>Transaction 2 - $50 - Food</li>
                <li>Transaction 3 - $100 - Entertainment</li>
                <li>Transaction 4 - $300 - Accommodation</li>
                <li>Transaction 5 - $75 - Food</li>
              </ul>
            </CardContent>
          </Card>

          {/* Expense Analysis Card */}
          <Card className="bg-white shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Expense Analysis</CardTitle>
              <CardDescription>Trends and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartBar className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-sm text-gray-600">Analyze your spending habits to optimize your budget.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
