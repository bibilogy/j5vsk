import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const grades = await prisma.grades.findMany();
      res.status(200).json({ grades });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
