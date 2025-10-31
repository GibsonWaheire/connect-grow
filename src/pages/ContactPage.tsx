import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/shared/hooks/useWhatsApp";
import { Header } from "@/shared/components/Header";

const ContactPage = () => {
  const { sendMessage } = useWhatsApp();

  const message = () =>
    sendMessage("Hi! I'd like to discuss a project with your team.");

  return (
    <>
      <Header />
      <MainLayout>
        <section className="container mx-auto px-4 pt-24 pb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact</h1>
          <p className="text-gray-600 mb-8">We typically respond within an hour during business time.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={message}>Chat on WhatsApp</Button>
            <a
              href="mailto:pwriter455@gmail.com"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Email Us
            </a>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default ContactPage;

