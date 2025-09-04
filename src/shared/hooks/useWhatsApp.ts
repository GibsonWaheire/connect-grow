import { config } from '@/config/environment';

export const useWhatsApp = () => {
  const sendMessage = (message: string) => {
    const whatsappUrl = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return {
    sendMessage
  };
};
