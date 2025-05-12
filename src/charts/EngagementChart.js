import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TweetEngagementChart = ({ data }) => {
  // 确保数据存在且有效
  if (!data || Object.keys(data).length === 0) {
    return <div className="text-center py-4">暂无互动数据</div>;
  }

  // 将数据转换为图表所需格式
  const chartData = [
    {
      name: '点赞',
      value: Math.round(data.avg_likes) || 0,
      fill: '#0088FE'
    },
    {
      name: '转发',
      value: Math.round(data.avg_retweets) || 0,
      fill: '#00C49F'
    },
    {
      name: '回复',
      value: Math.round(data.avg_replies) || 0,
      fill: '#FFBB28'
    },
    {
      name: '引用',
      value: Math.round(data.avg_quotes) || 0,
      fill: '#FF8042'
    },
    {
      name: '书签',
      value: Math.round(data.avg_bookmarks) || 0,
      fill: '#8884d8'
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, '平均数量']} />
        <Legend />
        <Bar dataKey="value" name="平均互动数" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TweetEngagementChart;