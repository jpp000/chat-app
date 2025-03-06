import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Routes } from "./routes/index.js";
import { MongoDatabase } from "./config/database.js";
import { env } from "./config/config.js";
import { SocketService } from "./services/socket.service.js";

export class App {
  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.socketService = new SocketService();
    this.mongodb = new MongoDatabase();
  }

  async setup() {
    await this.mongodb.connect();

    this.socketService.init(this.httpServer);
    global.socketInstance = this.socketService.setup()

    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

    const router = new Routes();

    this.app.use("/api", router.setup());
  }

  start() {
    this.setup();

    this.httpServer.listen(env.PORT, async () => {
      console.log("Server is running on 3000");
    });
  }
}
