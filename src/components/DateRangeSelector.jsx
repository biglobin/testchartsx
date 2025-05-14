import React from 'react';

const DateRangeSelector = ({ onRangeChange }) => {
  const handleRangeChange = (e) => {
    const range = e.target.value;
    onRangeChange(range);
  };

  return (
    <div className="filter-item">
      <label htmlFor="dateRange" className="form-label">
        时间范围
      </label>
      <select
        id="dateRange"
        className="form-select"
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