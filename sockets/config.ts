import type { RedisClientOptions } from "redis";
import "dotenv/config"

export const RedisConfig = {
    password: process.env.PASSWORD,
    socket: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT!)
    }
}

export const RedisChannels = {
    Notes:"notes"
}