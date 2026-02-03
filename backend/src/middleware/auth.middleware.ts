import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const requireAuth = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
};
