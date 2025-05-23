
import React from 'react';
import { useParams } from 'react-router-dom';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, Calendar, DollarSign, Tag, FileText, User } from 'lucide-react';

export default function ExpenseDetails() {
  const { id } = useParams();
  
  // Get expense from localStorage
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  const expense = expenses.find((exp: any) => exp.id === id);

  if (!expense) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Expense Not Found</h1>
          <p className="text-gray-600 mb-4">The expense you're looking for doesn't exist.</p>
          <NavigationButtons />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Expense Details</h1>
            <p className="text-gray-600 mt-1">View and manage expense information</p>
          </div>
          <NavigationButtons />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Receipt className="w-5 h-5" />
                  <span>Expense Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="w-4 h-4 inline mr-1" />
                      Description
                    </label>
                    <p className="text-gray-900 font-medium">{expense.description}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Amount
                    </label>
                    <p className="text-2xl font-bold text-green-600">${expense.amount.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date
                    </label>
                    <p className="text-gray-900">{new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Tag className="w-4 h-4 inline mr-1" />
                      Category
                    </label>
                    <p className="text-gray-900 capitalize">{expense.category}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <Badge variant={expense.status === 'approved' ? 'default' : 'secondary'} className="text-sm">
                    {expense.status}
                  </Badge>
                </div>

                {expense.receiptFile && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receipt
                    </label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Receipt className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">{expense.receiptFile}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Expense Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Submitted by</p>
                  <p className="font-medium text-gray-900">John Doe</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Submitted on</p>
                  <p className="font-medium text-gray-900">
                    {new Date(expense.created_at || expense.date).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Expense ID</p>
                  <p className="font-medium text-gray-900 text-xs">{expense.id}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  {expense.status === 'pending' && (
                    <>
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                        Approve
                      </button>
                      <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                        Reject
                      </button>
                    </>
                  )}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Download Receipt
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
