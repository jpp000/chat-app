import toast from "react-hot-toast";
import SignUp from "./SignUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";
import { signUpSchema } from "../../schemas/signup";

const SignUpContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = async (data) => {
    try {
      await signup(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account");
    }
  };

  return (
    <SignUp
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      isSigningUp={isSigningUp}
    />
  );
};

export default SignUpContainer;
