import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { UsersValidation } from "../middlewares/users.validation.js";

export class UsersRoutes {
  constructor() {
    this.router = Router();
    this.usersController = new UsersController();
  }

  setup() {
    this.router.put(
      "/profile-picture",
      AuthMiddleware.isAutorized,
      UsersValidation.updateProfileValidation,
      this.usersController.updateProfile
    );
      
    this.router.get(
      "/list-contacts",
      AuthMiddleware.isAutorized,
      this.usersController.listContacts
    );

    return this.router;
  }
}
