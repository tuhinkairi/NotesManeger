import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";



export class IoProvider {
    private _io;

    constructor(httpServer: HttpServer) {
        this._io = new Server(httpServer, {
            cors: {
                origin: "http://localhost:5173",
            },
        });
    }

    async reciveClient(socket: Socket, func: (message: { noteId: string, content: string }) => void) {
        socket.on("server:message", (message) => {
            // Client → Server:
            console.log("Client → Server:", message);
            const payload = typeof message === "object" ? message : JSON.parse(message)
            func(payload?.message)
        })
    }
    async sendClient(socket: Socket, message: string) {
        console.log("Server -> Client:", message);
        socket.emit("client:message", { message: message })
    }


    get io() {
        return this._io;
    }
}
