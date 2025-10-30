import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SingleChart = ({ name, categories }) => {
  // Convert categories object into an array suitable for Recharts
  const data = Object.entries(categories).map(([categoryId, value]) => ({
    category: categoryId,
    name:name,
    value,
  }));

  console.log(data)
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>{name}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SingleChart;
