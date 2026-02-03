import { Router } from "express";
import { createUserController, getUserController, updateUserController } from "../controllers/user-controller";

export function routes() {
    const router = Router()

    // health check
    router.get("/health", (req, res) => {
        res.json({ status: "OK" });
    });

    // User Level
    router.get("/get-user", getUserController);
    router.post("/create-user", createUserController);
    router.put("/update-user", updateUserController);

    return router;
}