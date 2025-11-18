import { apiClient } from "@/shared/api/client";
import type { AuthResponse, SignInRequest, SignUpRequest } from "../types";

export const authApi = {
  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/api/users/sign_in",
      data
    );
    return response.data;
  },

  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/users", data);
    return response.data;
  },

  signOut: async (): Promise<void> => {
    await apiClient.delete("/api/users/sign_out");
  },
};
