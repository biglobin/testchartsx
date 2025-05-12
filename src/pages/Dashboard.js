import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CustomBarChart from '../charts/BarChart';
import TweetCategoryPieChart from '../charts/PieChart';
import TweetEngagementChart from '../charts/EngagementChart';
import MonthlyTweetsChart from '../charts/MonthlyChart';
import DateRangeSelector from '../components/DateRangeSelector';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import TopTweets from '../components/TopTweets';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTweets: 0,
    avgLikes: 0,
    avgRetweets: 0,
    avgViews: 0
  });
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [engagementData, setEngagementData] = useState({});
  const [topTweets, setTopTweets] = useState([]);
  const [dateRange, setDateRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const API_BASE_URL = 'http://localhost:3001/api';

  // 处理日期范围变化
  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  // 处理分类变化
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 构建查询参数
        const queryParams = new URLSearchParams();
        if (dateRange !== 'all') {
          queryParams.append('dateRange', dateRange);
        }
        if (selectedCategory !== 'all') {
          queryParams.append('category', selectedCategory);
        }
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        
        // 获取推文总数
        const countResponse = await fetch(`${API_BASE_URL}/tweets/count${queryString}`);
        const countData = await countResponse.json();
        
        // 获取分类数据
        const categoriesResponse = await fetch(`${API_BASE_URL}/tweets/categories${queryString}`);
        const categoriesData = await categoriesResponse.json();
        
        // 获取月度数据
        const monthlyResponse = await fetch(`${API_BASE_URL}/tweets/monthly${queryString}`);
        const monthlyData = await monthlyResponse.json();
        
        // 获取互动数据
        const engagementResponse = await fetch(`${API_BASE_URL}/tweets/engagement${queryString}`);
        const engagementData = await engagementResponse.json();
        
        // 获取热门推文
        const topTweetsResponse = await fetch(`${API_BASE_URL}/tweets/top${queryString}`);
        const topTweetsData = await topTweetsResponse.json();
        
        if (countData.success && categoriesData.success && monthlyData.success && engagementData.success && topTweetsData.success) {
          setStats({
            totalTweets: countData.data.total,
            avgLikes: Math.round(engagementData.data.avg_likes),
            avgRetweets: Math.round(engagementData.data.avg_retweets),
            avgViews: Math.round(engagementData.data.avg_views)
          });
          
          setCategoryData(categoriesData.data);
          setMonthlyData(monthlyData.data);
          setEngagementData(engagementData.data);
          setTopTweets(topTweetsData.data);
        }
      } catch (err) {
        console.error('获取数据失败:', err);
        setError('获取数据失败，请检查API连接');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange, selectedCategory]); // 当筛选条件变化时重新获取数据

  if (loading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Twitter数据分析仪表盘</h1>
      
      {/* 筛选器区域 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateRangeSelector onRangeChange={handleDateRangeChange} />
          <CategoryFilter categories={categoryData} onCategoryChange={handleCategoryChange} />
        </div>
      </div>
      
      {/* KPI 卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card title="推文总数" value={stats.totalTweets} />
        <Card title="平均点赞" value={stats.avgLikes} />
        <Card title="平均转发" value={stats.avgRetweets} />
        <Card title="平均浏览" value={stats.avgViews} />
      </div>
      
      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4">推文分类分布</h2>
          {categoryData.length > 0 ? (
            <TweetCategoryPieChart data={categoryData} />
          ) : (
            <div className="text-center py-10 text-gray-500">暂无分类数据</div>
          )}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4">月度推文数量</h2>
          {monthlyData.length > 0 ? (
            <MonthlyTweetsChart data={monthlyData} />
          ) : (
            <div className="text-center py-10 text-gray-500">暂无月度数据</div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4">推文互动指标</h2>
          {Object.keys(engagementData).length > 0 ? (
            <TweetEngagementChart data={engagementData} />
          ) : (
            <div className="text-center py-10 text-gray-500">暂无互动数据</div>
          )}
        </div>
      </div>
      
      {/* 热门推文区域 */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4">热门推文</h2>
          <TopTweets tweets={topTweets} />
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Twitter数据分析仪表盘 | 数据更新时间: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Dashboard;