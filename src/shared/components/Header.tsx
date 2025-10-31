import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { config } from '@/config/environment';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/shared/contexts/CartContext';

const navigationItems = [
  { name: 'Digital', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Course Help', href: '/course-help' },
  { name: 'Portfolio', href: 'https://portfolio-main-two-bice.vercel.app/' },
  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { sendMessage } = useWhatsApp();
  const { totalQuantity } = useCart();

  const handleContact = () => {
    sendMessage("Hi! I'd like to discuss your services and get a quote.");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=32&h=32&fit=crop&crop=center"
              alt="Academic Services Pro"
              width={32}
              height={32}
              className="w-8 h-8 rounded"
            />
            <span className="text-xl font-bold text-primary">ConnectGrow Digital</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isExternal = item.href.startsWith('http');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors font-medium"
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  {item.name}
                </a>
              );
            })}
            <a href="/cart" className="relative text-gray-700 hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full px-1.5 py-0.5">{totalQuantity}</span>
              )}
            </a>
            <Button onClick={handleContact} variant="default" size="sm">
              Get Quote
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <OptimizedImage
              src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=24&h=24&fit=crop&crop=center"
              alt="Menu"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => {
                const isExternal = item.href.startsWith('http');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {item.name}
                  </a>
                );
              })}
              <a href="/cart" className="text-gray-700 hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Cart {totalQuantity > 0 ? `(${totalQuantity})` : ''}
              </a>
              <Button onClick={handleContact} variant="default" size="sm" className="w-full">
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
