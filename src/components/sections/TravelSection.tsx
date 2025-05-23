
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TravelExpenseForm } from '@/components/forms/TravelExpenseForm';
import { TravelExpenseList } from '@/components/lists/TravelExpenseList';
import { useTravelExpenses } from '@/hooks/useTravelExpenses';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Plane, Plus, List, MapPin, Globe } from 'lucide-react';

export function TravelSection() {
  const { 
    expenses, 
    isLoading, 
    isError, 
    error, 
    createExpense, 
    updateExpense, 
    deleteExpense,
    setSearchTerm,
    currentPage,
    totalPages,
    goToPage
  } = useTravelExpenses();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Corporate Travel
                </h1>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <p>Manage your business travel and expenses</p>
                </div>
              </div>
            </div>
          </div>
          <NavigationButtons showBack={false} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Trips</p>
                <p className="text-xl font-bold text-gray-900">{expenses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-xl font-bold text-gray-900">
                  {expenses.filter(e => new Date(e.created_at).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <List className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-bold text-gray-900">
                  {expenses.filter(e => e.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Plane className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">
                  ${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white shadow-sm border border-gray-200">
            <TabsTrigger value="expenses" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <List className="w-4 h-4" />
              <span>Travel Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Plus className="w-4 h-4" />
              <span>New Expense</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <TravelExpenseList 
              expenses={expenses}
              isLoading={isLoading}
              isError={isError}
              error={error}
              onSearch={handleSearch}
              onDelete={deleteExpense}
              onUpdate={updateExpense}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <TravelExpenseForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
