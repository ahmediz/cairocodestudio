import { Router, Request, Response } from 'express';
import multer from 'multer';
import { uploadImageToNeon } from '../lib/storage';

export const uploadRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB max file size
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});

uploadRouter.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No image file provided' });
        return;
      }

      const folder = (req.query.folder as string) || 'uploads';

      const result = await uploadImageToNeon({
        fileBuffer: req.file.buffer,
        folder,
        originalName: req.file.originalname,
      });

      res.status(200).json({
        success: true,
        url: result.url,
        key: result.key,
        format: 'avif',
        originalName: req.file.originalname,
        size: req.file.size,
      });
    } catch (error: any) {
      console.error('Image optimization/upload error:', error);
      res.status(500).json({
        error: error.message || 'Failed to optimize and upload image',
      });
    }
  }
);
