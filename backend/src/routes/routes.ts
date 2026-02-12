import { Request, Response, Router } from "express";
import { createUserController, deleteUserController, getUserController, updateUserController } from "../controllers/user-controller";
import { requireAuth } from "../middleware/auth.middleware";
import { createPostController, deletePostController, getPostsController, updatePostController } from "../controllers/post-controller";
import { noteCreateRateLimiter } from "../middleware/limiter.middleware";

export function routes() {
    const router = Router()
    const middlewares = {
        auth: requireAuth,
        limit: noteCreateRateLimiter
    }
    // health check
    router.get("/health", (req: Request, res: Response) => {
        res.json({ status: "OK" });
    });

    // User Level
    router.get("/get-user", middlewares.auth, getUserController);
    router.post("/create-user", createUserController);
    router.put("/update-user", middlewares.auth, updateUserController);
    router.delete("/delete-user", middlewares.auth, deleteUserController);

    // Post Level
    router.get("/get-posts", middlewares.auth, getPostsController);
    router.post("/create-posts", middlewares.limit, middlewares.auth, createPostController);
    router.put("/update-posts/:postId", middlewares.auth, updatePostController);
    router.delete("/delete-posts/:postId", middlewares.auth, deletePostController);

    // socket
    router.use("/realtime", (req, res, next) => {
        console.log("Hit realtime");
        next();
    });

    return router;
}