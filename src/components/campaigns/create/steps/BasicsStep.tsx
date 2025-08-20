import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CampaignFormData, CATEGORIES, PLATFORMS } from "@/lib/schemas/campaign-schema";
import { CalendarIcon, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

interface BasicsStepProps {
  onAutoSave: () => void;
}

export function BasicsStep({ onAutoSave }: BasicsStepProps) {
  const form = useFormContext<CampaignFormData>();
  const { control, watch, setValue } = form;
  const [inviteEmail, setInviteEmail] = useState("");
  
  const watchedData = watch();
  const { categories, platforms, isPublic, inviteEmails = [] } = watchedData;

  const toggleCategory = (category: string) => {
    const newCategories = categories.includes(category)
      ? categories.filter(c => c !== category)
      : [...categories, category];
    setValue("categories", newCategories);
    onAutoSave();
  };

  const togglePlatform = (platform: string) => {
    const newPlatforms = platforms.includes(platform)
      ? platforms.filter(p => p !== platform)
      : [...platforms, platform];
    setValue("platforms", newPlatforms);
    onAutoSave();
  };

  const addInviteEmail = () => {
    if (inviteEmail && !inviteEmails.includes(inviteEmail)) {
      setValue("inviteEmails", [...inviteEmails, inviteEmail]);
      setInviteEmail("");
      onAutoSave();
    }
  };

  const removeInviteEmail = (email: string) => {
    setValue("inviteEmails", inviteEmails.filter(e => e !== email));
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
        <h2 className="text-2xl font-bold mb-2">Campaign Basics</h2>
        <p className="text-muted-foreground">
          Set up the foundation of your campaign with essential information that creators will see first.
        </p>
      </div>

      {/* Campaign Identity */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Gaming Keyboard Review"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setTimeout(onAutoSave, 500);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  {field.value?.length || 0}/80 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., TechGear Pro"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setTimeout(onAutoSave, 500);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description that creators will see first. Make it compelling!"
                    className="min-h-[100px]"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setTimeout(onAutoSave, 500);
                    }}
                  />
                </FormControl>
                <div className="text-xs text-muted-foreground">
                  {field.value?.length || 0}/240 characters
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-sm font-medium">Select categories that match your campaign *</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={categories.includes(category) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => toggleCategory(category)}
              >
                {category}
                {categories.includes(category) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
          {categories.length === 0 && (
            <p className="text-sm text-red-500 mt-2">Please select at least one category</p>
          )}
        </CardContent>
      </Card>

      {/* Platforms */}
      <Card>
        <CardHeader>
          <CardTitle>Allowed Platforms</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-sm font-medium">Where can creators publish content? *</Label>
          <div className="flex flex-wrap gap-2 mt-3">
            {PLATFORMS.map((platform) => (
              <Badge
                key={platform}
                variant={platforms.includes(platform) ? "default" : "outline"}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => togglePlatform(platform)}
              >
                {platform}
                {platforms.includes(platform) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
          {platforms.length === 0 && (
            <p className="text-sm text-red-500 mt-2">Please select at least one platform</p>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          onAutoSave();
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          onAutoSave();
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Public Campaign</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Make this campaign visible to all creators in the marketplace
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

          {!isPublic && (
            <div className="space-y-3">
              <Label>Invite Creators</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter creator email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addInviteEmail()}
                />
                <Button onClick={addInviteEmail} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {inviteEmails.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {inviteEmails.map((email) => (
                    <Badge key={email} variant="secondary" className="gap-1">
                      {email}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeInviteEmail(email)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}