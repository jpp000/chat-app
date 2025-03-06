import { cloudinary } from "../config/cloudinary.js";
import { User } from "../models/user.model.js";

export class UsersService {
  async updateProfile({ profilePicture, userId }) {
    const uploadResponse = await cloudinary.uploader.upload(
      profilePicture,
      async (error, result) => {
        if (error) {
          throw new Error("An error occurred while uploading the image");
        }

        return result;
      }
    );

    return await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: uploadResponse.secure_url,
      },
      { new: true }
    );
  }

  async listContacts(user) {
    return await User.find({ _id: { $ne: user._id } });
  }
}
