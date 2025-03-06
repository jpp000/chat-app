import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { MessagesController } from "../controllers/messages.controller.js";

export class MessagesRoutes {
  constructor() {
    this.router = Router();
    this.messagesController = new MessagesController();
  }

  setup() {
    this.router.get(
      "/:id",
      AuthMiddleware.isAutorized,
      this.messagesController.getChatMessages
    );
    this.router.post(
      "/send/:id",
      AuthMiddleware.isAutorized,
      this.messagesController.sendMessage
    );

    return this.router;
  }
}
