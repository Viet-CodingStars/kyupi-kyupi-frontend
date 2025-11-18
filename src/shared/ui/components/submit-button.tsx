import { ButtonHTMLAttributes } from "react";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingText?: string;
};

export function SubmitButton({
  children,
  isLoading = false,
  loadingText = "Loading...",
  className = "",
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:cursor-pointer ${className}`}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
