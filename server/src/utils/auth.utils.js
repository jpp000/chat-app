import { env } from "../config/config.js";
import jwt from "jsonwebtoken";

export class AuthUtils {
  static decodeData(token) {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  }

  static getBearerToken(req) {
    return req.cookies.token || null;
  }

  static generateToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1d" });
  }
}
