import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Peter's School Help</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional school help at unbeatable prices. Quality work you can trust, delivered on time.
            </p>
            <div className="flex items-center gap-4">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=24&h=24&fit=crop&crop=center"
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-6 h-6 rounded"
              />
              <span className="text-gray-300">WhatsApp Available</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Non-Technical Writing</li>
              <li>Technical Writing</li>
              <li>Exam Help</li>
              <li>Research Papers</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Phone: +1 (443) 869-7500</li>
              <li>WhatsApp: Available 24/7</li>
              <li>Email: pwriter455@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 Peter's School Help. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy-policy" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <a 
                href="https://connect-order-grow.vercel.app" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};