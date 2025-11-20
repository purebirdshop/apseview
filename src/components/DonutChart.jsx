import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { COLORS } from "../utils/helper";


// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#9933FF"];


const CustomTooltip = ({ active, payload }) => {
  console.log(`payload: `, payload)
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "6px",
        }}
      >
        <p className="name">{`${payload[0].payload.groupName} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const DonutChart = ({ donutData, grandTotal, width=400, height=450, isAnimationActive = true }) => {

  console.log(donutData)
  try {
    if (!donutData || donutData.length === 0) return null;
    return (
      <div>
        <h3 className="chart-label">Total Attendance</h3>

        <h1 className="inner-total">{grandTotal.toLocaleString("en-US")}</h1>
        <PieChart width={width} height={height}>
          <Pie
            data={donutData}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            innerRadius={105}
            label
          >
            {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} isAnimationActive={isAnimationActive} />
          {/* <Legend /> */}
        </PieChart>
      </div>
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
