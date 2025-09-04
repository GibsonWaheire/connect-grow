import { useCallback } from 'react';
import { config } from '../../config/environment';

export const useWhatsApp = () => {
  const sendMessage = useCallback((message?: string) => {
    const defaultMessage = config.whatsapp.defaultMessage;
    const finalMessage = message || defaultMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    window.open(`https://wa.me/${config.whatsapp.number}?text=${encodedMessage}`, '_blank');
  }, []);

  return { sendMessage };
};
