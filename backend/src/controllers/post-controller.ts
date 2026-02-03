import { JwtPayload } from "jsonwebtoken";
import { db } from "..";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { FilterPosts } from "../types/types";

export async function getPostsController(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.user as JwtPayload;
    const { orderby, search } = req.query.filter as { orderby?: FilterPosts; search?: string };
    if (userId) {
        const posts = await db.getPosts({
            orderby,
            search: search?.toString(),
            userId
        });
        res.json({ message: "success", data: posts });
    }
    else {
        return next(new AppError(`no posts found`));
    }
}

export async function createPostController(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.user as JwtPayload;
    const { title, content } = req.body;
    if (userId) {
        const post = await db.createPosts({
            data: {
                title,
                content,
                userId: userId as string
            }
        });
        res.status(201).json({ message: "post created successfully", data: post });
    } else {
        return next(new AppError(`no user found with id: ${userId}`));
    }
}

export async function updatePostController(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.user as JwtPayload;
    const { postId } = req.params;
    const { title, content } = req.body;
    if (userId) {
        const post = await db.updatePost({
            postId: postId as string,
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
    const { id: userId } = req.user as JwtPayload;
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




