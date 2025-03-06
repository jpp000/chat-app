import { Router } from "express";
import { AuthRoutes } from "./auth.routes.js";
import { UsersRoutes } from "./users.routes.js";
import { MessagesRoutes } from "./messages.routes.js";

export class Routes {
  constructor() {
    this.router = Router();

    this.authRoutes = new AuthRoutes();
    this.usersRoutes = new UsersRoutes();
    this.messagesRoutes = new MessagesRoutes();
  }

  setup() {
    this.router.use("/auth", this.authRoutes.setup());
    this.router.use("/users", this.usersRoutes.setup());
    this.router.use("/messages", this.messagesRoutes.setup());

    return this.router;
  }
}
