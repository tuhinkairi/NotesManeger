import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(`ERROR: ${err}`);
  res.status(500).json({
    message: `Internal server error - ${err.message}` 
  });
};
