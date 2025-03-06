import toast from "react-hot-toast";
import Login from "./Login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";
import { loginSchema } from "../../schemas/login";

const LoginContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to log in");
    }
  };

  return (
    <Login
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      isLoggingIn={isLoggingIn}
    />
  );
};

export default LoginContainer;
