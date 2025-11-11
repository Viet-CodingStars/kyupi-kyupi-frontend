"use server";

import { cookies } from "next/headers";
import { authApi } from "@/entities/users/api/auth";
import type { SignUpRequest, AuthResponse } from "@/entities/users/types";

export async function signUpAction(data: SignUpRequest): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const response: AuthResponse = await authApi.signUp(data);

    (await cookies()).set("access_token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Đăng ký thất bại",
    };
  }
}
