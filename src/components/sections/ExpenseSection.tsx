import React from 'react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ExpenseTable } from '@/components/tables/ExpenseTable';
import { useExpenses } from '@/hooks/useExpenses';
import { Link } from 'react-router-dom';

export function ExpenseSection() {
  const { expenses, isLoading, isError, error } = useExpenses();

  if (isLoading) {
    return <div>Loading expenses...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expense Reports</h1>
          <p className="text-gray-600 mt-1">Submit and track your expense reports</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Manage your recent expenses and submit new reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Link to="/expense-dashboard">
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </Link>
          </div>
          <ExpenseTable expenses={expenses} />
        </CardContent>
      </Card>
    </div>
  );
}
