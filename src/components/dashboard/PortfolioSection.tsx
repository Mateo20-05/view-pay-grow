import React from "react";
import { Star, Eye, ThumbsUp, Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const portfolioItems = [
  {
    id: 1,
    title: "Fashion Haul Review",
    thumbnail: "/placeholder.svg",
    views: "23K",
    likes: "1.2K",
    category: "Fashion"
  },
  {
    id: 2,
    title: "Tech Product Unboxing",
    thumbnail: "/placeholder.svg",
    views: "45K",
    likes: "2.8K",
    category: "Technology"
  },
  {
    id: 3,
    title: "Food Recipe Tutorial",
    thumbnail: "/placeholder.svg",
    views: "67K",
    likes: "4.1K",
    category: "Food"
  }
];

const reviews = [
  {
    id: 1,
    brand: "TechCorp",
    rating: 5,
    comment: "Amazing video quality and great storytelling. Very professional!",
    date: "Jan 15, 2024"
  },
  {
    id: 2,
    brand: "FashionHub",
    rating: 5,
    comment: "Creative content and excellent engagement with audience.",
    date: "Jan 10, 2024"
  }
];

export const PortfolioSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Portfolio</CardTitle>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Portfolio
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Creator Profile */}
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt="Creator" />
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">Creator Name</h3>
            <p className="text-sm text-muted-foreground">Content Creator & Influencer</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary">Fashion</Badge>
              <Badge variant="secondary">Tech</Badge>
              <Badge variant="secondary">Lifestyle</Badge>
            </div>
          </div>
        </div>
        
        {/* Portfolio Gallery */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Recent Work</h4>
            <Button variant="ghost" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-sm">{item.title}</h5>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ratings & Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Reviews</h4>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(5.0)</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{review.brand}</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  "{review.comment}"
                </p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};