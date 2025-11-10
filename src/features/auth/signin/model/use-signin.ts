import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/entities/users/api/auth";
import type { SignInRequest } from "@/entities/users/types";

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInRequest) => authApi.signIn(data),
    onSuccess: (response) => {
      localStorage.setItem("auth_token", response.token);

      router.push("/discovery");
    },
    onError: (error: any) => {
      // TODO: Handle error
      console.error("Sign in error:", error);
    },
  });
};
