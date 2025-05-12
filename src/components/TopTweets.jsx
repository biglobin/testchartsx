import React from 'react';

const TopTweets = ({ tweets }) => {
  if (!tweets || tweets.length === 0) {
    return <div className="text-center py-4 text-gray-500">暂无热门推文数据</div>;
  }

  return (
    <div className="overflow-auto max-h-96">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">内容</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">点赞</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">转发</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">回复</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tweets.map((tweet) => (
            <tr key={tweet.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{tweet.name}</div>
                    <div className="text-sm text-gray-500">@{tweet.screen_name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-md truncate">{tweet.full_text}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tweet.favorite_count}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tweet.retweet_count}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tweet.reply_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTweets;