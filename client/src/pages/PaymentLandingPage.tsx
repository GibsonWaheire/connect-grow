import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { PaymentLandingPage as PaymentLandingComponent } from "@/components/PaymentLandingPage";

const PaymentLandingPage = () => {
  return (
    <>
      <Header />
      <div className="pt-16">
        <MainLayout>
          <PaymentLandingComponent flutterwavePaymentUrl="https://flutterwave.com/pay/qqtucsukcxrs" />
        </MainLayout>
      </div>
    </>
  );
};

export default PaymentLandingPage;
