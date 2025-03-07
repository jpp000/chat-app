import { SOCKET_EVENTS } from "../../../common/constants/events.js";
import { cloudinary } from "../config/cloudinary.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ChatSocketService } from "./chat-socket.service.js";

export class MessagesService {
  constructor() {
    this.chatSocketService = new ChatSocketService();
  }

  async getChatMessages({ loggedUserId, recipientId }) {
    return await Message.find({
      $or: [
        { senderId: loggedUserId, receiverId: recipientId },
        { senderId: recipientId, receiverId: loggedUserId },
      ],
    });
  }

  async sendMessage({ messageData, loggedUserId, recipientId }) {
    const receiver = await User.findOne({ _id: recipientId });

    if (!receiver) {
      throw new Error("Recipient not found");
    }

    let image = null;

    if (messageData.image) {
      const uploadedImage = await cloudinary.uploader.upload(messageData.image);
      image = uploadedImage.secure_url;
    }

    const newMessage = new Message({
      senderId: loggedUserId,
      receiverId: recipientId,
      text: messageData.text,
      image: messageData.image,
    });

    await newMessage.save();

    this.chatSocketService.notify({
      event: SOCKET_EVENTS.MESSAGE_CREATE,
      data: newMessage.toJSON(),
      userId: recipientId,
    });

    return newMessage.toJSON();
  }

  async deleteMessage({ messageId, userId }) {
    console.log(messageId, userId);

    const message = await Message.findOneAndDelete({
      _id: messageId,
      senderId: userId,
    });

    console.log("message", message);

    if (!message) {
      throw new Error("Message not found");
    }

    this.chatSocketService.notify({
      event: SOCKET_EVENTS.MESSAGE_DELETED,
      data: message._id.toHexString(),
      userId: message.receiverId.toHexString(),
    });

    return message;
  }
}
