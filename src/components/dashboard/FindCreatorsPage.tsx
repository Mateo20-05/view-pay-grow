import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  TrendingUp, 
  MapPin, 
  Instagram, 
  Youtube, 
  Twitter,
  Send,
  Heart,
  Eye,
  MessageCircle,
  ExternalLink
} from "lucide-react";

const creators = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@fashionista_sarah",
    avatar: "/placeholder.svg",
    bio: "Fashion & lifestyle creator passionate about sustainable fashion and empowering women through style.",
    niche: "Fashion & Lifestyle",
    location: "Los Angeles, CA",
    followers: "250K",
    engagement: "4.2%",
    rating: 4.8,
    reviews: 24,
    platforms: ["instagram", "youtube", "twitter"],
    recentCampaigns: 8,
    avgViews: "45K",
    tags: ["Fashion", "Sustainability", "Women's Empowerment", "Style"],
    priceRange: "$800-$1,500",
    responseRate: "95%",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Mike Chen",
    handle: "@techreview_mike",
    avatar: "/placeholder.svg",
    bio: "Tech enthusiast providing honest reviews and tutorials. Helping people make informed tech decisions.",
    niche: "Tech & Gaming",
    location: "San Francisco, CA",
    followers: "180K",
    engagement: "3.8%",
    rating: 4.6,
    reviews: 31,
    platforms: ["youtube", "instagram", "twitter"],
    recentCampaigns: 12,
    avgViews: "78K",
    tags: ["Tech Reviews", "Gaming", "Gadgets", "Software"],
    priceRange: "$1,200-$2,500",
    responseRate: "89%",
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "Emma Davis",
    handle: "@travel_foodie",
    avatar: "/placeholder.svg",
    bio: "Exploring the world one destination at a time. Food, travel, and culture enthusiast.",
    niche: "Travel & Food",
    location: "New York, NY",
    followers: "320K",
    engagement: "5.1%",
    rating: 4.9,
    reviews: 18,
    platforms: ["instagram", "youtube"],
    recentCampaigns: 6,
    avgViews: "62K",
    tags: ["Travel", "Food", "Culture", "Adventure"],
    priceRange: "$1,500-$3,000",
    responseRate: "98%",
    lastActive: "5 hours ago"
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    handle: "@fitness_alex",
    avatar: "/placeholder.svg",
    bio: "Certified personal trainer helping people achieve their fitness goals through sustainable workouts.",
    niche: "Fitness & Wellness",
    location: "Miami, FL",
    followers: "145K",
    engagement: "6.2%",
    rating: 4.7,
    reviews: 29,
    platforms: ["instagram", "youtube", "twitter"],
    recentCampaigns: 15,
    avgViews: "38K",
    tags: ["Fitness", "Wellness", "Nutrition", "Motivation"],
    priceRange: "$600-$1,200",
    responseRate: "92%",
    lastActive: "3 hours ago"
  },
  {
    id: 5,
    name: "Lisa Park",
    handle: "@beauty_guru_lisa",
    avatar: "/placeholder.svg",
    bio: "Beauty enthusiast sharing makeup tutorials, skincare tips, and product reviews.",
    niche: "Beauty & Skincare",
    location: "Chicago, IL",
    followers: "195K",
    engagement: "4.7%",
    rating: 4.8,
    reviews: 22,
    platforms: ["instagram", "youtube"],
    recentCampaigns: 10,
    avgViews: "52K",
    tags: ["Beauty", "Skincare", "Makeup", "Self-Care"],
    priceRange: "$900-$1,800",
    responseRate: "96%",
    lastActive: "1 hour ago"
  },
  {
    id: 6,
    name: "David Kim",
    handle: "@home_chef_david",
    avatar: "/placeholder.svg",
    bio: "Home chef and food photographer sharing easy recipes and cooking tips for busy families.",
    niche: "Food & Cooking",
    location: "Seattle, WA",
    followers: "128K",
    engagement: "5.8%",
    rating: 4.5,
    reviews: 16,
    platforms: ["instagram", "youtube"],
    recentCampaigns: 7,
    avgViews: "34K",
    tags: ["Cooking", "Recipes", "Food Photography", "Family"],
    priceRange: "$500-$1,000",
    responseRate: "88%",
    lastActive: "6 hours ago"
  }
];

