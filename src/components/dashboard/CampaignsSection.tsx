import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  MessageSquare, 
  Upload, 
  ExternalLink, 
  Filter,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CampaignsSection() {
  const campaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection 2024",
      brand: "StyleCo",
      thumbnail: "/api/placeholder/80/80",
      status: "Active",
      views: "156K",
      earnings: "$2,340",
      engagement: "4.2%",
      progress: 65,
      deadline: "5 days left",
    },
    {
      id: 2,
      title: "Eco-Friendly Tech Launch",
      brand: "GreenTech",
      thumbnail: "/api/placeholder/80/80",
      status: "Pending",
      views: "0",
      earnings: "$0",
      engagement: "0%",
      progress: 0,
      deadline: "Awaiting approval",
    },
    {
      id: 3,
      title: "Fitness Gear Review Series",
      brand: "FitMax",
      thumbnail: "/api/placeholder/80/80",
      status: "Completed",
      views: "89K",
      earnings: "$1,890",
      engagement: "3.8%",
      progress: 100,
      deadline: "Completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Pending": return "bg-yellow-500";
      case "Completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">My Campaigns</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All (8)</TabsTrigger>
          <TabsTrigger value="active">Active (3)</TabsTrigger>
          <TabsTrigger value="pending">Pending (2)</TabsTrigger>
          <TabsTrigger value="completed">Completed (3)</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={campaign.thumbnail}
                      alt={campaign.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{campaign.title}</h3>
                          <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                        </div>
                        <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Views</p>
                          <p className="font-medium">{campaign.views}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Earnings</p>
                          <p className="font-medium">{campaign.earnings}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Engagement</p>
                          <p className="font-medium">{campaign.engagement}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-medium">{campaign.deadline}</p>
                        </div>
                      </div>
                      
                      {campaign.status === "Active" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Campaign Progress</span>
                            <span>{campaign.progress}%</span>
                          </div>
                          <Progress value={campaign.progress} className="w-full" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Content
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Brand
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Proposal</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Withdraw
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <p className="text-muted-foreground">Active campaigns will be shown here.</p>
        </TabsContent>
        
        <TabsContent value="pending">
          <p className="text-muted-foreground">Pending campaigns will be shown here.</p>
        </TabsContent>
        
        <TabsContent value="completed">
          <p className="text-muted-foreground">Completed campaigns will be shown here.</p>
        </TabsContent>
      </Tabs>
    </section>
  );
}