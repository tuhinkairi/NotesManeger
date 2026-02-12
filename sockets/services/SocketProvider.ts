import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

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
            const payload = JSON.parse(message)
            console.log("Client → Server:", message);
            func(payload?.message)
        })
    }
    async sendClient(socket:Socket, message:string) {
        console.log("Server -> Client:", message); 
        socket.emit("client:message", {message:message})
    }


    get io() {
        return this._io;
    }
}
