import { Router } from "express";
import { createUserController, deleteUserController, getUserController, updateUserController } from "../controllers/user-controller";
import { requireAuth } from "../middleware/auth.middleware";
import { createPostController, deletePostController, getPostsController, updatePostController } from "../controllers/post-controller";

export function routes() {
    const router = Router()

    // health check
    router.get("/health", (req, res) => {
        res.json({ status: "OK" });
    });

    // User Level
    router.get("/get-user", requireAuth, getUserController);
    router.post("/create-user", createUserController);
    router.put("/update-user",requireAuth, updateUserController);
    router.delete("/delete-user", requireAuth, deleteUserController);

    // Post Level
    router.use("/get-posts", requireAuth, getPostsController);
    router.use("/create-posts", requireAuth, createPostController);
    router.use("/update-posts/:postId", requireAuth, updatePostController); 
    router.use("/delete-posts/:postId", requireAuth, deletePostController);

    return router;
}