import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CampaignFormData, REGIONS, LANGUAGES } from "@/lib/schemas/campaign-schema";
import { Globe, Users, Calendar, X } from "lucide-react";
import { motion } from "framer-motion";

interface TargetingStepProps {
  onAutoSave: () => void;
}

export function TargetingStep({ onAutoSave }: TargetingStepProps) {
  const form = useFormContext<CampaignFormData>();
  const { control, watch, setValue } = form;
  
  const watchedData = watch();
  const { regions, languages, verifiedOnly, applicationWindow } = watchedData;

  const toggleRegion = (region: string) => {
    const newRegions = regions.includes(region)
      ? regions.filter(r => r !== region)
      : [...regions, region];
    setValue("regions", newRegions);
    onAutoSave();
  };

  const toggleLanguage = (language: string) => {
    const newLanguages = languages.includes(language)
      ? languages.filter(l => l !== language)
      : [...languages, language];
    setValue("languages", newLanguages);
    onAutoSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Targeting & Visibility</h2>
        <p className="text-muted-foreground">
          Define your target audience and set campaign visibility preferences to reach the right creators.
        </p>
      </div>

      {/* Geographic Targeting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Geographic Targeting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Target regions (leave empty for global)</Label>
            <div className="flex flex-wrap gap-2 mt-3">
              {REGIONS.map((region) => (
                <Badge
                  key={region}
                  variant={regions.includes(region) ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleRegion(region)}
                >
                  {region}
                  {regions.includes(region) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            {regions.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Campaign will be visible to creators in selected regions
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Language Targeting */}
      <Card>
        <CardHeader>
          <CardTitle>Language Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Content languages (leave empty for any language)</Label>
            <div className="flex flex-wrap gap-2 mt-3">
              {LANGUAGES.map((language) => (
                <Badge
                  key={language}
                  variant={languages.includes(language) ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => toggleLanguage(language)}
                >
                  {language}
                  {languages.includes(language) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            {languages.length > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Content must be created in selected languages
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Creator Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Creator Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="verifiedOnly"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Verified creators only</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Only allow applications from platform-verified creators
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      onAutoSave();
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {verifiedOnly && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> This will limit your pool to creators with verified accounts 
                on their respective platforms, which typically means higher quality but fewer options.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Window */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Application Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="applicationWindow"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application window</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select application window type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="unlimited">Accept applications throughout campaign</SelectItem>
                    <SelectItem value="fixed-date">Close applications on specific date</SelectItem>
                    <SelectItem value="creator-count">Close after reaching creator count</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Control when and how applications are accepted
                </p>
              </FormItem>
            )}
          />

          {applicationWindow === "fixed-date" && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">
                Applications will automatically close on the specified date
              </p>
              <p className="text-xs text-muted-foreground">
                You can modify this date after campaign launch if needed
              </p>
            </div>
          )}

          {applicationWindow === "creator-count" && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-2">
                Applications will close once the creator slot limit is reached
              </p>
              <p className="text-xs text-muted-foreground">
                Make sure you've set a creator slot limit in the Requirements step
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messaging Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Communication Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Allow direct messages</Label>
                <div className="text-sm text-muted-foreground">
                  Let creators send you direct messages about this campaign
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Email notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Receive email updates about applications and submissions
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Targeting Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Audience Reach</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Regions: {regions.length === 0 ? "Global" : `${regions.length} selected`}</p>
                <p>• Languages: {languages.length === 0 ? "Any" : `${languages.length} selected`}</p>
                <p>• Verification: {verifiedOnly ? "Required" : "Not required"}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Application Settings</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Window: {applicationWindow === "unlimited" ? "Open throughout campaign" : 
                  applicationWindow === "fixed-date" ? "Closes on specific date" : "Closes when slots filled"}</p>
                <p>• Messaging: Enabled</p>
                <p>• Notifications: Enabled</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}