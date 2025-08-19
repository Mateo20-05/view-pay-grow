import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { 
  Play, 
  Eye, 
  DollarSign, 
  Mail, 
  TrendingUp, 
  Plus, 
  Users, 
  FileText,
  ArrowRight,
  Pause,
  Edit
} from "lucide-react";

// Mock data
const kpiData = [
  { title: "Active Campaigns", value: "8", change: "+2", icon: Play, color: "text-green-600" },
  { title: "Total Views Delivered", value: "2.4M", change: "+15%", icon: Eye, color: "text-blue-600" },
  { title: "Total Spent (This Month)", value: "$12,450", change: "+8%", icon: DollarSign, color: "text-purple-600" },
  { title: "Pending Proposals", value: "23", change: "+5", icon: Mail, color: "text-orange-600" },
  { title: "ROI Snapshot", value: "3.2x", change: "+0.4x", icon: TrendingUp, color: "text-emerald-600" },
];

const activeCampaigns = [
  {
    id: 1,
    title: "Summer Fashion Collection",
    status: "Active",
    thumbnail: "/placeholder.svg",
    budget: 5000,
    spent: 3200,
    views: "1.2M",
    roi: "4.2x",
  },
  {
    id: 2,
    title: "Tech Product Launch",
    status: "Active", 
    thumbnail: "/placeholder.svg",
    budget: 8000,
    spent: 2100,
    views: "850K",
    roi: "2.8x",
  },
  {
    id: 3,
    title: "Holiday Promotion",
    status: "Draft",
    thumbnail: "/placeholder.svg", 
    budget: 3000,
    spent: 0,
    views: "0",
    roi: "N/A",
  },
];

const recentProposals = [
  {
    id: 1,
    creator: "Sarah Johnson",
    avatar: "/placeholder.svg",
    niche: "Fashion & Lifestyle",
    message: "I'd love to collaborate on your summer collection campaign...",
    status: "pending",
  },
  {
    id: 2,
    creator: "Mike Chen",
    avatar: "/placeholder.svg", 
    niche: "Tech Reviews",
    message: "Your tech product aligns perfectly with my audience...",
    status: "pending",
  },
  {
    id: 3,
    creator: "Emma Davis",
    avatar: "/placeholder.svg",
    niche: "Travel & Food",
    message: "I have great ideas for promoting your holiday campaign...",
    status: "pending",
  },
];

const spendData = [
  { day: "Mon", spent: 1200 },
  { day: "Tue", spent: 1800 },
  { day: "Wed", spent: 1400 },
  { day: "Thu", spent: 2200 },
  { day: "Fri", spent: 1900 },
  { day: "Sat", spent: 1600 },
  { day: "Sun", spent: 1100 },
];

const notifications = [
  { id: 1, message: "New proposal from @fashionista_jenny", time: "2 hours ago", type: "proposal" },
  { id: 2, message: "Campaign 'Summer Fashion' hit 1M views", time: "4 hours ago", type: "milestone" },
  { id: 3, message: "Payment of $2,500 processed successfully", time: "1 day ago", type: "payment" },
  { id: 4, message: "Creator @tech_mike completed deliverables", time: "2 days ago", type: "completion" },
];

export function BrandDashboardOverview() {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-500";
      case "draft": return "bg-gray-500";
      case "completed": return "bg-blue-500";
      case "paused": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Overview</h1>
          <p className="text-muted-foreground">Monitor your campaigns and manage creator partnerships</p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Campaign
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold">{kpi.value}</div>
                <Badge variant="secondary" className="text-xs">
                  {kpi.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Campaigns Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Your most recent campaign performance</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={campaign.thumbnail} 
                        alt={campaign.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{campaign.title}</h4>
                        <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pause className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Views Delivered</p>
                      <p className="font-semibold">{campaign.views}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Budget Progress</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={(campaign.spent / campaign.budget) * 100} className="flex-1" />
                        <span className="text-xs">${campaign.spent}/${campaign.budget}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ROI</p>
                      <p className="font-semibold text-green-600">{campaign.roi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Proposals Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Proposals</CardTitle>
                <CardDescription>Latest creator submissions</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentProposals.map((proposal) => (
                <div key={proposal.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <img 
                    src={proposal.avatar} 
                    alt={proposal.creator}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{proposal.creator}</p>
                    <p className="text-xs text-muted-foreground">{proposal.niche}</p>
                    <p className="text-xs text-muted-foreground truncate">{proposal.message}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" className="h-6 px-2 text-xs">Accept</Button>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">Reject</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Spend & Budget Snapshot */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Spend Overview</CardTitle>
              <CardDescription>Daily spend this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Monthly Budget</span>
                  <span>$15,000</span>
                </div>
                <Progress value={83} />
                <p className="text-xs text-muted-foreground mt-1">$12,450 spent this month</p>
              </div>
              
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Bar dataKey="spent" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-3">
                Manage Billing
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Create New Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Find Creators
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Review Proposals
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notifications Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Latest updates from your campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}