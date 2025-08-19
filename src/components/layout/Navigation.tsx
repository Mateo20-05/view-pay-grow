import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Play, 
  TrendingUp, 
  Menu, 
  X, 
  User, 
  Briefcase,
  LogIn,
  ChevronDown,
  DollarSign,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg gradient-primary">
              <Play className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">CrowdVid</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-white hover:text-white">
                  <User className="h-4 w-4" />
                  <span>For Creators</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link to="/explore-campaigns" className="w-full">Browse Campaigns</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/creator-dashboard" className="w-full">Creator Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Earnings</DropdownMenuItem>
                <DropdownMenuItem>Portfolio</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 text-white hover:text-white">
                  <Briefcase className="h-4 w-4" />
                  <span>For Brands</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Start Campaign</DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/brand-dashboard" className="w-full">Campaign Dashboard</a>
                </DropdownMenuItem>
                <DropdownMenuItem>Analytics</DropdownMenuItem>
                <DropdownMenuItem>Find Creators</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#" className="text-white hover:text-white/80 transition-colors flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span>Pricing</span>
            </a>
            <a 
              href="#how-it-works" 
              className="text-white hover:text-white/80 transition-colors flex items-center space-x-1"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <HelpCircle className="h-4 w-4" />
              <span>How it Works</span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
            <Button size="sm" className="gradient-primary hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              For Creators
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Briefcase className="h-4 w-4 mr-2" />
              For Brands
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('how-it-works')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              How it Works
            </Button>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="gradient-primary">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}