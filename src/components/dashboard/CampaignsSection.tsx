import React from "react";
import { Eye, DollarSign, TrendingUp, MoreHorizontal, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const campaigns = [
  {
    id: 1,
    title: "Summer Fashion Collection",
    brand: "TrendyBrand",
    status: "Active",
    thumbnail: "/placeholder.svg",
    views: "45.2K",
    earnings: "$850",
    engagement: "4.2%",
    progress: 75,
    statusColor: "bg-green-500"
  },
  {
    id: 2,
    title: "Tech Product Launch",
    brand: "TechCorp",
    status: "Pending",
    thumbnail: "/placeholder.svg",
    views: "12.8K",
    earnings: "$0",
    engagement: "3.8%",
    progress: 25,
    statusColor: "bg-yellow-500"
  },
  {
    id: 3,
    title: "Food & Lifestyle Review",
    brand: "FoodieHub",
    status: "Completed",
    thumbnail: "/placeholder.svg",
    views: "67.5K",
    earnings: "$1,200",
    engagement: "5.1%",
    progress: 100,
    statusColor: "bg-blue-500"
  }
];

export const CampaignsSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">My Campaigns</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={campaign.thumbnail} 
                    alt={campaign.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{campaign.title}</h4>
                    <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className={`${campaign.statusColor} text-white`}
                    >
                      {campaign.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Upload Content</DropdownMenuItem>
                        <DropdownMenuItem>Contact Brand</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4 text-blue-500" />
                    <span>{campaign.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span>{campaign.earnings}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span>{campaign.engagement} engagement</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};