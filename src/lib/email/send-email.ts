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
    // EmailJS credentials from environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const recipientEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ilchukcorporation@gmail.com';

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS credentials not configured. Please set environment variables.');
      return false;
    }

    // Send email using EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: recipientEmail,
        from_name: name,
        from_email: email,
        message: message,
        reply_to: email,
        subject: `Contact Us: ${name}`,
      },
      publicKey,
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
