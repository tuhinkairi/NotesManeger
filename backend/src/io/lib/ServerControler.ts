import { httpServer } from "../.."
import { RedisChannels } from "../config"
import { RedisProvider } from "../services/RedisProvider"
import { IoProvider } from "../services/SocketProvider"

export function ServerController() {
    const socketProvider = new IoProvider(httpServer)
    const redisSub = new RedisProvider()
    const redisPub = new RedisProvider()

    async function init() {
        await Promise.all([
            redisSub.client.connect(),
            redisPub.client.connect(),
        ])

        console.log("Redis connected")

        // ✅ Subscribe once globally
        redisSub.subscribeContent({
            channel: RedisChannels.Notes,
            func(message) {
                const parsed = typeof message === "string"
                    ? JSON.parse(message)
                    : message

                const { noteId, value } = parsed

                console.log("Redis broadcast for note:", noteId)

                // 🎯 Emit only to that note room
                socketProvider.io
                    .to(noteId)
                    .emit("notes:update", value)
            },
        })

        registerSocketEvents()
    }

    function registerSocketEvents() {
        socketProvider.io.on("connection", (socket) => {
            console.log("User connected:", socket.id)

            // ✅ Client joins a specific note room
            socket.on("join:note", (noteId: string) => {
                socket.join(noteId)
                console.log(`Socket ${socket.id} joined note ${noteId}`)
            })

            socket.on("leave:note", (noteId: string) => {
                socket.leave(noteId)
                console.log(`Socket ${socket.id} left note ${noteId}`)
            })

            socketProvider.reciveClient(socket, (message) => {
                const { noteId, content } = message

                const payload = {
                    channel: RedisChannels.Notes,
                    value: JSON.stringify({
                        noteId,
                        value: content,
                    }),
                }

                redisPub.publishContent(payload)
            })

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id)
            })
        })
    }

    init()
}
