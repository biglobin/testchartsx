# 📊 Twitter数据分析仪表盘

一个基于**React**、**Tailwind CSS**和**Recharts**构建的**Twitter数据分析仪表盘**，用于可视化MySQL数据库中存储的推文数据。该项目提供了多种图表和统计信息，帮助用户分析Twitter上的内容表现和用户互动情况。

## 🔥 演示
👉 [演示链接](http://localhost:5173)

## 📌 功能特点

- ✅ 推文总数、平均点赞、转发和浏览量等KPI指标展示
- ✅ 推文分类分布饼图
- ✅ 月度推文数量趋势图
- ✅ 推文互动指标（点赞、转发、回复、引用、书签）对比图
- ✅ 热门推文列表展示
- ✅ 时间范围筛选器（最近7天、30天、3个月、6个月、1年）
- ✅ 分类筛选功能
- ✅ 响应式布局，适配不同设备
- ✅ 前后端分离架构，Express后端API
- ✅ MySQL数据库集成
- ✅ 优雅的加载状态和空数据处理

## 🛠️ 技术栈

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Vite](https://vitejs.dev/) (快速构建)
- [Express](https://expressjs.com/) (后端API)
- [MySQL](https://www.mysql.com/) (数据库)

## 📁 项目结构

src/
├── components/ # 可复用组件
│   ├── Card.js # 数据卡片组件
│   ├── CategoryFilter.js # 分类筛选器组件
│   ├── DateRangeSelector.js # 时间范围选择器组件
│   ├── LoadingSpinner.js # 加载状态组件
│   └── TopTweets.js # 热门推文组件
├── charts/ # Recharts图表组件
│   ├── BarChart.js # 柱状图组件
│   ├── EngagementChart.js # 互动指标图表
│   ├── MonthlyChart.js # 月度趋势图表
│   └── PieChart.js # 分类饼图组件
├── pages/ # 页面组件
│   └── Dashboard.js # 仪表盘主页面
├── styles/ # 样式文件
│   └── index.css # 全局样式
├── App.jsx # 应用根组件
└── main.jsx # 应用入口文件

server.js # Express后端服务器

## 🚀 本地运行

```bash
# 克隆仓库
git clone https://github.com/lucassoaresb/analytics-dashboard.git

# 安装依赖
npm install

# 启动后端服务器
npm run server

# 在另一个终端启动前端开发服务器
npm run dev
```

## 💡 使用说明

1. 启动后端服务器和前端开发服务器后，访问 http://localhost:5173 打开仪表盘
2. 使用顶部的筛选器选择不同的时间范围和推文分类
3. 查看各种图表和数据指标，了解Twitter数据的趋势和分布
4. 在底部查看互动最高的热门推文列表
