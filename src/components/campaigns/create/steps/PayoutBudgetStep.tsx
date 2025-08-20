import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CampaignFormData } from "@/lib/schemas/campaign-schema";
import { DollarSign, TrendingUp, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface PayoutBudgetStepProps {
  onAutoSave: () => void;
}

export function PayoutBudgetStep({ onAutoSave }: PayoutBudgetStepProps) {
  const form = useFormContext<CampaignFormData>();
  const { control, watch, setValue } = form;
  
  const watchedData = watch();
  const { payoutPer1k, totalBudget, maxPayout } = watchedData;

  // Calculate projections
  const projections = useMemo(() => {
    const cpv = payoutPer1k / 1000; // Cost per view
    const projectedViews = totalBudget > 0 ? Math.floor(totalBudget / cpv) : 0;
    const maxCreators = maxPayout > 0 ? Math.floor(totalBudget / maxPayout) : 0;
    
    return {
      cpv: cpv.toFixed(4),
      projectedViews: projectedViews.toLocaleString(),
      maxCreators
    };
  }, [payoutPer1k, totalBudget, maxPayout]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">Payout & Budget</h2>
        <p className="text-muted-foreground">
          Set competitive payouts to attract quality creators and manage your campaign budget effectively.
        </p>
      </div>

      {/* Core Payout Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Payout Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="payoutPer1k"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payout per 1,000 views (CPM) *</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Slider
                      min={1}
                      max={100}
                      step={0.5}
                      value={[field.value]}
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                        setTimeout(onAutoSave, 500);
                      }}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${field.value}
                      </span>
                      <span className="text-muted-foreground">per 1k views</span>
                      <span className="text-sm text-muted-foreground ml-auto">
                        (${projections.cpv} per view)
                      </span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="maxPayout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum payout per creator *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="500"
                      className="pl-9"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                        setTimeout(onAutoSave, 500);
                      }}
                    />
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Hard cap per creator submission to control spending
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Budget Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Budget Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="totalBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total campaign budget *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="5000"
                      className="pl-9"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                        setTimeout(onAutoSave, 500);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="dailyCap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily spending cap (optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="0 (unlimited)"
                        className="pl-9"
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                          setTimeout(onAutoSave, 500);
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="perCreatorCap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Per-creator budget cap (optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="0 (no limit)"
                        className="pl-9"
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                          setTimeout(onAutoSave, 500);
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="payoutCadence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payout frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payout frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Campaign Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {projections.projectedViews}
              </div>
              <div className="text-sm text-muted-foreground">Projected views</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">
                {projections.maxCreators}
              </div>
              <div className="text-sm text-muted-foreground">Max creators</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${projections.cpv}
              </div>
              <div className="text-sm text-muted-foreground">Cost per view</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Higher CPM rates attract more experienced creators, 
              while competitive max payouts encourage quality submissions.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}