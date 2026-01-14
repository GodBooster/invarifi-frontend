import emailjs from '@emailjs/browser';

export interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async ({
  name,
  email,
  message,
}: SendEmailParams): Promise<boolean> => {
  try {
    // EmailJS configuration from environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // If EmailJS is not configured, fallback to mailto
    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS not configured, falling back to mailto');
      return false;
    }

    // Send email using EmailJS
    // Template parameters should match your EmailJS template
    const templateParams = {
      to_email: 'ilchukcorporation@gmail.com',
      from_name: name,
      from_email: email,
      message: message,
      reply_to: email,
      subject: `Contact Us: ${name}`,
    };

    await emailjs.send(serviceId, templateId, templateParams, {
      publicKey: publicKey,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
