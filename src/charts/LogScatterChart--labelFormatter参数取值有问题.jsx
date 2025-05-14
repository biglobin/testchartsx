import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const LogTweetViewsScatterChart = ({ data }) => {
  // 确保数据存在且有效
  if (!data || data.length === 0) {
    return <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>暂无浏览量数据</div>;
  }

  const CustomTick = ({ x, y, payload }) => {
    const value = payload.value;
    let displayValue = value;
    if (value >= 10000) displayValue = `${(value / 10000).toFixed(0)}万`;
    else if (value >= 1000) displayValue = `${(value / 1000).toFixed(0)}千`;
    else if (value < 500) displayValue = value; // 确保10-100的值直接显示
    else if (value < 100) displayValue = value; // 确保10-100的值直接显示
    else if (value < 50) displayValue = value; // 确保10-100的值直接显示
    else if (value < 10) displayValue = value; // 确保小于10的值直接显示
  
    return (
      <text x={x} y={y} dy={4} textAnchor="end" fill="var(--text-secondary)">
        {displayValue}
      </text>
    );
  };
  
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
          scale="log" // 使用对数刻度
          type="number"
          //domain={['auto', 'auto']} // 自动计算范围
          domain={[1, 5000000]}
          // 重新设计刻度，增加低值区域的刻度点，确保均匀分布
          ticks={[1, 10, 100, 1000, 5000, 10000, 100000, 1000000, 5000000]}
          allowDataOverflow={true}
          //tick={{ fill: 'var(--text-secondary)' }}
          tick={<CustomTick />}
          axisLine={{ stroke: 'var(--border-color)' }}
          /*tickFormatter={(value) => {
            // 格式化刻度标签，使用科学计数法或简化大数字
            if (value < 1000) return value;
            if (value < 1000000) return `${(value/1000).toFixed(0)}K`;
            return `${(value/1000000).toFixed(1)}M`;
          }}*/
        />
        {/*
          在`LogScatterChart.jsx`文件中，`formatter`函数的第一个参数`value`来自数据点的`dataKey`属性。具体来说：
          1. 对于Tooltip组件：
            - 如果Tooltip显示的是Y轴数据，则 value 来自YAxis的 dataKey 属性。
            - 如果Tooltip显示的是X轴数据，则 value 来自XAxis的 dataKey 属性。
            - `value`对应Scatter组件中`data`数组里每个数据对象的`views`属性值（因为YAxis的`dataKey="views"`）
            - 例如数据格式为：`{date: "2023-01-01", views: 5000}`，那么`value`就是5000
          2. 这个值会在Tooltip显示时自动传入`formatter`函数，你可以看到代码中做了`value.toLocaleString()`格式化处理

          在Recharts的Tooltip组件中，`labelFormatter`函数的`label`参数来自X轴的`dataKey`属性值。
          1. 在LogScatterChart.jsx中：
            - XAxis设置了`dataKey="date"`
            - 因此`label`就是数据对象中的`date`属性值
          2. 例如数据格式为：`{date: "2023-01-01", views: 5000}`，那么`label`就是"2023-01-01"
          */}
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, name) => [value.toLocaleString(), name === '浏览量' ? '浏览量' : '当前日期']}
          labelFormatter={(label) => `日期: ${label}`}
          //labelFormatter样式:
          contentStyle={{ 
            backgroundColor: 'var(--bg-primary)', 
            borderColor: 'var(--border-color)',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            color: 'var(--text-primary)'
          }}
          itemStyle={{ color: 'var(--text-primary)' }}
        />
        <Legend />
        <Scatter 
          name="推文浏览量（对数坐标）" 
          data={data} 
          fill="var(--primary-color)" 
          shape="circle"
          line={{ stroke: 'var(--primary-color)', strokeWidth: 1 }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default LogTweetViewsScatterChart;