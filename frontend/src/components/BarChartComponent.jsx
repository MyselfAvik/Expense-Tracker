import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../context/Context";
const BarChartComponent = () => {
  const { monthTotals } = useApp();
  const data = Object.entries(monthTotals).map(([month, total]) => ({
    name: month,
    expense: total,
  }));
  return (
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tickFormatter={(value) => {
              const [month] = value.split(" ");
              return month.slice(0, 3);
            }}
          />
          <YAxis />
          <Tooltip />
         
          <Bar
            dataKey="expense"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
