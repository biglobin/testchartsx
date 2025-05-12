import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// 使用主题变量定义的颜色
const COLORS = [
  'var(--primary-color)',
  'var(--secondary-color)',
  'var(--success-color)',
  'var(--warning-color)',
  'var(--primary-light)',
  'var(--secondary-light)',
  'var(--primary-dark)',
  'var(--secondary-dark)'
];

const TweetCategoryPieChart = ({ data }) => {
  // 确保数据存在且有效
  if (!data || data.length === 0) {
    return <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>暂无分类数据</div>;
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