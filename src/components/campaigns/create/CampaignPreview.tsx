import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CampaignFormData } from "@/lib/schemas/campaign-schema";
import { 
  Clock, 
  DollarSign, 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

interface CampaignPreviewProps {
  formData: CampaignFormData;
  onToggleCollapse: () => void;
}

export function CampaignPreview({ formData, onToggleCollapse }: CampaignPreviewProps) {
  const [activeTab, setActiveTab] = useState("card");

  const getDaysLeft = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const budgetProgress = 0; // Start at 0% for new campaign

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleCollapse}
          className="gap-2"
        >
          <ChevronRight className="w-4 h-4" />
          Collapse
        </Button>
      </div>

      {/* Preview Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="card">Explore Card</TabsTrigger>
          <TabsTrigger value="detail">Detail View</TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                {/* Campaign Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    {formData.brandLogo ? (
                      <img 
                        src={formData.brandLogo} 
                        alt={formData.brandName || "Brand"}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">Logo</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                      {formData.title || "Campaign Title"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.brandName || "Brand Name"}
                    </p>
                  </div>
                </div>

                {/* Campaign Thumbnail */}
                <div className="relative mb-4 rounded-lg overflow-hidden bg-muted h-40 flex items-center justify-center">
                  {formData.coverImage ? (
                    <img 
                      src={formData.coverImage} 
                      alt={formData.title || "Campaign"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground">Cover Image</span>
                  )}
                  {formData.categories.length > 0 && (
                    <Badge className="absolute top-2 right-2 bg-background/90 text-foreground hover:bg-background/90">
                      {formData.categories[0]}
                    </Badge>
                  )}
                </div>

                {/* Budget Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Budget Progress</span>
                    <span className="text-sm font-medium text-emerald-600">
                      {budgetProgress}%
                    </span>
                  </div>
                  <Progress value={budgetProgress} className="h-2" />
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {getDaysLeft(formData.deadline)} days left
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">${formData.payoutPer1k}/1k views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Max: ${formData.maxPayout}</span>
                  </div>
                  {formData.creatorSlots > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{formData.creatorSlots} slots remaining</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {formData.shortDescription || "Campaign description will appear here..."}
                </p>

                {/* Platform Badges */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {formData.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>

                {/* CTA Button */}
                <Button className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="detail" className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 max-h-[600px] overflow-y-auto"
          >
            <Card>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                    {formData.brandLogo ? (
                      <img 
                        src={formData.brandLogo} 
                        alt={formData.brandName || "Brand"}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">Logo</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {formData.brandName || "Brand Name"}
                    </h3>
                    {formData.categories.length > 0 && (
                      <Badge className="mt-1">{formData.categories[0]}</Badge>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {formData.shortDescription || "Campaign description will appear here..."}
                </p>

                {/* Payout Info */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 p-6 rounded-lg border mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <span className="text-2xl font-bold text-emerald-600">
                        ${formData.payoutPer1k}/1k views
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-lg">Max payout: ${formData.maxPayout}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Requirements */}
                {formData.mandatoryElements.length > 0 && (
                  <>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Requirements
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {formData.mandatoryElements.map((req, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Do's */}
                {formData.dos.length > 0 && (
                  <>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      Do's
                    </h4>
                    <div className="space-y-2 mb-6">
                      {formData.dos.map((item, index) => (
                        <div key={index} className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-md border border-emerald-200 dark:border-emerald-800">
                          <p className="text-sm text-emerald-800 dark:text-emerald-200">{item}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Don'ts */}
                {formData.donts.length > 0 && (
                  <>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                      <XCircle className="w-4 h-4" />
                      Don'ts
                    </h4>
                    <div className="space-y-2 mb-6">
                      {formData.donts.map((item, index) => (
                        <div key={index} className="bg-red-50 dark:bg-red-950/30 p-3 rounded-md border border-red-200 dark:border-red-800">
                          <p className="text-sm text-red-800 dark:text-red-200">{item}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Timeline */}
                <Separator className="my-6" />
                <h4 className="font-semibold flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4" />
                  Campaign Timeline
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{formatDate(formData.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="font-medium text-red-600">{formatDate(formData.deadline)}</p>
                  </div>
                </div>

                {/* CTA */}
                <Button size="lg" className="w-full mt-6">
                  Apply to Campaign
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}