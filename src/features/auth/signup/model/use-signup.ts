import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/entities/users/api/auth";
import type { SignUpRequest } from "@/entities/users/types";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpRequest) => authApi.signUp(data),
    onSuccess: (response) => {
      localStorage.setItem("auth_token", response.token);

      router.push("/discovery");
    },
    onError: (error: any) => {
      console.error("Sign up error:", error);
      // Error will be handled in the form component
    },
  });
};
