import { MainLayout } from "@/layouts/MainLayout";
import { Header } from "@/shared/components/Header";
import { PaymentLandingPage as PaymentLandingComponent } from "@/components/PaymentLandingPage";

const PaymentLandingPage = () => {
  return (
    <>
      <Header />
      <div className="pt-16">
        <MainLayout>
          <PaymentLandingComponent
            wisePaymentUrl="https://wise.com/pay/business/mcgibsdigitalsolution?amount=50&currency=AED&utm_source=quick_pay"
            flutterwavePaymentUrl="https://flutterwave.com/pay/qqtucsukcxrs"
          />
        </MainLayout>
      </div>
    </>
  );
};

export default PaymentLandingPage;
