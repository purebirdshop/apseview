import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../utils/helper";

const GroupBarChart = ({ groupBarData = [], groupName, loading = false }) => {
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
    total: entry.total != null && !isNaN(entry.total) ? entry.total : 0,
  }));

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3 className="chart-label">{capsFirstLetter(groupName)}</h3>
      <ResponsiveContainer width="144" height={240}>
        <BarChart data={safeData} margin={{ top: 48, right: 12, left: 12, bottom: 6 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide={true} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" barSize={40}>
            {safeData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupBarChart;
