import * as yup from "yup";

export const signUpSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
