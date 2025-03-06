import { User } from "../models/user.model.js";
import { AuthUtils } from "../utils/auth.utils.js";

export class AuthMiddleware {
  static async isAutorized(req, res, next) {
    try {
      const token = AuthUtils.getBearerToken(req);

      if (!token) {
        throw new Error("Token not found");
      }

      const decoded = AuthUtils.decodeData(token);

      if (!decoded) {
        throw new Error("Invalid token");
      }

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        throw new Error("User not found");
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}
