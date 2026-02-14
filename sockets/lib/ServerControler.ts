import { RedisChannels } from "../config.js"
import { httpServer } from "../index.js"
import { RedisProvider } from "../services/RedisProvider.js"
import { IoProvider } from "../services/SocketProvider.js"
export const connectedUsers:string[] = []
export function ServerController() {
    const SocketIo = new IoProvider(httpServer)
    const redisSub = new RedisProvider()
    const redisPub = new RedisProvider()
    redisSub.client.connect().then((res)=>{
        console.log(res)
    }).catch(err=>console.log(err))
    
    redisPub.client.connect().then((res)=>{
        console.log(res)
    }).catch(err=>console.log(err))
   

    SocketIo.io.on("connection", (socket) => {
        connectedUsers.push(socket.id)
        console.log("User connected:", socket.id);

        redisSub.subscribeContent({
            channel: RedisChannels.Notes,
            func(message) {
                console.log("sub",message)
                SocketIo.sendClient(socket, message)
            },
        })
        SocketIo.reciveClient(socket, (message) => {
            const payload = { channel: RedisChannels.Notes, value: message }
            console.log(payload)
            redisPub.publishContent(payload)
        })

        socket.on("disconnect", () => {
            const idx = connectedUsers.indexOf(socket.id)
            if (idx !== -1) connectedUsers.splice(idx, 1)
        })

    });

}
