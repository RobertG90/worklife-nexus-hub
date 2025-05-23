
import React, { useState } from 'react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ReceiptUpload } from '@/components/ReceiptUpload';
import { ExpenseTable } from '@/components/tables/ExpenseTable';
import { useExpenseForm } from '@/hooks/useExpenseForm';
import { Search, Receipt, DollarSign, Calendar, FileText } from 'lucide-react';

export function ExpenseSection() {
  const [formData, setFormData] = useState({
    category: 'meals',
    amount: '',
    date: '',
    description: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    isSubmitting, 
    uploadedFile, 
    setUploadedFile, 
    processReceiptFile, 
    submitExpense 
  } = useExpenseForm();

  // Get expenses from localStorage for demo
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  const filteredExpenses = expenses.filter((expense: any) =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.date || !formData.description) {
      return;
    }

    await submitExpense({
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description,
      receiptFile: uploadedFile || undefined,
    });

    // Reset form
    setFormData({
      category: 'meals',
      amount: '',
      date: '',
      description: '',
    });
    setUploadedFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileSelect = async (file: File) => {
    setUploadedFile(file);
    try {
      const extractedData = await processReceiptFile(file);
      setFormData(prev => ({
        ...prev,
        amount: extractedData.amount?.toString() || prev.amount,
        description: extractedData.description || prev.description,
        date: extractedData.date || prev.date,
      }));
    } catch (error) {
      console.error('Error processing receipt:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Expense Reports</h1>
            </div>
            <p className="text-gray-600">Submit and track your expense reports with ease</p>
          </div>
          <NavigationButtons showBack={false} />
        </div>
        
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="expenses" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>My Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>New Expense</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Expense History</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search expenses by description or category..."
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <ExpenseTable expenses={filteredExpenses} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Submit New Expense</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="meals">Meals & Entertainment</option>
                        <option value="travel">Travel</option>
                        <option value="supplies">Office Supplies</option>
                        <option value="transport">Transportation</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Amount *
                      </label>
                      <Input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date *
                    </label>
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your expense..."
                      className="h-24 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receipt Upload
                    </label>
                    <ReceiptUpload
                      onFileSelect={handleFileSelect}
                      onFileRemove={() => setUploadedFile(null)}
                      selectedFile={uploadedFile}
                      isProcessing={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Expense Report'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
