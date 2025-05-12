import React from 'react';

const DateRangeSelector = ({ onRangeChange }) => {
  const handleRangeChange = (e) => {
    const range = e.target.value;
    onRangeChange(range);
  };

  return (
    <div className="mb-4">
      <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
        时间范围
      </label>
      <select
        id="dateRange"
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        onChange={handleRangeChange}
        defaultValue="all"
      >
        <option value="all">全部时间</option>
        <option value="last7days">最近7天</option>
        <option value="last30days">最近30天</option>
        <option value="last3months">最近3个月</option>
        <option value="last6months">最近6个月</option>
        <option value="lastyear">最近一年</option>
      </select>
    </div>
  );
};

export default DateRangeSelector;