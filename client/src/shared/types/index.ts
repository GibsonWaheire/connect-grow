export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
  features?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface OrderFormData {
  service: string;
  subject: string;
  deadline: string;
  pages: number;
  instructions: string;
  contact: string;
}

export interface AppContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  user: User | null;
  setUser: (user: User | null) => void;
}
