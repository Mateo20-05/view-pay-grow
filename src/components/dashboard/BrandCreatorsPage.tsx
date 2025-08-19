import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Youtube, 
  Instagram, 
  MessageCircle,
  CheckCircle,
  XCircle,
  Eye,
  DollarSign,
  TrendingUp,
  Users,
  Play
} from "lucide-react";

// Mock creator data
const creators = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarahjfashion",
    avatar: "/placeholder.svg",
    platforms: ["youtube", "instagram"],
    status: "pending",
    estimatedReach: "350K",
    requestedRate: "$2.50",
    totalEarnings: "$0",
    viewsDelivered: "0",
    niche: "Fashion & Lifestyle",
    proposal: "I'd love to collaborate on your summer collection campaign. My audience is primarily 18-34 female fashion enthusiasts...",
    followers: { youtube: "280K", instagram: "95K" },
    engagementRate: "4.2%",
  },
  {
    id: 2,
    name: "Mike Chen",
    username: "@techwithmike", 
    avatar: "/placeholder.svg",
    platforms: ["youtube"],
    status: "active",
    estimatedReach: "450K",
    requestedRate: "$3.00",
    totalEarnings: "$1,250",
    viewsDelivered: "125K",
    niche: "Tech Reviews",
    proposal: "Your tech product aligns perfectly with my audience. I can create detailed review content...",
    followers: { youtube: "420K" },
    engagementRate: "6.1%",
  },
  {
    id: 3,
    name: "Emma Davis",
    username: "@emmaeats",
    avatar: "/placeholder.svg",
    platforms: ["instagram", "youtube"],
    status: "active",
    estimatedReach: "220K",
    requestedRate: "$1.75",
    totalEarnings: "$890",
    viewsDelivered: "89K", 
    niche: "Food & Travel",
    proposal: "I have great ideas for promoting your holiday campaign with food-focused content...",
    followers: { youtube: "180K", instagram: "85K" },
    engagementRate: "5.8%",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    username: "@fitwitalex",
    avatar: "/placeholder.svg",
    platforms: ["youtube", "instagram"],
    status: "rejected",
    estimatedReach: "180K",
    requestedRate: "$2.25",
    totalEarnings: "$0",
    viewsDelivered: "0",
    niche: "Fitness",
    proposal: "I can create engaging fitness content that showcases your brand values...",
    followers: { youtube: "150K", instagram: "65K" },
    engagementRate: "4.7%",
  },
];

export function BrandCreatorsPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<typeof creators[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "youtube": return <Youtube className="h-4 w-4 text-red-500" />;
      case "instagram": return <Instagram className="h-4 w-4 text-pink-500" />;
      default: return null;
    }
  };

  const filteredCreators = creators.filter(creator => {
    const matchesTab = selectedTab === "all" || creator.status === selectedTab;
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.niche.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTabCounts = () => {
    return {
      all: creators.length,
      pending: creators.filter(c => c.status === "pending").length,
      active: creators.filter(c => c.status === "active").length,
      rejected: creators.filter(c => c.status === "rejected").length,
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creators</h1>
          <p className="text-muted-foreground">Manage creator proposals and partnerships for your campaign</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Creator Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Creators</p>
                <p className="text-2xl font-bold">{creators.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Creators</p>
                <p className="text-2xl font-bold">{tabCounts.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">214K</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold">$2,140</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({tabCounts.pending})</TabsTrigger>
          <TabsTrigger value="active">Active ({tabCounts.active})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({tabCounts.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <Card key={creator.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCreator(creator)}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={creator.avatar} 
                      alt={creator.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{creator.name}</h3>
                      <p className="text-sm text-muted-foreground">{creator.username}</p>
                      <div className="flex space-x-2 mt-1">
                        {creator.platforms.map((platform) => (
                          <div key={platform}>
                            {getPlatformIcon(platform)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(creator.status)} text-white`}>
                      {creator.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Reach</span>
                      <span className="font-medium">{creator.estimatedReach}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate per View</span>
                      <span className="font-medium">{creator.requestedRate}</span>
                    </div>
                    {creator.status === "active" && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Views Delivered</span>
                          <span className="font-medium">{creator.viewsDelivered}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Earnings</span>
                          <span className="font-medium">{creator.totalEarnings}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex space-x-2 mt-4">
                    {creator.status === "pending" && (
                      <>
                        <Button size="sm" className="flex-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {creator.status === "active" && (
                      <>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Play className="h-3 w-3 mr-1" />
                          Portfolio
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCreators.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No creators found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Creator Detail Modal/Sidebar would go here */}
      {selectedCreator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Creator Details</h2>
              <Button variant="ghost" onClick={() => setSelectedCreator(null)}>×</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Portfolio & Audience</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">YouTube Followers</span>
                    <span>{selectedCreator.followers.youtube || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instagram Followers</span>
                    <span>{selectedCreator.followers.instagram || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engagement Rate</span>
                    <span>{selectedCreator.engagementRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Niche</span>
                    <span>{selectedCreator.niche}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Campaign Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={`${getStatusColor(selectedCreator.status)} text-white`}>
                      {selectedCreator.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views Delivered</span>
                    <span>{selectedCreator.viewsDelivered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Earnings</span>
                    <span>{selectedCreator.totalEarnings}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Proposal Message</h3>
              <p className="text-muted-foreground">{selectedCreator.proposal}</p>
            </div>
            
            <div className="flex space-x-2 mt-6">
              {selectedCreator.status === "pending" && (
                <>
                  <Button className="flex-1">Accept Proposal</Button>
                  <Button variant="outline" className="flex-1">Reject</Button>
                </>
              )}
              {selectedCreator.status === "active" && (
                <>
                  <Button variant="outline" className="flex-1">Message Creator</Button>
                  <Button variant="outline" className="flex-1">View Portfolio</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}