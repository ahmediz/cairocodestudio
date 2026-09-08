import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { createTestimonialSchema, updateTestimonialSchema } from '../schemas/testimonial.schema';
import { triggerRevalidation } from '../utils/revalidate';

export const testimonialRouter = Router();

// GET all testimonials (optional filter isActive)
testimonialRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { activeOnly } = req.query;
    const where = activeOnly === 'true' ? { isActive: true } : {};
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(testimonials);
  } catch (error) {
    console.error('Failed to get testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// GET single testimonial
testimonialRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: req.params.id },
    });
    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    res.json(testimonial);
  } catch (error) {
    console.error('Failed to get testimonial:', error);
    res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
});

// CREATE testimonial
testimonialRouter.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = createTestimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }
    const testimonial = await prisma.testimonial.create({
      data: parsed.data,
    });
    await triggerRevalidation(['testimonials'], '/');
    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// UPDATE testimonial
testimonialRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const parsed = updateTestimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
      return;
    }
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: parsed.data,
    });
    await triggerRevalidation(['testimonials'], '/');
    res.json(testimonial);
  } catch (error) {
    console.error('Failed to update testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// DELETE testimonial
testimonialRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.testimonial.delete({
      where: { id: req.params.id },
    });
    await triggerRevalidation(['testimonials'], '/');
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

