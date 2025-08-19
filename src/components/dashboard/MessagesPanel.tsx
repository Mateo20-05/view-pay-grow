import React, { useState } from "react";
import { MessageSquare, X, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const messages = [
  {
    id: 1,
    brand: "TechCorp",
    lastMessage: "We'd like to discuss the upcoming campaign details...",
    timestamp: "2 min ago",
    unread: true,
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    brand: "FashionHub",
    lastMessage: "Great work on the last video! When can we schedule the next one?",
    timestamp: "1 hour ago",
    unread: false,
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    brand: "FoodieWorld",
    lastMessage: "Your proposal looks interesting. Let's talk about the budget.",
    timestamp: "3 hours ago",
    unread: true,
    avatar: "/placeholder.svg"
  }
];

export const MessagesPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const unreadCount = messages.filter(m => m.unread).length;

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full gradient-primary text-white shadow-lg hover:opacity-90 relative"
          size="lg"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Messages
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Messages</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-full">
          {!selectedMessage ? (
            <div className="space-y-1">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                    message.unread ? "bg-muted/30" : ""
                  }`}
                  onClick={() => setSelectedMessage(message.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={message.avatar} alt={message.brand} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">
                        {message.brand}
                      </p>
                      {message.unread && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {message.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-3 p-3 border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMessage(null)}
                >
                  ←
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Brand" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">
                  {messages.find(m => m.id === selectedMessage)?.brand}
                </span>
              </div>
              
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg max-w-[70%] text-sm">
                    Hi! I'm interested in your campaign.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-muted px-3 py-2 rounded-lg max-w-[70%] text-sm">
                    Great! We'd love to work with you. What's your rate for a 60-second video?
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t">
                <div className="flex space-x-2">
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button size="sm" className="gradient-primary text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};