import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    isPositive: true,
    icon: DollarSign,
    color: "text-dashboard-success",
    bgColor: "bg-dashboard-success/10"
  },
  {
    title: "Active Users",
    value: "2,420",
    change: "+15.3%",
    isPositive: true,
    icon: Users,
    color: "text-dashboard-secondary",
    bgColor: "bg-dashboard-secondary/10"
  },
  {
    title: "Total Orders",
    value: "1,210",
    change: "-2.4%",
    isPositive: false,
    icon: ShoppingCart,
    color: "text-dashboard-warning",
    bgColor: "bg-dashboard-warning/10"
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+5.7%",
    isPositive: true,
    icon: Activity,
    color: "text-dashboard-danger",
    bgColor: "bg-dashboard-danger/10"
  }
];

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="transition-all duration-200 hover:shadow-lg border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold text-foreground mt-2">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.isPositive ? (
                    <TrendingUp className="h-4 w-4 text-dashboard-success mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-dashboard-danger mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.isPositive ? "text-dashboard-success" : "text-dashboard-danger"
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">from last month</span>
                </div>
              </div>
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}