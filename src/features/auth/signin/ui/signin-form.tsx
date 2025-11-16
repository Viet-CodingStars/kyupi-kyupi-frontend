import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import type { SignInRequest } from "@/entities/users/types";
import {
  PasswordInput,
  TextInput,
  FormField,
  ErrorAlert,
  SubmitButton,
  FormDivider,
} from "@/shared/ui";
import { parseSignInError } from "@/shared/lib";

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
      {error && <ErrorAlert message={parseSignInError(error)} />}

      <FormField
        label="Email"
        htmlFor="login-email"
        error={errors.email?.message}
      >
        <TextInput
          id="login-email"
          type="email"
          placeholder="NguyenVanA@example.com"
          {...register("email", {
            required: "Email là bắt buộc",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          })}
        />
      </FormField>

      <FormField
        label="Mật khẩu"
        htmlFor="login-password"
        error={errors.password?.message}
      >
        <PasswordInput
          id="login-password"
          placeholder="••••••••"
          {...register("password", { required: "Mật khẩu là bắt buộc" })}
        />
      </FormField>

      <SubmitButton isLoading={isPending} loadingText="Đang đăng nhập...">
        Đăng Nhập
      </SubmitButton>

      <FormDivider text="hoặc tiếp tục với" />

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
