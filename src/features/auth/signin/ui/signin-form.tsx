import { PasswordInput } from "@/shared/ui";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import type { SignInRequest } from "@/entities/users/types";
import { parseAuthError } from "@/shared/lib";

type SigninFormProps = {
  register: UseFormRegister<SignInRequest>;
  handleSubmit: UseFormHandleSubmit<SignInRequest>;
  onSubmit: (data: SignInRequest) => void;
  error: string | null;
  isPending: boolean;
  errors: FieldErrors<SignInRequest>;
};

export const SigninForm = ({
  register,
  handleSubmit,
  onSubmit,
  error,
  isPending,
  errors,
}: SigninFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="min-h-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {parseAuthError(error)}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          {...register("email", {
            required: "Email là bắt buộc",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          })}
          placeholder="NguyenVanA@example.com"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-foreground"
        >
          Mật khẩu
        </label>
        <PasswordInput
          id="login-password"
          {...register("password", { required: "Mật khẩu là bắt buộc" })}
          placeholder="••••••••"
          error={errors.password?.message}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:cursor-pointer"
      >
        {isPending ? "Đang đăng nhập..." : "Đăng Nhập"}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            hoặc tiếp tục với
          </span>
        </div>
      </div>
      {/* TODO: Add Google login*/}
      <button
        type="button"
        className="w-full py-2 px-4 border-2 border-border bg-background rounded-lg font-medium text-foreground hover:bg-muted hover:border-foreground/20 hover:shadow-md hover:scale-105 transition-smooth hover:cursor-pointer"
      >
        Google
      </button>
    </form>
  );
};
