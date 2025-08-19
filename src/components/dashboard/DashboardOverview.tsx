import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Video, Clock, DollarSign, TrendingUp, Plus, Search, Upload, ExternalLink, Bell, ArrowRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
interface DashboardOverviewProps {
  onNavigate: (view: string) => void;
}
export function DashboardOverview({
  onNavigate
}: DashboardOverviewProps) {
  const stats = [{
    title: "Total Views",
    value: "2.4M",
    change: "+12.5%",
    icon: Eye,
    onClick: () => onNavigate("analytics")
  }, {
    title: "Active Campaigns",
    value: "8",
    change: "+2",
    icon: Video,
    onClick: () => onNavigate("campaigns")
  }, {
    title: "Pending Proposals",
    value: "3",
    change: "0",
    icon: Clock,
    onClick: () => onNavigate("proposals")
  }, {
    title: "Earnings (This Month)",
    value: "$4,250",
    change: "+18.2%",
    icon: DollarSign,
    onClick: () => onNavigate("earnings")
  }];
  const activeCampaigns = [{
    id: 1,
    title: "Summer Fashion Collection 2024",
    brand: "StyleCo",
    thumbnail: "/api/placeholder/60/60",
    status: "Active",
    views: "156K",
    earnings: "$2,340",
    progress: 65
  }, {
    id: 2,
    title: "Fitness Gear Review Series",
    brand: "FitMax",
    thumbnail: "/api/placeholder/60/60",
    status: "Active",
    views: "89K",
    earnings: "$1,890",
    progress: 45
  }];
  const earningsData = [{
    day: 1,
    earnings: 240
  }, {
    day: 2,
    earnings: 180
  }, {
    day: 3,
    earnings: 320
  }, {
    day: 4,
    earnings: 280
  }, {
    day: 5,
    earnings: 450
  }, {
    day: 6,
    earnings: 380
  }, {
    day: 7,
    earnings: 520
  }];
  const recentVideos = [{
    id: 1,
    title: "Summer Fashion Collection Review",
    campaign: "StyleCo Campaign",
    thumbnail: "/api/placeholder/80/60",
    uploadDate: "2 days ago",
    views: "45.2K",
    earnings: "$890",
    engagementRate: "8.5%"
  }, {
    id: 2,
    title: "Fitness Equipment Unboxing",
    campaign: "FitMax Campaign",
    thumbnail: "/api/placeholder/80/60",
    uploadDate: "4 days ago",
    views: "32.1K",
    earnings: "$650",
    engagementRate: "7.2%"
  }, {
    id: 3,
    title: "Tech Product First Look",
    campaign: "TechCorp Campaign",
    thumbnail: "/api/placeholder/80/60",
    uploadDate: "1 week ago",
    views: "28.9K",
    earnings: "$580",
    engagementRate: "9.1%"
  }];
  const notifications = [{
    id: 1,
    text: "Proposal accepted for Tech Product Launch",
    time: "2h ago",
    type: "success"
  }, {
    id: 2,
    text: "Campaign milestone reached: 100K views",
    time: "5h ago",
    type: "info"
  }, {
    id: 3,
    text: "New campaign invitation from BeautyBrand",
    time: "1d ago",
    type: "info"
  }];
  return <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's your creator dashboard overview</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Submit Proposal
          </Button>
          <Button className="gradient-primary flex items-center gap-2">
            <Search className="h-4 w-4" />
            Find Campaigns
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => <Card key={index} className="hover-lift cursor-pointer transition-all" onClick={stat.onClick}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-muted-foreground'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>)}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Campaigns Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Campaigns</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("campaigns")} className="text-primary hover:text-primary">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCampaigns.map(campaign => <div key={campaign.id} className="flex items-center gap-4 p-4 rounded-lg border hover-lift cursor-pointer">
                  <img src={campaign.thumbnail} alt={campaign.title} className="w-12 h-12 rounded-lg object-cover" />
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{campaign.title}</h4>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        {campaign.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{campaign.views} views</span>
                      <span>{campaign.earnings} earned</span>
                    </div>
                    <Progress value={campaign.progress} className="h-1" />
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>)}
            </CardContent>
          </Card>

          {/* Recent Videos Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Videos</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("myvideos")} className="text-primary hover:text-primary">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {recentVideos.map(video => <div key={video.id} className="group cursor-pointer">
                    <Card className="hover-lift transition-all">
                      <div className="aspect-[9/16] relative overflow-hidden rounded-t-lg">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <CardContent className="p-4 space-y-2">
                        <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                        <p className="text-xs text-muted-foreground">{video.campaign}</p>
                        <p className="text-xs text-muted-foreground">{video.uploadDate}</p>
                        
                        {/* Quick Analytics */}
                        <div className="space-y-2 pt-2 border-t border-border/50">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Eye className="h-3 w-3" />
                              {video.views}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                              <DollarSign className="h-3 w-3" />
                              {video.earnings}
                            </span>
                          </div>
                          <div className="flex items-center justify-center text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {video.engagementRate} engagement
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Earnings Snapshot */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Earnings Snapshot</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("earnings")}>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl font-bold">$4,250.00</div>
                <p className="text-sm text-muted-foreground">Available balance</p>
              </div>
              
              <div>
                <div className="text-lg font-semibold text-yellow-600">$1,450.00</div>
                <p className="text-xs text-muted-foreground">Pending payout</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>7-day trend</span>
                  <span className="text-green-500">+18.2%</span>
                </div>
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earningsData}>
                      <Line type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <Button className="w-full gradient-primary" onClick={() => onNavigate("earnings")}>
                Go to Wallet
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Find Campaigns
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Submit Proposal
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Upload Content
              </Button>
            </CardContent>
          </Card>

          {/* Notifications Feed */}
          <Card>
            
            
          </Card>
        </div>
      </div>
    </div>;
}