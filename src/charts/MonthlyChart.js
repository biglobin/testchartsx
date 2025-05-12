import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyTweetsChart = ({ data }) => {
  // 确保数据存在且有效
  if (!data || data.length === 0) {
    return <div className="text-center py-4">暂无月度数据</div>;
  }

  // 处理数据，确保月份格式正确
  const processedData = data.map(item => ({
    month: item.month,
    count: item.count
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`${value} 条推文`, '数量']}
          labelFormatter={(month) => `${month} 月`}
        />
        <Bar dataKey="count" fill="#8884d8" name="推文数量" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyTweetsChart;