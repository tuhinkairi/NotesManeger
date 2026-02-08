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

    private reciveClient(socket:Socket) {
        socket.on("server:message", (message:{message:string}) => {
            // recive content from client
            console.log("Client → Server:", message);
        })
    }
    private sendClient(socket:Socket) {
        socket.on("client:message", (message : { message: string }) => {
            // recive content from client
            console.log("Server -> Client:", message); 
        })
    }
    private reciveRedis(socket:Socket) {
        socket.on("server:redis-message", ( message : { message: string }) => {
            // recive content from client
            console.log("redis → Server:", message);
        })
    }
    private sendRedis(socket:Socket) {
        socket.on("redis:redis-message", ( message : { message: string }) => {
            // recive content from client
            console.log("Server -> Redis:", message);
        })
    }


    public listener() {
        this._io.on("connection", (socket) => {
            console.log("User connected:", socket.id);

            this.sendClient(socket)
            this.reciveClient(socket)
            this.sendRedis(socket)
            this.reciveRedis(socket)
            
        });
    }

    get io() {
        return this._io;
    }
}
