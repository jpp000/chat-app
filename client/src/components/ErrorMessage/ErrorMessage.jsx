import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 mt-2 text-red-500 animate-fadeIn">
      <AlertCircle className="size-4" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default ErrorMessage;
