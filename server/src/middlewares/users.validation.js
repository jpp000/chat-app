import { profilePictureSchema } from "../schemas/users.schema.js";

export class UsersValidation {
    static async updateProfileValidation(req, res, next) {
        try {
            await profilePictureSchema.validate(req.body);
            next();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}