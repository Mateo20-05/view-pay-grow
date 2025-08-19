import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Edit, 
  Plus, 
  Star, 
  Eye, 
  Play,
  ExternalLink,
  Upload
} from "lucide-react";

export function PortfolioSection() {
  const profile = {
    name: "John Doe",
    tagline: "Fashion & Lifestyle Content Creator",
    image: "/api/placeholder/120/120",
    niche: ["Fashion", "Lifestyle", "Travel", "Tech"],
    rating: 4.8,
    reviewCount: 47,
    followers: "125K",
    engagement: "4.2%"
  };

  const portfolioItems = [
    {
      id: 1,
      title: "Summer Fashion Haul",
      thumbnail: "/api/placeholder/300/200",
      views: "89K",
      type: "Video",
      campaign: "StyleCo Summer 2024",
      rating: 4.9
    },
    {
      id: 2,
      title: "Tech Review: Latest Smartphone",
      thumbnail: "/api/placeholder/300/200",
      views: "156K",
      type: "Video",
      campaign: "TechBrand Launch",
      rating: 4.7
    },
    {
      id: 3,
      title: "Travel Vlog: Paris Adventures",
      thumbnail: "/api/placeholder/300/200",
      views: "234K",
      type: "Video",
      campaign: "Travel Agency Collab",
      rating: 4.8
    },
    {
      id: 4,
      title: "Fitness Routine & Gear",
      thumbnail: "/api/placeholder/300/200",
      views: "67K",
      type: "Video",
      campaign: "FitMax Partnership",
      rating: 4.6
    },
    {
      id: 5,
      title: "Beauty Skincare Routine",
      thumbnail: "/api/placeholder/300/200",
      views: "123K",
      type: "Video",
      campaign: "Beauty Brand Collaboration",
      rating: 4.9
    },
    {
      id: 6,
      title: "Food & Lifestyle Content",
      thumbnail: "/api/placeholder/300/200",
      views: "45K",
      type: "Video",
      campaign: "Restaurant Partnership",
      rating: 4.5
    }
  ];

  const reviews = [
    {
      id: 1,
      brand: "StyleCo",
      rating: 5,
      comment: "Exceptional content quality and engagement rates. John delivered beyond our expectations!",
      date: "2024-01-15"
    },
    {
      id: 2,
      brand: "TechBrand",
      rating: 5,
      comment: "Professional, timely, and great results. Would definitely work with John again.",
      date: "2024-01-10"
    },
    {
      id: 3,
      brand: "FitMax",
      rating: 4,
      comment: "Good content creation and positive audience response. Minor timing issues but overall great.",
      date: "2024-01-05"
    }
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Portfolio</h2>
        <Button className="gradient-primary">
          <Edit className="h-4 w-4 mr-2" />
          Edit Portfolio
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Block */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Creator Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.image} alt={profile.name} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.tagline}</p>
              </div>
              
              <div className="flex flex-wrap gap-1 justify-center">
                {profile.niche.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div>
                  <p className="font-bold text-lg">{profile.followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{profile.engagement}</p>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(profile.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium">{profile.rating}</span>
                <span className="text-muted-foreground">({profile.reviewCount} reviews)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Gallery */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Portfolio Gallery</h3>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="group hover-lift cursor-pointer">
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                    {item.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{item.campaign}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {item.rating}
                      </span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Reviews & Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.brand}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}