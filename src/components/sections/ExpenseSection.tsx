
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Receipt, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { ReceiptUpload } from '@/components/ReceiptUpload';
import { ExpenseDashboardWidget } from '@/components/ExpenseDashboardWidget';
import { useExpenseForm } from '@/hooks/useExpenseForm';
import { useToastContext } from '@/components/ui/toast-provider';

export function ExpenseSection() {
  const { toast } = useToastContext();
  const { 
    isSubmitting, 
    uploadedFile, 
    setUploadedFile, 
    processReceiptFile, 
    submitExpense 
  } = useExpenseForm();
  
  const [expenseCategory, setExpenseCategory] = useState('meals');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [isProcessingReceipt, setIsProcessingReceipt] = useState(false);

  const categories = [
    { id: 'meals', label: 'Meals & Entertainment', icon: '🍽️', limit: '$500/month' },
    { id: 'transportation', label: 'Transportation', icon: '🚗', limit: '$300/month' },
    { id: 'accommodation', label: 'Accommodation', icon: '🏨', limit: '$400/month' },
    { id: 'office', label: 'Office Supplies', icon: '📝', limit: '$150/month' },
    { id: 'equipment', label: 'Equipment', icon: '💻', limit: '$500/month' },
    { id: 'other', label: 'Other', icon: '📋', limit: '$150/month' },
  ];

  const handleFileSelect = async (file: File) => {
    setUploadedFile(file);
    setIsProcessingReceipt(true);
    
    try {
      const extractedData = await processReceiptFile(file);
      
      // Auto-fill form with extracted data
      if (extractedData.amount) setAmount(extractedData.amount.toString());
      if (extractedData.description) setDescription(extractedData.description);
      if (extractedData.date) setDate(extractedData.date);
      
      toast({
        title: 'Receipt Processed!',
        description: 'Data has been automatically extracted from your receipt.',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Processing Failed',
        description: 'Could not extract data from receipt. Please fill manually.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessingReceipt(false);
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    // Optionally clear auto-filled data
    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in amount and description.',
        variant: 'destructive'
      });
      return;
    }

    try {
      await submitExpense({
        category: expenseCategory,
        amount: parseFloat(amount),
        date,
        description,
        receiptFile: uploadedFile || undefined
      });
      
      // Reset form
      setAmount('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setUploadedFile(null);
      setExpenseCategory('meals');
      
      // Trigger custom event to update dashboard
      window.dispatchEvent(new CustomEvent('expenseAdded'));
      
    } catch (error) {
      // Error is handled in the hook
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Receipt className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Reports</h1>
          <p className="text-gray-600">Snap, upload, and get reimbursed in no time!</p>
        </div>
      </div>

      {/* Dashboard */}
      <ExpenseDashboardWidget />

      {/* Submit New Expense */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit New Expense</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Expense Category</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setExpenseCategory(category.id)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    expenseCategory === category.id
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{category.label}</div>
                      <div className="text-xs text-gray-500">{category.limit}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Upload</label>
            <ReceiptUpload
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
              selectedFile={uploadedFile}
              isProcessing={isProcessingReceipt}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  className="pl-10" 
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <Input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea 
              placeholder="Brief description of the expense..."
              className="h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {uploadedFile && (
            <div className="bg-cyan-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="text-cyan-500">🧠</div>
                <div>
                  <h4 className="font-medium text-cyan-900">Smart Receipt Processing</h4>
                  <p className="text-sm text-cyan-700 mt-1">
                    Our AI automatically extracted information from your receipt. 
                    Please review and modify if needed before submitting.
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Expense Report'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
