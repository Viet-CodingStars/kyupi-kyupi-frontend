import { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

export function FormField({
  label,
  htmlFor,
  error,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-foreground"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
