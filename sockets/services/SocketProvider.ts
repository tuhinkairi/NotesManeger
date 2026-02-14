import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { connectedUsers } from "../lib/ServerControler.js";
export class IoProvider {
    private _io: Server;

    constructor(httpServer: HttpServer) {
        this._io = new Server(httpServer, {
            cors: {
                origin: "*",
            },
        });
    }

    async reciveClient(socket:Socket, func: (message:string)=>void) {
        socket.on("server:message", (message) => {
            // Client → Server:
            console.log("Client → Server:", message);
            const payload = typeof message==="object"?message:JSON.parse(message)
            func(payload?.message)
        })
    }
    async sendClient(socket:Socket, message:string) {
        console.log("Server -> Client:", message); 
        socket.to(connectedUsers).emit("client:message", {message:message})
    }


    get io() {
        return this._io;
    }
}
