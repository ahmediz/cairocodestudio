import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { updateInquiryStatusSchema } from '../schemas/inquiry.schema.js';

export const inquiryRouter = Router();

// GET all inquiries (optional filter: type, status)
inquiryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { type, status } = req.query;
    const where: any = {};
    if (type) where.type = String(type);
    if (status) where.status = String(status);

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(inquiries);
  } catch (error) {
    console.error('Failed to get inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// GET single inquiry
inquiryRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: req.params.id },
    });
    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    res.json(inquiry);
  } catch (error) {
    console.error('Failed to get inquiry:', error);
    res.status(500).json({ error: 'Failed to fetch inquiry' });
  }
});

// UPDATE inquiry status
inquiryRouter.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const parsed = updateInquiryStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }
    const inquiry = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: { status: parsed.data.status },
    });
    res.json(inquiry);
  } catch (error) {
    console.error('Failed to update inquiry status:', error);
    res.status(500).json({ error: 'Failed to update inquiry status' });
  }
});

// DELETE inquiry
inquiryRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.inquiry.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Failed to delete inquiry:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});
