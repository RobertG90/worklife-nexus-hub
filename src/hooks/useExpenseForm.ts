
import { useState } from 'react';
import { useToastContext } from '@/components/ui/toast-provider';

export interface ExpenseFormData {
  category: string;
  amount: number;
  date: string;
  description: string;
  receiptFile?: File;
}

export function useExpenseForm() {
  const { toast } = useToastContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const processReceiptFile = async (file: File): Promise<{
    amount?: number;
    description?: string;
    date?: string;
  }> => {
    // Simulate AI processing of receipt
    // In a real app, this would call an AI service to extract data from the receipt
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data based on file name or random values
    const mockData = {
      amount: Math.floor(Math.random() * 200) + 10,
      description: `Business expense from ${file.name.split('.')[0]}`,
      date: new Date().toISOString().split('T')[0]
    };
    
    return mockData;
  };

  const submitExpense = async (formData: ExpenseFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store expense in localStorage for demo purposes
      const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      const newExpense = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      expenses.push(newExpense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      
      toast({
        title: 'Success!',
        description: 'Your expense report has been submitted successfully.',
        variant: 'success'
      });
      
      return newExpense;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit expense report. Please try again.',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    uploadedFile,
    setUploadedFile,
    processReceiptFile,
    submitExpense
  };
}