const niches = [
  "All Niches",
  "Fashion & Lifestyle", 
  "Tech & Gaming",
  "Travel & Food",
  "Fitness & Wellness",
  "Beauty & Skincare",
  "Food & Cooking",
  "Home & DIY",
  "Business & Finance",
  "Entertainment"
];

const platforms = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "twitter", label: "Twitter", icon: Twitter }
];

export function FindCreatorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All Niches");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minFollowers, setMinFollowers] = useState("any");
  const [maxBudget, setMaxBudget] = useState("any");

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram": return Instagram;
      case "youtube": return Youtube;
      case "twitter": return Twitter;
      default: return Users;
    }
  };

  const filteredCreators = creators.filter(creator => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Niche filter
    const matchesNiche = selectedNiche === "All Niches" || creator.niche === selectedNiche;
    
    // Platform filter
    const matchesPlatforms = selectedPlatforms.length === 0 || 
      selectedPlatforms.some(platform => creator.platforms.includes(platform));
    
    return matchesSearch && matchesNiche && matchesPlatforms;
  });

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find Creators</h1>
          <p className="text-muted-foreground">Discover and connect with creators that match your brand</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search creators, niches, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Niche Filter */}
            <Select value={selectedNiche} onValueChange={setSelectedNiche}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {niches.map(niche => (
                  <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Followers Filter */}
            <Select value={minFollowers} onValueChange={setMinFollowers}>
              <SelectTrigger>
                <SelectValue placeholder="Min Followers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any followers</SelectItem>
                <SelectItem value="10k">10K+ followers</SelectItem>
                <SelectItem value="50k">50K+ followers</SelectItem>
                <SelectItem value="100k">100K+ followers</SelectItem>
                <SelectItem value="500k">500K+ followers</SelectItem>
              </SelectContent>
            </Select>

            {/* Budget Filter */}
            <Select value={maxBudget} onValueChange={setMaxBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Max Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any budget</SelectItem>
                <SelectItem value="500">Up to $500</SelectItem>
                <SelectItem value="1000">Up to $1,000</SelectItem>
                <SelectItem value="2000">Up to $2,000</SelectItem>
                <SelectItem value="5000">Up to $5,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Platform Filters */}
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Platforms:</p>
            <div className="flex space-x-4">
              {platforms.map(platform => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <label htmlFor={platform.id} className="text-sm flex items-center space-x-1 cursor-pointer">
                    <platform.icon className="h-4 w-4" />
                    <span>{platform.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Found {filteredCreators.length} creators matching your criteria
        </p>
        <div className="flex space-x-2">
          <Select defaultValue="relevance">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="followers">Most Followers</SelectItem>
              <SelectItem value="engagement">Best Engagement</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => (
          <Card key={creator.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Creator Header */}
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{creator.name}</h3>
                  <p className="text-muted-foreground text-sm">{creator.handle}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{creator.niche}</Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{creator.location}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{creator.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="font-semibold">{creator.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="font-semibold">{creator.engagement}</p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
                <div>
                  <p className="font-semibold">{creator.avgViews}</p>
                  <p className="text-xs text-muted-foreground">Avg Views</p>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{creator.rating}</span>
                  <span className="text-muted-foreground text-sm">({creator.reviews} reviews)</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {creator.responseRate} response rate
                </div>
              </div>

              {/* Platforms */}
              <div className="flex items-center space-x-2 mb-4">
                {creator.platforms.map(platform => {
                  const IconComponent = getPlatformIcon(platform);
                  return (
                    <IconComponent key={platform} className="h-4 w-4 text-muted-foreground" />
                  );
                })}
                <span className="text-sm text-muted-foreground ml-2">
                  {creator.recentCampaigns} recent campaigns
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {creator.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {creator.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{creator.tags.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <p className="text-sm font-medium">Price Range: {creator.priceRange}</p>
                <p className="text-xs text-muted-foreground">Last active: {creator.lastActive}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 gap-1">
                  <Eye className="h-3 w-3" />
                  View Profile
                </Button>
                <Button size="sm" className="flex-1 gap-1">
                  <Send className="h-3 w-3" />
                  Invite to Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">No creators found matching your criteria.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}