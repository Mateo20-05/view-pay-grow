import React from "react";
import { Calendar, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const proposals = [
  {
    id: 1,
    campaign: "Beauty Product Launch",
    brand: "GlowCorp",
    dateSubmitted: "2024-01-15",
    status: "pending",
    amount: "$750"
  },
  {
    id: 2,
    campaign: "Travel Destination Review",
    brand: "WanderLust",
    dateSubmitted: "2024-01-12",
    status: "accepted",
    amount: "$1,200"
  },
  {
    id: 3,
    campaign: "Gaming Hardware Review",
    brand: "GameTech",
    dateSubmitted: "2024-01-10",
    status: "rejected",
    amount: "$500"
  },
  {
    id: 4,
    campaign: "Fitness Equipment Demo",
    brand: "FitLife",
    dateSubmitted: "2024-01-08",
    status: "pending",
    amount: "$900"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case "accepted":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Accepted
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
      );
    default:
      return null;
  }
};

export const ProposalsSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">My Proposals</CardTitle>
          <Button className="gradient-primary text-white">
            <Plus className="mr-2 h-4 w-4" />
            Find New Campaigns
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">
                  {proposal.campaign}
                </TableCell>
                <TableCell>{proposal.brand}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{proposal.dateSubmitted}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(proposal.status)}
                </TableCell>
                <TableCell className="font-medium">
                  {proposal.amount}
                </TableCell>
                <TableCell>
                  {proposal.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Withdraw
                      </Button>
                    </div>
                  )}
                  {proposal.status === "accepted" && (
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};