import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useApp } from "../context/Context";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#FF6347",
  "#ee82ee",
];
const PieChartComponent = () => {
  const { categoryTotals } = useApp();
  const data = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));
  return (
    <div className="flex-1">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label
            labelLine={{
              strokeWidth: 1,
              length: 2,
              length2: 1,
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
