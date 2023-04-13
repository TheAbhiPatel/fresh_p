import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res
          .status(422)
          .json({ success: false, message: error.errors[0].message });
      }
      next(error);
    }
  };

export default validate;
