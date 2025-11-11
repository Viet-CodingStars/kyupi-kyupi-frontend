export const parseAuthError = (error: any) => {
  if (error.includes("invalid")) {
    return "Email hoặc mật khẩu không chính xác.";
  }

  return "Đăng nhập thất bại. Vui lòng thử lại.";
};
