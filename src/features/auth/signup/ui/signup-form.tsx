import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormWatch,
  Control,
  Controller,
} from "react-hook-form";
import type { SignUpRequest } from "@/entities/users/types";
import {
  PasswordInput,
  DatePicker,
  FormField,
  TextInput,
  Select,
  ErrorAlert,
  FormDivider,
  SubmitButton,
} from "@/shared/ui";
import { parseSignUpError } from "@/shared/lib/parse-error/auth";
import { vi } from "date-fns/locale";
import {
  MONTH_NAMES,
  GENDER_OPTIONS,
  TARGET_GENDER_OPTIONS,
  INTENTION_OPTIONS,
} from "../lib/constants";
import { validateAge } from "../lib/validations";

export type SignupFormData = SignUpRequest & {
  confirmPassword: string;
};

type SignupFormProps = {
  register: UseFormRegister<SignupFormData>;
  handleSubmit: UseFormHandleSubmit<SignupFormData>;
  onSubmit: (data: SignupFormData) => void;
  watch: UseFormWatch<SignupFormData>;
  control: Control<SignupFormData>;
  error: string | null;
  isPending: boolean;
  errors: FieldErrors<SignupFormData>;
};

export function SignupForm({
  register,
  handleSubmit,
  onSubmit,
  watch,
  control,
  error,
  isPending,
  errors,
}: SignupFormProps) {
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <ErrorAlert message={parseSignUpError(error)} />}

      <FormField
        label="Email"
        htmlFor="signup-email"
        error={errors.email?.message}
        required
      >
        <TextInput
          id="signup-email"
          type="email"
          placeholder="NguyenVanA@email.com"
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
        label="Họ và Tên"
        htmlFor="signup-name"
        error={errors.name?.message}
        required
      >
        <TextInput
          id="signup-name"
          type="text"
          placeholder="Nguyễn Văn A"
          {...register("name", {
            required: "Họ và tên là bắt buộc",
            minLength: { value: 2, message: "Tên phải ít nhất 2 ký tự" },
          })}
        />
      </FormField>

      <FormField
        label="Ngày sinh"
        htmlFor="signup-birth-date"
        error={errors.birth_date?.message}
        required
      >
        <Controller
          name="birth_date"
          control={control}
          rules={{ required: "Ngày sinh là bắt buộc", validate: validateAge }}
          render={({ field }) => (
            <DatePicker
              value={field.value ? new Date(field.value) : undefined}
              onChange={(date) =>
                field.onChange(date ? date.toISOString().split("T")[0] : "")
              }
              placeholder="Chọn ngày sinh"
              className={errors.birth_date ? "border-destructive" : ""}
              formatters={{
                formatMonthDropdown: (date) => MONTH_NAMES[date.getMonth()],
              }}
              locale={vi}
            />
          )}
        />
      </FormField>

      <FormField
        label="Giới tính"
        htmlFor="signup-gender"
        error={errors.gender?.message}
        required
      >
        <Select
          id="signup-gender"
          {...register("gender", {
            required: "Giới tính là bắt buộc",
            setValueAs: (value) => (value === "" ? undefined : parseInt(value)),
          })}
        >
          {GENDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label="Tìm kiếm"
        htmlFor="signup-target-gender"
        error={errors.target_gender?.message}
        required
      >
        <Select
          id="signup-target-gender"
          {...register("target_gender", {
            required: "Đối tượng tìm kiếm là bắt buộc",
            setValueAs: (value) => (value === "" ? undefined : parseInt(value)),
          })}
        >
          {TARGET_GENDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label="Mục đích hẹn hò"
        htmlFor="signup-intention"
        error={errors.intention?.message}
        required
      >
        <Select
          id="signup-intention"
          defaultValue="still_figuring_out"
          {...register("intention", {
            required: "Mục đích hẹn hò là bắt buộc",
          })}
        >
          {INTENTION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label="Mật khẩu"
        htmlFor="signup-password"
        error={errors.password?.message}
        required
      >
        <PasswordInput
          id="signup-password"
          placeholder="••••••••"
          {...register("password", {
            required: "Mật khẩu là bắt buộc",
            minLength: { value: 6, message: "Mật khẩu phải ít nhất 6 ký tự" },
          })}
        />
      </FormField>

      <FormField
        label="Xác nhận mật khẩu"
        htmlFor="signup-confirm-password"
        error={errors.confirmPassword?.message}
        required
      >
        <PasswordInput
          id="signup-confirm-password"
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "Vui lòng xác nhận mật khẩu",
            validate: (value) => value === password || "Mật khẩu không khớp",
          })}
        />
      </FormField>

      <SubmitButton isLoading={isPending} loadingText="Đang tạo tài khoản...">
        Tạo Tài Khoản
      </SubmitButton>

      <FormDivider text="hoặc tiếp tục với" />
    </form>
  );
}
