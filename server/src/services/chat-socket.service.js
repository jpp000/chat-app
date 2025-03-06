export class ChatSocketService {
  constructor() {
    this.io = global.socketInstance;
  }

  notify({ event, data, userId }) {
    if (!event) {
      console.log("No event specified");
      return;
    }

    this.io.to(userId).emit(event, data);
  }
}
