const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',     // 替换为您的MySQL用户名
  password: '',     // 替换为您的MySQL密码
  database: 'twitter_db' // 替换为您的数据库名
});

// 测试数据库连接
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as test');
    res.json({ success: true, message: '数据库连接成功', data: rows });
  } catch (error) {
    console.error('数据库连接错误:', error);
    res.status(500).json({ success: false, message: '数据库连接失败', error: error.message });
  }
});

// 获取推文总数
app.get('/api/tweets/count', async (req, res) => {
  try {
    let query = 'SELECT COUNT(*) as total FROM tweets';
    const params = [];
    
    // 添加时间范围筛选
    if (req.query.dateRange && req.query.dateRange !== 'all') {
      let dateCondition = '';
      const now = new Date();
      
      switch(req.query.dateRange) {
        case 'last7days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
          break;
        case 'last30days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
          break;
        case 'last3months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)';
          break;
        case 'last6months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)';
          break;
        case 'lastyear':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)';
          break;
      }
      
      if (dateCondition) {
        query += ' WHERE ' + dateCondition;
      }
    }
    
    // 添加分类筛选
    if (req.query.category && req.query.category !== 'all') {
      query += query.includes('WHERE') ? ' AND category = ?' : ' WHERE category = ?';
      params.push(req.query.category);
    }
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('获取推文总数错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取推文分类统计
app.get('/api/tweets/categories', async (req, res) => {
  try {
    let query = 'SELECT category, COUNT(*) as count FROM tweets';
    const params = [];
    
    // 添加时间范围筛选
    if (req.query.dateRange && req.query.dateRange !== 'all') {
      let dateCondition = '';
      
      switch(req.query.dateRange) {
        case 'last7days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
          break;
        case 'last30days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
          break;
        case 'last3months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)';
          break;
        case 'last6months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)';
          break;
        case 'lastyear':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)';
          break;
      }
      
      if (dateCondition) {
        query += ' WHERE ' + dateCondition;
      }
    }
    
    query += ' GROUP BY category ORDER BY count DESC';
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('获取分类统计错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取每月推文数量
app.get('/api/tweets/monthly', async (req, res) => {
  try {
    let query = 'SELECT DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count FROM tweets';
    const params = [];
    
    // 添加时间范围筛选
    if (req.query.dateRange && req.query.dateRange !== 'all') {
      let dateCondition = '';
      
      switch(req.query.dateRange) {
        case 'last7days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
          break;
        case 'last30days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
          break;
        case 'last3months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)';
          break;
        case 'last6months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)';
          break;
        case 'lastyear':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)';
          break;
      }
      
      if (dateCondition) {
        query += ' WHERE ' + dateCondition;
      }
    }
    
    // 添加分类筛选
    if (req.query.category && req.query.category !== 'all') {
      query += query.includes('WHERE') ? ' AND category = ?' : ' WHERE category = ?';
      params.push(req.query.category);
    }
    
    query += ' GROUP BY month ORDER BY month';
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('获取月度统计错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取互动统计（点赞、转发、评论等）
app.get('/api/tweets/engagement', async (req, res) => {
  try {
    let query = 'SELECT AVG(favorite_count) as avg_likes, AVG(retweet_count) as avg_retweets, ' +
      'AVG(reply_count) as avg_replies, AVG(quote_count) as avg_quotes, ' +
      'AVG(bookmark_count) as avg_bookmarks, AVG(views_count) as avg_views ' +
      'FROM tweets';
    const params = [];
    
    // 添加时间范围筛选
    if (req.query.dateRange && req.query.dateRange !== 'all') {
      let dateCondition = '';
      
      switch(req.query.dateRange) {
        case 'last7days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
          break;
        case 'last30days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
          break;
        case 'last3months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)';
          break;
        case 'last6months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)';
          break;
        case 'lastyear':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)';
          break;
      }
      
      if (dateCondition) {
        query += ' WHERE ' + dateCondition;
      }
    }
    
    // 添加分类筛选
    if (req.query.category && req.query.category !== 'all') {
      query += query.includes('WHERE') ? ' AND category = ?' : ' WHERE category = ?';
      params.push(req.query.category);
    }
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('获取互动统计错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取互动最高的推文
app.get('/api/tweets/top', async (req, res) => {
  try {
    let query = 'SELECT id, full_text, name, screen_name, favorite_count, retweet_count, reply_count, views_count FROM tweets';
    const params = [];
    
    // 添加时间范围筛选
    if (req.query.dateRange && req.query.dateRange !== 'all') {
      let dateCondition = '';
      
      switch(req.query.dateRange) {
        case 'last7days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
          break;
        case 'last30days':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
          break;
        case 'last3months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)';
          break;
        case 'last6months':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)';
          break;
        case 'lastyear':
          dateCondition = 'created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)';
          break;
      }
      
      if (dateCondition) {
        query += ' WHERE ' + dateCondition;
      }
    }
    
    // 添加分类筛选
    if (req.query.category && req.query.category !== 'all') {
      query += query.includes('WHERE') ? ' AND category = ?' : ' WHERE category = ?';
      params.push(req.query.category);
    }
    
    query += ' ORDER BY (favorite_count + retweet_count + reply_count) DESC LIMIT 10';
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('获取热门推文错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});