import { Router } from "express";
import { createUserController, deleteUserController, getUserController, updateUserController } from "../controllers/user-controller";
import { requireAuth } from "../middleware/auth.middleware";
import { createPostController, deletePostController, getPostsController, updatePostController } from "../controllers/post-controller";
import { noteCreateRateLimiter } from "../middleware/limiter.middleware";

export function routes() {
    const router = Router()
    const middlewares = {
        auth:requireAuth,
        limit: noteCreateRateLimiter
    }
    // health check
    router.get("/health", (req, res) => {
        res.json({ status: "OK" });
    });

    // User Level
    router.get("/get-user", middlewares.auth, getUserController);
    router.post("/create-user", createUserController);
    router.put("/update-user", middlewares.auth, updateUserController);
    router.delete("/delete-user", middlewares.auth, deleteUserController);

    // Post Level
    router.use("/get-posts", middlewares.auth, getPostsController);
    router.use("/create-posts", middlewares.limit, middlewares.auth, createPostController);
    router.use("/update-posts/:postId", middlewares.auth, updatePostController); 
    router.use("/delete-posts/:postId", middlewares.auth, deletePostController);

    return router;
}