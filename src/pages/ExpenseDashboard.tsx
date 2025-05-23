
import React, { useState } from 'react';
import { useExpenseDashboard } from '@/hooks/useExpenseDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpenseChart } from '@/components/ExpenseChart';
import { ExpenseTimeline } from '@/components/ExpenseTimeline';
import { ExpenseSummaryCards } from '@/components/ExpenseSummaryCards';
import { FilterIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpenseDashboard = () => {
  const navigate = useNavigate();
  const { 
    expenses, 
    isLoading, 
    filters, 
    setFilters, 
    expenseSummary,
    expenseTypes 
  } = useExpenseDashboard();
  
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const handleFilterChange = (key: string, value: any) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const resetFilters = { dateRange: 'month' };
    setTempFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-2 sm:mb-0 -ml-2 px-2"
            >
              ← Back to Dashboard
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Expense Dashboard</h1>
            <p className="text-gray-500 mt-1">View and analyze your expense data</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Filter Options</CardTitle>
              <CardDescription>Customize your expense dashboard view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  <Select
                    value={tempFilters.dateRange}
                    onValueChange={(value) => handleFilterChange('dateRange', value)}
                  >
                    <SelectTrigger id="dateRange">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last 7 days</SelectItem>
                      <SelectItem value="month">Last 30 days</SelectItem>
                      <SelectItem value="quarter">Last 3 months</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                      <SelectItem value="all">All time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="expenseType">Expense Type</Label>
                  <Select
                    value={tempFilters.expenseType || ''}
                    onValueChange={(value) => handleFilterChange('expenseType', value || undefined)}
                  >
                    <SelectTrigger id="expenseType">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      {expenseTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="minAmount">Min Amount</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    placeholder="No minimum"
                    value={tempFilters.minAmount || ''}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxAmount">Max Amount</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="No maximum"
                    value={tempFilters.maxAmount || ''}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={resetFilters}>Reset</Button>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-xl text-gray-500">Loading expense data...</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <ExpenseSummaryCards summary={expenseSummary} className="mb-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Expense Distribution Chart */}
              <Card className="h-[400px]">
                <CardHeader>
                  <CardTitle>Expense Distribution</CardTitle>
                  <CardDescription>Breakdown by expense category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseChart data={expenseSummary.expensesByCategory} />
                </CardContent>
              </Card>
              
              {/* Expense Timeline Chart */}
              <Card className="h-[400px]">
                <CardHeader>
                  <CardTitle>Expense Timeline</CardTitle>
                  <CardDescription>Monthly expense trend</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseTimeline data={expenseSummary.expensesByMonth} />
                </CardContent>
              </Card>
            </div>
            
            {/* Expense Table */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Your latest expense transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left font-medium">Trip Destination</th>
                        <th className="h-10 px-4 text-left font-medium">Purpose</th>
                        <th className="h-10 px-4 text-left font-medium">Type</th>
                        <th className="h-10 px-4 text-left font-medium">Amount</th>
                        <th className="h-10 px-4 text-left font-medium">Date</th>
                        <th className="h-10 px-4 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses && expenses.length > 0 ? (
                        expenses.slice(0, 10).map((expense) => (
                          <tr key={expense.id} className="border-b">
                            <td className="p-4">{expense.trip_destination}</td>
                            <td className="p-4">{expense.trip_purpose}</td>
                            <td className="p-4">{expense.expense_type}</td>
                            <td className="p-4">${parseFloat(expense.amount).toFixed(2)} {expense.currency}</td>
                            <td className="p-4">{new Date(expense.created_at).toLocaleDateString()}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                expense.status === 'approved' ? 'bg-green-100 text-green-800' :
                                expense.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {expense.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-gray-500">
                            No expense data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseDashboard;
