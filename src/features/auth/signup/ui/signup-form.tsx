"use client";

import { useForm } from "react-hook-form";
import { useSignUp } from "../model/use-signup";
import type { SignUpRequest } from "@/entities/users/types";
import { PasswordInput } from "@/shared/ui";

type SignupFormData = SignUpRequest & {
  confirmPassword: string;
};

export function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const { mutate: signUp, isPending, error } = useSignUp();
  const password = watch("password");

  const onSubmit = (data: SignupFormData) => {
    // Only send required fields to API
    const { confirmPassword, ...signupData } = data;
    signUp(signupData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error.response?.data?.error || "Đăng ký thất bại. Vui lòng thử lại."}
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="signup-email"
          className="block text-sm font-medium text-foreground"
        >
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="signup-email"
          type="email"
          {...register("email", {
            required: "Email là bắt buộc",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          })}
          placeholder="you@example.com"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="signup-name"
          className="block text-sm font-medium text-foreground"
        >
          Họ và Tên <span className="text-destructive">*</span>
        </label>
        <input
          id="signup-name"
          type="text"
          {...register("name", {
            required: "Họ và tên là bắt buộc",
            minLength: {
              value: 2,
              message: "Tên phải ít nhất 2 ký tự",
            },
          })}
          placeholder="Nguyễn Văn A"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="signup-password"
          className="block text-sm font-medium text-foreground"
        >
          Mật khẩu <span className="text-destructive">*</span>
        </label>
        <PasswordInput
          id="signup-password"
          {...register("password", {
            required: "Mật khẩu là bắt buộc",
            minLength: {
              value: 6,
              message: "Mật khẩu phải ít nhất 6 ký tự",
            },
          })}
          placeholder="••••••••"
          error={errors.password?.message}
        />
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="signup-confirm-password"
          className="block text-sm font-medium text-foreground"
        >
          Xác nhận mật khẩu <span className="text-destructive">*</span>
        </label>
        <PasswordInput
          id="signup-confirm-password"
          {...register("confirmPassword", {
            required: "Vui lòng xác nhận mật khẩu",
            validate: (value) => value === password || "Mật khẩu không khớp",
          })}
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:cursor-pointer"
      >
        {isPending ? "Đang tạo tài khoản..." : "Tạo Tài Khoản"}
      </button>

      {/* Divider */}
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
    </form>
  );
}
