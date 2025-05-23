import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TravelExpenseForm } from '@/components/forms/TravelExpenseForm';
import { TravelExpenseList } from '@/components/lists/TravelExpenseList';
import { useTravelExpenses } from '@/hooks/useTravelExpenses';
import { NavigationButtons } from '@/components/NavigationButtons';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Corporate Travel</h1>
          <p className="text-gray-600 mt-1">Manage your business travel and expenses</p>
        </div>
        <NavigationButtons showBack={false} />
      </div>
      
      <Tabs defaultValue="expenses" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="new">New Expense</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
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
        <TabsContent value="new">
          <TravelExpenseForm onSubmit={createExpense} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
