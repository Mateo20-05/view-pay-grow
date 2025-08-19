import React from "react";
import { DollarSign, TrendingUp, CreditCard, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: 1,
    date: "2024-01-15",
    campaign: "Summer Fashion Collection",
    amount: "$850",
    status: "completed"
  },
  {
    id: 2,
    date: "2024-01-10",
    campaign: "Tech Product Launch",
    amount: "$1,200",
    status: "pending"
  },
  {
    id: 3,
    date: "2024-01-05",
    campaign: "Food & Lifestyle Review",
    amount: "$650",
    status: "completed"
  }
];

export const EarningsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Earnings & Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Wallet Overview */}
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-bold text-green-600">$2,450</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-lg font-semibold">$1,200</p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Lifetime</p>
              <p className="text-lg font-semibold">$12,847</p>
            </div>
          </div>
        </div>
        
        <Button className="w-full gradient-primary text-white">
          <CreditCard className="mr-2 h-4 w-4" />
          Withdraw Funds
        </Button>
        
        {/* Earnings Trend */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-xl font-bold">$2,050</p>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% from last month
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Avg. per campaign</p>
              <p className="text-lg font-semibold">$683</p>
            </div>
          </div>
        </div>
        
        {/* Transaction History */}
        <div>
          <h4 className="font-medium mb-3">Recent Transactions</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{transaction.date}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {transaction.campaign}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.status === "completed" ? "default" : "secondary"}
                      className={
                        transaction.status === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};