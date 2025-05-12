import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const TweetEngagementChart = ({ data }) => {
  // 确保数据存在且有效
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>暂无互动数据</div>;
  }

  // 将数据转换为图表所需格式
  const chartData = [
    {
      name: '点赞',
      value: Math.round(data.avg_likes) || 0,
      fill: 'var(--primary-color)'
    },
    {
      name: '转发',
      value: Math.round(data.avg_retweets) || 0,
      fill: 'var(--secondary-color)'
    },
    {
      name: '回复',
      value: Math.round(data.avg_replies) || 0,
      fill: 'var(--success-color)'
    },
    {
      name: '引用',
      value: Math.round(data.avg_quotes) || 0,
      fill: 'var(--warning-color)'
    },
    {
      name: '书签',
      value: Math.round(data.avg_bookmarks) || 0,
      fill: '#8884d8'
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" strokeOpacity={0.5} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: 'var(--text-secondary)' }}
          axisLine={{ stroke: 'var(--border-color)' }}
        />
        <YAxis 
          tick={{ fill: 'var(--text-secondary)' }}
          axisLine={{ stroke: 'var(--border-color)' }}
        />
        <Tooltip 
          formatter={(value) => [`${value}`, '平均数量']} 
          contentStyle={{ 
            backgroundColor: 'var(--bg-primary)', 
            borderColor: 'var(--border-color)',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            color: 'var(--text-primary)'
          }}
          labelStyle={{ fontWeight: 'bold', marginBottom: '5px' }}
        />
        <Legend 
          wrapperStyle={{ 
            paddingTop: '10px',
            color: 'var(--text-secondary)'
          }}
        />
        <Bar 
          dataKey="value" 
          name="平均互动数" 
          radius={[4, 4, 0, 0]}
          barSize={40}
          animationDuration={1000}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TweetEngagementChart;