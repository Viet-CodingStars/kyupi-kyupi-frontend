export const parseSignInError = (error: any) => {
  if (error.includes("invalid")) {
    return "Email hoặc mật khẩu không chính xác.";
  }

  return "Đăng nhập thất bại. Vui lòng thử lại.";
};

export const parseSignUpError = (error: any) => {
  if (error.includes("email already exists")) {
    return "Email đã tồn tại.";
  }

  return "Đăng ký thất bại. Vui lòng thử lại.";
};
