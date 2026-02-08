import http from "http";
import { IoProvider } from "./services/SocketProvider.js";

const httpServer = http.createServer();
const SocketIo = new IoProvider(httpServer)

// set the socket server
SocketIo.listener()

httpServer.listen(4000, () => {
  console.log("Realtime server running on https://localhost:4000");
});