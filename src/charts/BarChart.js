import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data, dataKey = 'value', nameKey = 'name', fill = '#3b82f6', name = '数量' }) => {
  // 确保数据存在且有效
  if (!data || data.length === 0) {
    return <div className="text-center py-4">暂无数据</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} name={name} fill={fill} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
