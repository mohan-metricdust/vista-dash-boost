import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", visitors: 890, pageViews: 1240 },
  { day: "Tue", visitors: 1200, pageViews: 1680 },
  { day: "Wed", visitors: 950, pageViews: 1320 },
  { day: "Thu", visitors: 1100, pageViews: 1540 },
  { day: "Fri", visitors: 1350, pageViews: 1890 },
  { day: "Sat", visitors: 800, pageViews: 1120 },
  { day: "Sun", visitors: 650, pageViews: 910 },
];

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>
          Visitors and page views for the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar 
              dataKey="visitors" 
              fill="hsl(var(--dashboard-secondary))" 
              radius={[2, 2, 0, 0]}
              name="Visitors"
            />
            <Bar 
              dataKey="pageViews" 
              fill="hsl(var(--accent))" 
              radius={[2, 2, 0, 0]}
              name="Page Views"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}