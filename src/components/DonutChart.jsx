import React from "react";
import {
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CHART_COLORS } from "../utils/helper";

const DonutChart = ({ donutData, grandTotal, width="100%", height=400 }) => {

  try {
    if (!donutData || donutData.length === 0) return null;
    return (
      <>
        <div className="inner-total">
          <h1 className="pie-label">{grandTotal.toLocaleString("en-US")}</h1>
          <h3 className="pie-label">Total Attendance</h3>
        </div>
        <PieChart width={width} height={height}>
          <Pie
            data={donutData}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            stroke="#222"
            strokeWidth={2}
            outerRadius={150}
            innerRadius={105}
            label
          >
            {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.lookup]} />
            ))}
          </Pie>
        </PieChart>
      </>
    );
  } catch (error) {
    console.error("Error rendering Donut Chart:", error);

    return (
      <div
        style={{
          backgroundColor: "#ffe6e6",
          color: "#990000",
          padding: "1rem",
          borderRadius: "8px",
          margin: "1rem 0",
        }}
      >
        <strong>Chart Error:</strong> There was a problem rendering the chart.
      </div>
    );
  }
};

export default DonutChart;
