import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../../components/AuthImagePattern/AuthImagePattern";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const SignUp = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  showPassword,
  setShowPassword,
  isSigningUp,
}) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2">
                  <User className="size-5" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 focus:border-none ${
                    errors.name
                      ? "input-error border-red-500 focus:border-none"
                      : ""
                  }`}
                  placeholder="John Doe"
                  {...register("fullName")}
                />
              </div>
              <ErrorMessage message={errors.name?.message} />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 focus:border-none ${
                    errors.email
                      ? "input-error border-red-500 focus:border-none"
                      : ""
                  }`}
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </div>
              <ErrorMessage message={errors.email?.message} />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 pr-10 focus:border-none ${
                    errors.password
                      ? "input-error border-red-500 focus:border-none"
                      : ""
                  }`}
                  placeholder="••••••••"
                  {...register("password")}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>
              <ErrorMessage message={errors.password?.message} />
            </div>

            {/* Botão de Cadastro */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Link para Login */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUp;
