import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Invalid request data",
          details: error.errors.map((err) => err.message),
        });
      } else {
        console.error("Error parsing request data:", error);
        res.status(500).send("Internal server error");
      }
    }
  };
};
