import * as yup from "yup";

const profilePictureSchema = yup.object({
    profilePicture: yup.string().required(),
});
    
export { profilePictureSchema };
