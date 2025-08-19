import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Camera, 
  Bell, 
  Shield, 
  CreditCard,
  Users,
  Trash2,
  Plus
} from "lucide-react";

export function BrandSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Settings</h1>
        <p className="text-muted-foreground">Manage your brand profile, preferences, and account settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Brand Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Brand Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
              <CardDescription>Update your brand details and public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Brand Logo */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" alt="Brand Logo" />
                  <AvatarFallback>
                    <Building className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Change Logo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended: 400x400px, PNG or JPG
                  </p>
                </div>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input id="brandName" placeholder="Your Brand Name" defaultValue="TechCorp Inc." />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" placeholder="e.g., Fashion, Technology" defaultValue="Technology" />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://yourbrand.com" defaultValue="https://techcorp.com" />
                </div>
                <div>
                  <Label htmlFor="size">Company Size</Label>
                  <Input id="size" placeholder="e.g., 50-100 employees" defaultValue="100-500 employees" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Brand Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Tell creators about your brand, values, and collaboration goals..."
                  className="min-h-20"
                  defaultValue="TechCorp is a leading technology company focused on innovative solutions that empower businesses worldwide. We're passionate about collaborating with creators who share our vision of technology making life better."
                />
              </div>

              {/* Contact Information */}
              <Separator />
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" defaultValue="partnerships@techcorp.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 987-6543" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" placeholder="123 Business St, City, State, ZIP" defaultValue="456 Tech Ave, San Francisco, CA 94105" />
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Brand Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Guidelines</CardTitle>
              <CardDescription>Help creators understand your brand standards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="guidelines">Brand Guidelines Document</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input id="guidelines" placeholder="Upload or link to your brand guidelines" />
                  <Button variant="outline">Upload</Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="dosDonts">Do's and Don'ts</Label>
                <Textarea 
                  id="dosDonts" 
                  placeholder="Key points creators should know when representing your brand..."
                  className="min-h-20"
                />
              </div>

              <div>
                <Label htmlFor="hashtags">Brand Hashtags</Label>
                <Input id="hashtags" placeholder="#TechCorp #Innovation #TechSolutions" />
              </div>

              <Button>Update Guidelines</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose when and how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Proposals</p>
                    <p className="text-sm text-muted-foreground">Get notified when creators submit proposals</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Campaign Milestones</p>
                    <p className="text-sm text-muted-foreground">Notifications for campaign progress updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Content Submissions</p>
                    <p className="text-sm text-muted-foreground">When creators submit content for review</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Budget Alerts</p>
                    <p className="text-sm text-muted-foreground">Alerts when campaigns reach 80% of budget</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Monthly Reports</p>
                    <p className="text-sm text-muted-foreground">Monthly performance summary emails</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Notification Methods</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In-App Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Notifications</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage who has access to your brand account</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Smith", email: "john@techcorp.com", role: "Admin", status: "Active" },
                  { name: "Sarah Wilson", email: "sarah@techcorp.com", role: "Manager", status: "Active" },
                  { name: "Mike Johnson", email: "mike@techcorp.com", role: "Viewer", status: "Pending" },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                        {member.status}
                      </Badge>
                      <Badge variant="outline">{member.role}</Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing details and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingEmail">Billing Email</Label>
                  <Input id="billingEmail" type="email" defaultValue="billing@techcorp.com" />
                </div>
                <div>
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input id="taxId" placeholder="Your tax identification number" />
                </div>
              </div>

              <div>
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Textarea id="billingAddress" placeholder="Your billing address..." />
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Current Plan</h4>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Professional Plan</p>
                      <p className="text-sm text-muted-foreground">$299/month • Unlimited campaigns</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                </div>
              </div>

              <Button>Update Billing Info</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                </div>
                <Button className="mt-2">Update Password</Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Add an extra layer of security to your account</p>
                    <p className="text-xs text-muted-foreground">Currently disabled</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Privacy Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Make brand profile public</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Allow creators to find you in search</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show campaign performance publicly</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  These actions are irreversible. Please be certain before proceeding.
                </p>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}