import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#9933FF"];

const StraightPieChart = ({ data, width = 400, height = 200, groupName }) => {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ marginBottom: "3rem" }}>
      <h3>{groupName}</h3>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="100%" // straight angle
          startAngle={180}
          endAngle={0}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default StraightPieChart;
