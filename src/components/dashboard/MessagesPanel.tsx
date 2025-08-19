import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Bell, 
  Send, 
  X,
  Search,
  Filter
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MessagesPanel() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageText, setMessageText] = useState("");

  const messages = [
    {
      id: 1,
      brand: "StyleCo",
      avatar: "/api/placeholder/40/40",
      lastMessage: "We're interested in your fashion content for our summer campaign.",
      timestamp: "2 hours ago",
      unread: true,
      campaign: "Summer Fashion Collection 2024"
    },
    {
      id: 2,
      brand: "TechBrand",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Great work on the product review! Looking forward to the next phase.",
      timestamp: "1 day ago",
      unread: false,
      campaign: "Tech Product Launch"
    },
    {
      id: 3,
      brand: "FitMax",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Can we schedule a call to discuss the fitness series timeline?",
      timestamp: "2 days ago",
      unread: true,
      campaign: "Fitness Gear Review Series"
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "proposal",
      title: "New Campaign Invite",
      message: "BeautyBrand invited you to their Autumn Beauty Campaign",
      timestamp: "1 hour ago",
      unread: true
    },
    {
      id: 2,
      type: "approval",
      title: "Proposal Approved",
      message: "Your proposal for TechCorp's product launch has been approved!",
      timestamp: "3 hours ago",
      unread: true
    },
    {
      id: 3,
      type: "payout",
      title: "Payment Processed",
      message: "Your payment of $2,340 from StyleCo has been processed",
      timestamp: "1 day ago",
      unread: false
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "proposal": return "🎯";
      case "approval": return "✅";
      case "payout": return "💰";
      default: return "📢";
    }
  };

  return (
    <>
      {/* Messages Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="fixed bottom-6 right-6 z-50 shadow-lg"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
            {messages.filter(m => m.unread).length > 0 && (
              <Badge className="ml-2 bg-destructive text-destructive-foreground">
                {messages.filter(m => m.unread).length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages & Notifications
            </SheetTitle>
          </SheetHeader>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            {/* Messages Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Direct Messages</h3>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {messages.map((message) => (
                    <Card 
                      key={message.id}
                      className={`cursor-pointer transition-colors ${
                        message.unread ? 'border-primary/50 bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.avatar} alt={message.brand} />
                            <AvatarFallback>{message.brand[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{message.brand}</span>
                              {message.unread && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {message.lastMessage}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Notifications Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <Badge variant="secondary">
                  {notifications.filter(n => n.unread).length} new
                </Badge>
              </div>
              
              <ScrollArea className="h-[450px]">
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <Card 
                      key={notification.id}
                      className={`${
                        notification.unread ? 'border-primary/50 bg-primary/5' : ''
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="text-lg">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{notification.title}</span>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Notifications Bell (separate floating button) */}
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-6 right-32 z-50 shadow-lg"
      >
        <Bell className="h-4 w-4" />
        {notifications.filter(n => n.unread).length > 0 && (
          <Badge className="ml-2 bg-destructive text-destructive-foreground">
            {notifications.filter(n => n.unread).length}
          </Badge>
        )}
      </Button>
    </>
  );
}