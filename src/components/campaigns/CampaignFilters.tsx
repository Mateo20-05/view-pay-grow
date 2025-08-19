import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface CampaignFiltersProps {
  filters: {
    niche: string;
    payoutRange: number[];
    deadline: string;
    budgetProgress: string;
    platform: string;
    minFollowers: number;
    verifiedOnly: boolean;
  };
  onFiltersChange: (filters: any) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function CampaignFilters({ 
  filters, 
  onFiltersChange, 
  sortBy, 
  onSortChange 
}: CampaignFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Sorting Dropdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="highest-payout">Highest Payout</SelectItem>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Niche/Category */}
          <div className="space-y-2">
            <Label>Niche/Category</Label>
            <Select value={filters.niche} onValueChange={(value) => updateFilter("niche", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Payout Rate */}
          <div className="space-y-3">
            <Label>Payout Rate (per 1k views)</Label>
            <div className="px-2">
              <Slider
                value={filters.payoutRange}
                onValueChange={(value) => updateFilter("payoutRange", value)}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>${filters.payoutRange[0]}</span>
                <span>${filters.payoutRange[1]}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Campaign Deadline */}
          <div className="space-y-2">
            <Label>Campaign Deadline</Label>
            <Select value={filters.deadline} onValueChange={(value) => updateFilter("deadline", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any deadline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any deadline</SelectItem>
                <SelectItem value="7-days">Ending in 7 days</SelectItem>
                <SelectItem value="30-days">Ending in 30 days</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Budget Progress */}
          <div className="space-y-2">
            <Label>Budget Progress</Label>
            <Select value={filters.budgetProgress} onValueChange={(value) => updateFilter("budgetProgress", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Any progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any progress</SelectItem>
                <SelectItem value="fresh">Fresh (0-25%)</SelectItem>
                <SelectItem value="mid">Mid-progress (25-75%)</SelectItem>
                <SelectItem value="almost-full">Almost Full (75%+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Platform Requirements */}
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select value={filters.platform} onValueChange={(value) => updateFilter("platform", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All platforms</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitch">Twitch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Min Followers */}
          <div className="space-y-3">
            <Label>Min. Followers</Label>
            <div className="px-2">
              <Slider
                value={[filters.minFollowers]}
                onValueChange={(value) => updateFilter("minFollowers", value[0])}
                max={1000000}
                min={0}
                step={1000}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground mt-1 text-center">
                {filters.minFollowers.toLocaleString()}
              </div>
            </div>
          </div>

          <Separator />

          {/* Verified Only */}
          <div className="flex items-center justify-between">
            <Label htmlFor="verified-only">Verified accounts only</Label>
            <Switch
              id="verified-only"
              checked={filters.verifiedOnly}
              onCheckedChange={(checked) => updateFilter("verifiedOnly", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}