"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { SignUpRequest } from "@/entities/users/types";
import { signUpAction } from "../actions/signup-action";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpRequest) => signUpAction(data),
    onSuccess: (result) => {
      if (result.success) {
        router.push("/discovery");
      }
    },
    onError: (error: any) => {
      console.error("Sign up error:", error);
    },
  });
};
