"use server";

import { cookies } from "next/headers";
import { authApi } from "@/entities/users/api/auth";
import type { SignInRequest, AuthResponse } from "@/entities/users/types";

export async function signInAction(data: SignInRequest): Promise<{
  success: boolean;
  error?: {
    message: string;
  };
}> {
  try {
    const response: AuthResponse = await authApi.signIn(data);

    (await cookies()).set("access_token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.response?.data?.error,
      },
    };
  }
}
