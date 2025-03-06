import { Server } from "socket.io";
import { User } from "../models/user.model.js";
import { AuthUtils } from "../utils/auth.utils.js";
import { userManager } from "../config/socket-user-manager.js";

export class SocketService {
  init(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });
    this.userManager = userManager;
  }

  async middleware(socket, next) {
    try {
      const { query } = socket.handshake;

      if (!query.token) {
        throw new Error("token is required");
      }

      const decoded = AuthUtils.decodeData(query.token);

      const user = await User.findOne({ _id: decoded.userId });

      if (!user) {
        throw new Error("User not found");
      }

      socket.user = user.toJSON();
      socket.socketId = socket.id;

      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  }

  setup() {
    this.io.use(this.middleware).on("connection", (socket) => {
      console.log(`Socket connected: ${socket.socketId}`);

      const userId = socket.user._id;

      this.userManager.connectUser(userId, socket.socketId);

      this.io.emit("users:online", this.userManager.getConnectedUsers());

      socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);

        this.userManager.disconnectUser(userId);

        this.io.emit("users:online", this.userManager.getConnectedUsers());
      });
    });

    return this.io;
  }
}
