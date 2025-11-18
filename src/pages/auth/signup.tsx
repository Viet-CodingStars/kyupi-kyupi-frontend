import Link from "next/link";
import { SignupFormContainer } from "@/features/auth/signup";

export const SignupPage = () => {
  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Tạo Tài Khoản</h1>
        <p className="text-sm text-muted-foreground">
          Bắt đầu hành trình tìm kiếm người phù hợp
        </p>
      </div>

      <SignupFormContainer />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link
            href="/signin"
            className="text-primary font-semibold hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};
