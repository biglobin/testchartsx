import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// 自定义颜色
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];

const TweetCategoryPieChart = ({ data }) => {
  // 确保数据存在且有效
  if (!data || data.length === 0) {
    return <div className="text-center py-4">暂无分类数据</div>;
  }

  // 处理数据，确保每个分类都有名称
  const processedData = data.map(item => ({
    name: item.category || '未分类',
    value: item.count
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={processedData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [`${value} 条推文`, '数量']}
          labelFormatter={(name) => `分类: ${name}`}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TweetCategoryPieChart;