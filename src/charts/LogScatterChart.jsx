import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, ReferenceDot } from 'recharts';
/**
 * labelFormatter label应为“当前鼠标悬停数据点的X轴值”。但实际显示时始终是X轴第一个数据值：2022-11-27.
    <Tooltip 
      cursor={{ strokeDasharray: '3 3' }}
      formatter={(value, name) => [value.toLocaleString(), name === '浏览量' ? '浏览量' : '当前日期']}
      labelFormatter={(label) => `起始日期: ${label}`}
      //labelFormatter样式:
      contentStyle={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderColor: 'var(--border-color)',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        color: 'var(--text-primary)'
      }}
      itemStyle={{ color: 'var(--text-primary)' }}
    /> */
// 自定义Tooltip组件
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  const data = payload[0].payload;
  
  return (
    <div className="custom-tooltip" style={{
      backgroundColor: 'var(--bg-primary)',
      border: '1px solid var(--border-color)',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      padding: '10px',
      color: 'var(--text-primary)'
    }}>
      <p className="tooltip-title" style={{ margin: '0 0 5px', fontWeight: 'bold' }}>
        推文详情
      </p>
      <p className="tooltip-date" style={{ margin: '0 0 5px' }}>
        <span style={{ fontWeight: 'bold' }}>发布日期:</span> {data.date}
      </p>
      <p className="tooltip-views" style={{ margin: '0 0 5px' }}>
        <span style={{ fontWeight: 'bold' }}>浏览量:</span> {data.views.toLocaleString()}
      </p>
      {data.content && (
        <div className="tooltip-content" style={{ margin: '5px 0 0', fontSize: '0.9em', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <p style={{ fontWeight: 'bold', margin: '0 0 3px' }}>推文内容:</p>
          <p style={{ margin: 0 }}>{data.content}</p>
        </div>
      )}
      {data.engagement && (
        <div className="tooltip-engagement" style={{ margin: '5px 0 0', fontSize: '0.9em' }}>
          <p style={{ fontWeight: 'bold', margin: '0 0 3px' }}>互动数据:</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {data.engagement.likes !== undefined && <span>👍 {data.engagement.likes}</span>}
            {data.engagement.retweets !== undefined && <span>🔄 {data.engagement.retweets}</span>}
            {data.engagement.replies !== undefined && <span>💬 {data.engagement.replies}</span>}
          </div>
        </div>
      )}
    </div>
  );
};


const LogTweetViewsScatterChart = ({ data }) => {
  // 确保数据存在且有效
  if (!data || data.length === 0) {
    return <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>暂无浏览量数据</div>;
  }
  
  // 状态管理：颜色设置
  const [categoryColors, setCategoryColors] = useState({});
  const [categories, setCategories] = useState([]);
  
  // 提取所有分类并设置初始颜色
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(data.map(item => item.category || '未分类')));
    setCategories(uniqueCategories);
    
    // 预定义的一些颜色，用于常见分类
    const commonColors = {
      '科技': '#1f77b4',
      '财经': '#ff7f0e',
      '教育': '#2ca02c',
      '娱乐': '#d62728',
      '体育': '#9467bd',
      '健康': '#8c564b',
      '政治': '#e377c2',
      '其他': '#7f7f7f'
    };
    
    // 设置初始颜色 - 动态生成
    const initialColors = {};
    uniqueCategories.forEach((category, index) => {
      // 如果是常见分类则使用预定义颜色，否则根据索引生成HSL颜色
      initialColors[category] = commonColors[category] || `hsl(${index * 360 / uniqueCategories.length}, 70%, 50%)`;
    });
    setCategoryColors(initialColors);
  }, [data]);
  
  // 处理颜色变更
  const handleColorChange = (category, color) => {
    setCategoryColors(prev => ({
      ...prev,
      [category]: color
    }));
  };

  // 格式化刻度值的函数
  const formatTickValue = (value) => {
    /*let displayValue = value;
    if (value >= 10000) displayValue = `${(value / 10000).toFixed(0)}万`;
    else if (value >= 1000) displayValue = `${(value / 1000).toFixed(0)}千`;
    else displayValue = value;
    return displayValue;*/

    const isInteger = (num) => Number.isInteger(num);
    if (value >= 10000) {
      const wan = value / 10000;
      return isInteger(wan) ? `${wan}万` : value;
    }  
    if (value >= 1000) {
      const qian = value / 1000;
      return isInteger(qian) ? `${qian}千` : value;
    }
    return value;
};
  
  // 自定义参考线标签组件
  const CustomReferenceLabel = ({ viewBox, value, x, y }) => {
    return (
      <text 
        x={viewBox.x - 10} 
        y={viewBox.y} 
        textAnchor="end" 
        dominantBaseline="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        {formatTickValue(value)}
      </text>
    );
  };
  
  // 定义对数刻度的参考线值
  const referenceValues = [1, 5, 10, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 5000000];
  
  // 按分类对数据进行分组
  const groupedData = {};
  data.forEach(item => {
    const category = item.category || '未分类';
    if (!groupedData[category]) {
      groupedData[category] = [];
    }
    groupedData[category].push(item);
  });
  
  return (
    <div>
    <ResponsiveContainer width="100%" height={800}>
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
          domain={[100, 5000000]}
          allowDataOverflow={true}
          axisLine={{ stroke: 'var(--border-color)' }}
          tick={false} // 隐藏默认刻度
          tickLine={false} // 隐藏刻度线
        />
        
        {/* 使用ReferenceLine创建自定义刻度线 */}
        {referenceValues.map(value => (
          <ReferenceLine 
            key={`ref-line-${value}`}
            y={value} 
            stroke="var(--border-color)" 
            strokeOpacity={0.3}
            strokeDasharray="3 3"
            label={<CustomReferenceLabel value={value} />}
          />
        ))}
        
        {/* 在Y轴上添加参考点 */}
        {referenceValues.map(value => (
          <ReferenceDot
            key={`ref-dot-${value}`}
            y={value}
            x={0}
            r={0}
            isFront={true}
          />
        ))}
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          content={<CustomTooltip />}
        />
        <Legend />
        {/* 为每个分类创建一个Scatter组件 */}
        {Object.keys(groupedData).map(category => (
          <Scatter 
            key={category}
            name={category} 
            data={groupedData[category]} 
            fill={categoryColors[category] || 'var(--primary-color)'} 
            shape="circle"
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
    <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h4 style={{ margin: '0 0 10px', color: 'var(--text-primary)' }}>分类颜色设置</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {categories.map(category => (
          <div key={category} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ marginRight: '8px', color: 'var(--text-primary)' }}>{category}:</span>
            <input 
              type="color" 
              value={categoryColors[category] || '#1f77b4'}
              onChange={(e) => handleColorChange(category, e.target.value)}
              style={{ width: '30px', height: '30px', border: 'none', cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default LogTweetViewsScatterChart;