import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useWhatsApp } from "@/shared/hooks/useWhatsApp";
import { OptimizedImage } from "@/shared/components/OptimizedImage";

const services = [
  {
    category: 'Non-Technical Writing',
    price: '$8/page',
    subjects: ['English', 'History', 'Philosophy', 'Psychology', 'Sociology', 'Business', 'Marketing'],
    icon: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=32&h=32&fit=crop&crop=center'
  },
  {
    category: 'Technical Writing',
    price: '$15/page',
    subjects: ['Python', 'Java', 'C++', 'Data Analysis', 'Statistics', 'Mathematics', 'Engineering'],
    icon: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=32&h=32&fit=crop&crop=center'
  },
  {
    category: 'Exam Help',
    price: '$30/exam',
    subjects: ['All subjects', 'Timely delivery', 'Guaranteed quality', 'Confidential service'],
    icon: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=32&h=32&fit=crop&crop=center'
  }
];

export const ServicesModal = () => {
  const { sendMessage } = useWhatsApp();

  const handleServiceClick = (service: string, price: string) => {
    sendMessage(`Hi! I'm interested in your ${service} service at ${price}. Can you provide more details?`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=20&h=20&fit=crop&crop=center"
            alt="Services"
            width={20}
            height={20}
            className="w-5 h-5 rounded mr-2"
          />
          View All Services & Pricing
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            School Help Services & Pricing
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {services.map((service, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <OptimizedImage
                  src={service.icon}
                  alt={service.category}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{service.category}</h3>
                  <p className="text-primary font-bold">{service.price}</p>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Subjects/Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.subjects.map((subject, idx) => (
                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <Button 
                onClick={() => handleServiceClick(service.category, service.price)}
                className="w-full"
              >
                Get Quote for {service.category}
              </Button>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            ✨ Human research only • No AI • 24/7 Support • 500+ satisfied students
          </p>
          <Button 
            onClick={() => sendMessage("Hi! I need a custom quote for my school help needs.")}
            variant="outline"
            size="sm"
          >
            Need Custom Quote?
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
