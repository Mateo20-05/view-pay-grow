import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Video, Clock, DollarSign, TrendingUp, Plus } from "lucide-react";

export function StatsOverview() {
  const stats = [
    {
      title: "Total Views",
      value: "2.4M",
      change: "+12.5%",
      icon: Eye,
      color: "text-blue-500",
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "+2",
      icon: Video,
      color: "text-green-500",
    },
    {
      title: "Pending Proposals",
      value: "3",
      change: "0",
      icon: Clock,
      color: "text-yellow-500",
    },
    {
      title: "Lifetime Earnings",
      value: "$12,450",
      change: "+8.2%",
      icon: DollarSign,
      color: "text-purple-500",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's your creator dashboard overview</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Submit Proposal
          </Button>
          <Button className="gradient-primary flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Find Campaigns
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-muted-foreground'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}