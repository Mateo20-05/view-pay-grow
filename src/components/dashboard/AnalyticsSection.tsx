import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { TrendingUp, Eye, Heart, Share, Calendar } from "lucide-react";

export function AnalyticsSection() {
  const [timeFilter, setTimeFilter] = useState("30days");

  const viewsData = [
    { campaign: "Fashion Collection", views: 156000, color: "#8884d8" },
    { campaign: "Tech Review", views: 89000, color: "#82ca9d" },
    { campaign: "Beauty Collab", views: 67000, color: "#ffc658" },
    { campaign: "Fitness Series", views: 45000, color: "#ff7300" },
    { campaign: "Food Review", views: 34000, color: "#8dd1e1" },
  ];

  const engagementData = [
    { name: "Likes", value: 45, color: "#ff6b6b" },
    { name: "Comments", value: 25, color: "#4ecdc4" },
    { name: "Shares", value: 20, color: "#45b7d1" },
    { name: "Saves", value: 10, color: "#96ceb4" },
  ];

  const performanceData = [
    { month: "Jan", views: 65000, engagement: 3.2 },
    { month: "Feb", views: 78000, engagement: 3.8 },
    { month: "Mar", views: 92000, engagement: 4.1 },
    { month: "Apr", views: 87000, engagement: 3.9 },
    { month: "May", views: 156000, engagement: 4.5 },
    { month: "Jun", views: 134000, engagement: 4.2 },
  ];

  const topCampaign = {
    title: "Summer Fashion Collection 2024",
    views: "156K",
    engagement: "4.5%",
    earnings: "$2,340",
    brand: "StyleCo"
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <div className="flex gap-2">
          <Button 
            variant={timeFilter === "7days" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeFilter("7days")}
          >
            7 Days
          </Button>
          <Button 
            variant={timeFilter === "30days" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeFilter("30days")}
          >
            30 Days
          </Button>
          <Button 
            variant={timeFilter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeFilter("all")}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Top Performing Campaign Spotlight */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Top Performing Campaign
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{topCampaign.title}</h3>
              <p className="text-muted-foreground">{topCampaign.brand}</p>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              <div>
                <p className="font-bold">{topCampaign.views}</p>
                <p className="text-sm text-muted-foreground">Views</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <div>
                <p className="font-bold">{topCampaign.engagement}</p>
                <p className="text-sm text-muted-foreground">Engagement</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-green-500" />
              <div>
                <p className="font-bold">{topCampaign.earnings}</p>
                <p className="text-sm text-muted-foreground">Earnings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Views per Campaign */}
        <Card>
          <CardHeader>
            <CardTitle>Views per Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={viewsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="campaign" type="category" width={100} />
                <Tooltip formatter={(value) => [`${value.toLocaleString()}`, 'Views']} />
                <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Engagement']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {engagementData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="views" fill="hsl(var(--primary))" opacity={0.7} />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="engagement" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}