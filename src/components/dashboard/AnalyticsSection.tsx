import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, Award, Eye } from "lucide-react";

const viewsData = [
  { name: "Fashion Campaign", views: 45200 },
  { name: "Tech Review", views: 32100 },
  { name: "Food Blog", views: 67500 },
  { name: "Travel Vlog", views: 28900 },
  { name: "Fitness Demo", views: 41300 }
];

const earningsData = [
  { month: "Aug", earnings: 1200 },
  { month: "Sep", earnings: 1800 },
  { month: "Oct", earnings: 2100 },
  { month: "Nov", earnings: 1950 },
  { month: "Dec", earnings: 2450 },
  { month: "Jan", earnings: 2850 }
];

const engagementData = [
  { name: "Likes", value: 65, color: "#8B5CF6" },
  { name: "Comments", value: 20, color: "#06B6D4" },
  { name: "Shares", value: 15, color: "#10B981" }
];

export const AnalyticsSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Analytics Dashboard</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">7 Days</Button>
            <Button variant="outline" size="sm">30 Days</Button>
            <Button variant="outline" size="sm">All Time</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="views" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value.toLocaleString()} views`, "Views"]}
                  />
                  <Bar dataKey="views" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Top Performing Campaign */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Top Performing Campaign</h4>
                    <p className="text-sm text-muted-foreground">Food & Lifestyle Review</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">67.5K</p>
                  <p className="text-sm text-muted-foreground">views</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="earnings" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, "Earnings"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Growth Rate</p>
                <p className="text-xl font-bold text-green-600">+24%</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Best Month</p>
                <p className="text-xl font-bold">January</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Avg Monthly</p>
                <p className="text-xl font-bold">$2,058</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Engagement Breakdown</h4>
                {engagementData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <Badge variant="secondary">{item.value}%</Badge>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Engagement Rate</p>
                      <p className="text-sm text-muted-foreground">
                        Your average engagement rate is 4.2%, which is 18% above industry average
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};