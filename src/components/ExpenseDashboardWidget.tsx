
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useExpenseStats } from '@/hooks/useExpenseStats';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export function ExpenseDashboardWidget() {
  const { stats, isLoading } = useExpenseStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const budgetUsagePercentage = (stats.totalSpent / stats.monthlyBudget) * 100;
  const isOverBudget = budgetUsagePercentage > 100;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <h3 className="text-2xl font-bold mt-1">${stats.totalSpent.toFixed(2)}</h3>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Remaining Budget</p>
              <h3 className={`text-2xl font-bold mt-1 ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                ${stats.remainingBudget.toFixed(2)}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Out of ${stats.monthlyBudget}</p>
            </div>
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
              isOverBudget ? 'bg-red-100' : 'bg-green-100'
            }`}>
              {isOverBudget ? (
                <AlertCircle className="h-6 w-6 text-red-600" />
              ) : (
                <TrendingUp className="h-6 w-6 text-green-600" />
              )}
            </div>
          </div>
          <div className="mt-4">
            <Progress 
              value={Math.min(budgetUsagePercentage, 100)} 
              className="h-2"
            />
            <p className="text-xs text-gray-500 mt-2">
              {budgetUsagePercentage.toFixed(1)}% of budget used
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Recent Expenses</p>
              <h3 className="text-2xl font-bold mt-1">{stats.recentExpenses.length}</h3>
              <p className="text-xs text-gray-500 mt-1">Last 5 submissions</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
        <div className="space-y-4">
          {stats.categoryBreakdown.map((category) => {
            const percentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
            const isOverCategory = percentage > 100;
            
            return (
              <div key={category.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">{category.category}</span>
                  <span className={`text-sm ${isOverCategory ? 'text-red-600' : 'text-gray-600'}`}>
                    ${category.spent.toFixed(2)} / ${category.budget.toFixed(2)}
                  </span>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={`h-2 ${isOverCategory ? '[&>div]:bg-red-500' : ''}`}
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Expenses */}
      {stats.recentExpenses.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            {stats.recentExpenses.map((expense) => (
              <div key={expense.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium">{expense.description}</p>
                  <p className="text-xs text-gray-500 capitalize">{expense.category} • {expense.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${expense.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    expense.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {expense.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
