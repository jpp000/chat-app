import { Router } from "express";
import { AuthValidation } from "../middlewares/auth.validation.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export class AuthRoutes {
  constructor() {
    this.router = Router();
    this.authController = new AuthController();
  }

  setup() {
    this.router.post(
      "/signup",
      AuthValidation.signUpValidation,
      this.authController.signUp
    );

    this.router.post(
      "/login",
      AuthValidation.loginValidation,
      this.authController.login
    );

    this.router.post("/logout", this.authController.logout);

    this.router.get("/check", AuthMiddleware.isAutorized, this.authController.check);

    return this.router;
  }
}
