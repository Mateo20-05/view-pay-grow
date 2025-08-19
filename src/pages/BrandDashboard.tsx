import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BrandDashboardOverview } from "@/components/dashboard/BrandDashboardOverview";
import { BrandAnalyticsPage } from "@/components/dashboard/BrandAnalyticsPage";
import { ProposalsInboxPage } from "@/components/dashboard/ProposalsInboxPage";
import { BrandCreatorsPage } from "@/components/dashboard/BrandCreatorsPage";
import { BrandBillingPage } from "@/components/dashboard/BrandBillingPage";
import { BrandMessagesPage } from "@/components/dashboard/BrandMessagesPage";
import { BrandSettingsPage } from "@/components/dashboard/BrandSettingsPage";
import { 
  Building2, 
  Bell, 
  Moon, 
  Sun, 
  User, 
  Settings, 
  LogOut,
  BarChart3,
  Eye,
  Users,
  CreditCard,
  MessageSquare,
  Cog,
  Mail
} from "lucide-react";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "analytics", label: "Analytics", icon: Eye },
  { id: "proposals", label: "Proposals", icon: Mail, badge: 3 },
  { id: "creators", label: "Creators", icon: Users },
  { id: "billing", label: "Billing & Budget", icon: CreditCard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Cog },
];

export default function BrandDashboard() {
  const [currentView, setCurrentView] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications] = useState(5);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "overview":
        return <BrandDashboardOverview />;
      case "analytics":
        return <BrandAnalyticsPage />;
      case "proposals":
        return <ProposalsInboxPage />;
      case "creators":
        return <BrandCreatorsPage />;
      case "billing":
        return <BrandBillingPage />;
      case "messages":
        return <BrandMessagesPage />;
      case "settings":
        return <BrandSettingsPage />;
      default:
        return <BrandDashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Vertical Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CrowdVid</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "ghost"}
              size="lg"
              onClick={() => setCurrentView(item.id)}
              className="w-full justify-start gap-3 text-left h-12"
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Brand Account</p>
                <p className="text-xs text-muted-foreground">Premium Plan</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Brand Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-background/80 backdrop-blur-md border-b border-border p-4">
          <div className="flex items-center justify-end space-x-3">
            {/* Dark mode toggle */}
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}