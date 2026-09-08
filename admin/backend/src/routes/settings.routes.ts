import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth, AuthRequest } from '../middleware/auth.middleware';
import { updateSettingsSchema } from '../schemas/settings.schema';
import { triggerRevalidation } from '../utils/revalidate';

export const settingsRouter = Router();

// GET /api/settings - Public: Fetch site settings (singleton)
settingsRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          email: 'hello@cairocodestudio.com',
          phone: '+201000 60 9719',
          address: 'Nasr City, Cairo, Egypt',
          workingHours: 'Sun - Thu: 9:00 AM - 6:00 PM',
          facebook: 'https://www.facebook.com/cairocodestudio',
          instagram: 'https://www.instagram.com/cairocodestudio',
          linkedin: 'https://www.linkedin.com/company/cairo-code-studio/',
        },
      });
    }

    res.status(200).json(settings);
  } catch (error: any) {
    console.error('Failed to get settings:', error);
    res.status(500).json({ error: 'Failed to retrieve site settings' });
  }
});

// PUT /api/settings - Protected: Update site settings
settingsRouter.put(
  '/',
  requireAuth,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const parsed = updateSettingsSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          error: 'Validation failed',
          errors: parsed.error.flatten().fieldErrors,
        });
        return;
      }

      const existing = await prisma.siteSettings.findFirst();

      let updated;
      if (existing) {
        updated = await prisma.siteSettings.update({
          where: { id: existing.id },
          data: parsed.data,
        });
      } else {
        updated = await prisma.siteSettings.create({
          data: parsed.data,
        });
      }

      await triggerRevalidation(['settings'], ['/', '/contact', '/portfolio', '/about', '/services']);

      res.status(200).json(updated);
    } catch (error: any) {
      console.error('Failed to update settings:', error);
      res.status(500).json({ error: 'Failed to update site settings' });
    }
  }
);

