
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: string;
  category: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (expenseId: string) => {
    navigate(`/expense/${expenseId}`);
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No expenses found. Submit your first expense report!
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow 
            key={expense.id}
            onClick={() => handleRowClick(expense.id)}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <TableCell className="font-medium">{expense.description}</TableCell>
            <TableCell>${expense.amount.toFixed(2)}</TableCell>
            <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>
              <Badge variant={expense.status === 'approved' ? 'default' : 'secondary'}>
                {expense.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
