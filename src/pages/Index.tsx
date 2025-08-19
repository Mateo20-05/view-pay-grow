import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { CampaignShowcase } from "@/components/sections/CampaignShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <CampaignShowcase />
        <HowItWorks />
      </main>
    </div>
  );
};

export default Index;
