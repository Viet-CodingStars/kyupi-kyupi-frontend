import Link from "next/link";
import { SigninFormContainer } from "@/features/auth/signin";

export const SigninPage = () => {
  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          Chào Mừng Trở Lại
        </h1>
        <p className="text-sm text-muted-foreground">
          Đăng nhập để tiếp tục hành trình của bạn
        </p>
      </div>

      <SigninFormContainer />

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link
            href="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};
