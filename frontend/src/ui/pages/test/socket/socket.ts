import { io, Socket } from "socket.io-client";

export const socket = io("http://localhost:4000")

export default class SocketHandler {
    private socket: Socket
    constructor(socket: Socket) {
        this.socket = socket
        this.socket.on("connect", () => {
            console.log(socket.id);
            // x8WIv7-mJelg7on_ALbx 
        })
    }
    // client -> server 
    sendMsg(message: string) {
        this.socket.emit("server:message", { message: message })
    }
    reciveMsg(updateContent: (message: string) => void) {
        this.socket.on("client:message", (message) => {
            console.log("recive", message.message)
            const content = typeof message === "object" ? message : JSON.parse(message)
            updateContent(content.message)
        })
    }
}