import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      <span className="ml-3 text-gray-600">加载中...</span>
    </div>
  );
};

export default LoadingSpinner;