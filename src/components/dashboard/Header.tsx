export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};