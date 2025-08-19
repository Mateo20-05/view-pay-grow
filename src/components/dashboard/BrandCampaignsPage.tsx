import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Edit, 
  Copy, 
  Trash2, 
  Eye,
  DollarSign,
  TrendingUp,
  Filter
} from "lucide-react";

const campaigns = [
  {
    id: 1,
    title: "Summer Fashion Collection",
    status: "Active",
    thumbnail: "/placeholder.svg",
    budget: 5000,
    spent: 3200,
    views: "1.2M",
    roi: "4.2x",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    creatorsCount: 12,
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
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    creatorsCount: 8,
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
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    creatorsCount: 0,
  },
  {
    id: 4,
    title: "Back to School Campaign",
    status: "Completed",
    thumbnail: "/placeholder.svg",
    budget: 4500,
    spent: 4200,
    views: "2.1M",
    roi: "5.1x",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    creatorsCount: 15,
  },
  {
    id: 5,
    title: "Black Friday Deals",
    status: "Paused",
    thumbnail: "/placeholder.svg",
    budget: 6000,
    spent: 1800,
    views: "650K",
    roi: "3.2x",
    startDate: "2023-11-15",
    endDate: "2023-11-30",
    creatorsCount: 10,
  },
];

export function BrandCampaignsPage() {
  const [selectedTab, setSelectedTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-500";
      case "draft": return "bg-gray-500";
      case "completed": return "bg-blue-500";
      case "paused": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (selectedTab === "all") return true;
    return campaign.status.toLowerCase() === selectedTab;
  });

  const getTabCounts = () => {
    return {
      all: campaigns.length,
      active: campaigns.filter(c => c.status.toLowerCase() === "active").length,
      draft: campaigns.filter(c => c.status.toLowerCase() === "draft").length,
      completed: campaigns.filter(c => c.status.toLowerCase() === "completed").length,
      paused: campaigns.filter(c => c.status.toLowerCase() === "paused").length,
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Campaigns</h1>
          <p className="text-muted-foreground">Manage all your marketing campaigns and track their performance</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Campaign Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Campaigns
              </CardTitle>
              <Play className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Views
              </CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">4.8M</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">$31,300</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average ROI
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold">3.8x</div>
            <p className="text-xs text-muted-foreground">+0.5x from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Manage and monitor your campaign performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
              <TabsTrigger value="active">Active ({tabCounts.active})</TabsTrigger>
              <TabsTrigger value="draft">Draft ({tabCounts.draft})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({tabCounts.completed})</TabsTrigger>
              <TabsTrigger value="paused">Paused ({tabCounts.paused})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      {/* Campaign Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={campaign.thumbnail} 
                            alt={campaign.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{campaign.title}</h3>
                            <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                              {campaign.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            {campaign.status === "Active" && (
                              <DropdownMenuItem>
                                <Pause className="mr-2 h-4 w-4" />
                                Pause Campaign
                              </DropdownMenuItem>
                            )}
                            {campaign.status === "Paused" && (
                              <DropdownMenuItem>
                                <Play className="mr-2 h-4 w-4" />
                                Resume Campaign
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Campaign Stats */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Views Delivered</p>
                            <p className="font-semibold text-lg">{campaign.views}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">ROI</p>
                            <p className="font-semibold text-lg text-green-600">{campaign.roi}</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Budget Progress</span>
                            <span>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                          </div>
                          <Progress value={(campaign.spent / campaign.budget) * 100} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Creators</p>
                            <p className="font-semibold">{campaign.creatorsCount}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-semibold">
                              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {campaign.status === "Active" ? (
                          <Button variant="outline" size="sm">
                            <Pause className="h-3 w-3" />
                          </Button>
                        ) : campaign.status === "Paused" ? (
                          <Button variant="outline" size="sm">
                            <Play className="h-3 w-3" />
                          </Button>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredCampaigns.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No campaigns found for this filter.</p>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Campaign
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}