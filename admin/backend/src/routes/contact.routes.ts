import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { contactSubmissionSchema } from '../schemas/inquiry.schema';
import { sendInquiryNotification } from '../lib/email';

export const contactRouter = Router();

// POST /api/contact
contactRouter.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = contactSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, email, phone, subject, message, type } = parsed.data;

    // 1. Save submission to Inquiries table
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        type,
        status: 'pending',
      },
    });

    // 2. Dispatch email notification in background
    sendInquiryNotification({
      name,
      email,
      phone,
      subject,
      message,
      type,
    }).catch((err) => {
      console.error('Failed to send notification email:', err);
    });

    res.status(200).json({
      success: true,
      message: 'Your inquiry has been received. Thank you for reaching out!',
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process inquiry. Please try again later.',
    });
  }
});
