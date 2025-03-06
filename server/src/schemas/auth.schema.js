import * as yup from "yup";

const signUpSchema = yup.object({
  fullName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export { signUpSchema, loginSchema };
