import { useState, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { TrustSection, SamplesSection } from "@/components/TrustSection";
import { CTASection } from "@/components/CTASection";
import { FAQSection } from "@/components/FAQSection";
import { AIHelpPopup } from "@/components/AIHelpPopup";
import { AcademicServicesSection } from "@/components/AcademicServicesSection";
import { AcademicOrderForm } from "@/components/AcademicOrderForm";
import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";

const Index = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>();
  const [preselectedSubject, setPreselectedSubject] = useState<string | undefined>();
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenOrderModal = (serviceId?: string, subject?: string) => {
    // Clear any pending reset timeout to prevent stale updates
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    setPreselectedService(serviceId);
    setPreselectedSubject(subject);
    setOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setOrderModalOpen(false);
    // Clear any existing timeout before setting a new one
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    // Reset preselection after a short delay to allow modal close animation
    resetTimeoutRef.current = setTimeout(() => {
      setPreselectedService(undefined);
      setPreselectedSubject(undefined);
      resetTimeoutRef.current = null;
    }, 200);
  };

  return (
    <>
      <Header />
      <div className="pt-16">
        <MainLayout>
          <HeroSection />
          <TrustSection onSubjectClick={handleOpenOrderModal} />
          <AcademicServicesSection onOrderClick={handleOpenOrderModal} />
          <SamplesSection />
          <FAQSection />
          <CTASection />
          <AIHelpPopup />
        </MainLayout>
      </div>
      <AcademicOrderForm
        open={orderModalOpen}
        onOpenChange={handleCloseOrderModal}
        preselectedServiceId={preselectedService}
        preselectedSubject={preselectedSubject}
      />
    </>
  );
};

export default Index;
