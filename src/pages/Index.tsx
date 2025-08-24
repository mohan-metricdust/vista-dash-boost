
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="space-y-6">
            <MetricsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueChart />
              <ActivityChart />
            </div>
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
