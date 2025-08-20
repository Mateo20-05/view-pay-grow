import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Mail, 
  Eye, 
  Target, 
  BarChart, 
  CreditCard, 
  Loader2,
  AlertCircle 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/explore-campaigns");
      }
    };
    checkAuth();
  }, [navigate]);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/explore-campaigns`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: error.message,
        });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Email Magic Link
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/explore-campaigns`,
        }
      });

      if (error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: error.message,
        });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a sign-in link. Click it to continue.",
        });
        setShowEmailForm(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop: Two-panel layout */}
      <div className="flex min-h-screen">
        {/* Left Panel - Creator Benefits */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-background/30" />
          <div className="relative z-10 flex flex-col justify-center px-12 py-16">
            <div className="max-w-md mx-auto text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Sign in to CrowdVid</h1>
              <p className="text-xl text-white/90 mb-12">
                Discover campaigns. Earn per view. Get paid for performance.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4 text-left">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Explore live campaigns</h3>
                    <p className="text-white/80 text-sm">Find campaigns with clear payouts that match your audience</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 text-left">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Track views & earnings</h3>
                    <p className="text-white/80 text-sm">Monitor your performance and earnings in real time</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 text-left">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Withdraw safely</h3>
                    <p className="text-white/80 text-sm">Get paid securely via Stripe or PayPal integration</p>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <Link 
                  to="/brand-sign-in"
                  className="text-white/70 hover:text-white text-sm transition-colors underline-offset-4 hover:underline"
                >
                  Are you a brand? Go to Brand Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 lg:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Sign in to CrowdVid</h1>
              <p className="text-muted-foreground">
                Discover campaigns and start earning
              </p>
            </div>

            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">C</span>
                  </div>
                </div>
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                  Continue with your Google account to start exploring campaigns
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Primary Google Sign In */}
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 text-base bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
                  aria-busy={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Continue with Google
                </Button>

                {/* Divider */}
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-sm text-muted-foreground">
                    or
                  </span>
                </div>

                {/* Email Fallback */}
                {!showEmailForm ? (
                  <Button
                    variant="outline"
                    onClick={() => setShowEmailForm(true)}
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Continue with Email
                  </Button>
                ) : (
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        type="submit"
                        disabled={isLoading || !email}
                        className="flex-1"
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Mail className="h-4 w-4 mr-2" />
                        )}
                        Send magic link
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowEmailForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}

                {/* Security Notice */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>
                    We use Google OAuth with PKCE and secure cookies. No password stored.
                  </span>
                </div>

                {/* Terms & Privacy */}
                <p className="text-xs text-muted-foreground text-center">
                  By continuing you agree to the{" "}
                  <Link to="/terms" className="underline hover:text-foreground" target="_blank">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline hover:text-foreground" target="_blank">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>

            {/* Mobile Brand Link */}
            <div className="lg:hidden text-center mt-8">
              <Link 
                to="/brand-sign-in"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors underline-offset-4 hover:underline"
              >
                Are you a brand? Go to Brand Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;