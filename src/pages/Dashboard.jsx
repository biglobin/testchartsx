import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CustomBarChart from '../charts/BarChart';
import TweetCategoryPieChart from '../charts/PieChart';
import TweetEngagementChart from '../charts/EngagementChart';
import MonthlyTweetsChart from '../charts/MonthlyChart';
import TweetViewsScatterChart from '../charts/ScatterChart';
import DateRangeSelector from '../components/DateRangeSelector';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import TopTweets from '../components/TopTweets';
import './Dashboard.css';

// 定义图标对象
const icons = {
  totalTweets: '📊',
  avgLikes: '❤️',
  avgRetweets: '🔄',
  avgViews: '👁️'
};

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
  const [scatterData, setScatterData] = useState([]);
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
        
        // 获取散点图数据（推文浏览量随时间变化）
        const scatterResponse = await fetch(`${API_BASE_URL}/tweets/views${queryString}`);
        const scatterData = await scatterResponse.json();
        
        if (countData.success && categoriesData.success && monthlyData.success && engagementData.success && topTweetsData.success && scatterData.success) {
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
          setScatterData(scatterData.data);
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
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Twitter数据分析仪表盘</h1>
          <p className="mt-2" style={{ color: 'var(--text-tertiary)' }}>实时监控和分析Twitter数据趋势</p>
        </header>
        
        <div className="mb-8">
          {/* 筛选条件和数据概览 - 简洁行式布局 */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-4 bg-opacity-50 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)' }}>


            {/* 筛选条件部分 */}
            <div className="flex flex-col sm:flex-row gap-4 flex-grow">
              <div className="min-w-[150px]">
                <DateRangeSelector onRangeChange={handleDateRangeChange} />
              </div>
              <div className="min-w-[150px]">
                <CategoryFilter onCategoryChange={handleCategoryChange} categories={categoryData.map(cat => cat.name)} />
              </div>
            </div>

            
            {/* 数据概览部分 */}
            <div className="flex-grow md:text-right">
              <p className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>
                当前选择: {dateRange === 'all' ? '全部时间' : dateRange} | {selectedCategory === 'all' ? '全部分类' : selectedCategory}
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="stat-item">
                  <span className="stat-icon">{icons.totalTweets}</span>
                  <span className="stat-value">{stats.totalTweets}</span>
                  <span className="stat-label">总推文</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">{icons.avgLikes}</span>
                  <span className="stat-value">{stats.avgLikes}</span>
                  <span className="stat-label">平均点赞</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">{icons.avgRetweets}</span>
                  <span className="stat-value">{stats.avgRetweets}</span>
                  <span className="stat-label">平均转发</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">{icons.avgViews}</span>
                  <span className="stat-value">{stats.avgViews}</span>
                  <span className="stat-label">平均浏览</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        </div>
        

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="chart-container">
            <h3 className="chart-title">推文分类分布</h3>
            <TweetCategoryPieChart data={categoryData} />
          </div>
          <div className="chart-container">
            <h3 className="chart-title">月度推文数量</h3>
            <MonthlyTweetsChart data={monthlyData} />
          </div>
        </div>
        
        <div className="chart-container mb-8">
          <h3 className="chart-title">推文互动情况</h3>
          <TweetEngagementChart data={engagementData} />
        </div>
        
        <div className="chart-container mb-8">
          <h3 className="chart-title">推文浏览量趋势</h3>
          <TweetViewsScatterChart data={scatterData} />
        </div>
        
        <div className="card mb-8">
          <div className="card-header">热门推文</div>
          <div className="card-body p-0">
            <TopTweets tweets={topTweets} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;