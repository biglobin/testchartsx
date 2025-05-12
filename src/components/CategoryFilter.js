import React from 'react';

const CategoryFilter = ({ categories, onCategoryChange }) => {
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onCategoryChange(category);
  };

  return (
    <div className="mb-4">
      <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">
        分类筛选
      </label>
      <select
        id="categoryFilter"
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        onChange={handleCategoryChange}
        defaultValue="all"
      >
        <option value="all">所有分类</option>
        {categories && categories.map((category, index) => (
          <option key={index} value={category.category || '未分类'}>
            {category.category || '未分类'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;