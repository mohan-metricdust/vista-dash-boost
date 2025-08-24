export const MetricsCards = () => {
  const metrics = [
    { title: "Total Revenue", value: "$54,234", change: "+12.5%" },
    { title: "Active Users", value: "12,543", change: "+8.2%" },
    { title: "Orders", value: "1,234", change: "+4.1%" },
    { title: "Conversion Rate", value: "3.24%", change: "-0.5%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">{metric.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            <span className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {metric.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};