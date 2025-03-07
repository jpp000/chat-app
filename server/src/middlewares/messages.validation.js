import { deleteMessageSchema } from "../schemas/messages.schema";

export class MessagesValidation {
  static async deleteMessageValidation(req, res, next) {
    try {
      await deleteMessageSchema.validate(req.params);
      next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
