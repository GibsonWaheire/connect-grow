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
import { ServicesPage } from "./pages/ServicesPage";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import IntaSendTest from "./components/IntaSendTest";
import WhatsAppNotificationPopup from "./components/WhatsAppNotificationPopup";

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
          <Routes>
            <Route path="/" element={<DigitalHomePage />} />
            <Route path="/course-help" element={<Index />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/test-intasend" element={<IntaSendTest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <WhatsAppNotificationPopup 
          message="We have a new WhatsApp number for better service! Contact us now for faster support."
          showDelay={0} // Show immediately
        />
        <Analytics />
      </TooltipProvider>
      </CartProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
