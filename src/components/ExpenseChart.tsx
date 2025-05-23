
import React from 'react';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ExpenseChartProps {
  data: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899', '#ef4444'];

  // If there's no data, show a placeholder
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No expense data to display
      </div>
    );
  }

  const chartData = data.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage
  }));

  const config = chartData.reduce((acc, item, index) => {
    acc[item.name] = {
      color: COLORS[index % COLORS.length]
    };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer config={config} className="h-[300px]">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
};
