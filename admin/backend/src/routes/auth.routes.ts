import bcrypt from "bcryptjs";
import "dotenv/config";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { AuthRequest, requireAuth } from "../middleware/auth.middleware";
import { loginSchema } from "../schemas/auth.schema";

export const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET!;

// POST /api/auth/login
authRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
        return;
      }

      const { email, password } = parsed.data;

      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ error: "Internal server error during authentication" });
    }
  },
);

// GET /api/auth/me
authRouter.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
});
