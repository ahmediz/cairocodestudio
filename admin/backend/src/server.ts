import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { testimonialRouter } from './routes/testimonial.routes.js';
import { projectRouter } from './routes/project.routes.js';
import { clientRouter } from './routes/client.routes.js';
import { inquiryRouter } from './routes/inquiry.routes.js';
import { contactRouter } from './routes/contact.routes.js';
import { uploadRouter } from './routes/upload.routes.js';

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/testimonials', testimonialRouter);
app.use('/api/projects', projectRouter);
app.use('/api/clients', clientRouter);
app.use('/api/inquiries', inquiryRouter);
app.use('/api/contact', contactRouter);
app.use('/api/upload', uploadRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Cairo Code Studio Backend running at http://localhost:${port}`);
  });
}

export default app;
