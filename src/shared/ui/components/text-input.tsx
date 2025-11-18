import { forwardRef, InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50 ${className}`}
        {...props}
      />
    );
  }
);

TextInput.displayName = "TextInput";
