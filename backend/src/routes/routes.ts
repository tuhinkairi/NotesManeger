import { Router } from "express";
import DatabaseManager from "../lib/DB";

export function routes() {
    const router = Router()
    const db = new DatabaseManager();
    // health check
    router.get("/health", (req, res) => {
        res.json({ status: "OK" });
    });

    // User Level
    router.get("/get-user", async (req, res, next) => {
        if (req.body?.userId) {
            const user = await db.getUser({ userId: req.body.userId });
            res.json({ message: "success", data: user });
        } else {
            return next(new Error("userId is required"));
        }
    });

    return router;
}