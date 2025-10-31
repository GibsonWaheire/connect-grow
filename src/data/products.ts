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
    id: "camera-dslr-01",
    name: "Pro DSLR Camera X200",
    description: "24MP APS-C sensor, 4K video, dual-pixel AF, bundled with 18-55mm lens.",
    price: 899.0,
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200",
    category: "Cameras",
    inStock: true,
  },
  {
    id: "laptop-creator-15",
    name: "Creator 15" ,
    description: "15.6\" IPS, i7 12th Gen, 16GB RAM, 512GB NVMe, RTX 3060.",
    price: 1499.0,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200",
    category: "Laptops",
    inStock: true,
  },
  {
    id: "phone-ultra-5g",
    name: "Ultra Phone 5G",
    description: "6.7\" OLED 120Hz, 12GB RAM, 256GB, 120W fast charge, triple camera.",
    price: 999.0,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200",
    category: "Smartphones",
    inStock: true,
  },
  {
    id: "audio-anc-headset",
    name: "ANC Wireless Headset",
    description: "Hybrid ANC, 40mm drivers, 35h battery, USB-C fast charging.",
    price: 179.0,
    imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200",
    category: "Audio Accessories",
    inStock: true,
  },
  {
    id: "photo-tripod-pro",
    name: "Carbon Fiber Tripod Pro",
    description: "Lightweight carbon tripod, 10kg payload, ball head, quick release.",
    price: 219.0,
    imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200",
    category: "Photography Gear",
    inStock: true,
  },
  {
    id: "pc-mech-keyboard",
    name: "Mechanical Keyboard TKL",
    description: "Hot-swappable switches, per-key RGB, aluminum top plate, USB-C.",
    price: 129.0,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
    category: "PC Accessories",
    inStock: true,
  },
];

export function getProductById(productId: string): Product | undefined {
  return products.find(p => p.id === productId);
}

