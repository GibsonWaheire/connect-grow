import { HeroSection } from "@/components/HeroSection";
import { TrustSection, SamplesSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { MainLayout } from "@/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <TrustSection />
      <SamplesSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
