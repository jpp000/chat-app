import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async signUp(req, res) {
    try {
      const { fullName, email, password } = req.body;

      const userCreated = await this.authService.signUp({
        fullName,
        email,
        password,
        res,
      });

      res.status(201).json({
        user: {
          _id: userCreated._id,
          email: userCreated.email,
          fullName: userCreated.fullName,
          profilePicture: userCreated.profilePicture,
        },
        token: userCreated.token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const response = await this.authService.login({ email, password, res });

      res.json({
        user: {
          _id: response.user._id,
          email: response.user.email,
          fullName: response.user.fullName,
          profilePicture: response.user.profilePicture,
        },
        token: response.token,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async logout(req, res) {
    try {
      await this.authService.logout({ res });

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async check(req, res) {
    try {
      return res.json({ user: req.user });
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Error in auth check", message: error.message });
    }
  }
}
