class SocketUserManager {
  static _instance = null;

  constructor() {
    if (!SocketUserManager._instance) {
      this.socketUsersMap = {};
      SocketUserManager._instance = this;
    }
    return SocketUserManager._instance;
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new SocketUserManager();
    }

    return this._instance;
  }

  connectUser(userId, socketId) {
    this.socketUsersMap[userId] = socketId;
  }

  disconnectUser(userId) {
    delete this.socketUsersMap[userId];
  }

  getReceiverSocketId(userId) {
    return this.socketUsersMap[userId];
  }

  getConnectedUsers() {
    return Object.keys(this.socketUsersMap);
  }
}

export const userManager = SocketUserManager.getInstance();
