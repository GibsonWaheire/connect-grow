/**
 * Email Service Utility
 * Handles sending emails using EmailJS or fallback to mailto
 */

interface EmailData {
  to_email: string;
  to_name: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  [key: string]: string; // Allow additional fields
}

/**
 * Send email using EmailJS or fallback to mailto
 */
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  // Check if EmailJS is available and configured
  if (typeof window !== 'undefined' && (window as any).emailjs) {
    try {
      // EmailJS configuration
      const serviceId = 'service_mcgibs'; // User needs to replace with their EmailJS service ID
      const templateId = 'template_quote_request'; // User needs to replace with their EmailJS template ID
      const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // User needs to replace with their EmailJS public key

      // Initialize EmailJS if not already done
      if (!(window as any).emailjs.init) {
        (window as any).emailjs.init(publicKey);
      }

      // Send email via EmailJS
      const response = await (window as any).emailjs.send(serviceId, templateId, data);
      
      if (response.status === 200) {
        console.log('Email sent successfully via EmailJS');
        return true;
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      // Fall through to mailto fallback
    }
  }

  // Fallback to mailto
  try {
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(data.message);
    const mailtoLink = `mailto:${data.to_email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    return true;
  } catch (error) {
    console.error('Mailto error:', error);
    return false;
  }
};

/**
 * Alternative: Use FormSpree or similar service
 * This is a simpler option that doesn't require EmailJS setup
 * 
 * To use FormSpree:
 * 1. Go to https://formspree.io and create a free account
 * 2. Create a new form
 * 3. Set the recipient email to pwriter455@gmail.com
 * 4. Get your form ID (e.g., "xrgpqwky")
 * 5. Replace 'YOUR_FORMSPREE_ID' below with your form ID
 * 6. Uncomment the FormSpree code and comment out the mailto fallback
 */
export const sendEmailViaFormSpree = async (data: EmailData): Promise<boolean> => {
  // For now, use mailto as primary method (works without setup)
  // Uncomment below and replace YOUR_FORMSPREE_ID to enable actual email sending
  
  /*
  try {
    const formspreeId = 'YOUR_FORMSPREE_ID'; // Replace with actual FormSpree form ID
    
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: data.from_email,
        name: data.from_name,
        subject: data.subject,
        message: data.message,
        phone: data.phone || '',
        company: data.company || '',
        project_type: data.project_type || '',
        budget: data.budget || '',
        timeline: data.timeline || '',
        _to: data.to_email, // This will send to pwriter455@gmail.com
      }),
    });

    if (response.ok) {
      console.log('Email sent successfully via FormSpree');
      return true;
    } else {
      throw new Error('FormSpree request failed');
    }
  } catch (error) {
    console.error('FormSpree error:', error);
    // Fallback to mailto
  }
  */
  
  // Primary method: Use mailto (always works, opens user's email client)
  try {
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(data.message);
    const mailtoLink = `mailto:${data.to_email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    return true;
  } catch (error) {
    console.error('Mailto error:', error);
    return false;
  }
};

