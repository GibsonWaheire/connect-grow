/**
 * Copyright (c) 2024 Peter's School Help
 * All rights reserved.
 * 
 * This software is proprietary and confidential.
 * Unauthorized copying, distribution, or use is strictly prohibited.
 * 
 * For licensing inquiries: pwriter455@gmail.com
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/shared/contexts/AppContext";
import { CartProvider } from "@/shared/contexts/CartContext";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import DigitalHomePage from "./pages/DigitalHomePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ServicesPage from "./pages/ServicesPage";
import ProcessPage from "./pages/ProcessPage";
import PricingPage from "./pages/PricingPage";
import TechStackPage from "./pages/TechStackPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import AdminBlogPage from "./pages/AdminBlogPage";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import QuoteRequestPage from "./pages/QuoteRequestPage";
import GetStartedPage from "./pages/GetStartedPage";
import IntaSendTest from "./components/IntaSendTest";
import MarketingPopup from "./components/MarketingPopup";
import CourseHelpPopup from "./components/CourseHelpPopup";
import { WhatsAppChatbot } from "./components/WhatsAppChatbot";
import { ExitIntentPopup } from "./components/ExitIntentPopup";
import { HtmlRedirects } from "./components/HtmlRedirects";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <HtmlRedirects />
          <Routes>
            <Route path="/" element={<DigitalHomePage />} />
            <Route path="/course-help" element={<Index />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/quote" element={<QuoteRequestPage />} />
                <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services-overview" element={<ServicesPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/tech-stack" element={<TechStackPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/admin/blog" element={<AdminBlogPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/test-intasend" element={<IntaSendTest />} />
            {/* Legacy HTML routes - redirect handled by HtmlRedirects component */}
            <Route path="/about.html" element={<AboutPage />} />
            <Route path="/contact.html" element={<ContactPage />} />
            <Route path="/services.html" element={<ServicesPage />} />
            <Route path="/blog-post-1.html" element={<BlogPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MarketingPopup 
            title="Limited Time Offer"
            message="Get 20% off your first project! Sign up for our newsletter and receive exclusive updates, tips, and special offers."
            showDelay={5000} // Show after 5 seconds
          />
          <CourseHelpPopup />
          <WhatsAppChatbot />
          <ExitIntentPopup />
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
      </CartProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
