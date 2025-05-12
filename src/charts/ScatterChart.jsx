import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TweetViewsScatterChart = ({ data }) => {
  // 确保数据存在且有效
  if (!data || data.length === 0) {
    return <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>暂无浏览量数据</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" strokeOpacity={0.5} />
        <XAxis 
          dataKey="date" 
          name="日期" 
          tick={{ fill: 'var(--text-secondary)' }}
          axisLine={{ stroke: 'var(--border-color)' }}
        />
        <YAxis 
          dataKey="views" 
          name="浏览量" 
          tick={{ fill: 'var(--text-secondary)' }}
          axisLine={{ stroke: 'var(--border-color)' }}
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, name) => [value, name === 'views' ? '浏览量' : '日期']}
          labelFormatter={(label) => `日期: ${label}`}
          contentStyle={{ 
            backgroundColor: 'var(--bg-primary)', 
            borderColor: 'var(--border-color)',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            color: 'var(--text-primary)'
          }}
        />
        <Legend />
        <Scatter 
          name="推文浏览量" 
          data={data} 
          fill="var(--primary-color)" 
          shape="circle"
          line={{ stroke: 'var(--primary-color)', strokeWidth: 1 }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default TweetViewsScatterChart;