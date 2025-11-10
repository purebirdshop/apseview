import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

const SingleHalfPieChart = ({ name, categories }) => {
  // Convert categories object into an array suitable for Recharts
  const data = Object.entries(categories).map(([categoryId, value]) => ({
    name: categoryId,
    value,
  }));

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>{name}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="100%" // bottom of container
            startAngle={180} // left side
            endAngle={0} // right side
            innerRadius={50}
            outerRadius={100}
            paddingAngle={2}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SingleHalfPieChart;
