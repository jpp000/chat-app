import { model, Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePicture: {
        type: String,
        default: "",
    },
}, { timestamps: true });

export const User = model("User", userSchema);
