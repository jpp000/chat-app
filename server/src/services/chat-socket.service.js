import { userManager } from "../config/socket-user-manager.js";

export class ChatSocketService {
  constructor() {
    this.io = global.socketInstance;
    this.userManager = userManager;
  }

  notify({ event, data, userId }) {
    if (!event) {
      console.log("No event specified");
      return;
    }

    const socketId = this.userManager.getReceiverSocketId(userId);

    if (!socketId) {
      console.log(`Receiver not found for userId: ${userId}`);
      return;
    }

    this.io.to(socketId).emit(event, data);
  }
}
