import http from "http";
import { IoProvider } from "./services/SocketProvider.js";
import { initializeGlobalErrorHandler } from "./utils/errorHandler.js";
import { ServerController } from "./lib/ServerControler.js";

export const httpServer = http.createServer();

// globle error hander
initializeGlobalErrorHandler()
ServerController()

httpServer.listen(4000, () => {
  console.log("Realtime server running on https://localhost:4000");
});