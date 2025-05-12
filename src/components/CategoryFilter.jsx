import React from 'react';

const CategoryFilter = ({ categories, onCategoryChange }) => {
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onCategoryChange(category);
  };

  return (
    <div className="mb-4">
      <label htmlFor="categoryFilter" className="form-label">
        分类筛选
      </label>
      <select
        id="categoryFilter"
        className="form-select"
        onChange={handleCategoryChange}
        defaultValue="all"
      >
        <option value="all">所有分类</option>
        {categories && categories.map((category, index) => (
          <option key={index} value={category}>
            {category || '未分类'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;