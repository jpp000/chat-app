import { UsersService } from "../services/users.service.js";

export class UsersController {
  constructor() {
    this.usersService = new UsersService();
      this.updateProfile = this.updateProfile.bind(this);
        this.listContacts = this.listContacts.bind(this);
  }

  async updateProfile(req, res) {
    try {
      const { profilePicture } = req.body;
      const userId = req.user._id;

      const user = await this.usersService.updateProfile({ profilePicture, userId });

      return res.json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async listContacts(req, res) {
    try {
      const user = req.user;

      const contacts = await this.usersService.listContacts(user);

      return res.json({ contacts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
