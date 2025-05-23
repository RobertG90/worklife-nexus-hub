
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  const [editingExpense, setEditingExpense] = useState<TravelExpense | null>(null);
  const [editFormData, setEditFormData] = useState({
    trip_destination: '',
    trip_purpose: '',
    amount: 0,
    description: ''
  });

  const handleEditClick = (expense: TravelExpense) => {
    setEditingExpense(expense);
    setEditFormData({
      trip_destination: expense.trip_destination,
      trip_purpose: expense.trip_purpose,
      amount: expense.amount,
      description: expense.description || ''
    });
  };

  const handleEditSubmit = () => {
    if (editingExpense) {
      onUpdate(editingExpense.id, editFormData);
      setEditingExpense(null);
    }
  };

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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => handleEditClick(expense)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Travel Expense</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Destination</label>
                            <Input
                              value={editFormData.trip_destination}
                              onChange={(e) => setEditFormData({...editFormData, trip_destination: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Purpose</label>
                            <Input
                              value={editFormData.trip_purpose}
                              onChange={(e) => setEditFormData({...editFormData, trip_purpose: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Amount</label>
                            <Input
                              type="number"
                              value={editFormData.amount}
                              onChange={(e) => setEditFormData({...editFormData, amount: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Input
                              value={editFormData.description}
                              onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                            />
                          </div>
                          <Button onClick={handleEditSubmit} className="w-full">
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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
