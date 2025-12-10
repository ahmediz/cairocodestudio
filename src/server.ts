import 'dotenv/config';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware to parse JSON bodies
app.use(express.json());

// OAuth 2.0 setup for Gmail (lazy loaded to avoid memory issues)
async function getAccessToken(): Promise<string> {
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    process.env['GMAIL_CLIENT_ID'],
    process.env['GMAIL_CLIENT_SECRET'],
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env['GMAIL_REFRESH_TOKEN'],
  });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();

    if (!credentials.access_token) {
      throw new Error('Failed to obtain access token');
    }
    return credentials.access_token;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function sendEmail(formData: {
  name: string;
  subject: string;
  email: string;
  phone: string;
  message: string;
}) {
  const accessToken = await getAccessToken();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env['GMAIL_USER'],
      clientId: process.env['GMAIL_CLIENT_ID'],
      clientSecret: process.env['GMAIL_CLIENT_SECRET'],
      refreshToken: process.env['GMAIL_REFRESH_TOKEN'],
      accessToken: accessToken,
    },
  });

  const recipientEmail = process.env['CONTACT_EMAIL'] || 'hello@cairocodestudio.com';

  const mailOptions = {
    from: process.env['GMAIL_USER'],
    to: recipientEmail,
    subject: `Contact Form Submission: ${formData.subject}`,
    text: `New contact form submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Subject:</strong> ${formData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

/**
 * API endpoint for contact form submissions
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, subject, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !subject || !email || !phone || !message) {
      res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
      return;
    }

    // Send email
    await sendEmail({ name, subject, email, phone, message });

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
    });
  }
});

app.get('/robots.txt', (req, res) => {
  res.sendFile('robots.txt', { root: 'public' });
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
