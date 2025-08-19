import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Check, 
  X, 
  Eye, 
  Star, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Filter,
  Search,
  ExternalLink
} from "lucide-react";

const proposals = [
  {
    id: 1,
    creator: "Sarah Johnson",
    handle: "@fashionista_sarah",
    avatar: "/placeholder.svg",
    niche: "Fashion & Lifestyle",
    followers: "250K",
    engagement: "4.2%",
    rating: 4.8,
    message: "I'd love to collaborate on your summer collection campaign. My audience is primarily young women interested in sustainable fashion, which aligns perfectly with your brand values. I can create 3 Instagram posts and 2 stories featuring your pieces.",
    proposedRate: "$1,200",
    deliverables: ["3 Instagram Posts", "2 Instagram Stories", "1 Reel"],
    portfolio: "https://instagram.com/fashionista_sarah",
    status: "pending",
    submittedAt: "2024-01-19T10:30:00Z",
    campaignId: 1,
    campaignTitle: "Summer Fashion Collection"
  },
  {
    id: 2,
    creator: "Mike Chen",
    handle: "@techreview_mike",
    avatar: "/placeholder.svg", 
    niche: "Tech Reviews",
    followers: "180K",
    engagement: "3.8%",
    rating: 4.6,
    message: "Your tech product aligns perfectly with my audience of tech enthusiasts. I can provide an in-depth review video plus unboxing content. My reviews typically get 50K+ views and drive significant purchase intent.",
    proposedRate: "$2,500",
    deliverables: ["1 YouTube Review Video", "1 Unboxing Short", "Instagram Story Series"],
    portfolio: "https://youtube.com/techreviewmike",
    status: "pending",
    submittedAt: "2024-01-19T09:15:00Z",
    campaignId: 2,
    campaignTitle: "Tech Product Launch"
  },
  {
    id: 3,
    creator: "Emma Davis",
    handle: "@travel_foodie",
    avatar: "/placeholder.svg",
    niche: "Travel & Food",
    followers: "320K",
    engagement: "5.1%",
    rating: 4.9,
    message: "I have great ideas for promoting your holiday campaign through travel-themed content. I can showcase your products in beautiful destinations and create engaging travel stories that resonate with my audience.",
    proposedRate: "$1,800",
    deliverables: ["4 Instagram Posts", "Daily Stories (7 days)", "1 Travel Reel"],
    portfolio: "https://instagram.com/travel_foodie",
    status: "accepted",
    submittedAt: "2024-01-18T16:45:00Z",
    campaignId: 3,
    campaignTitle: "Holiday Promotion"
  },
  {
    id: 4,
    creator: "Alex Rodriguez",
    handle: "@fitness_alex",
    avatar: "/placeholder.svg",
    niche: "Fitness & Wellness",
    followers: "145K",
    engagement: "6.2%",
    rating: 4.7,
    message: "I'm interested in partnering with your brand for the fitness campaign. I can create authentic workout content featuring your products and share my genuine experience with my engaged fitness community.",
    proposedRate: "$900",
    deliverables: ["2 Workout Videos", "3 Instagram Posts", "Story Highlights"],
    portfolio: "https://instagram.com/fitness_alex",
    status: "rejected",
    submittedAt: "2024-01-17T14:20:00Z",
    campaignId: 4,
    campaignTitle: "Fitness Equipment Launch"
  },
];

export function ProposalsInboxPage() {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [selectedProposals, setSelectedProposals] = useState<number[]>([]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-orange-500";
      case "accepted": return "bg-green-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    if (selectedTab === "all") return true;
    return proposal.status.toLowerCase() === selectedTab;
  });

  const getTabCounts = () => {
    return {
      all: proposals.length,
      pending: proposals.filter(p => p.status.toLowerCase() === "pending").length,
      accepted: proposals.filter(p => p.status.toLowerCase() === "accepted").length,
      rejected: proposals.filter(p => p.status.toLowerCase() === "rejected").length,
    };
  };

  const tabCounts = getTabCounts();

  const handleProposalSelection = (proposalId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProposals([...selectedProposals, proposalId]);
    } else {
      setSelectedProposals(selectedProposals.filter(id => id !== proposalId));
    }
  };

  const handleBulkAction = (action: string) => {
    // Handle bulk actions here
    console.log(`Bulk ${action} for proposals:`, selectedProposals);
    setSelectedProposals([]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proposals Inbox</h1>
          <p className="text-muted-foreground">Review and manage creator collaboration proposals</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New Proposals
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{tabCounts.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Acceptance Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg. Response Time
              </CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">Faster than 85% of brands</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Collaborations
              </CardTitle>
              <Star className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Proposals List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Proposals</CardTitle>
              <CardDescription>Review creator submissions and manage collaborations</CardDescription>
            </div>
            
            {selectedProposals.length > 0 && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkAction("accept")}>
                  Accept Selected ({selectedProposals.length})
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction("reject")}>
                  Reject Selected ({selectedProposals.length})
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">Pending ({tabCounts.pending})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({tabCounts.accepted})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({tabCounts.rejected})</TabsTrigger>
              <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-6">
              <div className="space-y-4">
                {filteredProposals.map((proposal) => (
                  <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Selection Checkbox */}
                        <Checkbox 
                          checked={selectedProposals.includes(proposal.id)}
                          onCheckedChange={(checked) => handleProposalSelection(proposal.id, checked as boolean)}
                        />
                        
                        {/* Creator Avatar */}
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={proposal.avatar} alt={proposal.creator} />
                          <AvatarFallback>{proposal.creator.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        {/* Main Content */}
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-lg">{proposal.creator}</h3>
                                <span className="text-muted-foreground text-sm">{proposal.handle}</span>
                                <Badge className={`${getStatusColor(proposal.status)} text-white`}>
                                  {proposal.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                For: {proposal.campaignTitle} • Submitted {new Date(proposal.submittedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">{proposal.proposedRate}</p>
                              <p className="text-sm text-muted-foreground">Proposed rate</p>
                            </div>
                          </div>
                          
                          {/* Creator Stats */}
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{proposal.followers} followers</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="h-4 w-4" />
                              <span>{proposal.engagement} engagement</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{proposal.rating}/5</span>
                            </div>
                            <Badge variant="secondary">{proposal.niche}</Badge>
                          </div>
                          
                          {/* Proposal Message */}
                          <div className="bg-muted/50 rounded-lg p-4">
                            <p className="text-sm">{proposal.message}</p>
                          </div>
                          
                          {/* Deliverables */}
                          <div>
                            <p className="text-sm font-medium mb-2">Proposed Deliverables:</p>
                            <div className="flex flex-wrap gap-2">
                              {proposal.deliverables.map((deliverable, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {deliverable}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-1"
                                onClick={() => window.open(proposal.portfolio, '_blank')}
                              >
                                <ExternalLink className="h-3 w-3" />
                                View Portfolio
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="h-3 w-3" />
                                View Profile
                              </Button>
                            </div>
                            
                            {proposal.status === "pending" && (
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" className="gap-1">
                                  <X className="h-3 w-3" />
                                  Reject
                                </Button>
                                <Button size="sm" className="gap-1">
                                  <Check className="h-3 w-3" />
                                  Accept
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProposals.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">No proposals found for this filter.</p>
                  <p className="text-sm text-muted-foreground">Creator proposals will appear here when they submit collaboration requests.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}