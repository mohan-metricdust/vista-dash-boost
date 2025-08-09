import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: "Alice Johnson",
    avatar: "/placeholder.svg",
    initials: "AJ",
    action: "completed order",
    item: "#12847",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: 2,
    user: "Bob Smith",
    avatar: "/placeholder.svg",
    initials: "BS",
    action: "registered as new user",
    item: "",
    time: "5 minutes ago",
    status: "info"
  },
  {
    id: 3,
    user: "Carol Davis",
    avatar: "/placeholder.svg",
    initials: "CD",
    action: "requested refund for",
    item: "#12845",
    time: "10 minutes ago",
    status: "warning"
  },
  {
    id: 4,
    user: "David Wilson",
    avatar: "/placeholder.svg",
    initials: "DW",
    action: "updated profile information",
    item: "",
    time: "15 minutes ago",
    status: "info"
  },
  {
    id: 5,
    user: "Emma Brown",
    avatar: "/placeholder.svg",
    initials: "EB",
    action: "left a review for",
    item: "Premium Plan",
    time: "20 minutes ago",
    status: "success"
  }
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest user interactions and system events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback className="bg-dashboard-secondary text-white text-sm">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {activity.user}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {activity.action}
                  </span>
                  {activity.item && (
                    <Badge variant="outline" className="text-xs">
                      {activity.item}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <div className="flex-shrink-0">
                <Badge 
                  variant={
                    activity.status === "success" ? "default" : 
                    activity.status === "warning" ? "destructive" : "secondary"
                  }
                  className="text-xs"
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}