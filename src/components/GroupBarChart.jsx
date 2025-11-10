import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import { capsFirstLetter, COLORS } from "../utils/helper";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#9933FF"];

const GroupBarChart = ({ groupBarData, groupName }) => {
  try {
    if (!Array.isArray(groupBarData) || groupBarData.length === 0) {
      console.warn("GroupBarChart: data is not a valid array", groupBarData);
      return (
        <div
          style={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "1rem",
            borderRadius: "8px",
            margin: "1rem 0",
          }}
        >
          ⚠️ No valid chart data for <strong>{capsFirstLetter(groupName)}</strong>
        </div>
      );
    }

    return (
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="chart-label">{capsFirstLetter(groupName)}</h3>
        <h1>{console.log(groupBarData)}</h1>
        <ResponsiveContainer width={148} height={196}>
          <BarChart data={groupBarData} margin={{ top: 72, right: 12, left: 12, bottom: 6 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide={true} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" barSize={40} >
              {groupBarData.map((entry, index) => (
                <Cell key={`${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } catch (error) {
    console.error("Error rendering GroupBarChart:", error);

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

export default GroupBarChart;
