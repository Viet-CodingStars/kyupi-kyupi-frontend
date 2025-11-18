import axios from "axios";
import { config } from "../config";

export const apiClient = axios.create({
  baseURL: config.gatewayServerUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);
