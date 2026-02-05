export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "social-media-post",
    name: "Social Media Post (Single)",
    description: "Professional single post for Instagram, Facebook, or LinkedIn. Includes copy and basic design.",
    price: 1300,
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200",
    category: "Social Media",
    inStock: true,
  },
  {
    id: "logo-design-basic",
    name: "Logo Design (Basic)",
    description: "Custom logo design with 2 revision rounds. Delivered in PNG and SVG formats.",
    price: 1950,
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200",
    category: "Design",
    inStock: true,
  },
  {
    id: "seo-audit-basic",
    name: "SEO Audit (Basic)",
    description: "Comprehensive SEO analysis of your website. Includes keyword research and actionable recommendations.",
    price: 2600,
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200",
    category: "Digital Marketing",
    inStock: true,
  },
  {
    id: "content-creation-500",
    name: "Content Creation (500 words)",
    description: "Professional blog post or article. SEO-optimized, well-researched, and ready to publish.",
    price: 3250,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200",
    category: "Content",
    inStock: true,
  },
  {
    id: "social-media-management",
    name: "Social Media Management (Monthly)",
    description: "Full monthly management: 12 posts, engagement, analytics report. Facebook, Instagram, or LinkedIn.",
    price: 4550,
    imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200",
    category: "Social Media",
    inStock: true,
  },
  {
    id: "landing-page-design",
    name: "Landing Page Design",
    description: "High-converting landing page. Mobile responsive, SEO setup, and contact form integration.",
    price: 6500,
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200",
    category: "Web Development",
    inStock: true,
  },
  {
    id: "brand-identity-kit",
    name: "Brand Identity Kit",
    description: "Logo, color palette, typography, and basic brand guidelines. Perfect for startups.",
    price: 9750,
    imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200",
    category: "Design",
    inStock: true,
  },
  {
    id: "content-package-5",
    name: "Content Package (5 articles)",
    description: "5 SEO-optimized articles (500 words each). Topics of your choice. Delivered within 7 days.",
    price: 13000,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
    category: "Content",
    inStock: true,
  },
  {
    id: "website-starter-kit",
    name: "Website Starter Kit",
    description: "1-2 page professional website. Mobile responsive, SEO setup, contact form. Ideal for small businesses.",
    price: 19500,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
    category: "Web Development",
    inStock: true,
  },
];

export function getProductById(productId: string): Product | undefined {
  return products.find(p => p.id === productId);
}
