import { MessagesService } from "../services/messages.service.js";

export class MessagesController {
  constructor() {
    this.messagesService = new MessagesService();
    this.getChatMessages = this.getChatMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  async getChatMessages(req, res) {
    try {
      const { id: recipientId } = req.params;
      const loggedUserId = req.user._id;

      const messages = await this.messagesService.getChatMessages({
        loggedUserId,
        recipientId,
      });

      return res.json({ messages });
    } catch (error) {}
  }

  async sendMessage(req, res) {
    try {
      const { id: recipientId } = req.params;
      const loggedUserId = req.user._id.toHexString();
      const { messageData } = req.body;

      const message = await this.messagesService.sendMessage({
        messageData,
        loggedUserId,
        recipientId,
      });

      return res.status(201).send({ message });
    } catch (error) {}
  }
}
