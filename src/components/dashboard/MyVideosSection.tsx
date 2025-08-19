import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Play, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Upload,
  ExternalLink
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";

export function MyVideosSection() {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const videos = [
    {
      id: 1,
      title: "Morning Skincare Routine",
      campaign: "Beauty Brand Winter Collection",
      brand: "GlowCo",
      thumbnail: "/api/placeholder/300/200",
      status: "Active",
      views: 45200,
      earnings: 2260,
      engagementRate: 8.5,
      uploadDate: "2024-01-20",
      tags: ["Beauty", "Skincare", "Morning Routine"],
      campaignRate: 0.05,
      milestones: [
        { target: 10000, bonus: 500, achieved: true },
        { target: 50000, bonus: 1000, achieved: false }
      ],
      analytics: {
        dailyViews: [
          { date: "Jan 20", views: 1200, earnings: 60 },
          { date: "Jan 21", views: 2800, earnings: 140 },
          { date: "Jan 22", views: 4100, earnings: 205 },
          { date: "Jan 23", views: 3200, earnings: 160 },
          { date: "Jan 24", views: 2900, earnings: 145 },
        ]
      }
    },
    {
      id: 2,
      title: "Tech Gadget Unboxing",
      campaign: "Smart Home Innovation Series",
      brand: "TechNova",
      thumbnail: "/api/placeholder/300/200",
      status: "Completed",
      views: 28900,
      earnings: 1445,
      engagementRate: 12.3,
      uploadDate: "2024-01-15",
      tags: ["Tech", "Unboxing", "Smart Home"],
      campaignRate: 0.05,
      milestones: [
        { target: 10000, bonus: 300, achieved: true },
        { target: 25000, bonus: 600, achieved: true }
      ],
      analytics: {
        dailyViews: [
          { date: "Jan 15", views: 3200, earnings: 160 },
          { date: "Jan 16", views: 5100, earnings: 255 },
          { date: "Jan 17", views: 4200, earnings: 210 },
          { date: "Jan 18", views: 3800, earnings: 190 },
          { date: "Jan 19", views: 2600, earnings: 130 },
        ]
      }
    },
    {
      id: 3,
      title: "Fitness Challenge Day 1",
      campaign: "30-Day Fitness Transform",
      brand: "FitLife",
      thumbnail: "/api/placeholder/300/200",
      status: "Pending",
      views: 0,
      earnings: 0,
      engagementRate: 0,
      uploadDate: "2024-01-25",
      tags: ["Fitness", "Challenge", "Workout"],
      campaignRate: 0.04,
      milestones: [
        { target: 5000, bonus: 200, achieved: false },
        { target: 15000, bonus: 500, achieved: false }
      ],
      analytics: {
        dailyViews: []
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Pending": return "bg-yellow-500";
      case "Completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const filteredVideos = videos
    .filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.campaign.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || video.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "earnings": return b.earnings - a.earnings;
        case "views": return b.views - a.views;
        case "recent": return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        default: return 0;
      }
    });

  return (
    <section className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search videos by title or campaign..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="earnings">Highest Earnings</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredVideos.map((video) => (
          <Dialog key={video.id}>
            <DialogTrigger asChild>
              <Card className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[9/16]">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Badge 
                      className={`absolute top-2 right-2 ${getStatusColor(video.status)} text-white`}
                    >
                      {video.status}
                    </Badge>
                    {/* Overlapping Analytics */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold text-sm text-white line-clamp-1">{video.title}</h3>
                          <p className="text-xs text-gray-300">{video.campaign}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-green-400" />
                            <span className="font-medium text-white">${video.earnings.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-blue-400" />
                            <span className="text-white">{video.views.toLocaleString()}</span>
                          </div>
                          {video.engagementRate > 0 && (
                            <>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3 text-purple-400" />
                                <span className="text-white">{video.engagementRate}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                <span className="text-white">{new Date(video.uploadDate).toLocaleDateString()}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            {/* Detailed Video View Modal */}
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{video.title}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Panel - Video Player */}
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">{video.campaign}</h3>
                    <p className="text-sm text-muted-foreground">by {video.brand}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {video.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Replace Video
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Campaign
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Analytics */}
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          ${video.earnings.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Total Earnings</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {video.views.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Total Views</div>
                      </CardContent>
                    </Card>
                    {video.engagementRate > 0 && (
                      <>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {video.engagementRate}%
                            </div>
                            <div className="text-xs text-muted-foreground">Engagement Rate</div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">
                              ${video.campaignRate.toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground">Per View Rate</div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>

                  {/* Charts */}
                  {video.analytics.dailyViews.length > 0 && (
                    <Tabs defaultValue="views" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="views">Views Trend</TabsTrigger>
                        <TabsTrigger value="earnings">Earnings Trend</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="views" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Daily Views</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                views: {
                                  label: "Views",
                                  color: "hsl(var(--chart-1))",
                                },
                              }}
                              className="h-[200px]"
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={video.analytics.dailyViews}>
                                  <XAxis dataKey="date" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Line 
                                    type="monotone" 
                                    dataKey="views" 
                                    stroke="var(--color-views)" 
                                    strokeWidth={2}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="earnings" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Daily Earnings</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                earnings: {
                                  label: "Earnings",
                                  color: "hsl(var(--chart-2))",
                                },
                              }}
                              className="h-[200px]"
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={video.analytics.dailyViews}>
                                  <XAxis dataKey="date" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar 
                                    dataKey="earnings" 
                                    fill="var(--color-earnings)"
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  )}

                  {/* Milestones */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Campaign Milestones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {video.milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-2 rounded ${
                            milestone.achieved ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
                          }`}
                        >
                          <span className="text-sm">
                            {milestone.target.toLocaleString()} views
                          </span>
                          <span className="text-sm font-medium">
                            +${milestone.bonus} {milestone.achieved ? '✓' : ''}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Brand
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            {searchQuery || statusFilter !== "all" 
              ? "No videos found matching your filters" 
              : "No videos uploaded yet"
            }
          </div>
        </div>
      )}
    </section>
  );
}