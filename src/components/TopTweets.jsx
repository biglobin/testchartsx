import React from 'react';

const TopTweets = ({ tweets }) => {
  if (!tweets || tweets.length === 0) {
    return <div className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>暂无热门推文数据</div>;
  }

  return (
    <div className="overflow-auto max-h-96">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">用户</th>
            <th scope="col">内容</th>
            <th scope="col">点赞</th>
            <th scope="col">转发</th>
            <th scope="col">回复</th>
          </tr>
        </thead>
        <tbody>
          {tweets.map((tweet) => (
            <tr key={tweet.id}>
              <td>
                <div className="flex items-center">
                  <div>
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{tweet.name}</div>
                    <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>@{tweet.screen_name}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="max-w-md truncate" style={{ color: 'var(--text-primary)' }}>{tweet.full_text || tweet.text}</div>
              </td>
              <td style={{ color: 'var(--primary-color)', fontWeight: 500 }}>{tweet.favorite_count}</td>
              <td style={{ color: 'var(--secondary-color)', fontWeight: 500 }}>{tweet.retweet_count}</td>
              <td style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{tweet.reply_count || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTweets;