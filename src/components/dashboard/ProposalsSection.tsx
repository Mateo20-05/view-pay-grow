import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Plus, ExternalLink } from "lucide-react";

export function ProposalsSection() {
  const proposals = [
    {
      id: 1,
      campaign: "Autumn Beauty Campaign",
      brand: "BeautyBrand",
      dateSubmitted: "2024-01-15",
      status: "Pending",
      proposedRate: "$500",
      timeline: "2 weeks",
    },
    {
      id: 2,
      campaign: "Tech Product Launch",
      brand: "TechCorp",
      dateSubmitted: "2024-01-12",
      status: "Accepted",
      proposedRate: "$800",
      timeline: "3 weeks",
    },
    {
      id: 3,
      campaign: "Holiday Gift Guide",
      brand: "RetailPlus",
      dateSubmitted: "2024-01-10",
      status: "Rejected",
      proposedRate: "$300",
      timeline: "1 week",
    },
    {
      id: 4,
      campaign: "Fitness Challenge Series",
      brand: "HealthyLife",
      dateSubmitted: "2024-01-08",
      status: "Under Review",
      proposedRate: "$650",
      timeline: "4 weeks",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-green-500";
      case "Pending": return "bg-yellow-500";
      case "Under Review": return "bg-blue-500";
      case "Rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Proposals</h2>
        <Button className="gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Find New Campaigns
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submitted Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Proposed Rate</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{proposal.campaign}</TableCell>
                  <TableCell>{proposal.brand}</TableCell>
                  <TableCell>{proposal.dateSubmitted}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(proposal.status)} text-white`}>
                      {proposal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{proposal.proposedRate}</TableCell>
                  <TableCell>{proposal.timeline}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      {proposal.status === "Pending" && (
                        <>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}