
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Trash2, Edit, MapPin, Calendar, DollarSign, FileText } from 'lucide-react';
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
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading your travel expenses...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <div className="text-red-600 font-medium mb-2">Unable to load expenses</div>
          <div className="text-red-500 text-sm">{error?.message}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Travel Expenses</span>
        </CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/70" />
          <Input
            placeholder="Search by destination or purpose..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {expenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No travel expenses yet</h3>
            <p className="text-gray-500">Start by adding your first travel expense</p>
          </div>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {expense.trip_destination}
                      </h3>
                      <p className="text-gray-600 mb-2">{expense.trip_purpose}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(expense.start_date).toLocaleDateString()} - {new Date(expense.end_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-medium">{expense.amount} {expense.currency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={expense.status === 'approved' ? 'default' : 'secondary'}
                      className={expense.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {expense.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => handleEditClick(expense)} className="border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <Edit className="w-5 h-5 text-indigo-600" />
                              <span>Edit Travel Expense</span>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">Destination</label>
                              <Input
                                value={editFormData.trip_destination}
                                onChange={(e) => setEditFormData({...editFormData, trip_destination: e.target.value})}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">Purpose</label>
                              <Input
                                value={editFormData.trip_purpose}
                                onChange={(e) => setEditFormData({...editFormData, trip_purpose: e.target.value})}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">Amount</label>
                              <Input
                                type="number"
                                value={editFormData.amount}
                                onChange={(e) => setEditFormData({...editFormData, amount: parseFloat(e.target.value)})}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                              <Input
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                              />
                            </div>
                            <Button 
                              onClick={handleEditSubmit} 
                              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => onDelete(expense.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Type:</span> {expense.expense_type}
                    {expense.description && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="font-medium">Note:</span> {expense.description}
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8 pt-6 border-t border-gray-200">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={page === currentPage ? 'default' : 'outline'}
                onClick={() => goToPage(page)}
                className={page === currentPage ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
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
