import { HeroSection } from "@/components/HeroSection";
import { TrustSection, SamplesSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { AIHelpPopup } from "@/components/AIHelpPopup";
import { MainLayout } from "@/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <TrustSection />
      <SamplesSection />
      <CTASection />
      <AIHelpPopup />
    </MainLayout>
  );
};

export default Index;
