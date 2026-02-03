import { NextFunction, Request, Response } from "express";
import { db } from "..";
import { AppError } from "../utils/appError";
import { comparePassword } from "../utils/hashing";
import { signToken } from "../utils/jwt";

export async function loginController(req: Request, res: Response, next:NextFunction) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return next(new AppError("email and password are required", 400));
    }

    const user = await db.getUser(email);
    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = signToken({
      userId: user.id,
      email: user.email
    });

    res.json({
      message: "login successful",
      token
    });
  } catch (err) {
    next(err);
  }
}
