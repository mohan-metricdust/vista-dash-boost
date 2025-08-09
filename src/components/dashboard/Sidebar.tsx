import { 
  BarChart3, 
  Calendar, 
  FileText, 
  Home, 
  Settings, 
  Users, 
  Wallet,
  TrendingUp,
  Bell,
  Archive
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Analytics", href: "#", icon: BarChart3, current: false },
  { name: "Revenue", href: "#", icon: TrendingUp, current: false },
  { name: "Customers", href: "#", icon: Users, current: false },
  { name: "Finance", href: "#", icon: Wallet, current: false },
  { name: "Reports", href: "#", icon: FileText, current: false },
  { name: "Calendar", href: "#", icon: Calendar, current: false },
  { name: "Notifications", href: "#", icon: Bell, current: false },
  { name: "Archive", href: "#", icon: Archive, current: false },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-dashboard-secondary to-accent flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">VistaDash</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
              item.current
                ? "bg-dashboard-secondary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <item.icon
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                item.current ? "text-white" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            {item.name}
          </a>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-6">
        <a
          href="#"
          className="group flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200"
        >
          <Settings className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
          Settings
        </a>
      </div>
    </div>
  );
}