import { signUpSchema, loginSchema } from "../schemas/auth.schema.js";

export class AuthValidation {
  static async signUpValidation(req, res, next) {
    try {
      await signUpSchema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async loginValidation(req, res, next) {
    try {
      await loginSchema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
