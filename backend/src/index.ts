import express from "express";
import DatabaseManager from "./lib/DB";
import dotenv from "dotenv";
import { routes } from "./routes/routes";
import { endpointHitLoggerHandler } from "./middleware/logger.middleware";
import { notFoundHandler } from "./middleware/notfound.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { ENV } from "./config";
import cors from "cors"
import http from "http"
import { rateLimiter } from "./middleware/limiter.middleware";
import { ServerController } from "./io/lib/ServerControler";
dotenv.config();

export const app = express();
export const httpServer = http.createServer(app);
export let db: DatabaseManager;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Initialize database before starting server
async function startServer() {
    try {
        db = new DatabaseManager();
        await db.prisma.$connect();
        console.log("Database connected successfully");
        
        app.use(endpointHitLoggerHandler);
        app.use("/api", routes());
        app.use(notFoundHandler);
        app.use(errorHandler);
        ServerController()
        httpServer.listen(ENV.PORT, () => {
            console.log(`Server running on http://localhost:${ENV.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();