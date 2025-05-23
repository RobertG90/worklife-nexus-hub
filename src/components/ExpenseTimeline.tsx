
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ExpenseTimelineProps {
  data: {
    month: string;
    amount: number;
  }[];
}

export const ExpenseTimeline = ({ data }: ExpenseTimelineProps) => {
  // Format month labels to be more readable
  const formattedData = data.map(item => {
    const [year, month] = item.month.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    
    return {
      name: `${monthName} ${year}`,
      amount: item.amount
    };
  });

  // If there's no data, show a placeholder
  if (!formattedData || formattedData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No timeline data to display
      </div>
    );
  }

  const config = {
    amount: {
      color: "#3b82f6"
    }
  };

  return (
    <ChartContainer config={config} className="h-[300px]">
      <BarChart data={formattedData} margin={{ top: 5, right: 20, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          tickFormatter={(value) => `$${value}`}
          tick={{ fontSize: 12 }}
        />
        <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <ChartTooltip
          content={
            <ChartTooltipContent 
              formatter={(value) => `$${parseFloat(value as string).toFixed(2)}`}
            />
          }
        />
      </BarChart>
    </ChartContainer>
  );
};
