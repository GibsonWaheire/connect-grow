// Global type declarations

declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, data: Record<string, any>) => Promise<{ status: number }>;
    };
    IntaSend?: any;
  }
}

export {};

