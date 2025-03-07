export class ChatSocketService {
  constructor() {
    this.io = global.socketInstance;
  }

  notify({ event, data, userId }) {
    if (!event) {
      console.log("No event specified");
      return;
    }

    if (!this.io) {
      this.io = global.socketInstance;
    }

    this.io.to(userId).emit(event, data);
  }
}
