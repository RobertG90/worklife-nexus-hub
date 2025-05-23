
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExpenseSummary } from '@/hooks/useExpenseDashboard';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

interface ExpenseSummaryCardsProps {
  summary: ExpenseSummary;
  className?: string;
}

export const ExpenseSummaryCards = ({ summary, className }: ExpenseSummaryCardsProps) => {
  // Calculate percentage of budget used
  const percentageUsed = (summary.totalSpent / summary.totalBudget) * 100;
  const isOverBudget = percentageUsed > 100;
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <h3 className="text-2xl font-bold mt-1">${summary.totalSpent.toFixed(2)}</h3>
              <p className="text-xs text-gray-500 mt-1">For selected period</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Budget Remaining</p>
              <h3 className={`text-2xl font-bold mt-1 ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                ${summary.remainingBudget.toFixed(2)}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Out of ${summary.totalBudget.toFixed(2)}</p>
            </div>
            <div className={`h-9 w-9 rounded-full flex items-center justify-center ${isOverBudget ? 'bg-red-100' : 'bg-green-100'}`}>
              {isOverBudget ? (
                <TrendingDown className={`h-5 w-5 ${isOverBudget ? 'text-red-600' : 'text-green-600'}`} />
              ) : (
                <TrendingUp className={`h-5 w-5 ${isOverBudget ? 'text-red-600' : 'text-green-600'}`} />
              )}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`} 
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {percentageUsed.toFixed(1)}% of budget used
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Top Expense Category</p>
              {summary.expensesByCategory.length > 0 ? (
                <>
                  <h3 className="text-2xl font-bold mt-1">
                    {summary.expensesByCategory[0].category}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    ${summary.expensesByCategory[0].amount.toFixed(2)} 
                    ({summary.expensesByCategory[0].percentage.toFixed(1)}%)
                  </p>
                </>
              ) : (
                <h3 className="text-2xl font-bold mt-1">None</h3>
              )}
            </div>
            <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
