import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/shared/components/OptimizedImage';
import { useWhatsApp } from '@/shared/hooks/useWhatsApp';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart } from '@/shared/contexts/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationItems = [
  {
    name: 'Digital',
    href: '/',
    dropdown: [
      { label: 'About Us', href: '/about' },
      { label: 'Services Overview', href: '/services-overview' },
      { label: 'Our Process', href: '/process' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Tech Stack', href: '/tech-stack' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    name: 'Shop',
    href: '/shop',
    dropdown: [
      { label: 'All Products', href: '/shop' },
      { label: 'Cameras', href: '/shop?category=Cameras' },
      { label: 'Laptops', href: '/shop?category=Laptops' },
      { label: 'Smartphones', href: '/shop?category=Smartphones' },
      { label: 'Audio Accessories', href: '/shop?category=Audio Accessories' },
      { label: 'Photography Gear', href: '/shop?category=Photography Gear' },
      { label: 'PC Accessories', href: '/shop?category=PC Accessories' },
      { label: 'View Cart', href: '/cart' },
    ],
  },
  {
    name: 'Course Help',
    href: '/course-help',
  },
  {
    name: 'Portfolio',
    href: 'https://portfolio-main-two-bice.vercel.app/',
    external: true,
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { sendMessage } = useWhatsApp();
  const { totalQuantity } = useCart();

  const handleContact = () => {
    const email = "pwriter455@gmail.com";
    const subject = "Request for Quote - Digital Solutions";
    const body = `Hello McGibs Digital Solutions,

I'm interested in getting a quote for your digital solutions.

Please provide me with:
- Pricing information
- Timeline estimates
- Available consultation slots

My email is: [Your email]
My phone: [Your phone]

Looking forward to hearing from you!`;
    
    // Create mailto link with proper encoding
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Try multiple methods to ensure email client opens
    try {
      window.location.href = mailtoLink;
    } catch (e) {
      // Fallback: try window.open
      window.open(mailtoLink, '_blank');
    }
  };

  const handleWhatsApp = () => {
    sendMessage("Hi! I'd like to get in touch.");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm safe-area-top">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-shrink">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=32&h=32&fit=crop&crop=center"
              alt="McGibs Digital Solutions"
              width={32}
              height={32}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded flex-shrink-0"
            />
            <span className="text-base sm:text-xl font-bold text-primary truncate">McGibs Digital Solutions</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navigationItems.map((item) => {
              if (item.dropdown && item.dropdown.length > 0) {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors font-medium">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem.label}
                          onClick={() => {
                            if (subItem.action === 'whatsapp') {
                              handleWhatsApp();
                            } else if (!subItem.href.startsWith('http') && !subItem.href.startsWith('mailto') && !subItem.href.startsWith('#')) {
                              window.location.href = subItem.href;
                            }
                          }}
                        >
                          {subItem.external || item.external ? (
                            <a
                              href={subItem.href}
                              target={subItem.external || item.external ? '_blank' : undefined}
                              rel={subItem.external || item.external ? 'noopener noreferrer' : undefined}
                              className="w-full"
                            >
                              {subItem.label}
                            </a>
                          ) : subItem.href.startsWith('#') ? (
                            <a href={subItem.href} className="w-full">{subItem.label}</a>
                          ) : (
                            <a href={subItem.href} className="w-full">{subItem.label}</a>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors font-medium"
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
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
            className="lg:hidden p-2 -mr-2 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto safe-area-bottom">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-primary transition-colors font-medium block"
                    onClick={() => setIsMenuOpen(false)}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {item.name}
                  </a>
                  {item.dropdown && item.dropdown.length > 0 && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="text-sm text-gray-600 hover:text-primary block"
                          onClick={() => {
                            setIsMenuOpen(false);
                            if (subItem.action === 'whatsapp') {
                              handleWhatsApp();
                            }
                          }}
                          target={subItem.external || item.external ? '_blank' : undefined}
                          rel={subItem.external || item.external ? 'noopener noreferrer' : undefined}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href="/cart" className="text-gray-700 hover:text-primary transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Cart {totalQuantity > 0 ? `(${totalQuantity})` : ''}
              </a>
              <Button onClick={() => { handleContact(); setIsMenuOpen(false); }} variant="default" size="sm" className="w-full">
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
