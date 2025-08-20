import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CampaignFormData } from "@/lib/schemas/campaign-schema";
import { Users, Plus, X, Hash, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface RequirementsStepProps {
  onAutoSave: () => void;
}

export function RequirementsStep({ onAutoSave }: RequirementsStepProps) {
  const form = useFormContext<CampaignFormData>();
  const { control, watch, setValue } = form;
  
  const [newElement, setNewElement] = useState("");
  const [newHashtag, setNewHashtag] = useState("");
  
  const watchedData = watch();
  const { mandatoryElements, hashtags, requiresApproval } = watchedData;

  const addMandatoryElement = () => {
    if (newElement.trim()) {
      setValue("mandatoryElements", [...mandatoryElements, newElement.trim()]);
      setNewElement("");
      onAutoSave();
    }
  };

  const removeMandatoryElement = (index: number) => {
    const newElements = mandatoryElements.filter((_, i) => i !== index);
    setValue("mandatoryElements", newElements);
    onAutoSave();
  };

  const addHashtag = () => {
    if (newHashtag.trim()) {
      const hashtag = newHashtag.startsWith('#') ? newHashtag : `#${newHashtag}`;
      if (!hashtags.includes(hashtag)) {
        setValue("hashtags", [...hashtags, hashtag]);
        setNewHashtag("");
        onAutoSave();
      }
    }
  };

  const removeHashtag = (index: number) => {
    const newHashtags = hashtags.filter((_, i) => i !== index);
    setValue("hashtags", newHashtags);
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
        <h2 className="text-2xl font-bold mb-2">Requirements</h2>
        <p className="text-muted-foreground">
          Define clear criteria and content requirements for creators to follow.
        </p>
      </div>

      {/* Audience Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Audience Criteria
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="minFollowers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum followers/subscribers</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1000"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                      setTimeout(onAutoSave, 500);
                    }}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Set minimum audience size across all platforms
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="creatorSlots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of creator slots (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0 (unlimited)"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                      setTimeout(onAutoSave, 500);
                    }}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Limit the number of creators who can participate
                </p>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Content Format */}
      <Card>
        <CardHeader>
          <CardTitle>Content Format Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="contentFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content format specifications</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Short-form video (30-60 seconds), 9:16 aspect ratio, minimum 1080p quality"
                    className="min-h-[80px]"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setTimeout(onAutoSave, 500);
                    }}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Specify video length, aspect ratio, quality requirements, etc.
                </p>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Mandatory Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Mandatory Content Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Required elements creators must include</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="e.g., Mention brand name in first 10 seconds"
                value={newElement}
                onChange={(e) => setNewElement(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMandatoryElement()}
              />
              <Button onClick={addMandatoryElement} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {mandatoryElements.length > 0 && (
            <div className="space-y-2">
              {mandatoryElements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="flex-1">{element}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMandatoryElement(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hashtags & Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Hashtags & Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Required hashtags</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="e.g., TechReview"
                value={newHashtag}
                onChange={(e) => setNewHashtag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
              />
              <Button onClick={addHashtag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hashtags.map((hashtag, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {hashtag}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeHashtag(index)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval Process */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Process</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="requiresApproval"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Require pre-approval</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Review and approve content before creators can publish
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

          {requiresApproval && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Enabling pre-approval may slow down content creation 
                but gives you more control over the final output.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}