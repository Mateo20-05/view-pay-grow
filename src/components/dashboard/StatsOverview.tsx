import React from "react";
import { Eye, Briefcase, Clock, DollarSign, Search, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const statsData = [
  {
    title: "Total Views",
    value: "847K",
    change: "+12.5%",
    icon: Eye,
    color: "text-blue-600"
  },
  {
    title: "Active Campaigns",
    value: "8",
    change: "+2",
    icon: Briefcase,
    color: "text-green-600"
  },
  {
    title: "Pending Proposals",
    value: "3",
    change: "New",
    icon: Clock,
    color: "text-yellow-600"
  },
  {
    title: "Lifetime Earnings",
    value: "$12,847",
    change: "+$1,250",
    icon: DollarSign,
    color: "text-purple-600"
  }
];

export const StatsOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="gradient-primary text-white hover:opacity-90">
          <Search className="mr-2 h-4 w-4" />
          Find Campaigns
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Submit Proposal
        </Button>
      </div>
    </div>
  );
};