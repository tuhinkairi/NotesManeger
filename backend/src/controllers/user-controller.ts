import { NextFunction, Request, Response } from "express";
import { db } from "..";
import { signToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { hashPassword } from "../utils/hashing";

// fetch user
export async function getUserController(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.user as JwtPayload;
    if (userId) {
        const user = await db.getUser({ userId: userId as string });
        res.json({ message: "success", data: user });
    } else {
        return next(new Error(`no user found with id: ${userId}`));
    }
}

// create user
export async function createUserController(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    if (!email || !name) {
        return next(new AppError("email and name are required", 400));
    }

    if (!password) {
        return next(new AppError("password is required", 400));
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.createUser({
        email,
        name,
        password:hashedPassword
    });

    if (!user) {
        return next(new AppError("failed to create user", 500));
    }

    const token = signToken({
        userId: user.id,
        email: user.email
    });

    return res.status(201).json({
        message: "user created successfully",
        token,
        data: user
    })
}