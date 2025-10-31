import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of academic help do you provide?",
    answer: "We offer comprehensive academic support including essays, research papers, technical writing, presentations, exam help, and coursework across all subjects. Our services cover both non-technical subjects (English, History, Philosophy, etc.) and technical subjects (Programming, Mathematics, Engineering, etc.)."
  },
  {
    question: "How do you ensure originality and quality?",
    answer: "All our work is 100% human-written with original research. We provide Turnitin reports to verify originality, and our experienced writers conduct thorough research using academic sources. We never use AI-generated content and guarantee plagiarism-free work."
  },
  {
    question: "What are your pricing and turnaround times?",
    answer: "Our pricing is competitive: $8/page for non-technical writing, $15/page for technical writing, and $30/exam for exam help. Turnaround times vary by complexity but typically range from 24-72 hours. Rush orders are available for urgent deadlines."
  },
  {
    question: "How do I place an order?",
    answer: "Simply contact us via WhatsApp (+1 443-869-7500), email (pwriter455@gmail.com), or use our contact form. Provide your assignment details, deadline, and any specific requirements. We'll give you a quote and start working immediately upon confirmation."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Absolutely! We maintain strict confidentiality and never share your personal information or assignment details with third parties. All communications are encrypted and secure. Check our Privacy Policy for complete details on how we protect your data."
  },
  {
    question: "Do you offer revisions and support?",
    answer: "Yes! We provide unlimited revisions until you're completely satisfied with the work. Our 24/7 support team is always available via WhatsApp to address any questions or concerns. We're committed to your success and academic excellence."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit cards, debit cards, PayPal, and mobile payments through our secure IntaSend payment system. All transactions are encrypted and secure. We also accept bank transfers for larger orders."
  },
  {
    question: "Can you help with urgent deadlines?",
    answer: "Yes! We specialize in urgent assignments and can often accommodate same-day or next-day delivery for urgent projects. Contact us immediately with your deadline, and we'll do our best to help you meet it while maintaining quality standards."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Everything you need to know about our academic help services
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/14438697500" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp Support
              </a>
              <a 
                href="mailto:pwriter455@gmail.com" 
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
