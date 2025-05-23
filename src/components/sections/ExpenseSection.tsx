
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Receipt, Search, FileText, DollarSign } from 'lucide-react';
import { ExpenseTable } from '@/components/tables/ExpenseTable';

const sampleExpenses = [
  {
    id: 'exp-001',
    description: 'Business lunch with client',
    amount: 85.50,
    date: '2024-01-15',
    status: 'approved',
    category: 'meals',
    receiptFile: 'receipt-lunch-001.pdf',
    created_at: '2024-01-15T12:00:00Z'
  },
  {
    id: 'exp-002',
    description: 'Office supplies - pens and notebooks',
    amount: 42.30,
    date: '2024-01-12',
    status: 'pending',
    category: 'office-supplies',
    receiptFile: 'receipt-supplies-002.pdf',
    created_at: '2024-01-12T14:30:00Z'
  },
  {
    id: 'exp-003',
    description: 'Taxi fare to airport',
    amount: 65.00,
    date: '2024-01-10',
    status: 'approved',
    category: 'transportation',
    receiptFile: 'receipt-taxi-003.pdf',
    created_at: '2024-01-10T08:15:00Z'
  },
  {
    id: 'exp-004',
    description: 'Hotel accommodation - conference',
    amount: 250.00,
    date: '2024-01-08',
    status: 'approved',
    category: 'accommodation',
    receiptFile: 'receipt-hotel-004.pdf',
    created_at: '2024-01-08T16:45:00Z'
  },
  {
    id: 'exp-005',
    description: 'Software subscription - monthly',
    amount: 29.99,
    date: '2024-01-05',
    status: 'pending',
    category: 'software',
    receiptFile: 'receipt-software-005.pdf',
    created_at: '2024-01-05T10:20:00Z'
  },
  {
    id: 'exp-006',
    description: 'Parking fees - downtown meeting',
    amount: 15.00,
    date: '2024-01-03',
    status: 'rejected',
    category: 'transportation',
    receiptFile: 'receipt-parking-006.pdf',
    created_at: '2024-01-03T11:30:00Z'
  }
];

export function ExpenseSection() {
  const [expenses, setExpenses] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    // Initialize expenses in localStorage if they don't exist
    const storedExpenses = localStorage.getItem('expenses');
    if (!storedExpenses) {
      localStorage.setItem('expenses', JSON.stringify(sampleExpenses));
      setExpenses(sampleExpenses);
    } else {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Reports</h1>
          <p className="text-gray-600 mt-1">Submit and track your expense reports with ease</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">My Expenses</h3>
                <p className="text-gray-600 text-sm">View and manage your submitted expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">New Expense</h3>
                <p className="text-gray-600 text-sm">Submit a new expense report</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense History */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Receipt className="w-5 h-5" />
            <span>Expense History</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search expenses by description or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Expense Table */}
          <ExpenseTable expenses={filteredExpenses} />
        </CardContent>
      </Card>
    </div>
  );
}
