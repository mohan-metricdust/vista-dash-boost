export const RecentActivity = () => {
  const activities = [
    { user: "John Doe", action: "Created new order", time: "2 hours ago" },
    { user: "Jane Smith", action: "Updated profile", time: "4 hours ago" },
    { user: "Mike Johnson", action: "Made payment", time: "6 hours ago" },
    { user: "Sarah Wilson", action: "Left feedback", time: "8 hours ago" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.user}</p>
              <p className="text-sm text-gray-500">{activity.action}</p>
            </div>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};