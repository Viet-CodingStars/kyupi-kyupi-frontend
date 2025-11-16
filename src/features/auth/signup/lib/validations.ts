export const validateAge = (value: string | undefined) => {
  if (!value) return "Ngày sinh là bắt buộc";

  const birthDate = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  const actualAge =
    monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

  return actualAge >= 18 || "Bạn phải từ 18 tuổi trở lên";
};
