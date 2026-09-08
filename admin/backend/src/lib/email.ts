import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export interface EmailPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type?: string;
}

export async function sendInquiryNotification(data: EmailPayload) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_PASSWORD;
  const recipientEmail = process.env.CONTACT_EMAIL || 'hello@cairocodestudio.com';

  if (!gmailUser || !gmailPassword) {
    console.warn('Gmail credentials not configured. Skipping email dispatch.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });

  const mailOptions = {
    from: gmailUser,
    to: recipientEmail,
    subject: `[Cairo Code Studio] New ${data.type === 'lets_talk' ? "Let's Talk" : 'Contact'} Inquiry: ${data.subject}`,
    text: `New submission received:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
Type: ${data.type || 'contact'}

Message:
${data.message}`,
    html: `
      <h2>New Submission: ${data.type === 'lets_talk' ? "Let's Talk" : 'Contact Form'}</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Type:</strong> ${data.type || 'contact'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f4f4f4; padding: 12px; border-left: 4px solid #E80863;">
        ${data.message.replace(/\n/g, '<br>')}
      </blockquote>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email notification:', error);
    // Do not throw so the database insertion is not aborted
    return null;
  }
}
