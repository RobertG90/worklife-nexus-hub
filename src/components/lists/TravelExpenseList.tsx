
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Edit } from 'lucide-react';
import { TravelExpense } from '@/hooks/useTravelExpenses';

interface TravelExpenseListProps {
  expenses: TravelExpense[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onSearch: (term: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<TravelExpense>) => void;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export function TravelExpenseList({
  expenses,
  isLoading,
  isError,
  error,
  onSearch,
  onDelete,
  onUpdate,
  currentPage,
  totalPages,
  goToPage
}: TravelExpenseListProps) {
  if (isLoading) {
    return <div className="text-center py-6">Loading expenses...</div>;
  }

  if (isError) {
    return <div className="text-center py-6 text-red-500">Error: {error?.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Expenses</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No expenses found</div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{expense.trip_destination}</h3>
                  <Badge variant={expense.status === 'approved' ? 'default' : 'secondary'}>
                    {expense.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{expense.trip_purpose}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <p>{expense.expense_type} - {expense.amount} {expense.currency}</p>
                    <p>{new Date(expense.start_date).toLocaleDateString()} - {new Date(expense.end_date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(expense.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={page === currentPage ? 'default' : 'outline'}
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
