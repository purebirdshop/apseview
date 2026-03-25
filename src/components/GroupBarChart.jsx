import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const roundUpNice = (value) => {
  if (value <= 50) return Math.ceil(value / 5) * 5;
  if (value <= 200) return Math.ceil(value / 10) * 10;
  if (value <= 1000) return Math.ceil(value / 50) * 50;
  return Math.ceil(value / 100) * 100;
};

import { CHART_COLORS } from "../utils/helper";
const GroupBarChart = ({ groupBarData = [], groupName, grandTotal, loading = false }) => {
  const capsFirstLetter = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#e0f7fa",
          color: "#00796b",
          padding: "1rem",
          borderRadius: "8px",
          margin: "1rem 0",
          textAlign: "center",
        }}
      >
        Loading {capsFirstLetter(groupName)} chart...
      </div>
    );
  }

  // Guard for empty or invalid data
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
          textAlign: "center",
        }}
      >
        ⚠️ No valid chart data for <strong>{capsFirstLetter(groupName)}</strong>
      </div>
    );
  }

  // Ensure totals are numeric and valid
  const safeData = groupBarData.map((entry) => ({
    name: entry.name || `Category ${entry.category_id || "N/A"}`,
    lookup: entry.lookup,
    total: entry.total != null && !isNaN(entry.total) ? entry.total : 0,
  }));

  return (
    <div style={{ 
      backgroundColor:"#444",
      borderRadius:"10px",
      marginBottom: "1rem",
      width:"100%"
    }}>
      <h3 className="chart-label">{capsFirstLetter(groupName)}</h3>
      <ResponsiveContainer width="100%" height="100">
        <BarChart
          layout="vertical"
          background="none"
          data={safeData}
          margin={{ top: 18, right: 12, left: 12, bottom: 0 }}
          >
          <XAxis
            domain={[0, roundUpNice(grandTotal)]}
            type="number"
          />
          <YAxis dataKey="name" hide={true} type="category" />
            {safeData.map((entry, index) => (
              <Bar
                dataKey="total"
                barSize={15}
                radius={25}
                key={index}
                fill={CHART_COLORS[entry.lookup]}
              >
                <LabelList
                  dataKey="total"
                  position="right"
                  fill="white"
                /> 
              </Bar>
            ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupBarChart;
