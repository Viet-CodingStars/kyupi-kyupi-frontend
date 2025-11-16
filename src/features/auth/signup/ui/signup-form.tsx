import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
  UseFormWatch,
  Control,
  Controller,
} from "react-hook-form";
import type { SignUpRequest } from "@/entities/users/types";
import { PasswordInput, DatePicker } from "@/shared/ui";
import { parseSignUpError } from "@/shared/lib/parse-error/auth";
import { vi } from "date-fns/locale";

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
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {parseSignUpError(error)}
        </div>
      )}

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

      {/* Birth Date */}
      <div className="space-y-2">
        <label
          htmlFor="signup-birth-date"
          className="block text-sm font-medium text-foreground"
        >
          Ngày sinh <span className="text-destructive">*</span>
        </label>
        <Controller
          name="birth_date"
          control={control}
          rules={{
            required: "Ngày sinh là bắt buộc",
            validate: (value) => {
              if (!value) return "Ngày sinh là bắt buộc";

              const birthDate = new Date(value);
              const today = new Date();
              const age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              const dayDiff = today.getDate() - birthDate.getDate();

              const actualAge =
                monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)
                  ? age - 1
                  : age;

              return actualAge >= 18 || "Bạn phải từ 18 tuổi trở lên";
            },
          }}
          render={({ field }) => (
            <DatePicker
              value={field.value ? new Date(field.value) : undefined}
              onChange={(date) => {
                field.onChange(date ? date.toISOString().split("T")[0] : "");
              }}
              placeholder="Chọn ngày sinh"
              className={errors.birth_date ? "border-destructive" : ""}
              formatters={{
                formatMonthDropdown: (date) => {
                  const months = [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12",
                  ];
                  return months[date.getMonth()];
                },
              }}
              locale={vi}
            />
          )}
        />
        {errors.birth_date && (
          <p className="text-sm text-destructive">
            {errors.birth_date.message}
          </p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <label
          htmlFor="signup-gender"
          className="block text-sm font-medium text-foreground"
        >
          Giới tính <span className="text-destructive">*</span>
        </label>
        <select
          id="signup-gender"
          {...register("gender", {
            required: "Giới tính là bắt buộc",
            setValueAs: (value) => (value === "" ? undefined : parseInt(value)),
          })}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        >
          <option value="">Chọn giới tính</option>
          <option value="1">Nam</option>
          <option value="2">Nữ</option>
          <option value="3">Khác</option>
        </select>
        {errors.gender && (
          <p className="text-sm text-destructive">{errors.gender.message}</p>
        )}
      </div>

      {/* Target Gender */}
      <div className="space-y-2">
        <label
          htmlFor="signup-target-gender"
          className="block text-sm font-medium text-foreground"
        >
          Tìm kiếm <span className="text-destructive">*</span>
        </label>
        <select
          id="signup-target-gender"
          {...register("target_gender", {
            required: "Đối tượng tìm kiếm là bắt buộc",
            setValueAs: (value) => (value === "" ? undefined : parseInt(value)),
          })}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        >
          <option value="">Chọn đối tượng quan tâm</option>
          <option value="1">Nam</option>
          <option value="2">Nữ</option>
          <option value="3">Tất cả</option>
        </select>
        {errors.target_gender && (
          <p className="text-sm text-destructive">
            {errors.target_gender.message}
          </p>
        )}
      </div>

      {/* Intention */}
      <div className="space-y-2">
        <label
          htmlFor="signup-intention"
          className="block text-sm font-medium text-foreground"
        >
          Mục đích hẹn hò <span className="text-destructive">*</span>
        </label>
        <select
          id="signup-intention"
          {...register("intention", {
            required: "Mục đích hẹn hò là bắt buộc",
          })}
          defaultValue="still_figuring_out"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth hover:border-primary/50"
        >
          <option value="still_figuring_out">Vẫn đang tìm hiểu</option>
          <option value="long_term_partner">
            Tìm kiếm mối quan hệ dài hạn
          </option>
          <option value="long_term_open_to_short">
            Dài hạn, nhưng cởi mở với ngắn hạn
          </option>
          <option value="short_term_open_to_long">
            Ngắn hạn, nhưng cởi mở với dài hạn
          </option>
          <option value="short_term_fun">Vui vẻ ngắn hạn</option>
          <option value="new_friends">Kết bạn mới</option>
        </select>
        {errors.intention && (
          <p className="text-sm text-destructive">{errors.intention.message}</p>
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
