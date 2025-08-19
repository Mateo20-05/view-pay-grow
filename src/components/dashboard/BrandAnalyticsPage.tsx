import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  Eye, 
  DollarSign, 
  Users, 
  Heart, 
  MessageCircle, 
  Share,
  Download,
  Calendar
} from "lucide-react";

// Mock data for charts
const viewsOverTime = [
  { date: "Jan 1", views: 125000, spend: 2500 },
  { date: "Jan 8", views: 180000, spend: 3200 },
  { date: "Jan 15", views: 245000, spend: 4100 },
  { date: "Jan 22", views: 198000, spend: 3800 },
  { date: "Jan 29", views: 267000, spend: 4600 },
  { date: "Feb 5", views: 312000, spend: 5200 },
  { date: "Feb 12", views: 289000, spend: 4900 },
];

const costPerView = [
  { campaign: "Summer Fashion", cpv: 0.012, views: 1200000, budget: 14400 },
  { campaign: "Tech Launch", cpv: 0.018, views: 850000, budget: 15300 },
  { campaign: "Holiday Promo", cpv: 0.008, views: 650000, budget: 5200 },
  { campaign: "Fitness Equipment", cpv: 0.015, views: 420000, budget: 6300 },
];

const engagementData = [
  { name: "Likes", value: 45, color: "#ff6b6b" },
  { name: "Comments", value: 25, color: "#4ecdc4" },
  { name: "Shares", value: 20, color: "#45b7d1" },
  { name: "Saves", value: 10, color: "#f9ca24" },
];

const topPerformingCampaigns = [
  {
    name: "Summer Fashion Collection",
    views: "1.2M",
    engagement: "4.2%",
    roi: "4.2x",
    spend: "$3,200",
    status: "Active"
  },
  {
    name: "Tech Product Launch", 
    views: "850K",
    engagement: "3.8%",
    roi: "2.8x",
    spend: "$2,100",
    status: "Active"
  },
  {
    name: "Back to School Campaign",
    views: "2.1M",
    engagement: "5.1%",
    roi: "5.1x",
    spend: "$4,200",
    status: "Completed"
  }
];

const creatorPerformance = [
  { creator: "Sarah Johnson", views: "450K", engagement: "5.2%", campaigns: 3, roi: "4.8x" },
  { creator: "Mike Chen", views: "380K", engagement: "4.1%", campaigns: 2, roi: "3.2x" },
  { creator: "Emma Davis", views: "520K", engagement: "6.1%", campaigns: 1, roi: "5.4x" },
  { creator: "Alex Rodriguez", views: "290K", engagement: "7.2%", campaigns: 4, roi: "3.9x" },
];

export function BrandAnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("views");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Performance</h1>
          <p className="text-muted-foreground">Deep dive into your campaign performance and audience insights</p>
        </div>
        <div className="flex space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Views
              </CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">4.8M</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+18%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Cost Per View
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">$0.013</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">-8%</span>
              <span className="text-muted-foreground">improvement</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Engagement Rate
              </CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-2xl font-bold">4.8%</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12%</span>
              <span className="text-muted-foreground">vs industry avg</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total ROI
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold">3.8x</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+0.4x</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views & Spend Over Time */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>Views delivered and spend trends</CardDescription>
                </div>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="spend">Spend</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {(selectedMetric === "views" || selectedMetric === "both") && (
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Views"
                      />
                    )}
                    {(selectedMetric === "spend" || selectedMetric === "both") && (
                      <Line 
                        type="monotone" 
                        dataKey="spend" 
                        stroke="hsl(var(--destructive))" 
                        strokeWidth={2}
                        name="Spend ($)"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
            <CardDescription>How audiences interact with your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {engagementData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>Comprehensive performance insights</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="campaigns" className="space-y-4">
            <TabsList>
              <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
              <TabsTrigger value="creators">Creator Performance</TabsTrigger>
              <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="campaigns" className="space-y-4">
              <div className="space-y-4">
                {topPerformingCampaigns.map((campaign, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-semibold text-lg">{campaign.views}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Engagement</p>
                        <p className="font-semibold text-lg">{campaign.engagement}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ROI</p>
                        <p className="font-semibold text-lg text-green-600">{campaign.roi}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Spend</p>
                        <p className="font-semibold text-lg">{campaign.spend}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="creators" className="space-y-4">
              <div className="space-y-4">
                {creatorPerformance.map((creator, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{creator.creator}</h4>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Views</p>
                        <p className="font-semibold">{creator.views}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Engagement</p>
                        <p className="font-semibold">{creator.engagement}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Campaigns</p>
                        <p className="font-semibold">{creator.campaigns}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ROI</p>
                        <p className="font-semibold text-green-600">{creator.roi}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="costs" className="space-y-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costPerView}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="campaign" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cpv" fill="hsl(var(--primary))" name="Cost Per View ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Top Campaign of the Month Spotlight */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Top Performing Campaign This Month</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Summer Fashion Collection</h3>
              <p className="text-muted-foreground mb-4">
                This campaign delivered exceptional results with high engagement rates and strong ROI across all creator partnerships.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">1.2M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-2xl font-bold text-green-600">4.2x</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button size="lg" className="gap-2">
                <Eye className="h-4 w-4" />
                View Full Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}