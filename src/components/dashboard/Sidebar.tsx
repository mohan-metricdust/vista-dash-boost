export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li><a href="#" className="block p-2 rounded hover:bg-slate-700">Overview</a></li>
          <li><a href="#" className="block p-2 rounded hover:bg-slate-700">Analytics</a></li>
          <li><a href="#" className="block p-2 rounded hover:bg-slate-700">Reports</a></li>
          <li><a href="#" className="block p-2 rounded hover:bg-slate-700">Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
};