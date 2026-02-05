import { useState } from "react";
import { List, X, MessageCircle } from "lucide-react";
import { useWhatsApp } from "@/shared/hooks/useWhatsApp";
import { useLocation } from "react-router-dom";

const SERVICES = [
  "Web Development",
  "Mobile Development",
  "Digital Marketing",
  "Social Media",
  "Design",
  "Content",
  "Business Solutions",
  "Cloud & Infrastructure",
];

export const ServicesStickyPopup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { sendMessage } = useWhatsApp();
  const location = useLocation();

  // Only show on landing page
  if (location.pathname !== "/") {
    return null;
  }

  const handleWhatsApp = () => {
    sendMessage(
      "Hi! I'm interested in your services. Could you please provide more details and pricing?"
    );
  };

  return (
    <div
      className={`fixed left-4 top-24 z-40 transition-all duration-300 ${
        isExpanded ? "w-72" : "w-12"
      }`}
    >
      {isExpanded ? (
        <div className="bg-white rounded-xl shadow-lg border-2 border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm">
              Other Services I Offer
            </h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
              aria-label="Collapse"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>
          <div className="p-4">
            <ul className="space-y-2 mb-4 text-sm text-slate-700">
              {SERVICES.map((service) => (
                <li key={service} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-600 mb-4">
              If you need any of these services, please contact me on WhatsApp.
            </p>
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contact on WhatsApp
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center justify-center w-12 h-12 bg-white/95 backdrop-blur-sm rounded-r-xl shadow-lg border-2 border-l-0 border-slate-200 hover:bg-white hover:shadow-xl transition-all"
          aria-label="View services"
        >
          <List className="w-5 h-5 text-slate-700" />
        </button>
      )}
    </div>
  );
};
