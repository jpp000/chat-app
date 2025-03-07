import { Server } from "socket.io";
import { User } from "../models/user.model.js";
import { AuthUtils } from "../utils/auth.utils.js";
import { userManager } from "../config/socket-user-manager.js";
import { SOCKET_EVENTS } from "../../../common/constants/events.js";
import { MessagesService } from "./messages.service.js";

export class SocketService {
  init(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });
    this.userManager = userManager;
    this.messageService = new MessagesService()
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

      socket.join(user._id.toString());

      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  }

  setup() {
    this.io.use(this.middleware).on(SOCKET_EVENTS.CONNECTION, (socket) => {
      const userId = socket.user._id;

      this.userManager.connectUser(userId, socket.socketId);

      this.io.emit(SOCKET_EVENTS.ONLINE_USERS, this.userManager.getConnectedUsers());

      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        this.userManager.disconnectUser(userId);

        this.io.emit(SOCKET_EVENTS.ONLINE_USERS, this.userManager.getConnectedUsers());
      });

      socket.on(SOCKET_EVENTS.MESSAGE_DELETE, async (messageId) => {
        await this.messageService.deleteMessage({ messageId, userId });
      })
    });

    return this.io;
  }
}
