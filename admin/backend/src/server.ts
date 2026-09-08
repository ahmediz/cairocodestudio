import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";
import { testimonialRouter } from "./routes/testimonial.routes";
import { projectRouter } from "./routes/project.routes";
import { clientRouter } from "./routes/client.routes";
import { inquiryRouter } from "./routes/inquiry.routes";
import { contactRouter } from "./routes/contact.routes";
import { uploadRouter } from "./routes/upload.routes";
import { authRouter } from "./routes/auth.routes";
import { settingsRouter } from "./routes/settings.routes";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res
      .status(500)
      .json({
        status: "error",
        database: "disconnected",
        error: error?.message || "Database error",
      });
  }
});

// API Routes
app.use("/api/testimonials", testimonialRouter);
app.use("/api/projects", projectRouter);
app.use("/api/clients", clientRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/contact", contactRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/auth", authRouter);
app.use("/api/settings", settingsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Unhandled server error:", err);
    res.status(500).json({ error: "Internal server error" });
  },
);

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(
      `Cairo Code Studio Backend running at http://localhost:${port}`,
    );
  });
}

export default app;
