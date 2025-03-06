import { User } from "../models/user.model.js";
import * as bcrypt from "bcryptjs";
import { AuthUtils } from "../utils/auth.utils.js";

export class AuthService {
  async signUp({ fullName, email, password, res }) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ fullName, email, password: hashedPassword });

    if (!user) {
      throw new Error("Error creating user");
    }

    await user.save();

    const token = AuthUtils.generateToken({ userId: user._id });

    if (!token) {
      throw new Error("Error generating token");
    }

    this.setTokenCookie({ res, token });

    return {
      user: user.toJSON(),
      token,
    };
  }

  async login({ email, password, res }) {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("Invalid email");
    }

    const passwordMatches = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatches) {
      throw new Error("Invalid password");
    }

    const token = AuthUtils.generateToken({ userId: existingUser._id });

    if (!token) {
      throw new Error("Error generating token");
    }

    this.setTokenCookie({ res, token });

    return { user: existingUser.toJSON(), token };
  }

  async logout({ res }) {
    return res.cookie("token", "", {
      expiresIn: new Date(),
      httpOnly: true,
      sameSite: "strict",
    });
  }

  setTokenCookie({ res, token }) {
    const expiresIn = 1000 * 60 * 60 * 24 * 7;

    res.cookie("token", token, {
      expiresIn: new Date(Date.now() + expiresIn),
      httpOnly: false,
      sameSite: "strict",
    });
  }
}
