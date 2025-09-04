import { HeroSection } from "@/components/HeroSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { MainLayout } from "@/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
