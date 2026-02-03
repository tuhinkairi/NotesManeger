import { Router } from "express";
import DatabaseManager from "../utils/DB";

export function routes() {
    const router = Router()
    const db = new DatabaseManager();
    // health check
    router.get("/health", (req, res) => {
        res.send(200).json({ status: "OK" });
    });

    // User Level
    router.get("/get-user", async (req, res) => {
        if (req.body.userId) {
            const user = await db.getUser({ userId: req.body.userId });
            res.json({ message: "success", data: user });
        } else {
            throw new Error("userId is required");
        }
    });


}