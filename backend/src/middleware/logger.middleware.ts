import { Request, Response, NextFunction } from "express";

export const endpointHitLoggerHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(`[ENDPOINT HIT] ${req.method} ${req.originalUrl}`);
  next();
};