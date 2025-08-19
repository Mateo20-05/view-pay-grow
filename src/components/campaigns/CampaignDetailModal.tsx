import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Campaign } from "@/pages/ExploreCampaigns";
import { Clock, DollarSign, Users, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CampaignDetailModalProps {
  campaign: Campaign;
  onClose: () => void;
}

export function CampaignDetailModal({ campaign, onClose }: CampaignDetailModalProps) {
  const getDaysLeft = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{campaign.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Top Section - Immediate Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={campaign.brandLogo} 
                  alt={campaign.brandName}
                  className="w-16 h-16 rounded-lg object-cover bg-muted"
                />
                <div>
                  <h3 className="text-xl font-semibold">{campaign.brandName}</h3>
                  <Badge className="mt-1">{campaign.niche}</Badge>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {campaign.description}
              </p>
            </div>

            {/* Right Column - Payout & Stats */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 p-6 rounded-lg border">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <span className="text-2xl font-bold text-emerald-600">
                      ${campaign.payoutPer1k}/1k views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-lg">Max payout: ${campaign.maxPayout}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-2xl font-bold text-red-600">
                    {getDaysLeft(campaign.deadline)}
                  </div>
                  <div className="text-sm text-muted-foreground">days left</div>
                </div>

                {campaign.slotsRemaining && (
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-2xl font-bold text-blue-600">
                      {campaign.slotsRemaining}
                    </div>
                    <div className="text-sm text-muted-foreground">slots left</div>
                  </div>
                )}
              </div>

              {/* Budget Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Budget Progress</span>
                  <span className="font-medium">{campaign.budgetProgress}%</span>
                </div>
                <Progress value={campaign.budgetProgress} className="h-3" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Middle Section - Requirements & Rules */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Requirements */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Requirements
              </h4>
              <ul className="space-y-2">
                {campaign.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>

              {/* Platform Requirements */}
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Platforms:</p>
                <div className="flex gap-2 flex-wrap">
                  {campaign.platform.map((platform) => (
                    <Badge key={platform} variant="outline" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Do's */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                Do's
              </h4>
              <div className="space-y-2">
                {campaign.dos.map((item, index) => (
                  <div key={index} className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-md border border-emerald-200 dark:border-emerald-800">
                    <p className="text-sm text-emerald-800 dark:text-emerald-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Don'ts */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                <XCircle className="w-4 h-4" />
                Don'ts
              </h4>
              <div className="space-y-2">
                {campaign.donts.map((item, index) => (
                  <div key={index} className="bg-red-50 dark:bg-red-950/30 p-3 rounded-md border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-800 dark:text-red-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Bottom Section - Campaign Details */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Campaign Timeline
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{formatDate(campaign.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-medium text-red-600">{formatDate(campaign.deadline)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Min. Followers</p>
                  <p className="font-medium">{campaign.minFollowers.toLocaleString()}</p>
                </div>
                {campaign.slotsRemaining && (
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining Slots</p>
                    <p className="font-medium">{campaign.slotsRemaining}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="flex-1">
              Apply to Campaign
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}