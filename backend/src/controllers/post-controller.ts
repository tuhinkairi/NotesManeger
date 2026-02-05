import { JwtPayload } from "jsonwebtoken";
import { db } from "..";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { FilterPosts } from "../types/types";

export async function getPostsController(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.user as JwtPayload;

        if (!userId) {
            return next(new AppError("User not authenticated", 401));
        }
        
        const filter = req.query.filter as string | undefined;
        const search = req.query.search as string | undefined;

        const orderby: FilterPosts | undefined = filter ? { filter } as FilterPosts : undefined;

        const posts = await db.getPosts({
            orderby,
            search,
            userId
        });

        return res.json({
            message: "success", count: posts.length, data: posts
        });
    } catch (error) {
        return next(error);
    }
}
export async function createPostController(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.user as JwtPayload;
    const { title, content } = req.body;
    if (userId) {
        const post = await db.createPosts({
            data: {
                title,
                content,
               userId
            }
        });
        res.status(201).json({ message: "post created successfully", data: post });
    } else {
        return next(new AppError(`no user found with id: ${userId}`));
    }
}

export async function updatePostController(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.user as JwtPayload;
    const { postId } = req.params;
    const { title, content } = req.body;
    if (userId) {
        const post = await db.updatePost({
            postId: postId as string,
            userId,
            data: {
                title,
                content
            }
        });
        res.json({ message: "post updated successfully", data: post });
    }
    else {
        return next(new AppError(`no user found with id: ${userId}`));
    }
}

export async function deletePostController(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.user as JwtPayload;
    const { postId } = req.params;
    if (userId) {
        const post = await db.deletePost({
            postId: postId as string,
        });
        res.json({ message: "post deleted successfully", data: post });
    }
    else {
        return next(new AppError(`no user found with id: ${userId}`));
    }
}




