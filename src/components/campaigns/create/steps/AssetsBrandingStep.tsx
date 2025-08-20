import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CampaignFormData } from "@/lib/schemas/campaign-schema";
import { Upload, Image, FileText, Plus, X, Link } from "lucide-react";
import { motion } from "framer-motion";

interface AssetsBrandingStepProps {
  onAutoSave: () => void;
}

export function AssetsBrandingStep({ onAutoSave }: AssetsBrandingStepProps) {
  const form = useFormContext<CampaignFormData>();
  const { control, watch, setValue } = form;
  
  const [newReference, setNewReference] = useState("");
  
  const watchedData = watch();
  const { referenceMaterials } = watchedData;

  const addReference = () => {
    if (newReference.trim()) {
      setValue("referenceMaterials", [...referenceMaterials, newReference.trim()]);
      setNewReference("");
      onAutoSave();
    }
  };

  const removeReference = (index: number) => {
    const newReferences = referenceMaterials.filter((_, i) => i !== index);
    setValue("referenceMaterials", newReferences);
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
        <h2 className="text-2xl font-bold mb-2">Assets & Branding</h2>
        <p className="text-muted-foreground">
          Upload brand assets and provide reference materials to help creators represent your brand accurately.
        </p>
      </div>

      {/* Brand Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Brand Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="brandLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Logo (Square)</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter logo URL or upload"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setTimeout(onAutoSave, 500);
                      }}
                    />
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        Drag & drop your logo here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 512x512px, PNG or JPG
                      </p>
                      <Button variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  This will appear on campaign cards and detail pages
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Cover Image</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Input
                      placeholder="Enter cover image URL or upload"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setTimeout(onAutoSave, 500);
                      }}
                    />
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        Upload a compelling campaign hero image
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 1200x675px (16:9), PNG or JPG
                      </p>
                      <Button variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  High-quality image that represents your campaign
                </p>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Reference Materials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Reference Materials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Brand guidelines, product specs, or example content</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add URL to reference material or example content"
                value={newReference}
                onChange={(e) => setNewReference(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addReference()}
              />
              <Button onClick={addReference} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {referenceMaterials.length > 0 && (
            <div className="space-y-2">
              {referenceMaterials.map((reference, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50"
                >
                  <Link className="w-4 h-4 text-primary" />
                  <span className="flex-1 text-sm">{reference}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReference(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <FileText className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">
              Upload additional reference files
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              PDFs, images, videos, or documents
            </p>
            <Button variant="outline">
              Upload Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legal & Usage Rights */}
      <Card>
        <CardHeader>
          <CardTitle>Legal & Usage Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="legalNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage rights and legal considerations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Creators grant perpetual usage rights for content created with provided assets. Brand logo cannot be modified or used in misleading contexts."
                    className="min-h-[100px]"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setTimeout(onAutoSave, 500);
                    }}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Specify how creators can use your brand assets and content usage rights
                </p>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Content Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Creative Examples (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Provide examples of content you'd like to see or previous successful campaigns
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Image className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Example Images</p>
              <Button variant="outline" size="sm">
                Upload Images
              </Button>
            </div>
            
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <FileText className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Example Videos</p>
              <Button variant="outline" size="sm">
                Upload Videos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Asset Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• <strong>High Quality:</strong> Use high-resolution assets (at least 1080p for videos, 512px+ for logos)</p>
            <p>• <strong>Brand Consistency:</strong> Ensure all assets follow your brand guidelines</p>
            <p>• <strong>Clear Examples:</strong> Provide specific examples of the content style you're looking for</p>
            <p>• <strong>Usage Rights:</strong> Clearly specify how creators can use your brand assets</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}