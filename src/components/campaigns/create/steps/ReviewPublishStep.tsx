import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CampaignFormData } from "@/lib/schemas/campaign-schema";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar,
  Eye,
  Rocket
} from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

export function ReviewPublishStep() {
  const form = useFormContext<CampaignFormData>();
  const { watch, formState } = form;
  const formData = watch();

  // Validation summary
  const validationSummary = useMemo(() => {
    const errors = formState.errors;
    const warnings = [];
    const issues = [];

    // Check for critical errors
    if (errors.title) issues.push({ type: "error", field: "Title", message: errors.title.message });
    if (errors.brandName) issues.push({ type: "error", field: "Brand Name", message: errors.brandName.message });
    if (errors.shortDescription) issues.push({ type: "error", field: "Description", message: errors.shortDescription.message });
    if (errors.deadline) issues.push({ type: "error", field: "Deadline", message: errors.deadline.message });
    if (errors.payoutPer1k) issues.push({ type: "error", field: "Payout", message: errors.payoutPer1k.message });
    if (errors.totalBudget) issues.push({ type: "error", field: "Budget", message: errors.totalBudget.message });
    if (errors.dos) issues.push({ type: "error", field: "Do's", message: errors.dos.message });
    if (errors.donts) issues.push({ type: "error", field: "Don'ts", message: errors.donts.message });

    // Check for warnings
    if (!formData.brandLogo) warnings.push("No brand logo uploaded");
    if (!formData.coverImage) warnings.push("No cover image uploaded");
    if (formData.mandatoryElements.length === 0) warnings.push("No mandatory elements specified");
    if (formData.payoutPer1k < 5) warnings.push("Low CPM may reduce creator interest");
    if (formData.maxPayout > formData.totalBudget * 0.5) warnings.push("High max payout relative to total budget");

    return { issues, warnings };
  }, [formState.errors, formData]);

  const completionPercentage = useMemo(() => {
    const requiredFields = [
      formData.title,
      formData.brandName,
      formData.shortDescription,
      formData.categories.length > 0,
      formData.platforms.length > 0,
      formData.payoutPer1k > 0,
      formData.maxPayout > 0,
      formData.totalBudget > 0,
      formData.dos.length > 0,
      formData.donts.length > 0
    ];

    const completed = requiredFields.filter(Boolean).length;
    return Math.round((completed / requiredFields.length) * 100);
  }, [formData]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Review & Publish</h2>
        <p className="text-muted-foreground">
          Review your campaign details and publish when ready. You can edit most details after publishing.
        </p>
      </div>

      {/* Completion Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Campaign Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Progress</span>
                <span className="font-medium">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </div>

            {validationSummary.issues.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium">Please fix these issues before publishing:</p>
                  <ul className="mt-2 space-y-1">
                    {validationSummary.issues.map((issue, index) => (
                      <li key={index} className="text-sm">
                        • <strong>{issue.field}:</strong> {issue.message}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {validationSummary.warnings.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium">Recommendations:</p>
                  <ul className="mt-2 space-y-1">
                    {validationSummary.warnings.map((warning, index) => (
                      <li key={index} className="text-sm">• {warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div>
            <h4 className="font-semibold mb-3">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Campaign Title</p>
                <p className="font-medium">{formData.title || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Brand</p>
                <p className="font-medium">{formData.brandName || "Not set"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{formData.shortDescription || "Not set"}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Categories & Platforms */}
          <div>
            <h4 className="font-semibold mb-3">Categories & Platforms</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((category) => (
                    <Badge key={category} variant="secondary">{category}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Platforms</p>
                <div className="flex flex-wrap gap-2">
                  {formData.platforms.map((platform) => (
                    <Badge key={platform} variant="outline">{platform}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Details */}
          <div>
            <h4 className="font-semibold mb-3">Financial Details</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                <div className="text-xl font-bold">${formData.payoutPer1k}</div>
                <div className="text-sm text-muted-foreground">per 1k views</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                <div className="text-xl font-bold">${formData.maxPayout}</div>
                <div className="text-sm text-muted-foreground">max payout</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-xl font-bold">${formData.totalBudget}</div>
                <div className="text-sm text-muted-foreground">total budget</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-red-600" />
                <div className="text-xl font-bold">{getDaysLeft(formData.deadline)}</div>
                <div className="text-sm text-muted-foreground">days left</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Requirements Summary */}
          <div>
            <h4 className="font-semibold mb-3">Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Minimum Followers</p>
                <p className="font-medium">{formData.minFollowers.toLocaleString()}</p>
              </div>
              {formData.creatorSlots > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Creator Slots</p>
                  <p className="font-medium">{formData.creatorSlots}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Do's</p>
                <p className="font-medium">{formData.dos.length} guidelines</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Don'ts</p>
                <p className="font-medium">{formData.donts.length} restrictions</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Timeline
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{formatDate(formData.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="font-medium text-red-600">{formatDate(formData.deadline)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Final Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your campaign preview is shown on the right. This is exactly how creators will see your campaign 
            in the marketplace.
          </p>
          
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Save as Draft
            </Button>
            <Button variant="outline" className="flex-1">
              Test as Creator
            </Button>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-start gap-3">
              <Rocket className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-medium text-emerald-800 dark:text-emerald-200">Ready to publish?</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                  Once published, your campaign will be live and accepting applications. 
                  You can always edit details later from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}