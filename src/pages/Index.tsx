import { HeroSection } from "@/components/HeroSection";
import { TrustSection, SamplesSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { AIHelpPopup } from "@/components/AIHelpPopup";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";

const Index = () => {
  return (
    <>
      <Header />
      <div className="pt-16">
        <MainLayout>
          <HeroSection />
          <TrustSection />
          <SamplesSection />
          <FAQSection />
          <CTASection />
          <AIHelpPopup />
        </MainLayout>
      </div>
    </>
  );
};

export default Index;
