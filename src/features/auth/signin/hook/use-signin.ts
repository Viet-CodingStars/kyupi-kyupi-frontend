"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { SignInRequest } from "@/entities/users/types";
import { signInAction } from "../actions/signin-action";

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInRequest) => signInAction(data),
    onSuccess: (result) => {
      if (result.success) {
        router.push("/discovery");
      }
    },
    onError: (error: any) => {
      console.error("Sign in error:", error);
    },
  });
};
