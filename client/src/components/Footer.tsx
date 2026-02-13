import { OptimizedImage } from "@/shared/components/OptimizedImage";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">McGibs Digital Solutions</h3>
            <p className="text-white/70 mb-6 max-w-md">
              Websites, web apps, mobile apps, and e‑commerce delivered with modern stacks and reliable infrastructure.
            </p>
            <div className="flex items-center gap-4">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=24&h=24&fit=crop&crop=center"
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-6 h-6 rounded"
              />
              <span className="text-white/70">WhatsApp support available</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="/" className="hover:text-white">Digital</a></li>
              <li><a href="/shop" className="hover:text-white">Shop</a></li>
              <li><Link to="/course-help" className="hover:text-white">Course Help</Link></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><a href="https://portfolio-main-two-bice.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Portfolio</a></li>
              <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-white/5 ring-1 ring-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-semibold">Stay in the loop</div>
              <div className="text-white/70 text-sm">Updates on new services, offers, and case studies.</div>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input type="email" placeholder="you@example.com" className="flex-1 md:w-80 px-4 py-2 rounded-md text-slate-900" />
              <button type="button" className="px-4 py-2 rounded-md bg-primary text-white">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-center md:text-left">
              &copy; {new Date().getFullYear()} McGibs Digital Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a 
                href="https://portfolio-main-two-bice.vercel.app/" 
                className="text-white/60 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
              <Link 
                to="/privacy-policy" 
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};