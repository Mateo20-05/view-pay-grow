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

// Mock data - Single campaign focused
const kpiData = [
  { title: "Total Views Delivered", value: "1.2M", change: "+15%", icon: Eye, color: "text-blue-600" },
  { title: "Total Spent", value: "$3,200", change: "+8%", icon: DollarSign, color: "text-purple-600" },
  { title: "Cost Per View", value: "$0.0027", change: "-12%", icon: TrendingUp, color: "text-green-600" },
  { title: "Engagement Rate", value: "4.8%", change: "+0.3%", icon: TrendingUp, color: "text-emerald-600" },
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
      {/* Campaign Header Block */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img 
                src="/placeholder.svg" 
                alt="Campaign"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">Summer Fashion Collection</h1>
                <Badge className="bg-green-500 text-white mt-1">Active</Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit Campaign
              </Button>
              <Button variant="outline" size="sm">
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </Button>
              <Button variant="outline" size="sm">
                Duplicate
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Budget Progress</p>
              <div className="flex items-center space-x-2 mt-1">
                <Progress value={64} className="flex-1" />
                <span className="text-sm font-medium">$3,200 / $5,000</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Campaign Duration</p>
              <p className="font-semibold">15 days remaining</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Creators</p>
              <p className="font-semibold">8 creators</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Snapshot KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Notifications Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your campaign</CardDescription>
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

    </div>
  );
}