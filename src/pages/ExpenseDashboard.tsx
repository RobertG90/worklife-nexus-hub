
import React, { useState } from 'react';
import { useExpenseDashboard, ExpenseFilter } from '@/hooks/useExpenseDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpenseChart } from '@/components/ExpenseChart';
import { ExpenseTimeline } from '@/components/ExpenseTimeline';
import { ExpenseSummaryCards } from '@/components/ExpenseSummaryCards';
import { FilterIcon, ArrowLeft } from 'lucide-react';
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

  const handleFilterChange = (key: keyof ExpenseFilter, value: any) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilters(false);
  };

  const resetFilters = () => {
    const resetFilters: ExpenseFilter = { dateRange: 'month' };
    setTempFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="mb-2 -ml-2 px-2 text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Expense Dashboard</h1>
              <p className="text-gray-500 mt-1 text-sm">View and analyze your expense data</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 sm:flex-none text-sm"
              >
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filter Options</CardTitle>
              <CardDescription className="text-sm">Customize your expense dashboard view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dateRange" className="text-sm">Date Range</Label>
                  <Select
                    value={tempFilters.dateRange}
                    onValueChange={(value: ExpenseFilter['dateRange']) => handleFilterChange('dateRange', value)}
                  >
                    <SelectTrigger id="dateRange" className="text-sm">
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
                  <Label htmlFor="expenseType" className="text-sm">Expense Type</Label>
                  <Select
                    value={tempFilters.expenseType || ''}
                    onValueChange={(value) => handleFilterChange('expenseType', value || undefined)}
                  >
                    <SelectTrigger id="expenseType" className="text-sm">
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
                  <Label htmlFor="minAmount" className="text-sm">Min Amount</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    placeholder="No minimum"
                    value={tempFilters.minAmount || ''}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value ? Number(e.target.value) : undefined)}
                    className="text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxAmount" className="text-sm">Max Amount</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="No maximum"
                    value={tempFilters.maxAmount || ''}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value ? Number(e.target.value) : undefined)}
                    className="text-sm"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <Button variant="outline" onClick={resetFilters} className="text-sm">Reset</Button>
                <Button onClick={applyFilters} className="text-sm">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <div className="h-64 sm:h-96 flex items-center justify-center">
            <p className="text-lg sm:text-xl text-gray-500">Loading expense data...</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <ExpenseSummaryCards summary={expenseSummary} className="mb-6" />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {/* Expense Distribution Chart */}
              <Card className="h-[350px] sm:h-[400px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Expense Distribution</CardTitle>
                  <CardDescription className="text-sm">Breakdown by expense category</CardDescription>
                </CardHeader>
                <CardContent className="h-[280px] sm:h-[320px]">
                  <ExpenseChart data={expenseSummary.expensesByCategory} />
                </CardContent>
              </Card>
              
              {/* Expense Timeline Chart */}
              <Card className="h-[350px] sm:h-[400px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Expense Timeline</CardTitle>
                  <CardDescription className="text-sm">Monthly expense trend</CardDescription>
                </CardHeader>
                <CardContent className="h-[280px] sm:h-[320px]">
                  <ExpenseTimeline data={expenseSummary.expensesByMonth} />
                </CardContent>
              </Card>
            </div>
            
            {/* Expense Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Expenses</CardTitle>
                <CardDescription className="text-sm">Your latest expense transactions</CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="overflow-x-auto">
                  <div className="min-w-full inline-block align-middle">
                    <div className="border rounded-md">
                      <table className="w-full text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-8 sm:h-10 px-2 sm:px-4 text-left font-medium">Destination</th>
                            <th className="h-8 sm:h-10 px-2 sm:px-4 text-left font-medium hidden sm:table-cell">Purpose</th>
                            <th className="h-8 sm:h-10 px-2 sm:px-4 text-left font-medium">Type</th>
                            <th className="h-8 sm:h-10 px-2 sm:px-4 text-left font-medium">Amount</th>
                            <th className="h-8 sm:h-10 px-2 sm:px-4 text-left font-medium hidden md:table-cell">Date</th>
                            <th className="h-8 sm:h-10 px-2 sm:px-4 text-left font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expenses && expenses.length > 0 ? (
                            expenses.slice(0, 10).map((expense) => (
                              <tr key={expense.id} className="border-b">
                                <td className="p-2 sm:p-4">
                                  <div className="truncate max-w-[80px] sm:max-w-none">
                                    {expense.trip_destination}
                                  </div>
                                </td>
                                <td className="p-2 sm:p-4 hidden sm:table-cell">
                                  <div className="truncate max-w-[120px]">
                                    {expense.trip_purpose}
                                  </div>
                                </td>
                                <td className="p-2 sm:p-4">
                                  <div className="truncate max-w-[60px] sm:max-w-none">
                                    {expense.expense_type}
                                  </div>
                                </td>
                                <td className="p-2 sm:p-4 font-medium">
                                  ${parseFloat(expense.amount.toString()).toFixed(2)} {expense.currency}
                                </td>
                                <td className="p-2 sm:p-4 hidden md:table-cell text-gray-600">
                                  {new Date(expense.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-2 sm:p-4">
                                  <span className={`inline-flex items-center rounded-full px-1.5 sm:px-2.5 py-0.5 text-xs font-medium ${
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
                              <td colSpan={6} className="p-4 text-center text-gray-500 text-sm">
                                No expense data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
